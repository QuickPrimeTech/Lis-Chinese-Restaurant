"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness, Clock, FileText, User } from "lucide-react";
import { useCareer } from "@/contexts/career-provider";
import { NavigationButtons } from "./navigation-buttons";

export function ReviewStep() {
  const { data } = useCareer();
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Review Your Application</h3>
        <p className="text-muted-foreground">
          Please review all information before submitting your application
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Name:</span>
              <p className="font-medium">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Email:</span>
              <p className="font-medium break-words">{data.email}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Phone:</span>
              <p className="font-medium">{data.phone}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Date of Birth:
              </span>
              <p className="font-medium">{data.dateOfBirth}</p>
            </div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Address:</span>
            <p className="font-medium">{data.address}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BriefcaseBusiness />
            Experience & Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Position:</span>
              <p className="font-medium">{data.position}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Experience:</span>
              <p className="font-medium">{data.experience} years</p>
            </div>
          </div>

          {data.previousEmployment && (
            <div>
              <span className="text-sm text-muted-foreground">
                Previous Employment:
              </span>
              <p className="font-medium text-sm mt-1">
                {data.previousEmployment}
              </p>
            </div>
          )}

          {data.skills?.length && (
            <div>
              <span className="text-sm text-muted-foreground">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {data.languages?.length && (
            <div>
              <span className="text-sm text-muted-foreground">Languages:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.languages.map((language) => (
                  <Badge key={language} variant="outline">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Start Date:</span>
              <p className="font-medium">{data.startDate}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Hours per Week:
              </span>
              <p className="font-medium">{data.hoursPerWeek}</p>
            </div>
          </div>

          {data.availability?.length && (
            <div>
              <span className="text-sm text-muted-foreground">
                Available Times:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.availability.map((slot) => (
                  <Badge key={slot} variant="secondary" className="text-xs">
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="text-sm text-muted-foreground">Resume:</span>
            <p className="font-medium">
              {data.resume ? data.resume.name : "No file uploaded"}
            </p>
          </div>

          {data.coverLetter && (
            <div>
              <span className="text-sm text-muted-foreground">
                Cover Letter:
              </span>
              <p className="font-medium text-sm mt-1 line-clamp-3">
                {data.coverLetter}
              </p>
            </div>
          )}

          {data.references && (
            <div>
              <span className="text-sm text-muted-foreground">References:</span>
              <p className="font-medium text-sm mt-1 line-clamp-3">
                {data.references}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <NavigationButtons />
    </div>
  );
}
