"use client";
import React from "react";
import { User, Mail, Phone, Building, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const startConversationSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Teléfono inválido"),
  project: z.string().min(1, "Selecciona un proyecto"),
  message: z.string().min(5, "El mensaje es muy corto"),
});

// ... implicit code ...

// ... inside RETURN JSX, restore the message block

// ... (StartConversationValues type and FormProps remain implicit/autocreated or same)

// ... inside the component
// Remove the message textarea block

type StartConversationValues = z.infer<typeof startConversationSchema>;

interface StartConversationFormProps {
  initialProject?: string;
  onSubmit: (data: StartConversationValues) => void;
  isLoading: boolean;
  onCancel?: () => void;
}

export const StartConversationForm: React.FC<StartConversationFormProps> = ({
  initialProject = "",
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StartConversationValues>({
    resolver: zodResolver(startConversationSchema),
    defaultValues: {
      project: initialProject,
    },
  });

  const onFormSubmit = (data: StartConversationValues) => {
    onSubmit(data);
  };
  return (
    <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100">
      <div className="bg-indigo-600 p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Comienza ahora</h2>
        <p className="text-indigo-100 opacity-90">
          Completa el formulario para conectarte con un asesor experto.
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="p-8 space-y-5">
        <input type="hidden" {...register("project")} />
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Nombre Completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                {...register("name")}
                disabled={isLoading}
                type="text"
                placeholder="Ej. Juan Pérez"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                  errors.name ? "border-red-500" : "border-slate-100"
                } rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500 italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                {...register("email")}
                disabled={isLoading}
                type="email"
                placeholder="juan@ejemplo.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                  errors.email ? "border-red-500" : "border-slate-100"
                } rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 italic">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                {...register("phone")}
                disabled={isLoading}
                type="tel"
                placeholder="+57 3..."
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                  errors.phone ? "border-red-500" : "border-slate-100"
                } rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500 italic">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Mensaje Inicial
          </label>
          <textarea
            {...register("message")}
            disabled={isLoading}
            placeholder="¿En qué podemos ayudarte?"
            rows={3}
            className={`w-full p-4 bg-slate-50 border ${
              errors.message ? "border-red-500" : "border-slate-100"
            } rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none disabled:opacity-50`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500 italic">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={
              onCancel
                ? "flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-70"
                : "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-indigo-600"
            }
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Empezar Chat
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
