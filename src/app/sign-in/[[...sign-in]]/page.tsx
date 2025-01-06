import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-container auth-only">
      <SignIn />
    </div>
  );
}
