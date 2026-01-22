import SidebarNotes from './@sidebar/SidebarNotes';
import type { ReactNode } from 'react';

export default function FilterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0 bg-gray-100">
        <SidebarNotes />
      </aside>
      
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
