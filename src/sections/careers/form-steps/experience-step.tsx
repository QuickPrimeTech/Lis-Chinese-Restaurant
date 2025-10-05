"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { getDefaultValues } from "@/lib/get-default-values";
import { ExperienceData, experienceSchema } from "@/schemas/career-schema";
import { NavigationButtons } from "./navigation-buttons";
import { useCareer } from "@/contexts/career-provider";

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
  const { data } = useCareer();
  const form = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { ...getDefaultValues(experienceSchema), ...data },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position Applying For *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Years of experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Previous employment */}
        <FormField
          control={form.control}
          name="previousEmployment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Employment *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Tell us about your previous work experience in the restaurant industry"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Skills */}
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills & Expertise *</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={field.value?.includes(skill)}
                      onCheckedChange={(checked) => {
                        const newSkills = checked
                          ? [...field.value, skill]
                          : field.value.filter((s) => s !== skill);
                        field.onChange(newSkills);
                      }}
                    />
                    <label htmlFor={skill} className="text-sm font-normal">
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Languages */}
        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Languages Spoken</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {languageOptions.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={field.value?.includes(language)}
                      onCheckedChange={(checked) => {
                        const newLanguages = checked
                          ? [...field.value, language]
                          : field.value.filter((l) => l !== language);
                        field.onChange(newLanguages);
                      }}
                    />
                    <label htmlFor={language} className="text-sm font-normal">
                      {language}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <NavigationButtons form={form} />
      </form>
    </Form>
  );
}
