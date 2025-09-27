// @/emails/reservations/owner.tsx

import { site } from "@/config/site-config";
import { ReservationFormValues } from "@/schemas/reservations";
import { EmailFooter } from "../components/footer";
import { EmailHeader } from "../components/header";

type OwnerNotificationEmailProps = ReservationFormValues;

export const OwnerConfirmationEmail = ({
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
}: OwnerNotificationEmailProps) => {
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
      <EmailHeader />

      {/* Main Content */}
      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%" }}
      >
        <tr>
          <td style={{ padding: "32px" }}>
            <h2
              style={{
                color: "hsl(0, 65%, 45%)",
                fontSize: "24px",
                fontWeight: "700",
                margin: "0 0 16px 0",
              }}
            >
              📩 New Reservation Alert
            </h2>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "16px",
                margin: "0 0 24px 0",
              }}
            >
              A new reservation has been placed via <b>{restaurant.name}</b>’s
              booking system. Please review the details below:
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
              }}
            >
              <tr>
                <td style={{ padding: "24px" }}>
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    style={{ width: "100%" }}
                  >
                    <tr>
                      <td style={labelCell}>Customer:</td>
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
          </td>
        </tr>
      </table>

      <EmailFooter />
    </div>
  );
};

// Shared inline styles
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
