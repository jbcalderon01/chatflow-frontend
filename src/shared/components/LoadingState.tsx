import React from "react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Cargando información...",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 w-full h-full min-h-[200px] ${className}`}
    >
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-slate-200"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-500 text-sm font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};
