import { Outlet, Link, useLocation } from "react-router";
import { Home, PlusSquare, User } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-full" />
            <span className="text-sm tracking-[0.2em] uppercase font-light">Curate</span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm tracking-wide transition-colors ${
                isActive("/") && !isActive("/post") && !isActive("/compose") && !isActive("/profile")
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              feed
            </Link>
            <Link
              to="/compose"
              className={`text-sm tracking-wide transition-colors ${
                isActive("/compose") ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              compose
            </Link>
            <Link
              to="/profile"
              className={`text-sm tracking-wide transition-colors ${
                isActive("/profile") ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-neutral-100 z-50">
        <div className="flex items-center justify-around h-16 px-4">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 ${
              isActive("/") && !isActive("/post") && !isActive("/compose") && !isActive("/profile")
                ? "text-neutral-900"
                : "text-neutral-400"
            }`}
          >
            <Home size={20} />
            <span className="text-[10px] tracking-wider uppercase">Feed</span>
          </Link>
          <Link
            to="/compose"
            className={`flex flex-col items-center gap-1 ${
              isActive("/compose") ? "text-neutral-900" : "text-neutral-400"
            }`}
          >
            <PlusSquare size={20} />
            <span className="text-[10px] tracking-wider uppercase">New</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 ${
              isActive("/profile") ? "text-neutral-900" : "text-neutral-400"
            }`}
          >
            <User size={20} />
            <span className="text-[10px] tracking-wider uppercase">You</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
