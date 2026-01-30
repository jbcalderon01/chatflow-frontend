"use client";
import React from "react";
import { useProjectView } from "@/features/projects/hooks/useProjectView";
import { ProjectGrid } from "@/features/projects/components/ProjectGrid";
import { StartConversationForm } from "@/features/projects/components/StartConversationForm";
import { WaitingState } from "@/features/projects/components/WaitingState";
import { LeadChatWindow } from "@/features/projects/components/LeadChatWindow";
import { X } from "lucide-react";
import { LoadingState } from "@/shared/components";

export const ProjectsView: React.FC = () => {
  const {
    state,
    messages,
    agentName,
    isTypingAgent,
    projects,
    isProjectsLoading,
    selectedProject,
    selectProject,
    resetChat,
    startChat,
    sendMessage,
    notifyTyping,
  } = useProjectView();

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased italic-none">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <header className="mb-16 text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Nuestros Proyectos
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Descubre propiedades exclusivas diseñadas para elevar tu estilo de
            vida. Selecciona un proyecto para hablar con un asesor hoy mismo.
          </p>
        </header>

        <main className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {isProjectsLoading ? (
            <LoadingState message="Cargando proyectos disponibles..." />
          ) : (
            <ProjectGrid projects={projects} onSelect={selectProject} />
          )}
        </main>
      </div>

      {/* Modal Flow */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl flex justify-center max-h-[90vh] overflow-y-auto outline-none animate-in zoom-in-95 duration-300">
            <button
              onClick={resetChat}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {state === "IDLE" || state === "SUBMITTING" ? (
              <StartConversationForm
                initialProject={selectedProject.id}
                onSubmit={startChat}
                isLoading={state === "SUBMITTING"}
                onCancel={resetChat}
              />
            ) : state === "WAITING" ? (
              <WaitingState />
            ) : (
              <LeadChatWindow
                messages={messages}
                agentName={agentName}
                project={selectedProject.name}
                isTyping={isTypingAgent}
                onSendMessage={sendMessage}
                onTyping={notifyTyping}
                onReset={resetChat}
              />
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 text-center opacity-40">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          ChatFlow © 2026
        </p>
      </footer>
    </div>
  );
};
