import { site } from "@/config/site-config";
import { EmailHeader } from "../components/header";
import { EmailFooter } from "../components/footer";
import { EmailSocials } from "../components/socials";

type CareerConfirmationEmailProps = {
  firstName: string;
  lastName: string;
  position: string;
};

export const CareerConfirmationEmail = ({
  firstName,
  lastName,
  position,
}: CareerConfirmationEmailProps) => {
  const { restaurant } = site;
  const submissionDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Preheader */}
      <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
        Thank you {firstName}, we’ve received your job application.
      </div>

      <EmailHeader />

      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%", backgroundColor: "#ffffff" }}
      >
        <tr>
          <td style={{ padding: "32px" }}>
            <h2 style={{ color: "hsl(220, 13%, 18%)", fontSize: "20px" }}>
              Thank you for applying, {firstName}!
            </h2>

            <p style={{ color: "hsl(220, 13%, 40%)", fontSize: "14px" }}>
              We’ve received your application for the{" "}
              <strong>{position}</strong> role on{" "}
              <strong>{submissionDate}</strong>. Our HR team will carefully
              review your application and get back to you shortly.
            </p>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              If you are shortlisted, we will reach out to you directly via the
              contact details you provided.
            </p>

            <p style={{ color: "hsl(220, 13%, 30%)", fontSize: "14px" }}>
              Good luck!
              <br />— The {restaurant.name} Team
            </p>
          </td>
        </tr>
      </table>

      <EmailSocials />
      <EmailFooter />
    </div>
  );
};
