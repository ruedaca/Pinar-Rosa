import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: string;
  className?: string;
};

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("eyebrow text-pr-gray-700", className)}>
      <span aria-hidden className="mr-1.5 text-pr-green-1">
        +
      </span>
      {children}
    </p>
  );
}
