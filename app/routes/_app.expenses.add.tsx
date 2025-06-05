import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { requireUserSession } from "~/data/auth.server";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function AddExpensesPage() {
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

export async function action({ request }: LoaderFunctionArgs) {
   const userId = await requireUserSession(request);
   const formData = await request.formData();
   const expenseFormData = Object.fromEntries(formData);
   console.log('----', expenseFormData);
   try{
      validateExpenseInput(expenseFormData);
   } catch(err){
      return err
   }

   await addExpense(expenseFormData, userId);
   return redirect('/expenses')
}