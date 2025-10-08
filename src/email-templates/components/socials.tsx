import { site } from "@/config/site-config";

export function EmailSocials() {
  return (
    <>
      {/* Media Query for Mobile Stacking - Add this to your email <head> or a global style wrapper */}
      <style type="text/css">
        {`
          @media screen and (max-width: 480px) {
            .social-td {
              display: block !important;
              width: 100% !important;
              text-align: center !important;
              padding: 4px 0 !important; /* Vertical spacing instead of gap */
            }
          }
        `}
      </style>

      <table
        style={{ width: "100%", backgroundColor: "#ffffff", marginTop: 20 }}
      >
        <tr>
          <td style={{ padding: 16, textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: 14,
                color: "hsl(220, 13%, 40%)",
              }}
            >
              Connect with us
            </p>
            <table style={{ width: "100%" }}>
              {" "}
              {/* Nested table for links */}
              <tr>
                <td className="social-td" style={{ padding: "0 6px" }}>
                  {" "}
                  {/* Horizontal padding for desktop gap */}
                  <a
                    href={site.socials.tripAdvisor}
                    style={{
                      color: "hsl(0,65%,45%)",
                      textDecoration: "none",
                      fontSize: 14,
                      display:
                        "inline-block" /* Ensures horizontal on desktop */,
                      whiteSpace:
                        "nowrap" /* Prevents text wrapping mid-link */,
                    }}
                  >
                    TripAdvisor
                  </a>
                </td>
                <td className="social-td" style={{ padding: "0 6px" }}>
                  <a
                    href={site.socials.instagram}
                    style={{
                      color: "hsl(0,65%,45%)",
                      textDecoration: "none",
                      fontSize: 14,
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Instagram
                  </a>
                </td>
                <td className="social-td" style={{ padding: "0 6px" }}>
                  <a
                    href={site.socials.x}
                    style={{
                      color: "hsl(0,65%,45%)",
                      textDecoration: "none",
                      fontSize: 14,
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    X
                  </a>
                </td>
                <td className="social-td" style={{ padding: "0 6px" }}>
                  <a
                    href={site.socials.tiktok}
                    style={{
                      color: "hsl(0,65%,45%)",
                      textDecoration: "none",
                      fontSize: 14,
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    TikTok
                  </a>
                </td>
                <td className="social-td" style={{ padding: "0 6px" }}>
                  <a
                    href={site.socials.linkedIn}
                    style={{
                      color: "hsl(0,65%,45%)",
                      textDecoration: "none",
                      fontSize: 14,
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    LinkedIn
                  </a>
                </td>
                <td className="social-td" style={{ padding: "0 6px" }}>
                  <a
                    href={site.socials.pintrest}
                    style={{
                      color: "hsl(0,65%,45%)",
                      textDecoration: "none",
                      fontSize: 14,
                      display: "inline-block",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Pinterest
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </>
  );
}
