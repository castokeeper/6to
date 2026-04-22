import { Outlet } from "react-router";
import { BottomNav } from "./ui/BottomNav";

// Layout principal para iPhone (390x844)
export function MobileLayout() {
  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      {/* Container con constraints de iPhone 14/15 */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-white relative">
        {/* Contenido con padding bottom para el nav */}
        <div className="pb-16">
          <Outlet />
        </div>
        
        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
