import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components";

export default function Home() {
  return (
    <div className="flex items-center justify-between p-4">
      <h1>Admin Dashboard</h1>
      <div className="flex items-center gap-6">
        <UserButton />
        <ModeToggle />
      </div>
    </div>
  );
}
