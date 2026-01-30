"use client";
import React from "react";
import { MessageSquare, Menu, X } from "lucide-react";

interface MobileHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
          <MessageSquare className="w-4 h-4" />
        </div>
        <span className="font-bold text-slate-800">ChatFlow</span>
      </div>
      <button onClick={onToggle} className="p-2 text-slate-600">
        {isOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
};
