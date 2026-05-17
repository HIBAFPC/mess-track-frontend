export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar placeholder */}
      <aside className="hidden w-64 border-r bg-background md:block">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-lg font-bold">Mess Track</span>
        </div>
        <nav className="p-4 space-y-2">
          {/* Navigation links placeholder */}
          <div className="h-8 w-full bg-muted rounded animate-pulse" />
          <div className="h-8 w-full bg-muted rounded animate-pulse" />
          <div className="h-8 w-full bg-muted rounded animate-pulse" />
        </nav>
      </aside>
      
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-background px-6">
          <h1 className="text-sm font-medium">Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
