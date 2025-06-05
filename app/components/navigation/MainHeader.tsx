import { Form, Link, useLoaderData } from '@remix-run/react';
import Logo from '../util/Logo';

function MainHeader() {
  const userId = useLoaderData();

  const userSession = (
    userId ? (
      <Form method='post' action='/logout'>
        <button className='cta-alt'>Logout</button>
      </Form>
    ) : (
      <Link to="/auth" className="cta">
        Login
      </Link>
    )
  )


  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
          {/* <li>
            <Link to="/expenses">Expenses</Link>
          </li> */}
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {/* <Link to="/auth" className="cta">Login</Link> */}
            {userSession}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
