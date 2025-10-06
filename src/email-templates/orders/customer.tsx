import React from "react";
import { site } from "@/config/site-config";
import { EmailFooter } from "../components/footer";
import { EmailHeader } from "../components/header";
import {
  OrderItem,
  InfoRow,
  OrderItemsTable,
  linkStyle,
  infoCard,
} from "../components/orders";

interface CustomerOrderEmailProps {
  items: OrderItem[];
  total: number;
  phone: string;
  email: string;
  customerName: string;
  orderId: string;
  paymentMethod: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
}

export const CustomerConfirmationEmail = ({
  items,
  total,
  phone,
  email,
  customerName = "Customer",
  orderId,
  paymentMethod = "M-Pesa",
  pickupDate,
  pickupTime,
  specialInstructions,
}: CustomerOrderEmailProps) => {
  const { restaurant } = site;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#ffffff",
      }}
    >
      <EmailHeader />

      <table style={{ width: "100%" }} cellPadding={0} cellSpacing={0}>
        <tr>
          <td style={{ padding: 32 }}>
            <h2
              style={{
                color: "hsl(0, 65%, 45%)",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              🎉 Order Confirmed!
            </h2>

            <p
              style={{
                color: "hsl(220, 13%, 40%)",
                fontSize: 16,
                marginBottom: 24,
              }}
            >
              Hi <b>{customerName}</b>, your order has been successfully
              received by <b>{restaurant.name}</b>. We’re already preparing it
              for you! 🎈
            </p>

            {/* 🧾 Customer Info Card */}
            <table style={infoCard}>
              <tr>
                <td style={{ padding: 24 }}>
                  <table style={{ width: "100%" }}>
                    {orderId && <InfoRow label="Order ID" value={orderId} />}
                    <InfoRow label="Customer" value={customerName} />
                    <InfoRow
                      label="Phone"
                      value={
                        <a href={`tel:${phone}`} style={linkStyle}>
                          {phone}
                        </a>
                      }
                    />
                    {email && <InfoRow label="Email" value={email} />}
                    {pickupDate && pickupTime && (
                      <InfoRow
                        label="Pickup"
                        value={`${pickupDate} at ${pickupTime}`}
                      />
                    )}
                    {specialInstructions && (
                      <InfoRow
                        label="Instructions"
                        value={specialInstructions}
                      />
                    )}
                    <InfoRow label="Payment Method" value={paymentMethod} />
                    <InfoRow
                      label="Total Amount"
                      value={<b>KES {total.toLocaleString()}</b>}
                    />
                  </table>
                </td>
              </tr>
            </table>

            {/* 🍲 Order Items */}
            <h3
              style={{
                color: "hsl(220, 13%, 25%)",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Order Items
            </h3>

            <OrderItemsTable items={items} />

            <p
              style={{
                fontSize: 14,
                color: "hsl(220, 13%, 40%)",
                marginTop: 24,
                lineHeight: 1.6,
              }}
            >
              Thank you for choosing <b>{restaurant.name}</b>! We’ll notify you
              when your order is ready for pickup or on its way. 🚗💨
            </p>

            <p
              style={{
                fontSize: 14,
                color: "hsl(220, 13%, 40%)",
                marginTop: 16,
              }}
            >
              Questions? Call us at{" "}
              <a href={`tel:${restaurant.phone}`} style={linkStyle}>
                {restaurant.phone}
              </a>{" "}
              or reply to this email.
            </p>
          </td>
        </tr>
      </table>

      <EmailFooter />
    </div>
  );
};
