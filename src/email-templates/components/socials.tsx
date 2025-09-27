import { site } from "@/config/site-config";

export function EmailSocials() {
  return (
    <table style={{ width: "100%", backgroundColor: "#ffffff", marginTop: 20 }}>
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <a
              href={site.socials.tripAdvisor}
              style={{
                color: "hsl(0,65%,45%)",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              TripAdvisor
            </a>
            <a
              href={site.socials.instagram}
              style={{
                color: "hsl(0,65%,45%)",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Instagram
            </a>
            <a
              href={site.socials.x}
              style={{
                color: "hsl(0,65%,45%)",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              X
            </a>
            <a
              href={site.socials.tiktok}
              style={{
                color: "hsl(0,65%,45%)",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              TikTok
            </a>
            <a
              href={site.socials.linkedIn}
              style={{
                color: "hsl(0,65%,45%)",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              LinkedIn
            </a>
            <a
              href={site.socials.pintrest}
              style={{
                color: "hsl(0,65%,45%)",
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Pinterest
            </a>
          </div>
        </td>
      </tr>
    </table>
  );
}
