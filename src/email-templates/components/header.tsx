import { site } from "@/config/site-config";
import { AccentBar } from "./accent-bar";

export function EmailHeader() {
  const { restaurant } = site;
  return (
    <>
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
      <AccentBar />
    </>
  );
}
