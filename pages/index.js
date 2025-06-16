// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to CleanMyInbox</h1>
      <p>
        Start by{' '}
        <Link href="/login">
          <a>logging in</a>
        </Link>.
      </p>
    </div>
  );
}
