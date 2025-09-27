// @/emails/reservations/customer.tsx

import { site } from "@/config/site-config";
import { ReservationFormValues } from "@/schemas/reservations";
import { EmailFooter } from "../components/footer";

type ReservationEmailProps = ReservationFormValues;

export const CustomerConfirmationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  date,
  time,
  guests,
  diningPreference,
  occasion,
  requests,
}: ReservationEmailProps) => {
  const { restaurant } = site;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

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
        style={{ width: "100%" }}
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
              Hi {firstName},
            </h2>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "16px",
                lineHeight: "1.6",
                margin: "0 0 24px 0",
              }}
            >
              Thank you for booking a table with <b>{restaurant.name}</b>! Here
              are your reservation details:
            </p>

            {/* Reservation Information Card */}
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
                    Reservation Details
                  </h3>

                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    style={{ width: "100%" }}
                  >
                    <tr>
                      <td style={labelCell}>Name:</td>
                      <td style={valueCell}>
                        {firstName} {lastName}
                      </td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Email:</td>
                      <td style={valueCell}>
                        <a href={`mailto:${email}`} style={linkStyle}>
                          {email}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Phone:</td>
                      <td style={valueCell}>
                        <a href={`tel:${phone}`} style={linkStyle}>
                          {phone}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Date:</td>
                      <td style={valueCell}>{formattedDate}</td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Time:</td>
                      <td style={valueCell}>{time}</td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Guests:</td>
                      <td style={valueCell}>{guests}</td>
                    </tr>
                    <tr>
                      <td style={labelCell}>Dining:</td>
                      <td style={valueCell}>{diningPreference}</td>
                    </tr>
                    {occasion && (
                      <tr>
                        <td style={labelCell}>Occasion:</td>
                        <td style={valueCell}>{occasion}</td>
                      </tr>
                    )}
                    {requests && (
                      <tr>
                        <td style={labelCell}>Special Requests:</td>
                        <td style={valueCell}>{requests}</td>
                      </tr>
                    )}
                  </table>
                </td>
              </tr>
            </table>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "15px",
                lineHeight: "1.6",
                margin: "0 0 24px 0",
              }}
            >
              Please arrive at least <b>10 minutes early</b> to ensure your
              table is ready. If you need to make any changes, simply reply to
              this email.
            </p>

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
      <EmailFooter />
    </div>
  );
};

// Shared inline style objects
const labelCell: React.CSSProperties = {
  color: "hsl(220, 13%, 18%)",
  fontSize: "14px",
  fontWeight: "600",
  padding: "8px 0",
  width: "140px",
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
