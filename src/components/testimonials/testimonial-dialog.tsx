import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
  };
}

export const TestimonialDialog = ({
  isOpen,
  onClose,
  testimonial,
}: TestimonialDialogProps) => {
  const renderStars = (rating: number) =>
    Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            rating > index
              ? "fill-yellow-500 text-yellow-500 animate-pulse"
              : "text-primary/30"
          }`}
        />
      ));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-2xl 
          border border-primary/20 
          rounded-xl 
          animate-[fadeInUp_0.5s_ease] 
          transition-luxury
          px-0
          py-0
          overflow-hidden
          pb-4 
        "
      >
        <DialogHeader className="space-y-6 bg-muted px-3 py-4 rounded-2xl">
          <div className="flex items-center space-x-4">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-glow animate-[float_6s_ease-in-out_infinite]"
            />
            <div>
              <DialogTitle className="text-2xl font-cinzel font-semibold text-foreground tracking-wide">
                {testimonial.name}
              </DialogTitle>
              <p className="text-muted-foreground font-chivo text-lg">
                {testimonial.role}
              </p>
              <div className="flex items-center mt-2 space-x-1">
                {renderStars(testimonial.rating)}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable content for long reviews */}
        {/* Scrollable content for long reviews */}
        <ScrollArea className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          <blockquote className="relative px-8 py-6">
            {/* Opening quote */}
            <span className="absolute top-0 left-0 -translate-x-4 -translate-y-2 text-6xl text-primary/20 font-cinzel leading-none select-none">
              “
            </span>

            {/* Testimonial text */}
            <p className="text-lg font-chivo leading-relaxed text-foreground italic">
              {testimonial.content}
            </p>

            {/* Closing quote */}
            <span className="absolute bottom-0 right-0 translate-x-2 translate-y-4 text-6xl text-primary/20 font-cinzel leading-none select-none">
              ”
            </span>
          </blockquote>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
