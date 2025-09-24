"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { validateExperience } from "@/lib/form-validation";
import type { FormData } from "@/sections/careers/job-application-form";

interface ExperienceStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

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

export function ExperienceStep({
  data,
  updateData,
  onValidationChange,
}: ExperienceStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateExperience({
      position: data.position,
      experience: data.experience,
      previousEmployment: data.previousEmployment,
      skills: data.skills,
    });

    setErrors(validation.errors);
    onValidationChange(validation.isValid);
  }, [data.position, data.experience, data.previousEmployment, data.skills]);

  const handleSkillChange = (skill: string, checked: boolean) => {
    const updatedSkills = checked
      ? [...data.skills, skill]
      : data.skills.filter((s) => s !== skill);
    updateData({ skills: updatedSkills });
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    const updatedLanguages = checked
      ? [...data.languages, language]
      : data.languages.filter((l) => l !== language);
    updateData({ languages: updatedLanguages });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="position">Position Applying For *</Label>
        <Select
          value={data.position}
          onValueChange={(value) => updateData({ position: value })}
        >
          <SelectTrigger
            className={errors.position ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select a position" />
          </SelectTrigger>
          <SelectContent>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.position && (
          <p className="text-sm text-destructive">{errors.position}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience *</Label>
        <Select
          value={data.experience}
          onValueChange={(value) => updateData({ experience: value })}
        >
          <SelectTrigger
            className={errors.experience ? "border-destructive" : ""}
          >
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
        {errors.experience && (
          <p className="text-sm text-destructive">{errors.experience}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="previousEmployment">Previous Employment *</Label>
        <Textarea
          id="previousEmployment"
          placeholder="Tell us about your previous work experience in the restaurant industry"
          rows={4}
          value={data.previousEmployment}
          onChange={(e) => updateData({ previousEmployment: e.target.value })}
          className={errors.previousEmployment ? "border-destructive" : ""}
        />
        {errors.previousEmployment && (
          <p className="text-sm text-destructive">
            {errors.previousEmployment}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Skills & Expertise *</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillOptions.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <Checkbox
                id={skill}
                checked={data.skills.includes(skill)}
                onCheckedChange={(checked) =>
                  handleSkillChange(skill, checked as boolean)
                }
              />
              <Label htmlFor={skill} className="text-sm font-normal">
                {skill}
              </Label>
            </div>
          ))}
        </div>
        {errors.skills && (
          <p className="text-sm text-destructive">{errors.skills}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label>Languages Spoken</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languageOptions.map((language) => (
            <div key={language} className="flex items-center space-x-2">
              <Checkbox
                id={language}
                checked={data.languages.includes(language)}
                onCheckedChange={(checked) =>
                  handleLanguageChange(language, checked as boolean)
                }
              />
              <Label htmlFor={language} className="text-sm font-normal">
                {language}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
