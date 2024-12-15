import classes from "./header.module.css";
import { useAuth } from "../../hooks/useAuth";

export default function Header() {
  const user = useAuth();
  const isLoggedIn = user?.user ? true : false;
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <h1>Customer Management App</h1>
        <nav>
          <ul>
            {isLoggedIn && (
              <li>
                <a href="/dashboard">Welcome {user?.user?.fullName}</a>
              </li>
            )}
            <li>
              {isLoggedIn ? (
                <a href="/" onClick={user?.logout}>
                  Logout
                </a>
              ) : (
                <a href="/login">Login</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
