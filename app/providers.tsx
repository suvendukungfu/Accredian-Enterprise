"use client";

import React, { createContext, useContext, useState } from "react";
import { Toast } from "@/components/common/Toast";

interface ToastState {
  isVisible: boolean;
  message: string;
  type: "success" | "error";
}

interface AppContextType {
  showToast: (message: string, type?: "success" | "error") => void;
  isLeadModalOpen: boolean;
  openLeadModal: () => void;
  closeLeadModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 4000);
  };

  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        showToast,
        isLeadModalOpen,
        openLeadModal,
        closeLeadModal,
      }}
    >
      {children}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
