// marketing pathless route + layout route

import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import marketingStyles from '~/styles/marketing.css?url';

export default function MarketingLayout() {
   return <>
      <MainHeader />
      <Outlet />
   </>
}

export const links = () => [{ rel: 'stylesheet', href: marketingStyles }]

export async function loader({request}) {
   const user = getUserFromSession(request);
   return user;
}

export function headers() {
  return {
    'Cache-Control': 'max-age=3700' // 60minutes
  }
}