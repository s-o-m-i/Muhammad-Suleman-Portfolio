import Image, { type ImageProps } from "next/image";

export function SmartImage({ alt, src, ...props }: ImageProps) {
  const source = typeof src === "string" ? src : "";
  return <Image alt={alt} src={src} unoptimized={source.endsWith(".svg")} {...props} />;
}
