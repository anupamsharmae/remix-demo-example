// expenses pathless routes

import { MetaFunction, Outlet } from "@remix-run/react";
import ExpensesHeader from "~/components/navigation/Expenses.Header";

import expensesStyles from '~/styles/expenses.css?url';


export default function ExpensesLayout() {
   return <>
      <ExpensesHeader />
      <Outlet />
   </>
}

export const links = () => [{ rel: 'stylesheet', href: expensesStyles, as: "style" }]

export const meta: MetaFunction = () => {
   return [
      { title: "Expenses" },
      { name: "description", content: "Expenses origin and manage!" },
   ];
};