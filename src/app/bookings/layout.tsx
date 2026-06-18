import { ReactNode } from "react";
import { headers } from "next/headers";
import { ROLES } from "@/constants/roles";
import { authClient } from "@/lib/auth-client";

interface BookingsLayoutProps {
  student: ReactNode;
  tutor: ReactNode;
}

export default async function BookingsLayout(props: BookingsLayoutProps) {
  // Fetch the live server-side session using better-auth headers
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const userRole = session?.data?.user?.role;

  // Dynamically route based on the authentic session role
  if (userRole === ROLES.TUTOR) {
    return <>{props.tutor}</>;
  }

  return <>{props.student}</>;
}
