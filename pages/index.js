import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Button from '@mui/material/Button';

export default function Home() {
  const [loggedUsername, setLoggedUsername] = useState("");
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/login">
            <Button>Login</Button>
          </Link>

          <Link href="/schedule">
            <Button>Schedule</Button>
          </Link>
        </div>
      </main>


    </div>
  );
}
