import { CustomerConfirmationEmail } from "@/email-templates/private-events/customer"; // Adjust path as needed
import { OwnerConfirmationEmail } from "@/email-templates/private-events/owner"; // Adjust path as needed

const sampleProps = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Corp", // Optional
  eventType: "Corporate Meeting",
  guests: "20-30",
  budget: "KSh 150,000 – KSh 300,000", // Optional
  date: new Date("2025-11-15"), // Sample future date
  details:
    "We'd like a formal setup with AV equipment and catering for international guests.", // Optional
};

export default function TestEmailPage() {
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        fontFamily: "Arial, Helvetica, sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div style={{ maxWidth: "600px", width: "100%" }}>
        <OwnerConfirmationEmail {...sampleProps} />
        <CustomerConfirmationEmail {...sampleProps} />
      </div>
    </div>
  );
}
