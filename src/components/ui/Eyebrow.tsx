import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: string;
  className?: string;
};

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("eyebrow text-pr-gray-700", className)}>
      <span aria-hidden className="text-pr-green-1 mr-1.5">
        +
      </span>
      {children}
    </p>
  );
}
