import { Links, Link, Meta, Outlet, Scripts, isRouteErrorResponse, ScrollRestoration, useRouteError, useMatches } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

// import "./tailwind.css";
import sharedStyles from '~/styles/shared.css?url';
import Error from "./components/util/Error";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
  },
  {
    rel: "stylesheet",
    href: sharedStyles
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const disableJS = matches.some(match => match.handle?.disableJS);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}


export function ErrorBoundary() {
  const error = useRouteError();
  console.log('ERROR@@@@@@@ -- ', error.error)
  console.log('\n');
  console.log('isRouteErrorResponse---', isRouteErrorResponse(error));
  console.log('isDefinitelyAnError---', (error));
  let customError = isRouteErrorResponse(error) ? error.data: error;
  return <Layout>
    <main>
      <Error title={customError?.message}>
        <p>Back to <Link to="/">safety</Link></p>
      </Error>
    </main>
  </Layout>
}