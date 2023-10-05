import React from "react";

export const ToastContext = React.createContext();

export function useToastContext() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  return context;
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toast) => {
    setToasts((state) => [...state, { ...toast, id: crypto.randomUUID() }]);
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = React.useMemo(() => {
    return { toasts, addToast, removeToast };
  }, [addToast, removeToast, toasts]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}
