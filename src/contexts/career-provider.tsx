"use client";

import { ApplicationData } from "@/lib/form-schema";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type CareerContextType = {
  data: Partial<ApplicationData>;
  updateData: (data: Partial<ApplicationData>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  submitApplication: () => void;
};

const CareerContext = createContext<CareerContextType | undefined>(undefined);

type CareerProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "career-application";

export function CareerProvider({ children }: CareerProviderProps) {
  // Load saved state from localStorage
  const [data, setData] = useState<Partial<ApplicationData>>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.data || {};
        } catch {
          return {};
        }
      }
    }
    return {};
  });

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.currentStep ?? 0;
        } catch {
          return 0;
        }
      }
    }
    return 0;
  });

  // Persist both data and currentStep
  useEffect(() => {
    const stored = { data, currentStep };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [data, currentStep]);

  // Update form data
  const updateData = (newData: Partial<ApplicationData>) => {
    setData((prev) => ({ ...prev, ...newData }));
    console.log("Updated data --->", newData);
  };

  // Navigation
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  // Submit form
  const submitApplication = () => {
    console.log("Form is being submitted...", data);

    // Clear storage after submit
    localStorage.removeItem(STORAGE_KEY);
    setData({});
    setCurrentStep(0);
  };

  return (
    <CareerContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        nextStep,
        prevStep,
        submitApplication,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareer must be used inside the CareerProvider");
  }
  return context;
};
