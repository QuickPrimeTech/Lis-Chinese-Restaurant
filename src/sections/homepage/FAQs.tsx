import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const FAQSection = () => {
  const faqs = [
    {
      question: "Do I need a reservation?",
      answer:
        "While walk-ins are welcome based on availability, we highly recommend making a reservation to ensure we can accommodate you at your preferred time. Reservations can be made online, by phone, or through our mobile app.",
    },
    {
      question: "What is the dress code?",
      answer:
        "We maintain an elegant dress code to preserve the sophisticated atmosphere. Business casual to formal attire is required. Jackets are recommended for gentlemen, and we kindly ask guests to avoid athletic wear, shorts, and flip-flops.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer:
        "Absolutely. Our culinary team is experienced in accommodating various dietary needs including vegetarian, vegan, gluten-free, and allergen-free options. Please inform us of any restrictions when making your reservation so we can prepare accordingly.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, we offer complimentary valet parking for all guests. Our valet service operates during all business hours. We also have partnerships with nearby parking facilities for additional convenience.",
    },
    {
      question: "Can I host private events?",
      answer:
        "Certainly! We specialize in private dining experiences for special occasions, corporate events, and celebrations. Our private dining rooms can accommodate groups from 8 to 50 guests, with customizable menus and dedicated service.",
    },
    {
      question: "Do you offer wine pairings?",
      answer:
        "Yes, our sommelier has carefully curated wine pairings for each dish on our menu. We offer both individual pairings and full tasting experiences. Our wine selection includes rare vintages and exclusive bottles from renowned vineyards worldwide.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, cash, and digital payment methods. For private events and large parties, we can also arrange invoicing and corporate payment options.",
    },
    {
      question: "Is the restaurant child-friendly?",
      answer:
        "While we welcome guests of all ages, our atmosphere is designed for a refined dining experience. We offer a children's menu and can provide high chairs upon request. We recommend our earlier seating times for families with young children.",
    },
  ];

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground font-chivo">
              Everything you need to know for the perfect dining experience
            </p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-background"
              >
                <AccordionTrigger className="text-left font-cinzel font-semibold text-lg hover:text-primary transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-chivo leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground font-chivo mb-6">
              Still have questions? We&apos;re here to help.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
