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
        "Not at all! Walk-ins are always welcome if we have space. But if you want to make sure you get a table at your preferred time, you can book a reservation quickly through our website.",
    },
    {
      question: "Can I order food online?",
      answer:
        "Yes! You can order pickup directly from our website. Just place your order online, and we’ll have your favorite Chinese dishes ready for you when you arrive.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer:
        "Of course. We have vegetarian, vegan, and gluten-free options available. If you have specific dietary needs, just let us know when you order or book, and we’ll do our best to take care of you.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, we’ve got plenty of parking near the restaurant. You’ll find it easy and convenient to stop by, whether you’re dining in or picking up an order.",
    },
    {
      question: "Can I host a private event?",
      answer:
        "Definitely! We’d love to host your special occasion or gathering. You can book private events directly through our website, and we’ll work with you to create a menu and setup that fits your celebration.",
    },
    {
      question: "Do you serve alcohol?",
      answer:
        "Yes, we have a great selection of drinks to go along with your meal, including beer, wine, and cocktails that pair perfectly with Chinese cuisine.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, all major credit cards, and popular digital payments. Pay however you like — we keep it simple.",
    },
    {
      question: "Is the restaurant family-friendly?",
      answer:
        "Absolutely! We welcome families and kids of all ages. We’ve got options on the menu for everyone, and high chairs are available if you need them.",
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
                <AccordionTrigger className="text-left font-chivo font-semibold text-md py-3">
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
            <Button asChild size="lg" variant={"secondary"}>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
