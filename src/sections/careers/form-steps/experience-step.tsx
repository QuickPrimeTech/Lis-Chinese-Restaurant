"use client";

import { useFormContext, Controller } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { useJobApplication } from "@/contexts/job-application";
import type { FormData } from "@/lib/form-schema";

const positions = [
  "Head Chef",
  "Sous Chef",
  "Line Cook",
  "Prep Cook",
  "Server",
  "Host/Hostess",
  "Bartender",
  "Dishwasher",
  "Manager",
  "Other",
];

const skillOptions = [
  "Chinese Cuisine",
  "Wok Cooking",
  "Dim Sum Preparation",
  "Knife Skills",
  "Food Safety",
  "Customer Service",
  "Cash Handling",
  "Team Leadership",
  "Inventory Management",
  "Food Presentation",
];

const languageOptions = [
  "English",
  "Mandarin",
  "Cantonese",
  "Swahili",
  "Hindi",
  "Other",
];

export function ExperienceStep() {
  const { control, getValues, setValue } = useFormContext<FormData>();
  const { updateFormData } = useJobApplication();

  const handleBlur = (fieldName: keyof FormData) => {
    const value = getValues(fieldName);
    updateFormData({ [fieldName]: value });
  };

  return (
    <div className="space-y-6">
      {/* Position */}
      <FormField
        control={control}
        name="position"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Position Applying For *</FormLabel>
            <FormControl>
              <Select
                value={field.value ?? ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  handleBlur("position");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Years of Experience */}
      <FormField
        control={control}
        name="experience"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Years of Experience *</FormLabel>
            <FormControl>
              <Select
                value={field.value ?? ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  handleBlur("experience");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="4-5">4-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Previous Employment */}
      <FormField
        control={control}
        name="previousEmployment"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Previous Employment *</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                rows={4}
                placeholder="Tell us about your previous work experience in the restaurant industry"
                onBlur={() => handleBlur("previousEmployment")}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Skills */}
      <FormField
        control={control}
        name="skills"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Skills & Expertise *</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={field.value?.includes(skill) ?? false}
                    onCheckedChange={(checked) => {
                      const newSkills = checked
                        ? [...(field.value ?? []), skill]
                        : (field.value ?? []).filter((s) => s !== skill);
                      field.onChange(newSkills);
                      handleBlur("skills");
                    }}
                  />
                  <FormLabel htmlFor={skill} className="text-sm font-normal">
                    {skill}
                  </FormLabel>
                </div>
              ))}
            </div>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Languages */}
      <FormField
        control={control}
        name="languages"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Languages Spoken</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {languageOptions.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={language}
                    checked={field.value?.includes(language) ?? false}
                    onCheckedChange={(checked) => {
                      const newLanguages = checked
                        ? [...(field.value ?? []), language]
                        : (field.value ?? []).filter((l) => l !== language);
                      field.onChange(newLanguages);
                      handleBlur("languages");
                    }}
                  />
                  <FormLabel htmlFor={language} className="text-sm font-normal">
                    {language}
                  </FormLabel>
                </div>
              ))}
            </div>
            <FormMessage>{fieldState?.error?.message}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
