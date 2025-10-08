import { site } from "@/config/site-config";
import { EmailHeader } from "../components/header";
import { EmailFooter } from "../components/footer";
import { EmailSocials } from "../components/socials";

type OwnerConfirmationEmailProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  eventType: string;
  guests: string;
  budget?: string;
  date?: Date;
  details?: string;
};

export const OwnerConfirmationEmail = ({
  firstName,
  lastName,
  email,
  phone,
  company,
  eventType,
  guests,
  budget,
  date,
  details,
}: OwnerConfirmationEmailProps) => {
  const { restaurant } = site;
  const submissionDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = date
    ? date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "To be discussed";

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
        New private event inquiry from {firstName} {lastName}.
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
              New Private Event Inquiry
            </h2>

            <p style={{ color: "hsl(220, 13%, 40%)", fontSize: "14px" }}>
              A new inquiry has been submitted for a{" "}
              <strong>{eventType}</strong> on <strong>{formattedDate}</strong>{" "}
              for approximately <strong>{guests}</strong> guests. This was
              received on <strong>{submissionDate}</strong>.
            </p>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              Please review the details below and contact the customer within 24
              hours to discuss their vision.
            </p>

            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{
                width: "100%",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <tr>
                <td
                  style={{
                    padding: "20px",
                    borderLeft: "4px solid hsl(220, 13%, 60%)",
                  }}
                >
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    style={{ width: "100%" }}
                  >
                    <tr>
                      <td style={{ paddingBottom: "12px" }}>
                        <strong style={{ color: "hsl(220, 13%, 18%)" }}>
                          Contact Information
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          paddingBottom: "8px",
                          color: "hsl(220, 13%, 40%)",
                          fontSize: "14px",
                        }}
                      >
                        {firstName} {lastName}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          paddingBottom: "8px",
                          color: "hsl(220, 13%, 40%)",
                          fontSize: "14px",
                        }}
                      >
                        {email}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          paddingBottom: "8px",
                          color: "hsl(220, 13%, 40%)",
                          fontSize: "14px",
                        }}
                      >
                        {phone}
                      </td>
                    </tr>
                    {company && (
                      <tr>
                        <td
                          style={{
                            color: "hsl(220, 13%, 40%)",
                            fontSize: "14px",
                          }}
                        >
                          {company}
                        </td>
                      </tr>
                    )}
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "20px 20px 20px 44px",
                    borderLeft: "4px solid hsl(220, 13%, 60%)",
                  }}
                >
                  <table
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    style={{ width: "100%" }}
                  >
                    <tr>
                      <td style={{ paddingBottom: "12px" }}>
                        <strong style={{ color: "hsl(220, 13%, 18%)" }}>
                          Event Details
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          paddingBottom: "8px",
                          color: "hsl(220, 13%, 40%)",
                          fontSize: "14px",
                        }}
                      >
                        Event Type: {eventType}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          paddingBottom: "8px",
                          color: "hsl(220, 13%, 40%)",
                          fontSize: "14px",
                        }}
                      >
                        Date: {formattedDate}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          paddingBottom: "8px",
                          color: "hsl(220, 13%, 40%)",
                          fontSize: "14px",
                        }}
                      >
                        Guests: {guests}
                      </td>
                    </tr>
                    {budget && (
                      <tr>
                        <td
                          style={{
                            color: "hsl(220, 13%, 40%)",
                            fontSize: "14px",
                          }}
                        >
                          Budget: {budget}
                        </td>
                      </tr>
                    )}
                  </table>
                </td>
              </tr>
              {details && (
                <tr>
                  <td
                    style={{
                      padding: "20px 20px 20px 44px",
                      borderLeft: "4px solid hsl(220, 13%, 60%)",
                    }}
                  >
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                      style={{ width: "100%" }}
                    >
                      <tr>
                        <td style={{ paddingBottom: "12px" }}>
                          <strong style={{ color: "hsl(220, 13%, 18%)" }}>
                            Additional Details
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            color: "hsl(220, 13%, 40%)",
                            fontSize: "14px",
                          }}
                        >
                          {details}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              )}
            </table>

            <p style={{ color: "hsl(220, 13%, 30%)", fontSize: "14px" }}>
              Review this inquiry and respond promptly to secure the booking.
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
