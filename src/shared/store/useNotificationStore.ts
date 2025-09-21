import { create } from "zustand";

// Definimos el estado y las acciones para manejar notificaciones
interface NotificationState {
  message: string | null;
  type: "success" | "error" | null;
  showNotification: (message: string, type: "success" | "error") => void;
  hideNotification: () => void;
}

// Creamos el store usando zustand globalmente para manejar notificaciones
export const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  type: null,
  showNotification: (message, type) => set({ message, type }),
  hideNotification: () => set({ message: null, type: null }),
}));
