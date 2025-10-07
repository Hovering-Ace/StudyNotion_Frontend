import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from 'lucide-react';

// Context
const AccordionContext = createContext(null);

const useAccordion = function() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

// Accordion
export const Accordion = ({
  children,
  defaultOpen,
  allowMultiple = false,
  className = "",
}) => {
  const [activeItems, setActiveItems] = React.useState(
    defaultOpen ? [defaultOpen] : []
  );

  const toggleItem = (id) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  const isItemActive = (id) => activeItems.includes(id);

  return (
    <AccordionContext.Provider value={{ activeItems, toggleItem, isItemActive }}>
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

// AccordionItem
export const AccordionItem = ({ id, children, className = "" }) => {
  return (
    <div className={`overflow-hidden  border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// AccordionHeader
export const AccordionHeader = ({
  itemId,
  children,
  className = "",
  icon,
  iconPosition = "right",
}) => {
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  

  const handleClick = () => {
    toggleItem(itemId);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full px-2 py-1 text-left
        focus:outline-none rounded-xl bg-gradient-to-b from-caribbeangreen-500 to-white text-richblack-900
        transition-colors duration-200 flex items-center justify-between cursor-pointer
        ${className}
      `}
    >
      <div className="flex items-center space-x-2">
        {iconPosition === "left" && (icon || <ChevronDown />)}
        <div className="flex-1">{children}</div>
      </div>
      {iconPosition === "right" && (icon || <ChevronDown />)}
    </button>
  );
};

// AccordionContent
export const AccordionContent = ({ itemId, children, className = "" }) => {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isActive ? "max-h-fit opacity-100" : "max-h-0 opacity-0"}
        ${className}
      `}
    >
      <div className="">{children}</div>
    </div>
  );
};
