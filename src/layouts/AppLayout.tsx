import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <main className="mx-auto container min-h-screen">
        <Header />
        {/* body */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-400">
        <p>© 2025 Shortly. Bikin link kamu lebih ringkas dan powerful ✨</p>
      </footer>
    </div>
  );
}

export default AppLayout;
