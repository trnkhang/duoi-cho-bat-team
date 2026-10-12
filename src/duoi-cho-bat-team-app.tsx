import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from '@zpi/single-spa-react';
import { AppContainer } from '@presentation/container';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: AppContainer,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = (props: unknown) =>
  lifecycles.mount({ ...(props as object), name: 'root' });
export const unmount = (props: unknown) =>
  lifecycles.unmount({ ...(props as object), name: 'root' });
