import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-btn text-btn-text hover:opacity-90",
  secondary:
    "border border-forest text-forest hover:bg-forest hover:text-btn-text dark:hover:text-forest-deep",
  ghost:
    "text-forest underline-offset-4 hover:underline",
};

type ButtonProps = {
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  className,
  children,
  external,
  download,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200",
    variants[variant],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          download={download}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} download={download}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
