import { prisma } from './database.server';

export async function addExpense(expenseData: { [x: string]: FormDataEntryValue }, userId: any) {
   try {
      await prisma.expense.create({
         data: {
            title: expenseData.title as string,
            amount: +expenseData.amount,
            date: new Date(expenseData.date.toString()),
            User: { connect: { id: userId } }
         }
      });
   } catch (err) {
      console.error(err);
      throw new Error('Failed to add the expense.');
   }
   // finally{
   //    await prisma.$discount();
   // }
}

export async function getExpenses(userId: any) {
   if (!userId) {
      throw new Error('Failed to get the expenses.');
   }
   try {
      return await prisma.expense.findMany({
         where: { userId },
         orderBy: { date: 'desc' }
      })
   } catch (error) {
      console.error(error);
      throw new Error('Failed to get the expenses.');
   }
}

export async function getExpense(id: string) {
   try {
      return await prisma.expense.findFirst({ where: { id } })
   } catch (error) {
      console.error(error);
      throw new Error('Failed to get the expense with respected id.');
   }

}


export async function updateExpense(id, expenseData) {
   try {
      return await prisma.expense.update({
         where: { id },
         data: {
            title: expenseData.title as string,
            amount: +expenseData.amount,
            date: new Date(expenseData.date.toString())
         }
      })
   } catch (error) {
      console.error(error);
      throw new Error('Failed to update the expenses.');
   }
}

export async function deleteExpense(id) {
   try {
      return await prisma.expense.delete({ where: { id } })
   } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the expense with respected id');
   }
}