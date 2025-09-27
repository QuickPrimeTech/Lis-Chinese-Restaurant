// @/emails/contact/user.tsx

import { site } from "@/config/site-config";
import { EmailSocials } from "../components/socials";
import { EmailFooter } from "../components/footer";
import { EmailHeader } from "../components/header";
import { EmailContactInfo } from "../components/contact-info";

type CustomerConfirmationEmailProps = {
  customerName: string;
  inquiryType: string;
};

export const CustomerConfirmationEmail = ({
  customerName,
  inquiryType,
}: CustomerConfirmationEmailProps) => {
  const { restaurant } = site;

  // Always use current date/time
  const submissionDate = new Date().toLocaleDateString("en-US", {
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
      <div
        style={{
          display: "none",
          maxHeight: 0,
          overflow: "hidden",
          fontSize: "1px",
          color: "#ffffff",
        }}
      >
        Thank you {customerName}, we’ve received your {inquiryType}.
      </div>

      {/* Header */}
      <EmailHeader />

      {/* Content */}
      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%", backgroundColor: "#ffffff" }}
      >
        <tr>
          <td style={{ padding: "32px" }}>
            <h2
              style={{
                color: "hsl(220, 13%, 18%)",
                fontSize: "20px",
                marginBottom: "16px",
              }}
            >
              Thank you for reaching out, {customerName}!
            </h2>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "14px",
                marginBottom: "20px",
                lineHeight: "1.6",
              }}
            >
              We’ve received your <strong>{inquiryType}</strong> request on{" "}
              <strong>{submissionDate}</strong>. Our team will review your
              message and get back to you as soon as possible—usually within 24
              hours.
            </p>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "14px",
                marginBottom: "24px",
                lineHeight: "1.6",
              }}
            >
              If your inquiry is urgent, feel free to give us a call directly.
            </p>

            {/* Contact Info Box */}
            <EmailContactInfo />

            {/* Friendly Closing */}
            <p
              style={{
                color: "hsl(220, 13%, 30%)",
                fontSize: "14px",
                marginBottom: "0",
              }}
            >
              We look forward to serving you soon!
              <br />— The {restaurant.name} Team
            </p>
          </td>
        </tr>
      </table>

      {/* Social Links Footer */}
      <EmailSocials />

      {/* Footer */}
      <EmailFooter />
    </div>
  );
};
