import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  error?: string;
}

export function SearchField({
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  isLoading = false,
  className,
  error
}: SearchFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(localValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange?.("");
  };

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center",
          className
        )}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg",
            "bg-gradient-to-r from-primary/10 to-primary/5",
            "transition-opacity duration-300",
            isFocused ? "opacity-100" : "opacity-0"
          )}
          layoutId="searchBackground"
        />
        
        <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        
        <Input
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-10 h-12",
            "bg-background/50 backdrop-blur-sm",
            "border-2 transition-colors duration-300",
            isFocused ? "border-primary" : "border-input",
            error && "border-destructive",
          )}
        />

        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3"
            >
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </motion.div>
          ) : localValue && (
            <motion.button
              type="button"
              onClick={handleClear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
