"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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

import { experienceSchema, ExperienceData } from "@/lib/form-schema";
import { getDefaultValues } from "@/lib/get-default-values";

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
  const form = useForm<ExperienceData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: getDefaultValues(experienceSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Position */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Applying For *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positions.map((pos) => (
                    <SelectItem key={pos} value={pos}>
                      {pos}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Years of Experience */}
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-3">2-3 years</SelectItem>
                  <SelectItem value="4-5">4-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Previous Employment */}
        <FormField
          control={form.control}
          name="previousEmployment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Previous Employment *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your previous work experience in the restaurant industry"
                  rows={4}
                  {...field}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {skillOptions.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={field.value.includes(skill)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, skill]);
                        } else {
                          field.onChange(
                            field.value.filter((s) => s !== skill)
                          );
                        }
                      }}
                    />
                    <FormLabel htmlFor={skill} className="text-sm font-normal">
                      {skill}
                    </FormLabel>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {languageOptions.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={field.value.includes(language)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, language]);
                        } else {
                          field.onChange(
                            field.value.filter((l) => l !== language)
                          );
                        }
                      }}
                    />
                    <FormLabel
                      htmlFor={language}
                      className="text-sm font-normal"
                    >
                      {language}
                    </FormLabel>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit (for step testing, remove if wrapped in multi-step) */}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
        >
          Continue
        </button>
      </form>
    </Form>
  );
}
