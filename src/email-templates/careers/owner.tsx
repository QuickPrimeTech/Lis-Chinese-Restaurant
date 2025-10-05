// @/email-templates/careers/owner.tsx
import { EmailHeader } from "../components/header";
import { EmailFooter } from "../components/footer";
import { EmailSocials } from "../components/socials";

type CareerOwnerNotificationEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  position: string;
  experience?: string;
  previousEmployment?: string;
  skills?: string[];
  languages?: string[];
  startDate?: string;
  hoursPerWeek?: string;
  coverLetter?: string;
  references?: string;
  cvUrl?: string | null;
};

export const OwnerConfirmationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  dateOfBirth,
  position,
  experience,
  previousEmployment,
  skills,
  languages,
  startDate,
  hoursPerWeek,
  coverLetter,
  references,
  cvUrl,
}: CareerOwnerNotificationEmailProps) => {
  const submissionDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 🧭 Helper to format date of birth (dd/mm/yyyy)
  const formatDateOfBirth = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return `${String(d.getDate()).padStart(2, "0")}/${String(
      d.getMonth() + 1
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  // 🧭 Helper to format start date in a readable way
  const formatStartDate = (date?: string) => {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // 🧭 Helper to format experience
  const formatExperience = (exp?: string) => {
    if (!exp) return null;
    return `${exp} years`;
  };

  const renderRow = (label: string, value?: string | number | null) =>
    value ? (
      <tr>
        <td style={{ padding: "6px 8px", verticalAlign: "top" }}>
          <strong>{label}:</strong>
        </td>
        <td style={{ padding: "6px 8px", color: "hsl(220, 13%, 30%)" }}>
          {String(value)}
        </td>
      </tr>
    ) : null;

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: "640px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      <EmailHeader />

      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%", backgroundColor: "#ffffff" }}
      >
        <tbody>
          <tr>
            <td style={{ padding: "32px" }}>
              <h2 style={{ color: "hsl(220, 13%, 18%)", fontSize: "20px" }}>
                New Job Application Received
              </h2>

              <p style={{ color: "hsl(220, 13%, 40%)", fontSize: "14px" }}>
                A new job application was submitted on{" "}
                <strong>{submissionDate}</strong>.
              </p>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "16px",
                  marginBottom: "24px",
                }}
              >
                <tbody>
                  {renderRow("First Name", firstName)}
                  {renderRow("Last Name", lastName)}
                  {renderRow("Email", email)}
                  {renderRow("Phone", phone)}
                  {renderRow("Address", address)}
                  {renderRow("Date of Birth", formatDateOfBirth(dateOfBirth))}
                  {renderRow("Position Applied", position)}
                  {renderRow("Experience", formatExperience(experience))}
                  {renderRow("Previous Employment", previousEmployment)}
                  {skills?.length
                    ? renderRow("Skills", skills.join(", "))
                    : null}
                  {languages?.length
                    ? renderRow("Languages", languages.join(", "))
                    : null}
                  {renderRow("Start Date", formatStartDate(startDate))}
                  {renderRow("Hours Per Week", hoursPerWeek)}
                  {renderRow("Cover Letter", coverLetter)}
                  {renderRow("References", references)}
                </tbody>
              </table>

              {cvUrl && (
                <a
                  href={cvUrl}
                  style={{
                    display: "inline-block",
                    backgroundColor: "hsl(220, 90%, 56%)",
                    color: "#ffffff",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  View CV
                </a>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <EmailSocials />
      <EmailFooter />
    </div>
  );
};
