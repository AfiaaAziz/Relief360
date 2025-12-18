import React, { useState, createContext, useContext } from "react";

const SelectContext = createContext();

const Select = ({ value, onValueChange, children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayLabel, setDisplayLabel] = useState("");
  const [placeholder, setPlaceholder] = useState("Select an option");
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const valueToLabelMap = React.useRef({});
  const buttonRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  // Extract labels and placeholder from children
  React.useEffect(() => {
    const map = {};
    let foundPlaceholder = "Select an option";
    
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // Check for SelectTrigger -> SelectValue with placeholder
        if (child.type === SelectTrigger && child.props.children) {
          const selectValue = React.Children.toArray(child.props.children).find(
            (c) => React.isValidElement(c) && c.type === SelectValue
          );
          if (selectValue && selectValue.props.placeholder) {
            foundPlaceholder = selectValue.props.placeholder;
          }
        }
        // Extract item labels
        if (child.type === SelectContent) {
          React.Children.forEach(child.props.children, (item) => {
            if (React.isValidElement(item) && item.type === SelectItem) {
              map[item.props.value] = item.props.children;
            }
          });
        }
      }
    });
    
    valueToLabelMap.current = map;
    setPlaceholder(foundPlaceholder);
    
    if (value && map[value]) {
      setDisplayLabel(map[value]);
    } else {
      setDisplayLabel("");
    }
  }, [children, value]);

  const handleSelect = (selectedValue, selectedLabel) => {
    setDisplayLabel(selectedLabel || selectedValue);
    if (onValueChange) {
      onValueChange(selectedValue);
    }
    setIsOpen(false);
  };

  // Calculate dropdown position based on available space
  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const dropdownHeight = 200; // maxHeight
      const minRequiredSpace = 250; // dropdown height + margin + buffer
      
      // Get the next element to check if dropdown would overlap
      const nextElement = buttonRef.current.closest('.select-container')?.nextElementSibling;
      let wouldOverlap = false;
      
      if (nextElement) {
        const nextElementRect = nextElement.getBoundingClientRect();
        const dropdownBottom = buttonRect.bottom + dropdownHeight + 8; // mt-2 = 8px
        wouldOverlap = dropdownBottom > nextElementRect.top;
      }
      
      // Check if there's enough space below and no overlap
      const hasEnoughSpaceBelow = spaceBelow >= minRequiredSpace && !wouldOverlap;
      
      // If not enough space below or would overlap, open upward
      if (!hasEnoughSpaceBelow || wouldOverlap) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.select-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <SelectContext.Provider value={{ value, onSelect: handleSelect, isOpen, setIsOpen }}>
      <div className="relative select-container" style={{ zIndex: isOpen ? 10 : 1 }}>
        <button
          ref={buttonRef}
          type="button"
          className="flex h-12 w-full items-center justify-between rounded-xl border-2 bg-white px-4 py-3 text-base font-medium ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
          style={{
            borderColor: '#e5e7eb'
          }}
          onClick={() => setIsOpen(!isOpen)}
          onFocus={(e) => {
            e.target.style.borderColor = '#16537e';
            e.target.style.boxShadow = '0 0 0 3px rgba(22, 83, 126, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.boxShadow = 'none';
          }}
          {...props}
        >
          <span className={displayLabel || value ? "text-gray-900" : "text-gray-500"}>
            {displayLabel || value || placeholder}
          </span>
          <svg
            className={`h-4 w-4 opacity-50 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div 
            ref={dropdownRef}
            className={`absolute z-[9999] w-full rounded-xl border-2 bg-white shadow-2xl ${
              dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
            style={{
              maxHeight: dropdownPosition === 'top' ? `${Math.min(200, buttonRef.current?.getBoundingClientRect().top - 20 || 200)}px` : '200px',
              overflowY: 'auto',
              overflowX: 'hidden',
              borderColor: '#16537e',
              scrollbarWidth: 'thin',
              scrollbarColor: '#16537e rgba(22, 83, 126, 0.1)',
              position: 'absolute'
            }}
          >
            <style>{`
              div::-webkit-scrollbar {
                width: 8px;
              }
              div::-webkit-scrollbar-track {
                background: rgba(22, 83, 126, 0.1);
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb {
                background: #16537e;
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: #6aa84f;
              }
            `}</style>
            <div className="py-1">{children}</div>
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = ({ children, ...props }) => {
  return React.cloneElement(children, props);
};

const SelectValue = ({ placeholder }) => {
  const context = useContext(SelectContext);
  if (!context) return <span>{placeholder || "Select an option"}</span>;
  
  // This component is used inside SelectTrigger, but the actual display
  // is handled by the Select component's button
  return null;
};

const SelectContent = ({ children }) => {
  return children;
};

const SelectItem = ({ children, value }) => {
  const context = useContext(SelectContext);
  
  if (!context) {
    return null;
  }

  const { onSelect, setIsOpen } = context;

  const handleClick = () => {
    if (onSelect) {
      onSelect(value, children);
    }
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="relative flex w-full cursor-pointer select-none items-center rounded-lg py-3 px-4 text-base font-medium outline-none transition-all duration-200"
      style={{
        background: 'transparent'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(22, 83, 126, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'transparent';
      }}
    >
      {children}
    </div>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
export default Select;
