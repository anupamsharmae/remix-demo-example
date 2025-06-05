import { useLoaderData, useRouteError } from "@remix-run/react";
import Chart from "~/components/expenses/Chart";
import ExpenseStats from "~/components/expenses/ExpenseStatistics";
// import { EXPENSES } from "~/constants/constants";
import { getExpenses } from "~/data/expenses.server";
import Error from '../components/util/Error';
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesAnalysisPage() {
   const expenses = useLoaderData();

   return <main>
      <Chart expenses={expenses} />
      <ExpenseStats expenses={expenses} />
   </main>
}

export async function loader({request}) {
   const userId = await requireUserSession(request);
   const expenses = await getExpenses(userId);

   if (!expenses || expenses.length === 0) {
      throw new Response(
         JSON.stringify({ message: 'Could not load expenses' }), {
         status: 404,
         statusText: 'Not found',
         headers: {
            'Content-Type': 'application/json'
         }
      }
      )
   }

   return expenses;
}

export function ErrorBoundary() {
   const error = useRouteError();

   return (
      <main>
         <Error title={error.statusText}>
            <p>{error.message}</p>
         </Error>
      </main>
   )
}