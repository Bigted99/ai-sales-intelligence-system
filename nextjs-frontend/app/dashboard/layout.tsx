import DashboardSidebar from "@/components/dashboard/DashboardSidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-muted flex">
      
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}