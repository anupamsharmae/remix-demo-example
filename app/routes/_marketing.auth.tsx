
import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import { login, signup } from '~/data/auth.server';
import { validateCredentials } from '~/data/validation.server';
import authStyles from '~/styles/auth.css?url';

export default function AuthPage() {
   return <AuthForm />
}



export const links = () => [{ rel: 'stylesheet', href: authStyles }]


export async function action({ request }: LoaderFunctionArgs) {
   const searchParams = new URL(request.url).searchParams;
   const authMode = searchParams.get('mode') || 'login';

   const formData = await request.formData();
   const credentials = Object.fromEntries(formData);
   console.log('Credentials-- : ', credentials);
   // validate user input

   try {
      validateCredentials(credentials)
   } catch (error) {
      return error;
   }


   try {
      if (authMode === 'login') {
         // login logic
         return await login(credentials);
      } else {
         // signup logic
         return await signup(credentials);
      }
   } catch (error) {
      if (error.status === 422) {
         return { credentials: error.message || 'Could not authenticate user' }
      }
   }
}

export function headers({ actionHeaders, loaderHeaders, parentHeaders, errorHeaders }) {
   console.log(actionHeaders, loaderHeaders, parentHeaders, errorHeaders);
   return {
      'Cache-Control': parentHeaders.get('Cache-Control') // 60minutes
   }
}