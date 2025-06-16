import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h1>Welcome to CleanMyInbox</h1>
      <p>Sign in with Google to get started</p>
      <button
        onClick={() => signIn("google")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
