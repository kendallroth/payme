/**
 * Eliminate nesting multiple context providers to the app!
 *
 * Taken from: https://tobea.dev/post/global-state-cleanliness-with-react-context#lets-get-fancy
 */

import React, { ReactElement } from "react";

// Utilities
import { SnackbarProvider } from "./SnackbarContext";

type ProviderComposerProps = {
  /** Children to receive context providers */
  children: ReactElement | ReactElement[];
  /** Context providers to wrap around children */
  providers: ReactElement[];
};

type ContextProviderProps = {
  children: ReactElement | ReactElement[];
}

/**
 * Compose Context providers together
 *
 * @param {Node}     children  - React children
 * @param {Object[]} providers - React context providers
 */
const ProviderComposer = (
  props: ProviderComposerProps,
): ReactElement => {
  const { children, providers } = props;

  // TODO: Figure out why this was causing a TS error
  // @ts-ignore
  return providers.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children,
  );
};

/**
 * Combine Context providers into single React component
 *
 * @param {Node}     children  - React children
 */
const ContextProvider = (props: ContextProviderProps): ReactElement => {
  const { children } = props;

  return (
    <ProviderComposer providers={[<SnackbarProvider />]}>
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;
