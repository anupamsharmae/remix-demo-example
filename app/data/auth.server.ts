import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./database.server";
import { hash, compare } from 'bcryptjs';

const SESSION_SECRET = process.env.SESSION_SECRET
const sessionStorage = createCookieSessionStorage({
   cookie: {
      secure: process.env.NODE_ENV === 'production',
      secrets: [SESSION_SECRET],
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true
   }
})

async function createUserSession(userId, redirectPath) {
   const session = await sessionStorage.getSession();
   session.set('userId', userId);
   return redirect(redirectPath, {
      headers: {
         'Set-Cookie': await sessionStorage.commitSession(session)
      }
   })
}

export async function destoryUserSession(request, redirectPath = '/') {
   const session = await sessionStorage.getSession(
      request.headers.get('Cookie')
   );
   return redirect(redirectPath, {
      headers: {
         'Set-Cookie': await sessionStorage.destroySession(session)
      }
   })
}

// AS a guard for every request
export async function requireUserSession(request) {
   const userId = await getUserFromSession(request);

   if (!userId) {
      throw redirect('/auth?mode=login')
   }

   return userId;
}



export async function signup({ email, password }) {
   const existingUser = await prisma.user.findFirst({ where: { email } });
   if (existingUser) {
      const error = new Error('A user is already exist with the provided email!');
      error.status = 422;
      throw error;
   }

   const passwordHash = await hash(password, 12)
   console.log('PASSWORD HASH ---- ', password, passwordHash)
   const user = await prisma.user.create({
      data: {
         email: email, password: passwordHash
      }
   });
   return createUserSession(user.id, '/expenses');

}


export async function login({ email, password }) {
   const existingUser = await prisma.user.findFirst({ where: { email } });
   if (!existingUser) {
      const error = new Error('Could not log-in you, please check the provided credentials!');
      error.status = 401;
      throw error;
   }

   const isPasswordValid = await compare(password, existingUser.password);

   if (!isPasswordValid) {
      const error = new Error('Could not log-in you, please check the provided credentials!');
      error.status = 401;
      throw error;
   }

   return createUserSession(existingUser.id, '/expenses');
}


export async function getUserFromSession(request) {
   const session = await sessionStorage.getSession(
      request.headers.get('Cookie')
   );
   const userId = session.get('userId');
   if (!userId) {
      return null
   }

   return userId;
}