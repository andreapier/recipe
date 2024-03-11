"use client";

import { Button, Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit">
      Login
    </Button>
  );
}

export default function Page() {
  const [errorMessage, dispatch] = useFormState(() => "Ok", undefined);

  return (
    <form action={dispatch}>
      <Input type="email" name="email" placeholder="Email" required />
      <Input type="password" name="password" placeholder="Password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <LoginButton />
    </form>
  );
}
