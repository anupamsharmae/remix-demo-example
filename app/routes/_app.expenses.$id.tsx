import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { LoaderFunctionArgs } from "@remix-run/node";
import { deleteExpense, getExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function UpdateExpensesPage() {
   const navigate = useNavigate();

   function onCancelModal() {
      navigate('..');
   }

   return (
      <Modal onClose={onCancelModal}>
         <ExpenseForm />
      </Modal>
   )
}


// export async function loader({ params }: LoaderFunctionArgs) {
//    console.log('EXPENSE ID LOADER: ---- ');
//    const expenseId = params.id || '';
//    const expense = await getExpense(expenseId);
//    return expense;
// }

export async function action({ request, params }: LoaderFunctionArgs) {
   const expenseId = params.id;
   const formData = await request.formData();
   if (request.method === 'PATCH') {
      await patchFormData(formData, expenseId as string);
      return redirect('/expenses')
   } else if (request.method === 'DELETE') {
      await deleteExpense(expenseId);
      // return redirect('/expenses')
      return { deletedId: expenseId }
   }


}

async function patchFormData(formData: FormData, expenseId: string) {
   const expenseData = Object.fromEntries(formData);
   try {
      validateExpenseInput(expenseData);
   } catch (err) {
      return err
   }
   return await updateExpense(expenseId, expenseData);
}

export function meta({ matches }) {
   const currentRoute = matches.find((match) => match.data && (match.data[0].id === match.params.id));
   console.log(currentRoute, '\n');
   console.log('parentData', matches);
   return [
      { title: `Expense id ${currentRoute.params.id}` },
      { name: 'description', content: `Expense having the data with regarding the expense id: ${matches[2].params.id}` }
   ]
}