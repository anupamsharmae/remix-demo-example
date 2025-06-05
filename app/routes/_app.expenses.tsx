import { json, Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
// import { EXPENSES } from "~/constants/constants";
// import expensesStyles from '~/styles/expenses.css?url';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { getExpenses } from "~/data/expenses.server";
import { requireUserSession } from "~/data/auth.server";

export default function ExpensesLayout() {
   const expenses = useLoaderData();
   const hasExpense = expenses?.length > 0;
   return (
      <>
         <Outlet />
         <main>
            <section id="expenses-actions">
               <Link to="add">
                  <FaPlus />
                  <span>Add Expense</span>
               </Link>
               <a href="/expenses/raw">
                  <FaDownload />
                  <span>Load Raw Data</span>
               </a>
            </section>
            {hasExpense ? (
               <ExpensesList expenses={expenses} />
            ) : (
               <section id="no-expense">
                  <h1>No expense found</h1>
                  <p>
                     Start <Link to="add">adding some</Link>today.
                  </p>
               </section>
            )
            }
         </main>
      </>
   )
}

// export const links = () => [{ rel: 'stylesheet', href: expensesStyles }]

export async function loader({ request }) {
   const userId = await requireUserSession(request);

   console.log('EXPENSE LOADER: ---- ');
   const expense = await getExpenses(userId);

   // if (!expense || expense.length === 0) {
   //    throw new Response(JSON.stringify({ message: 'No expense found1' }), {
   //       status: 404, statusText: 'No expense found',
   //       headers: {
   //          'Content-Type': 'application/json'
   //       }
   //    })
   // }

   return expense || []
   // return new Response(JSON.stringify(expense), {
   //    headers: {
   //       'Cache-Control': '3'
   //    }
   // })
}

export function headers({ actionHeaders, loaderHeaders, parentHeaders, errorHeaders }) {
   console.log(actionHeaders, loaderHeaders, parentHeaders, errorHeaders);
   return {
      'Cache-Control': loaderHeaders.get('Cache-Control') // 60minutes
   }
}