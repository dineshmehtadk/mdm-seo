declare module 'wouter/ssr' {
  import { JSX } from 'react';

  interface StaticRouterProps {
    children: JSX.Element;
    location: string;
  }

  export function StaticRouter(props: StaticRouterProps): JSX.Element;
}
