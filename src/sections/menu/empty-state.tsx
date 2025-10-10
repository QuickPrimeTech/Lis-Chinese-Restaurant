import { SearchX, Sparkles, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  searchTerm?: string;
  onClearSearch?: () => void;
  className?: string;
}

export const EmptyState = ({
  title,
  searchTerm,
  onClearSearch,
  className,
}: EmptyStateProps) => {
  return (
    <Card
      className={cn(
        `relative overflow-hidden border-2 max-w-2xl mx-auto ${className}`
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(var(--empty-state-bg))] rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[hsl(var(--empty-state-icon))] rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

      <div className="relative flex flex-col items-center justify-center py-16 px-8">
        {/* Animated icon stack */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl animate-pulse" />
          <div className="relative bg-[hsl(var(--empty-state-icon))] rounded-2xl p-8 shadow-lg">
            <div className="relative">
              <SearchX
                className="w-16 h-16 text-primary animate-fade-in"
                strokeWidth={1.5}
              />
              <Utensils className="absolute -top-2 -right-2 w-8 h-8 text-accent opacity-60 animate-fade-in" />
              <Sparkles className="absolute -bottom-1 -left-1 w-6 h-6 text-muted-foreground opacity-50 animate-fade-in" />
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-foreground mb-3 animate-fade-in text-center">
          {title}
        </h3>

        {searchTerm && (
          <div className="mb-4 px-4 py-2 bg-muted/50 rounded-lg border border-border/50 animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Searching for:{" "}
              <span className="font-semibold text-foreground">
                &quot;{searchTerm}&quot;
              </span>
            </p>
          </div>
        )}

        <p className="text-muted-foreground text-center max-w-md leading-relaxed mb-8 animate-fade-in text-lg">
          We couldn&apos;t find any food items matching your search. Don&apos;t
          worry, just change your search terms and you&apos;ll find it.
        </p>

        {onClearSearch && (
          <Button
            onClick={onClearSearch}
            size="lg"
            className="animate-fade-in shadow-lg hover:shadow-xl transition-shadow"
          >
            Clear Search & Browse All
          </Button>
        )}
      </div>
    </Card>
  );
};
