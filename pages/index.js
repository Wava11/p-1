import Link from 'next/link';
import { useContext, useState } from 'react';
import styles from '../styles/Home.module.css';
import { UserContext } from '../user.session';

export default function Home() {
  const [loggedUsername, setLoggedUsername] = useState("");
  const userContextValue = { setLoggedUsername, loggedUsername }
  debugger
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>

          <UserContext.Provider value={userContextValue}>
            <Link href="/login">
              <a>Login</a>
            </Link>

            <Link href="/schedule">
              <a>Schedule</a>
            </Link>
          </UserContext.Provider>
        </div>
      </main>


    </div>
  );
}
