// resources routes

import { requireUserSession } from "~/data/auth.server";
import { getExpenses } from "~/data/expenses.server";

// import { EXPENSES } from "~/constants/constants"

export async function loader({ request }) {
   const userId = await requireUserSession(request);
   // return EXPENSES;
   return getExpenses(userId);
}