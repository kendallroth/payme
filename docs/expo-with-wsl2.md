## Connecting Expo with WSL2

WSL2 causes issues with Expo ports and must be configured to enable passing/proxying ports. Sources include ([Stack Overflow - WSL2 via LAN](https://stackoverflow.com/a/65295187/4206438)) and [GitHub - WSL2 Bridge Mode](https://github.com/microsoft/WSL/issues/4150).

- Allow Expo ports through Windows Firewall
- Proxy Expo ports to WSL2
- Update Expo QR address
- _Cleaning up_

> **NOTE:** This has been implemented as a [script](scripts/wsl2_unlock_expo_ports.ps1) that can be executed with administrator privileges. A shortcut can be created with a target of `powershell.exe -ExecutionPolicy Bypass -f <file_path>` to automatically configure when executed!

### Configure Windows Firewall

Configure the Windows Firewall to let inbound/outbound traffic on Expo ports through.

```ps1
# Powershell

New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Inbound -LocalPort 19000-19006 -Action Allow -Protocol TCP;
New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Outbound -LocalPort 19000-19006 -Action Allow -Protocol TCP;
```

### Proxy Expo Ports

Configure the port proxying from Windows host to WSL2 guest ports.

```ps1
# Powershell

$wsl_ip = $(wsl hostname -I).Trim();
$windows_ip = '0.0.0.0';

netsh interface portproxy add v4tov4 listenport=19000 listenaddress=$windows_ip connectport=19000 connectaddress=$wsl_ip;
netsh interface portproxy add v4tov4 listenport=19001 listenaddress=$windows_ip connectport=19001 connectaddress=$wsl_ip;

# Validate proxies
Invoke-Expression "netsh interface portproxy show v4tov4";
```

> **NOTE:** Avoid proxying port `19002` as this will prevent loading the Expo dev tools on the host!

### Update Expo QR Address

Expo must also be updated to change the scannable QR code JS bundle address!

```sh
# WSL Bash

npm run start:wsl
```

#### Manual

```sh
# WSL Bash

# Modify Expo QR address (for scanning with phone)
windows_ip=$(netsh.exe interface ip show address "Ethernet" | grep 'IP Address' | sed -r 's/^.*IP Address:\W*//');
export REACT_NATIVE_PACKAGER_HOSTNAME=$windows_ip;

# Start Metro bundler
npm run start
```

### Cleaning Up

Cleanup can be performed by removing the Windows Firewall exception and port proxies.

```ps1
# Powershell

# Remove port proxies
Invoke-Expression "netsh int portproxy reset all"

# Remove firewall rules
Invoke-Expression "Remove-NetFireWallRule -DisplayName 'Expo WSL2 Ports' ";
```
