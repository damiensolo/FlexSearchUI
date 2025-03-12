import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  clearable?: boolean;
  debounceMs?: number;
  animateWidth?: boolean;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  onSearch,
  placeholder = "Search...",
  className,
  clearable = true,
  debounceMs = 300,
  animateWidth = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        onSearch?.(searchValue);
      }, debounceMs);
    },
    [onSearch, debounceMs],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    handleSearch("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={cn(
        "relative flex items-center rounded-3xl border border-2 border-gray-2000 bg-slate-100 shadow-sm", // input styling
        isFocused && "border-blue-500 ring-4 ring-blue-100", // focus ringed border
        className,
      )}
      animate={{
        width: animateWidth && isFocused ? "100%" : "100%", // width of the search input
      }}
      transition={{ duration: 0.2 }}
    >
      <Search
        className={cn(
          "ml-3 h-11 w-6 text-gray-800", // search icon - padding, height, width, color
          isFocused && "text-blue-700",
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-3 py-2 text-md outline-none placeholder:text-gray-400" // input text
        {...props}
      />
      <AnimatePresence>
        {clearable && value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="mr-2 rounded-full p-1 hover:bg-gray-100"
            type="button"
          >
            <X className="h-5 w-6 text-gray-600" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
