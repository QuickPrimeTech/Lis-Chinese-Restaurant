"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { validateDocuments } from "@/lib/form-validation";
import type { FormData } from "@/sections/careers/job-application-form";

// ✅ Lucide React + React Icons
import { Upload } from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa";

interface DocumentsStepProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function DocumentsStep({
  data,
  updateData,
  onValidationChange,
}: DocumentsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateDocuments({
      resume: data.resume,
      coverLetter: data.coverLetter,
    });

    setErrors(validation.errors);
    onValidationChange(validation.isValid);
  }, [data.resume, data.coverLetter]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateData({ resume: file });
  };

  return (
    <div className="space-y-6">
      {/* Resume Upload */}
      <div className="space-y-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-6 h-6 text-primary" />
              Resume/CV Upload *
            </CardTitle>
            <CardDescription>
              Upload your resume or CV (PDF, DOC, or DOCX format, max 5MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.resume ? "border-destructive" : "border-border"
              }`}
            >
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {data.resume ? (
                  <>
                    <FaRegFilePdf className="w-8 h-8 text-primary" />
                    <span className="font-medium">{data.resume.name}</span>
                    <span className="text-sm text-muted-foreground">
                      Click to change file
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="font-medium">
                      Click to upload your resume
                    </span>
                    <span className="text-sm text-muted-foreground">
                      or drag and drop your file here
                    </span>
                  </>
                )}
              </label>
            </div>
            {errors.resume && (
              <p className="text-sm text-destructive mt-2">{errors.resume}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cover Letter */}
      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter *</Label>
        <Textarea
          id="coverLetter"
          placeholder="Tell us why you want to work at Li's Chinese Restaurant and what makes you a great fit for our team..."
          rows={6}
          value={data.coverLetter}
          onChange={(e) => updateData({ coverLetter: e.target.value })}
          className={errors.coverLetter ? "border-destructive" : ""}
        />
        {errors.coverLetter && (
          <p className="text-sm text-destructive">{errors.coverLetter}</p>
        )}
      </div>

      {/* References */}
      <div className="space-y-2">
        <Label htmlFor="references">References</Label>
        <Textarea
          id="references"
          placeholder="Please provide contact information for 2-3 professional references (Name, Position, Company, Phone, Email)"
          rows={4}
          value={data.references}
          onChange={(e) => updateData({ references: e.target.value })}
        />
      </div>
    </div>
  );
}
