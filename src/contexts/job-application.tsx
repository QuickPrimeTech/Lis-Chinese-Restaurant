"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  experienceSchema,
  availabilitySchema,
  documentsSchema,
  jobApplicationSchema,
  type FormData,
} from "@/lib/form-schema";
import { getDefaultValues } from "@/lib/get-default-values";

const stepSchemas = [
  personalInfoSchema,
  experienceSchema,
  availabilitySchema,
  documentsSchema,
];

interface JobApplicationContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  methods: UseFormReturn<FormData>;
  nextStep: () => Promise<void>;
}

const defaultFormData: FormData = {
  ...getDefaultValues(personalInfoSchema),
  ...getDefaultValues(experienceSchema),
  ...getDefaultValues(availabilitySchema),
  ...getDefaultValues(documentsSchema),
};

const JobApplicationContext = createContext<
  JobApplicationContextType | undefined
>(undefined);

export const JobApplicationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));

    // Update react-hook-form fields
    Object.entries(data).forEach(([key, value]) => {
      methods.setValue(key as keyof FormData, value as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    });
  };

  const resetFormData = () => {
    setFormData(defaultFormData);
    methods.reset(defaultFormData);
  };

  const nextStep = async () => {
    const currentSchema = stepSchemas[currentStep];
    const keys = Object.keys(currentSchema.shape) as (keyof FormData)[];
    const isValid = await methods.trigger(keys);
    if (isValid) setCurrentStep((s) => s + 1);
  };

  return (
    <JobApplicationContext.Provider
      value={{
        formData,
        updateFormData,
        resetFormData,
        currentStep,
        setCurrentStep,
        isSubmitting,
        setIsSubmitting,
        methods,
        nextStep,
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
};

export const useJobApplication = () => {
  const context = useContext(JobApplicationContext);
  if (!context)
    throw new Error(
      "useJobApplication must be used within a JobApplicationProvider"
    );
  return context;
};
