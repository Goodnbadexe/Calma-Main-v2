You are tasked with integrating an existing React component bundle into the codebase.

The codebase should support:
- React with TypeScript
- Tailwind CSS (v3 or v4)
- Modern build tools (Vite/Next.js)

If your project doesn't support these, provide instructions on how to set them up.

IMPORTANT: The App.tsx file is a showcase/example demonstrating the component usage. You should:
1. Analyze the App component to understand how all the pieces work together
2. Review the supporting components and utilities 
3. Integrate the relevant parts into your project structure
4. Adapt the implementation to match your project's patterns and requirements

## Installation

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

## Styles

### index.css

```css
/* This is Tailwind 4 CSS file */
/* Extending Tailwind configuration */
/* Use shadcn/ui format to extend the configuration */
/* Add only the styles that your component needs */

/* Base imports */
@import "tailwindcss";
@import "tw-animate-css";

/* Custom dark variant for targeting dark mode elements */
@custom-variant dark (&:is(.dark *));

/* CSS variables and theme definitions */
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

/* Light theme variables */
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

/* Dark theme variables */
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

/* Tailwind base styles */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```


## Component Files

### lib/utils.ts

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

### components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

### components/ui/input.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

### components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

### App.tsx

```tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Sparkles,
  Eye,
  Award
} from "lucide-react";

// Spinner Component
interface SpinnerProps {
  size?: number;
  color?: string;
}

const bars = [
  { animationDelay: "-1.2s", transform: "rotate(.0001deg) translate(146%)" },
  { animationDelay: "-1.1s", transform: "rotate(30deg) translate(146%)" },
  { animationDelay: "-1.0s", transform: "rotate(60deg) translate(146%)" },
  { animationDelay: "-0.9s", transform: "rotate(90deg) translate(146%)" },
  { animationDelay: "-0.8s", transform: "rotate(120deg) translate(146%)" },
  { animationDelay: "-0.7s", transform: "rotate(150deg) translate(146%)" },
  { animationDelay: "-0.6s", transform: "rotate(180deg) translate(146%)" },
  { animationDelay: "-0.5s", transform: "rotate(210deg) translate(146%)" },
  { animationDelay: "-0.4s", transform: "rotate(240deg) translate(146%)" },
  { animationDelay: "-0.3s", transform: "rotate(270deg) translate(146%)" },
  { animationDelay: "-0.2s", transform: "rotate(300deg) translate(146%)" },
  { animationDelay: "-0.1s", transform: "rotate(330deg) translate(146%)" }
];

const Spinner = ({ size = 20, color = "#8f8f8f" }: SpinnerProps) => {
  return (
    <div style={{ width: size, height: size }}>
      <style jsx>{`
        @keyframes spin {
          0% { opacity: 0.15; }
          100% { opacity: 1; }
        }
      `}</style>
      <div className="relative top-1/2 left-1/2" style={{ width: size, height: size }}>
        {bars.map((item) => (
          <div
            key={item.transform}
            className="absolute h-[8%] w-[24%] -left-[10%] -top-[3.9%] rounded-[5px]"
            style={{ backgroundColor: color, animation: "spin 1.2s linear infinite", ...item }}
          />
        ))}
      </div>
    </div>
  );
};

// Button Component
const sizes = [
  { tiny: "px-1.5 h-6 text-sm", small: "px-1.5 h-8 text-sm", medium: "px-2.5 h-10 text-sm", large: "px-3.5 h-12 text-base" },
  { tiny: "w-6 h-6 text-sm", small: "w-8 h-8 text-sm", medium: "w-10 h-10 text-sm", large: "w-12 h-12 text-base" }
];

const types = {
  primary: "bg-[#171717] dark:bg-[#ededed] hover:bg-[#383838] dark:hover:bg-[#cccccc] text-white dark:text-[#0a0a0a] fill-white dark:fill-[#0a0a0a]",
  secondary: "bg-white dark:bg-[#171717] hover:bg-[#00000014] dark:hover:bg-[#ffffff17] text-[#171717] dark:text-[#ededed] fill-[#171717] dark:fill-[#ededed] border border-[#00000014] dark:border-[#ffffff24]",
  tertiary: "bg-white dark:bg-[#171717] hover:bg-[#00000014] dark:hover:bg-[#ffffff17] text-[#171717] dark:text-[#ededed] fill-[#171717] dark:fill-[#ededed]",
  error: "bg-[#ea001d] dark:bg-[#e2162a] hover:bg-[#ae292f] dark:hover:bg-[#ff565f] text-[#f5f5f5] dark:text-white fill-[#f5f5f5] dark:fill-white",
  warning: "bg-[#ff9300] hover:bg-[#d27504] text-[#0a0a0a] fill-[#0a0a0a]"
};

interface ButtonProps {
  size?: keyof typeof sizes[0];
  type?: keyof typeof types;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Button = ({
  size = "medium",
  type = "primary",
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`flex justify-center items-center gap-0.5 duration-150 rounded-md ${sizes[0][size]} ${
        disabled || loading
          ? "bg-[#f2f2f2] dark:bg-[#1a1a1a] text-[#8f8f8f] fill-[#8f8f8f] border border-[#ebebeb] dark:border-[#2e2e2e] cursor-not-allowed"
          : types[type]
      }${fullWidth ? " w-full" : ""}`}
      {...rest}
    >
      {loading ? <Spinner size={size === "large" ? 24 : 16} /> : children}
    </button>
  );
};

// Checkbox Component
interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const getInputClasses = (checked: boolean, disabled: boolean) => {
  let className = "relative border w-4 h-4 duration-200 rounded inline-flex items-center justify-center";
  if (disabled) {
    if (!checked) {
      className += " bg-gray-100 border-gray-500 fill-gray-100 stroke-gray-100";
    } else {
      className += " bg-gray-600 border-gray-600 fill-gray-600 stroke-gray-100";
    }
  } else {
    if (!checked) {
      className += " bg-background border-gray-700 group-hover:bg-gray-200 fill-background stroke-background group-hover:stroke-gray-200 group-hover:fill-gray-200";
    } else {
      className += " bg-gray-1000 border-gray-1000 fill-gray-1000 stroke-gray-100";
    }
  }
  return className;
};

const Checkbox = ({ checked = false, onChange, disabled = false, children }: CheckboxProps) => {
  return (
    <div
      className={`flex items-center cursor-pointer text-[13px] font-sans group ${disabled ? "text-gray-500" : "text-gray-1000 dark:text-white"}`}
      onClick={() => onChange && onChange(!checked)}
    >
      <input
        disabled={disabled}
        type="checkbox"
        checked={checked}
        className="absolute w-[1px] h-[1px] p-0 overflow-hidden whitespace-nowrap border-none"
      />
      <span className={getInputClasses(checked, disabled)}>
        <svg className="shrink-0" height="16" viewBox="0 0 20 20" width="16">
          <path d="M14 7L8.5 12.5L6 10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      </span>
      <span className="ml-2">{children}</span>
    </div>
  );
};

// Main Component
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  propertyType: string;
  budgetRange: string;
  timeline: string;
  additionalInfo: string;
  newsletter: boolean;
  updates: boolean;
  agreeToTerms: boolean;
}

const RegisterInterest = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    propertyType: "",
    budgetRange: "",
    timeline: "",
    additionalInfo: "",
    newsletter: false,
    updates: false,
    agreeToTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const benefits = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Exclusive Access",
      description: "Be the first to know about new luxury properties and investment opportunities before they go public."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personalized Service",
      description: "Receive tailored recommendations based on your preferences and investment goals."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Market Insights",
      description: "Get exclusive market reports, trends analysis, and investment insights from our experts."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "VIP Events",
      description: "Invitations to exclusive property viewings, launch events, and networking opportunities."
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardContent className="p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Welcome to CALMA!</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for registering your interest. Our team will contact you shortly with exclusive opportunities tailored to your preferences.
              </p>
              <Button onClick={() => setSubmitted(false)} size="large">
                Register Another Interest
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Exclusive Opportunity</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Register Your Interest
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Join the exclusive CALMA community and be the first to discover our luxury real estate opportunities.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-2">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Tell Us About Yourself</h2>
                    <p className="text-sm text-muted-foreground">
                      Help us understand your preferences to provide personalized recommendations
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        First Name<span className="text-destructive">*</span>
                      </label>
                      <Input
                        required
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        Last Name<span className="text-destructive">*</span>
                      </label>
                      <Input
                        required
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        Email Address<span className="text-destructive">*</span>
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+966 5X XXX XXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City</label>
                      <Input
                        placeholder="Enter your city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country</label>
                      <Input
                        placeholder="Select your country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Property Type of Interest</label>
                      <Input
                        placeholder="Select property type"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Budget Range</label>
                      <Input
                        placeholder="Select budget range"
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Purchase Timeline</label>
                      <Input
                        placeholder="Select timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Information</label>
                    <Textarea
                      placeholder="Tell us more about your requirements, preferences, or any specific questions you have..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      className="min-h-32 resize-none"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4 pt-4 border-t">
                    <Checkbox
                      checked={formData.newsletter}
                      onChange={(checked) => setFormData({ ...formData, newsletter: checked })}
                    >
                      Subscribe to our newsletter for market insights and exclusive opportunities
                    </Checkbox>
                    <Checkbox
                      checked={formData.updates}
                      onChange={(checked) => setFormData({ ...formData, updates: checked })}
                    >
                      Receive updates about new projects and investment opportunities
                    </Checkbox>
                    <Checkbox
                      checked={formData.agreeToTerms}
                      onChange={(checked) => setFormData({ ...formData, agreeToTerms: checked })}
                    >
                      I agree to the Privacy Policy and Terms of Service<span className="text-destructive">*</span>
                    </Checkbox>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="primary"
                      size="large"
                      fullWidth
                      loading={loading}
                      disabled={!formData.agreeToTerms}
                    >
                      Register Your Interest
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      By submitting this form you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6">
            <Card className="shadow-xl border-2 sticky top-6">
              <CardHeader className="border-b bg-muted/30">
                <h3 className="text-xl font-bold">Why Register with CALMA?</h3>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterInterest;

```


## Tailwind Configuration

Add the following global styles:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
```

Custom colors detected: gradient-to-br, muted-foreground, gradient-to-b, grid-pattern, gradient-to-r, clip-text, card-foreground, primary-foreground
Make sure these are defined in your Tailwind configuration.


## Integration Instructions

1. Review the App.tsx component to understand the complete implementation
2. Identify which components and utilities you need for your use case
3. Analyze the Tailwind v4 styles in index.css - integrate custom styles that differ from integrating Codebase
4. Install the required NPM dependencies listed above
5. Integrate the components into your project, adapting them to fit your architecture

Focus on:
- Understanding projects structure, adding above components into it
- Understanding the component composition
- Identifying reusable utilities and helpers
- Adapting the styling to match your design system