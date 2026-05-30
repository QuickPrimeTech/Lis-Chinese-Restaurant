"use client";
import NextImage from "next/image";
import { ComponentProps, useState } from "react";
import { ImageOff, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

type ImageWithFallbackProps = Omit<
  React.ComponentProps<typeof NextImage>,
  "src"
> & {
  src: string | null;
  iconProps?: Partial<LucideProps>;
  textProps?: ComponentProps<"span">;
  containerClass?: string;
};

export function Image({
  src,
  alt,
  iconProps,
  containerClass,
  textProps,
  ...props
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Show fallback if src is null or empty, or if image fails to load
  const showFallback = !src || imageError;

  if (showFallback) {
    return (
      <div
        className={cn(
          "w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground",
          containerClass,
        )}
      >
        <ImageOff
          className={cn("size-8 mb-2 opacity-50", iconProps?.className)}
          {...iconProps}
        />
        <span
          className={cn("text-sm font-medium", textProps?.className)}
          {...textProps}
        >
          {textProps?.children
            ? textProps?.children
            : !src
              ? "No Image"
              : "Failed to load"}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full", containerClass)}>
      {/* Show skeleton while loading if no LQIP */}
      {isLoading && !props.blurDataURL && (
        <Skeleton className="absolute inset-0 size-full" />
      )}

      <NextImage
        src={src as string}
        alt={alt || "Image"}
        {...props}
        onLoad={() => setIsLoading(false)}
        onError={() => setImageError(true)}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          props.className,
        )}
      />
    </div>
  );
}

export default Image;
