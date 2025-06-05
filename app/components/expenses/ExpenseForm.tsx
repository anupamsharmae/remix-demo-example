import { Form, Link, useActionData, useLoaderData, useMatches, useNavigation, useParams } from "@remix-run/react";
import { ExpenseModel } from "~/constants/constants";
// import { FormEvent } from "react";



function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  // const expense = useLoaderData<ExpenseModel>();
  // const expense = { title: '', amount: '', date: '' };
  const matches = useMatches();
  const params = useParams();
  // console.log(expense, matches, '----');

  const expenses = matches.find(match => match.id === 'routes/_app.expenses')?.data as ExpenseModel[];
  const expense = expenses?.find(exp => exp.id === params.id);
  // console.log(expense, '*****');

  const defaultValues = {
    title: expense?.title || '',
    amount: expense?.amount || '',
    date: expense?.date ? new Date(expense?.date).toISOString().slice(0, 10) : ''
  }

  // ! Done for the native form html element
  // const submit = useSubmit();

  // function submitHandler(event:FormEvent) {
  //   event.preventDefault();
  //   // perform something...
  //   submit(event.target as HTMLFormElement, {
  //     // action: '/expenses/add',
  //     method:'post'
  //   })
  // }



  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';
  if (params.id && !expense) {
    return <p>Invalid id</p>
  }

  return (
    <Form
      method={expense ? 'PATCH' : 'POST'}
      className="form"
      id="expense-form"
    // onSubmit={submitHandler}
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} defaultValue={defaultValues.title} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required defaultValue={defaultValues.date} />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Saving' : 'Save Expense'}</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
