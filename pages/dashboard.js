// pages/dashboard.js
import { getSession, signIn, signOut } from "next-auth/react";

export default function Dashboard({ session }) {
  if (!session) {
    return (
      <div>
        <p>You must be signed in to view this page.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

// This runs on server before rendering dashboard page
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/", // or your login page route
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
