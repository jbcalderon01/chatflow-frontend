"use client";
import React from "react";
import { Project } from "@/shared/api";
import { Building, ArrowRight, MessageCircle } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (p: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-indigo-600 uppercase tracking-widest ">
          $ {project.price}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Building className="w-4 h-4 text-indigo-500" />
          <h3 className="text-lg font-bold text-slate-800">{project.name}</h3>
        </div>

        <p className="text-sm text-slate-500 mb-6 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto flex gap-2">
          <button
            onClick={() => onSelect(project)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 active:scale-95"
          >
            Chat con Asesor
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
          <button className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-xl transition-all">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProjectGridProps {
  projects: Project[];
  onSelect: (p: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onSelect={onSelect} />
      ))}
    </div>
  );
};
