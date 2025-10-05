import { OwnerConfirmationEmail } from "@/email-templates/careers/owner";

export default function EmailTest() {
  return (
    <>
      <OwnerConfirmationEmail
        firstName="Derick"
        lastName="Kibiwott"
        email="kibiwottderick@gmail.com"
        phone="0717448835"
        address="Wood Moi Avenue, Nairobi"
        dateOfBirth="27-09-2005"
        position="Head Chef"
        experience="10+ Years"
        previousEmployment="I have no previous employment because this is just a test email"
        skills={["cooking", "cleaning"]}
        languages={["Mandarin", "English"]}
        startDate={"26-10-2025"}
        hoursPerWeek="40 hrs"
        coverLetter="This is just a test email so there is no cover letter"
        references="This is a test email so there are no references"
        cvUrl="https://fuckyou.com"
      />
    </>
  );
}
