"use client";

import { supabase } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { ApplicationData } from "@/schemas/career-schema";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Upload, Loader } from "lucide-react";

type CareerContextType = {
  data: Partial<ApplicationData>;
  updateData: (data: Partial<ApplicationData>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  submitApplication: () => void;
  isSubmitting: boolean;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

const CareerContext = createContext<CareerContextType | undefined>(undefined);

const STORAGE_KEY = "career-application";

export function CareerProvider({ children }: { children: ReactNode }) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🧠 Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, currentStep }));
  }, [data, currentStep]);

  const updateData = (newData: Partial<ApplicationData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  // 📂 Upload CV to Supabase
  const uploadCV = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;

    const toastId = toast.loading("Uploading CV...");

    try {
      const { error } = await supabase.storage
        .from("cvs")
        .upload(fileName, file);
      if (error) throw error;

      const { data: signed } = await supabase.storage
        .from("cvs")
        .createSignedUrl(fileName, 60 * 60 * 24 * 7);

      toast.dismiss(toastId);
      toast.success("CV uploaded successfully!");

      return signed?.signedUrl || null;
    } catch (error) {
      console.error("Upload failed:", error);
      toast.dismiss(toastId);
      toast.error("Failed to upload CV. Please try again.", {
        icon: <XCircle className="w-4 h-4 text-red-500" />,
      });
      return null;
    }
  };

  // 🚀 Submit Application
  const submitApplication = async () => {
    setIsSubmitting(true);

    const toastId = toast.loading("Submitting your application...");

    try {
      let cvUrl = data.cvUrl ?? "";
      if (data.resume instanceof File) {
        const uploadedUrl = await uploadCV(data.resume);
        if (uploadedUrl) cvUrl = uploadedUrl;
      }

      const payload = { ...data, cvUrl };
      const res = await fetch("/api/notifications/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      toast.dismiss(toastId);

      if (!res.ok) {
        toast.error("Submission failed", {
          description:
            responseData.error || "An error occurred during submission.",
          icon: <XCircle className="w-4 h-4 text-red-500" />,
        });
        throw new Error(responseData.error || "Submission failed");
      }

      toast.success("Application sent successfully!", {
        description:
          "We’ve received your application and will contact you soon.",
      });

      localStorage.removeItem(STORAGE_KEY);
      setData({});
      nextStep();
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error);
      toast.dismiss(toastId);
      toast.error("Something went wrong.", {
        description: error.message || "Please try again later.",
        icon: <XCircle className="w-4 h-4 text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
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
        isSubmitting,
        setCurrentStep,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
}

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareer must be used within CareerProvider");
  }
  return context;
};
