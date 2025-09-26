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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Upload } from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa";

import { DocumentsData, documentsSchema } from "@/lib/form-schema";

import { getDefaultValues } from "@/lib/get-default-values";
import { NavigationButtons } from "./navigation-buttons";
import { useCareer } from "@/contexts/career-provider";

export function DocumentsStep() {
  const { data } = useCareer();
  const form = useForm<DocumentsData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: { ...getDefaultValues(documentsSchema), ...data },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const { formState } = form; // ✅ destructure formState

  return (
    <Form {...form}>
      <form className="space-y-6">
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
                    Resume/CV Upload *
                  </CardTitle>
                  <CardDescription>
                    Upload your resume or CV (PDF, DOC, or DOCX format, max 5MB)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormControl>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        formState.errors.resume
                          ? "border-destructive"
                          : "border-border"
                      }`}
                    >
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        id="resume-upload"
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] || null)
                        }
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
        <NavigationButtons form={form} />
      </form>
    </Form>
  );
}
