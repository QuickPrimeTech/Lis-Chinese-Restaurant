export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validatePersonalInfo = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.address.trim()) errors.address = "Address is required";
  if (!data.dateOfBirth) errors.dateOfBirth = "Date of birth is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateExperience = (data: {
  position: string;
  experience: string;
  previousEmployment: string;
  skills: string[];
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.position) errors.position = "Please select a position";
  if (!data.experience)
    errors.experience = "Please select your experience level";
  if (!data.previousEmployment.trim())
    errors.previousEmployment = "Previous employment information is required";
  if (data.skills.length === 0)
    errors.skills = "Please select at least one skill";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateAvailability = (data: {
  startDate: string;
  availability: string[];
  hoursPerWeek: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.startDate) errors.startDate = "Start date is required";
  if (data.availability.length === 0)
    errors.availability = "Please select your availability";
  if (!data.hoursPerWeek) errors.hoursPerWeek = "Please select hours per week";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateDocuments = (data: {
  resume: File | null;
  coverLetter: string;
}): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!data.resume) errors.resume = "Please upload your resume";
  if (!data.coverLetter.trim()) errors.coverLetter = "Cover letter is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
