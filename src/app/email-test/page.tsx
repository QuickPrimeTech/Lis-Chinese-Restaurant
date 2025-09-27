import { CustomerConfirmationEmail } from "@/email-templates/reservations/customer";
import { OwnerConfirmationEmail } from "@/email-templates/reservations/owner";

export default function EmailTest() {
  return (
    <>
      <CustomerConfirmationEmail
        firstName="Derick"
        lastName="Kibiwott"
        email="kibiwottderick@gmail.com"
        phone="0717448835"
        date={new Date()}
        time="3:30PM"
        guests="8+"
        diningPreference="outdoors"
        occasion="Birthday"
        requests="I want my cake perfect and no fucking around"
      />

      <OwnerConfirmationEmail
        firstName="Derick"
        lastName="Kibiwott"
        email="kibiwottderick@gmail.com"
        phone="0717448835"
        date={new Date()}
        time="3:30PM"
        guests="8+"
        diningPreference="outdoors"
        occasion="Birthday"
        requests="I want my cake perfect and no fucking around"
      />
    </>
  );
}
