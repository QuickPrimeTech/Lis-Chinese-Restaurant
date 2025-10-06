import React from "react";

export type OrderItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
};

// 🔹 Inline Styles

export const labelCell: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "14px",
  padding: "6px 0",
  width: "140px",
};

export const valueCell: React.CSSProperties = {
  fontSize: "14px",
  color: "hsl(220, 13%, 30%)",
  padding: "6px 0",
};

export const linkStyle: React.CSSProperties = {
  color: "hsl(0, 65%, 45%)",
  textDecoration: "none",
};

export const tableHeader: React.CSSProperties = {
  textAlign: "left",
  fontSize: "13px",
  fontWeight: "600",
  padding: "8px",
};

export const tableCell: React.CSSProperties = {
  fontSize: "13px",
  padding: "8px",
  verticalAlign: "middle",
};

export const infoCard: React.CSSProperties = {
  width: "100%",
  backgroundColor: "hsl(45, 33%, 98%)",
  borderRadius: "8px",
  border: "1px solid hsl(45, 20%, 90%)",
  marginBottom: "24px",
};

// 🔹 Reusable Components
export const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <tr>
    <td style={labelCell}>{label}:</td>
    <td style={valueCell}>{value}</td>
  </tr>
);

export const OrderItemsTable = ({ items }: { items: OrderItem[] }) => (
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid hsl(45, 20%, 90%)",
    }}
  >
    <thead>
      <tr style={{ backgroundColor: "hsl(45, 33%, 97%)" }}>
        <th style={tableHeader}>Item</th>
        <th style={tableHeader}>Qty</th>
        <th style={tableHeader}>Price</th>
        <th style={tableHeader}>Total</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
          <td style={tableCell}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    marginRight: 8,
                    objectFit: "cover",
                  }}
                />
              )}
              <div>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "hsl(220, 13%, 50%)" }}>
                  {item.category}
                </div>
              </div>
            </div>
          </td>
          <td style={{ ...tableCell, textAlign: "center" }}>{item.quantity}</td>
          <td style={{ ...tableCell, textAlign: "right" }}>
            KES {item.price.toLocaleString()}
          </td>
          <td style={{ ...tableCell, textAlign: "right" }}>
            KES {(item.price * item.quantity).toLocaleString()}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
