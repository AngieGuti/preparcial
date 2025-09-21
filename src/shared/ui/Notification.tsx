"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function Notification() {
  const { message, type, hideNotification } = useNotificationStore();

  // Ocultar la notificación después de 4 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, hideNotification]);

  if (!message){
    return null; // No renderizar nada si no hay mensaje
  }

  // Definir el color de fondo según el tipo de notificación, si es success es verde y si es error es rojo
  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";

  // Notificación fija en la esquina superior derecha
  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-lg text-white shadow-lg ${bgColor} z-50`}
    >
      {message}
    </div>
  );
}
