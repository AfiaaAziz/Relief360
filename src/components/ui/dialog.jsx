import React, { useEffect, useState } from "react";

const Dialog = ({ open: controlledOpen, onOpenChange, children }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, setIsOpen]);

  // Check if DialogTrigger pattern is being used
  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(
    (child) => React.isValidElement(child) && child.type?.displayName === "DialogTrigger"
  );
  const content = childrenArray.find(
    (child) => React.isValidElement(child) && child.type?.displayName === "DialogContent"
  );

  // If DialogTrigger pattern is used
  if (trigger || (controlledOpen === undefined && childrenArray.length > 1)) {
    return (
      <>
        {trigger &&
          React.cloneElement(trigger, { 
            onClick: () => setIsOpen(true),
            ...trigger.props 
          })}
        {isOpen && (
          <div 
            className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto"
            style={{ 
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            onClick={() => setIsOpen(false)}
          >
            {content &&
              React.cloneElement(content, { 
                onClose: () => setIsOpen(false),
                ...content.props 
              })}
          </div>
        )}
      </>
    );
  }

  // Controlled pattern (open/onOpenChange)
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ 
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: 9999 }}
        onClick={() => setIsOpen(false)}
      />
      <div 
        className="relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4"
        style={{ zIndex: 10000 }}
      >
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = "", onClose, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const header = childrenArray.find(
    (child) => React.isValidElement(child) && child.type?.displayName === "DialogHeader"
  );
  const otherChildren = childrenArray.filter(
    (child) => !(React.isValidElement(child) && child.type?.displayName === "DialogHeader")
  );

  return (
    <div
      className={`bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 flex flex-col relative my-auto ${className}`}
      style={{ 
        zIndex: 10000,
        position: 'relative',
        margin: 'auto',
        maxHeight: 'calc(100vh - 4rem)',
        maxWidth: '32rem'
      }}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          style={{ zIndex: 10001 }}
        >
          ✕
        </button>
      )}
      <div className="flex-shrink-0">
        {header}
      </div>
      <div className="p-6 overflow-y-auto flex-1 min-h-0" style={{ maxHeight: 'calc(100vh - 12rem)' }}>{otherChildren}</div>
    </div>
  );
};
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ children, className = "" }) => {
  return <div className={`p-6 border-b border-gray-100 ${className}`}>{children}</div>;
};
DialogHeader.displayName = "DialogHeader";

const DialogTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};
DialogTitle.displayName = "DialogTitle";

const DialogDescription = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
};
DialogDescription.displayName = "DialogDescription";

const DialogFooter = ({ children, className = "" }) => {
  return (
    <div className={`flex justify-end gap-2 mt-6 ${className}`}>{children}</div>
  );
};
DialogFooter.displayName = "DialogFooter";

const DialogTrigger = ({ children, asChild, onClick, ...props }) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick, ...props });
  }
  return (
    <div onClick={onClick} {...props}>
      {children}
    </div>
  );
};
DialogTrigger.displayName = "DialogTrigger";

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
};
