import React from "react";
import { useToast } from "../../hooks/use-toast";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const ToastComponent = ({ toast, onDismiss }) => {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-white" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-white" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-white" />;
      default:
        return <Info className="h-5 w-5 text-white" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-yellow-600";
      default:
        return "bg-blue-600";
    }
  };

  // Auto-dismiss after 4 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  // Don't render if toast is dismissed
  if (toast.open === false) {
    return null;
  }

  return (
    <div
      className={`flex items-center p-4 mb-3 rounded-lg shadow-lg animate-slide-in ${getBackgroundColor()} text-white`}
      style={{
        maxWidth: "400px",
        minWidth: "320px",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div className="flex-shrink-0 mr-3">{getIcon()}</div>
      <div className="flex-1">
        {toast.title && (
          <p className="text-sm font-semibold text-white mb-1">{toast.title}</p>
        )}
        {toast.description && (
          <p className="text-sm text-white opacity-90">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 ml-3 text-white opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const Toaster = () => {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50"
      style={{
        zIndex: 9999,
      }}
    >
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export { Toaster };
