"use client";
import React from "react";
import { MessageSquare, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  userName: string;
  role: string;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}
const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Mensajes",
    icon: MessageSquare,
    href: "/chat",
  },
];
export const Sidebar: React.FC<SidebarProps> = ({
  userName,
  role,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) => {
  const pathname = usePathname();

  const roleDic: Record<string, string> = {
    ADMIN: "Administrador",
    AGENT: "Agente Inmobiliario",
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform lg:relative lg:translate-x-0 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 text-white mb-8">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold">ChatFlow</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "hover:bg-slate-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-semibold text-white truncate">
              {userName}
            </p>
            <p className="text-xs text-slate-500">
              {roleDic[role] || "Usuario"}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors text-slate-400 group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
