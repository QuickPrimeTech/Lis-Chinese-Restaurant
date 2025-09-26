// @/emails/contact/user.tsx

import { site } from "@/config/site-config";

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
      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%", backgroundColor: "hsl(0, 65%, 45%)" }}
      >
        <tr>
          <td style={{ padding: "24px 32px", textAlign: "center" }}>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              {restaurant.name}
            </h1>
            <p
              style={{
                color: "hsl(45, 100%, 85%)",
                fontSize: "14px",
                margin: "6px 0 0 0",
                fontWeight: "300",
              }}
            >
              {restaurant.tagline}
            </p>
          </td>
        </tr>
      </table>

      {/* Accent Bar */}
      <div style={{ height: "4px", backgroundColor: "hsl(45, 100%, 51%)" }} />

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
            <table
              style={{
                width: "100%",
                backgroundColor: "hsl(45, 33%, 98%)",
                borderRadius: "6px",
                border: "1px solid hsl(45, 20%, 90%)",
                marginBottom: "20px",
              }}
            >
              <tr>
                <td style={{ padding: "20px", textAlign: "center" }}>
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    {restaurant.name}
                  </p>
                  <p style={{ margin: "4px 0" }}>📍 {restaurant.address}</p>
                  <p style={{ margin: "4px 0" }}>📞 {restaurant.phone}</p>
                  <p style={{ margin: "4px 0" }}>✉️ {restaurant.email}</p>
                  <p style={{ margin: "4px 0" }}>🌐 {restaurant.website}</p>
                </td>
              </tr>
            </table>

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

      {/* Footer */}
      <table style={{ width: "100%", backgroundColor: "hsl(220, 13%, 18%)" }}>
        <tr>
          <td style={{ padding: "16px", textAlign: "center" }}>
            <p
              style={{
                color: "hsl(45, 100%, 85%)",
                fontSize: "12px",
                margin: "0",
              }}
            >
              This is an automated confirmation email from {restaurant.name}.
              <br />
              You don’t need to reply unless you want to add more details.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};
