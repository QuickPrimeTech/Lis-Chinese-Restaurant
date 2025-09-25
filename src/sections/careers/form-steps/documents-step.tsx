"use client";

import { Upload } from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { documentsSchema, DocumentsData } from "@/lib/form-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getDefaultValues } from "@/lib/get-default-values";
import { useEffect } from "react";
import { useJobApplication } from "@/contexts/job-application";

export function DocumentsStep() {
  const { updateFormData } = useJobApplication();
  const form = useForm<DocumentsData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: getDefaultValues(documentsSchema),
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      updateFormData(values);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormData]);

  const handleFileChange =
    (onChange: (file: File | undefined) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      onChange(file);
    };

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Resume Upload */}
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-6 h-6 text-primary" />
                    Resume / CV Upload *
                  </CardTitle>
                  <CardDescription>
                    Upload your resume or CV (PDF, DOC, or DOCX format, max 5MB)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormControl>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        form.formState.errors.resume
                          ? "border-destructive"
                          : "border-border"
                      }`}
                    >
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange(field.onChange)}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        {field.value ? (
                          <>
                            <FaRegFilePdf className="w-8 h-8 text-primary" />
                            <span className="font-medium">
                              {field.value.name}
                            </span>
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
                  </FormControl>
                  <FormMessage />
                </CardContent>
              </Card>
            </FormItem>
          )}
        />

        {/* Cover Letter */}
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Letter *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us why you want to work at Li's Chinese Restaurant and what makes you a great fit for our team..."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* References */}
        <FormField
          control={form.control}
          name="references"
          render={({ field }) => (
            <FormItem>
              <FormLabel>References</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide contact information for 2-3 professional references (Name, Position, Company, Phone, Email)"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit (only for this step demo, can be removed in multi-step wrapper) */}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
        >
          Continue
        </button>
      </div>
    </Form>
  );
}
