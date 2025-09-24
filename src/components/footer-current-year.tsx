"use client";

export function FooterCurrentYear() {
  return (
    <footer className="text-center py-4">
      <p>
        &copy; {new Date().getFullYear()} Li&apos;s Chinese Restaurant Nairobi.
        All rights reserved.
      </p>
    </footer>
  );
}
