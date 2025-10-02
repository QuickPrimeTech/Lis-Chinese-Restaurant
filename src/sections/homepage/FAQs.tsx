import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FAQ = {
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
};

export const FAQSection = ({ faqs }: FAQ) => {
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
