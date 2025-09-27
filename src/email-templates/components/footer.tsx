import { AccentBar } from "./accent-bar";

export function EmailFooter() {
  return (
    <>
      <AccentBar />
      <table
        cellPadding="0"
        cellSpacing="0"
        border={0}
        style={{ width: "100%", backgroundColor: "hsl(0, 65%, 45%)" }}
      >
        <tr>
          <td style={{ padding: "20px 32px", textAlign: "center" }}>
            <p
              style={{
                color: "#ffffff",
                fontSize: "12px",
                margin: "0",
                lineHeight: "1.4",
              }}
            >
              This is an automated confirmation email.
              <br />
              Please do not share this reservation email with others.
            </p>
          </td>
        </tr>
      </table>
    </>
  );
}
