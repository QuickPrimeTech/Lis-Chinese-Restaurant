import { site } from "@/config/site-config";

export function EmailContactInfo() {
  const { restaurant } = site;
  return (
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
  );
}
