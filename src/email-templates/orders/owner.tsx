import { site } from "@/config/site-config";
import { EmailFooter } from "../components/footer";
import { EmailHeader } from "../components/header";
import {
  InfoRow,
  linkStyle,
  infoCard,
  OrderItemsTable,
} from "../components/orders";

type OrderItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
};

interface OwnerOrderEmailProps {
  items: OrderItem[];
  total: number;
  phone: string;
  email: string;
  customerName: string;
  orderId: string;
  paymentMethod: string;
  pickupDate?: string;
  pickupTime?: string;
  specialInstructions?: string;
}

export const OwnerConfirmationEmail = ({
  items,
  total,
  phone,
  email,
  customerName = "Customer",
  orderId,
  paymentMethod = "Not specified",
  pickupDate,
  pickupTime,
  specialInstructions,
}: OwnerOrderEmailProps) => {
  const { restaurant } = site;

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

      <table style={{ width: "100%" }} cellPadding="0" cellSpacing="0">
        <tr>
          <td style={{ padding: "32px" }}>
            <h2
              style={{
                color: "hsl(0, 65%, 45%)",
                fontSize: "24px",
                fontWeight: "700",
                marginBottom: "16px",
              }}
            >
              🍽️ New Order Received
            </h2>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: "16px",
                marginBottom: "24px",
              }}
            >
              A new order has been placed via <b>{restaurant.name}</b>’s online
              system. Review customer and order details below.
            </p>

            {/* 🧍 Customer Details */}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "hsl(220, 13%, 25%)",
                marginBottom: "8px",
              }}
            >
              Customer Details
            </h3>
            <table style={infoCard}>
              <tr>
                <td style={{ padding: "20px" }}>
                  <table style={{ width: "100%" }}>
                    {orderId && <InfoRow label="Order ID" value={orderId} />}
                    <InfoRow label="Customer" value={customerName} />
                    {email && <InfoRow label="Email" value={email} />}
                    <InfoRow
                      label="Phone"
                      value={
                        <a href={`tel:${phone}`} style={linkStyle}>
                          {phone}
                        </a>
                      }
                    />
                    <InfoRow label="Payment Method" value={paymentMethod} />
                    <InfoRow label="Total Amount" value={`Ksh ${total}`} />
                    {pickupDate && (
                      <InfoRow label="Pickup Date" value={pickupDate} />
                    )}
                    {pickupTime && (
                      <InfoRow label="Pickup Time" value={pickupTime} />
                    )}
                    {specialInstructions && (
                      <InfoRow
                        label="Special Instructions"
                        value={specialInstructions}
                      />
                    )}
                  </table>
                </td>
              </tr>
            </table>

            {/* 🍱 Order Details */}
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "hsl(220, 13%, 25%)",
                margin: "24px 0 12px",
              }}
            >
              Order Details
            </h3>
            <OrderItemsTable items={items} />

            <p
              style={{
                fontSize: "14px",
                color: "hsl(220, 13%, 40%)",
                marginTop: "24px",
              }}
            >
              Kindly prepare this order for pickup at the scheduled time. Verify
              M-Pesa payments before fulfilling.
            </p>
          </td>
        </tr>
      </table>

      <EmailFooter />
    </div>
  );
};
