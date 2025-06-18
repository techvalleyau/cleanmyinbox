import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Dashboard({ session: serverSession }) {
  const { data: clientSession, status } = useSession();

  console.log("Dashboard client session:", clientSession, "status:", status);
  console.log("Dashboard server session:", serverSession);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!clientSession) {
    return (
      <div>
        <p>You must be signed in to view this page.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome, {clientSession.user.name}!</h1>
      <p>Email: {clientSession.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

// Server-side session fetching and redirect if no session
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
