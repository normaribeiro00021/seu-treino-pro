import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/treino/BottomNavigation";
import { SideNavigation } from "@/components/treino/SideNavigation";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <SideNavigation />
      <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-6 sm:px-6 lg:max-w-5xl lg:pb-12">
          <Outlet />
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
