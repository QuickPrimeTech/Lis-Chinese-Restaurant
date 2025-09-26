// @/emails/contact/owner.tsx

import { site } from "@/config/site-config";

type EmailTemplateProps = {
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  inquiryType: string;
  message: string;
};

export const OwnerConfirmationEmail = ({
  customerName,
  customerEmail,
  phoneNumber,
  inquiryType,
  message,
}: EmailTemplateProps) => {
  const { restaurant } = site;

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
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
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
                fontSize: "28px",
                fontWeight: "bold",
                margin: "0",
                letterSpacing: "1px",
              }}
            >
              {restaurant.name}
            </h1>
            <p
              style={{
                color: "hsl(45, 100%, 85%)",
                fontSize: "16px",
                margin: "8px 0 0 0",
                fontWeight: "300",
              }}
            >
              {restaurant.tagline}
            </p>
          </td>
        </tr>
      </table>

      {/* Golden Accent Bar */}
      <div style={{ height: "4px", backgroundColor: "hsl(45, 100%, 51%)" }} />

      {/* Main Content */}
      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%", backgroundColor: "#ffffff" }}
      >
        <tr>
          <td style={{ padding: "32px" }}>
            {/* Greeting */}
            <h2
              style={{
                color: "hsl(220, 13%, 18%)",
                fontSize: "24px",
                fontWeight: "600",
                margin: "0 0 16px 0",
              }}
            >
              New Customer Inquiry Received
            </h2>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 24px 0",
              }}
            >
              You have received a new inquiry from a potential customer. Please
              find the details below:
            </p>

            {/* Customer Information Card */}
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                width: "100%",
                backgroundColor: "hsl(45, 33%, 98%)",
                borderRadius: "8px",
                border: "1px solid hsl(45, 20%, 90%)",
                marginBottom: "24px",
              }}
            >
              <tr>
                <td style={{ padding: "24px" }}>
                  <h3
                    style={{
                      color: "hsl(0, 65%, 45%)",
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "0 0 16px 0",
                      borderBottom: "2px solid hsl(45, 100%, 51%)",
                      paddingBottom: "8px",
                      display: "inline-block",
                    }}
                  >
                    Customer Information
                  </h3>

                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    style={{ width: "100%" }}
                  >
                    <tr>
                      <td style={labelCell}>Name:</td>
                      <td style={valueCell}>{customerName}</td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Email:</td>
                      <td style={valueCell}>
                        <a href={`mailto:${customerEmail}`} style={linkStyle}>
                          {customerEmail}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Phone:</td>
                      <td style={valueCell}>
                        <a href={`tel:${phoneNumber}`} style={linkStyle}>
                          {phoneNumber}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Inquiry Type:</td>
                      <td style={valueCell}>
                        <span style={badgeStyle}>{inquiryType}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Submitted:</td>
                      <td style={valueCell}>{submissionDate}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            {/* Message Card */}
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                width: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid hsl(45, 20%, 90%)",
                marginBottom: "24px",
              }}
            >
              <tr>
                <td style={{ padding: "24px" }}>
                  <h3
                    style={{
                      color: "hsl(0, 65%, 45%)",
                      fontSize: "18px",
                      fontWeight: "600",
                      margin: "0 0 16px 0",
                      borderBottom: "2px solid hsl(45, 100%, 51%)",
                      paddingBottom: "8px",
                      display: "inline-block",
                    }}
                  >
                    Customer Message
                  </h3>

                  <p
                    style={{
                      color: "hsl(220, 13%, 30%)",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      margin: "0",
                      fontStyle: "italic",
                    }}
                  >
                    &quot;{message}&quot;
                  </p>
                </td>
              </tr>
            </table>

            {/* Action Button */}
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              <tr>
                <td>
                  <a
                    href={`mailto:${customerEmail}?subject=Re: Your inquiry at ${restaurant.name}`}
                    style={{
                      backgroundColor: "hsl(0, 65%, 45%)",
                      color: "#ffffff",
                      padding: "16px 32px",
                      textDecoration: "none",
                      borderRadius: "6px",
                      fontSize: "16px",
                      fontWeight: "600",
                      display: "inline-block",
                      border: "2px solid hsl(45, 100%, 51%)",
                    }}
                  >
                    Reply to Customer
                  </a>
                </td>
              </tr>
            </table>

            {/* Restaurant Info */}
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                width: "100%",
                backgroundColor: "hsl(45, 33%, 98%)",
                borderRadius: "8px",
                border: "1px solid hsl(45, 20%, 90%)",
              }}
            >
              <tr>
                <td style={{ padding: "20px", textAlign: "center" }}>
                  <h4
                    style={{
                      color: "hsl(0, 65%, 45%)",
                      fontSize: "16px",
                      fontWeight: "600",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {restaurant.name}
                  </h4>
                  <p
                    style={{
                      color: "hsl(220, 13%, 40%)",
                      fontSize: "14px",
                      margin: "4px 0",
                      lineHeight: "1.4",
                    }}
                  >
                    📍 {restaurant.address}
                    <br />
                    📞 {restaurant.phone}
                    <br />
                    ✉️ {restaurant.email}
                    <br />
                    🌐 {restaurant.website}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      {/* Footer */}
      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%", backgroundColor: "hsl(220, 13%, 18%)" }}
      >
        <tr>
          <td style={{ padding: "20px 32px", textAlign: "center" }}>
            <p
              style={{
                color: "hsl(45, 100%, 85%)",
                fontSize: "12px",
                margin: "0",
                lineHeight: "1.4",
              }}
            >
              This email was automatically generated from your restaurant&apos;s
              contact form.
              <br />
              Please respond to the customer within 24 hours for the best
              experience.
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};

// Shared inline style objects
const labelCell: React.CSSProperties = {
  color: "hsl(220, 13%, 18%)",
  fontSize: "14px",
  fontWeight: "600",
  padding: "8px 0",
  width: "120px",
  verticalAlign: "top",
};

const valueCell: React.CSSProperties = {
  color: "hsl(220, 13%, 30%)",
  fontSize: "14px",
  padding: "8px 0",
};

const linkStyle: React.CSSProperties = {
  color: "hsl(0, 65%, 45%)",
  textDecoration: "none",
};

const badgeStyle: React.CSSProperties = {
  backgroundColor: "hsl(45, 100%, 51%)",
  color: "hsl(220, 13%, 18%)",
  padding: "4px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: "600",
};
