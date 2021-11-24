$wsl_ip = $(wsl hostname -I).Trim();
$windows_ip = '0.0.0.0';

if ( -Not $wsl_ip ) {
  Write-Output "IP address for WSL 2 cannot be found";
  exit;
}

Write-Output $wsl_ip
Write-Output $windows_ip

# Show all previously proxied ports
Invoke-Expression "netsh interface portproxy show v4tov4"

# Remove all previously proxied ports
Invoke-Expression "netsh int portproxy reset all"

# Remove Firewall Exception Rules
Invoke-Expression "Remove-NetFireWallRule -DisplayName 'Expo WSL2 Ports' ";

# Allow Expo ports through Windows Firewall
New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Inbound -LocalPort 19000-19006 -Action Allow -Protocol TCP;
New-NetFireWallRule -DisplayName 'Expo WSL2 Ports' -Direction Outbound -LocalPort 19000-19006 -Action Allow -Protocol TCP;

# Proxy Expo ports
netsh interface portproxy add v4tov4 listenport=19000 listenaddress=$windows_ip connectport=19000 connectaddress=$wsl_ip;
netsh interface portproxy add v4tov4 listenport=19001 listenaddress=$windows_ip connectport=19001 connectaddress=$wsl_ip
# NOTE: Avoid proxying port 19002, as this will prevent loading the Expo dev tools on the host (browser)!

# Show all newly proxied ports
Invoke-Expression "netsh interface portproxy show v4tov4"

cmd /c pause
