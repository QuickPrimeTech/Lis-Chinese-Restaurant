import { CustomerConfirmationEmail } from "@/email-templates/contact/customer";

export default function EmailTest() {
  return (
    <CustomerConfirmationEmail
      customerName="Derick Kibiwott"
      inquiryType="Private Event"
    />
  );
}
