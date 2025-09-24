import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
}

export function EmailTemplate({
  firstName,
  restaurantName,
  date,
  time,
  guests,
  specialRequest,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "40px 20px",
        color: "#333",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#d32f2f",
            padding: "24px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px" }}>
            {restaurantName} Reservation Confirmed 🎉
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: "32px" }}>
          <p style={{ fontSize: "16px" }}>Hi {firstName},</p>
          <p style={{ fontSize: "16px" }}>
            Thank you for booking a table with <b>{restaurantName}</b>. We’re
            excited to host you!
          </p>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "24px 0",
            }}
          >
            <tbody>
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold" }}>Date:</td>
                <td style={{ padding: "8px 0" }}>{date}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold" }}>Time:</td>
                <td style={{ padding: "8px 0" }}>{time}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold" }}>
                  Guests:
                </td>
                <td style={{ padding: "8px 0" }}>{guests}</td>
              </tr>
              {specialRequest && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>
                    Special Request:
                  </td>
                  <td style={{ padding: "8px 0" }}>{specialRequest}</td>
                </tr>
              )}
            </tbody>
          </table>

          <p style={{ fontSize: "16px" }}>
            If you need to make any changes to your reservation, simply reply to
            this email and our team will be happy to assist you.
          </p>

          <p style={{ marginTop: "24px", fontSize: "16px" }}>
            We look forward to welcoming you soon!
          </p>

          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            — The {restaurantName} Team 🍽️
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#fafafa",
            padding: "16px",
            textAlign: "center",
            fontSize: "12px",
            color: "#666",
          }}
        >
          <p style={{ margin: 0 }}>
            {restaurantName} · 123 Food Street · Nairobi, Kenya
          </p>
        </div>
      </div>
    </div>
  );
}
