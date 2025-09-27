// @/emails/contact/user.tsx

import { site } from "@/config/site-config";
import { EmailSocials } from "../components/socials";
import { EmailFooter } from "../components/footer";

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
              cellPadding="0"
              cellSpacing="0"
              role="presentation"
            >
              <tr>
                <td
                  style={{
                    padding: "20px",
                    textAlign: "left",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {restaurant.name}
                  </p>
                  <p style={{ margin: "4px 0", fontSize: "14px" }}>
                    {restaurant.address}
                  </p>

                  <table
                    role="presentation"
                    cellPadding="0"
                    cellSpacing="0"
                    style={{ marginTop: "12px", width: "100%" }}
                  >
                    <tr>
                      <td style={{ paddingBottom: "8px", textAlign: "left" }}>
                        <a
                          href={`tel:${restaurant.phone}`}
                          style={{
                            backgroundColor: "#007BFF",
                            color: "#ffffff",
                            textDecoration: "none",
                            padding: "10px 18px",
                            borderRadius: "4px",
                            display: "inline-block",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          📞 Call Us
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: "8px", textAlign: "left" }}>
                        <a
                          href={`mailto:${restaurant.email}`}
                          style={{
                            backgroundColor: "#28A745",
                            color: "#ffffff",
                            textDecoration: "none",
                            padding: "10px 18px",
                            borderRadius: "4px",
                            display: "inline-block",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          ✉️ Reply
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "left" }}>
                        <a
                          href={`https://${restaurant.website}`}
                          style={{
                            backgroundColor: "#6C757D",
                            color: "#ffffff",
                            textDecoration: "none",
                            padding: "10px 18px",
                            borderRadius: "4px",
                            display: "inline-block",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          🌐 Visit Website
                        </a>
                      </td>
                    </tr>
                  </table>
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

      {/* Social Links Footer */}
      <EmailSocials />

      {/* Footer */}
      <EmailFooter />
    </div>
  );
};
