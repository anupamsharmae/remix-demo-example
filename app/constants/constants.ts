import { FaTrophy, FaHandshake } from 'react-icons/fa';

export const EXPENSES: Record<string, string | number>[] = [
   {
      id: 'e1',
      title: 'First expense',
      amount: 12.56,
      date: new Date().toISOString()
   },
   {
      id: 'e2',
      title: 'Second expense',
      amount: 14.56,
      date: new Date().toISOString()
   }
]

export const PRICING_PLANS = [
   {
      id: 'p1',
      title: 'Basic',
      price: 'Free forever',
      perks: ['1 User', 'Up to 100 expenses/year', 'Basic analytics'],
      icon: FaHandshake
   },
   {
      id: 'p2',
      title: 'Pro',
      price: '$9.99/month',
      perks: ['Unlimited Users', 'Unlimited expenses/year', 'Detailed analytics'],
      icon: FaTrophy
   },
];

export interface ExpenseModel {
  title?: string;
  amount?: string;
  date?: string;
  id?: string;
}