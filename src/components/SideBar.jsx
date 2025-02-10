import { useEffect, useState } from "react";
import { FaFileAlt, FaEye, FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const location = useLocation(); // 🔹 Ambil path saat ini

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isSidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg p-4 flex flex-col transition-all duration-300 z-20 ${
          isSidebarOpen ? "w-64 absolute sm:relative" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4 p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ☰
        </button>
        <nav className="flex flex-col space-y-2">
          {[
            { icon: <FaFileAlt />, label: "All Posts", link: "/" },
            { icon: <FaEye />, label: "Preview", link: "/preview" },
            { icon: <FaPlus />, label: "Add New", link: "/article" },
          ].map((item, index) => {
            const isActive = location.pathname === item.link; // 🔹 Cek apakah aktif
            return (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center space-x-2 p-2 rounded transition-all ${
                  isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
