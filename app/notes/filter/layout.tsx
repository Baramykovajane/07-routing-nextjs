import SidebarNotes from './@sidebar/SidebarNotes';
import type { ReactNode } from 'react';

export default function FilterLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SidebarNotes />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
