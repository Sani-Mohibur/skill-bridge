import { ReactNode } from "react";
import { headers } from "next/headers";
import { ROLES } from "@/constants/roles";
import { authClient } from "@/lib/auth-client";

interface DashboardLayoutProps {
  student: ReactNode;
  tutor: ReactNode;
}

export default async function DashboardLayout(props: DashboardLayoutProps) {
  // Secure server-side session lookup
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const userRole = session?.data?.user?.role;

  // Mount the correct role layout slot conditionally
  if (userRole === ROLES.TUTOR) {
    return <>{props.tutor}</>;
  }

  return <>{props.student}</>;
}
