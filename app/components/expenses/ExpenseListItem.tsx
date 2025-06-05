import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";
import { ExpenseModel } from "~/constants/constants";

function ExpenseListItem({ id, title, amount }: ExpenseModel) {
  // const submit = useSubmit();
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    const proceed = confirm('Are you sure? Do you want to delete this item?');
    // submit(null, {
    //   method: 'DELETE',
    //   action: `/expenses/${id}`
    // })
    if (!proceed) {
      return
    }

    fetcher.submit(null, {
      method: 'DELETE',
      action: `/expenses/${id}`
    })
  }

  if (fetcher.state !== 'idle') {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    )
  }


  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${(amount ? +amount : 0).toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        {/* !!! as when return the response instead of the redirect from the successful deletion then remix again execute the get request so
        programmatically doing now */}
        {/* ### Check the action on the expense.$id.tsx file */}
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id as string}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
