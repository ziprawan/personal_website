"use client"
import Image, { ImageLoader, ImageProps } from "next/image";

const contentfulLoader: ImageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage({ alt, ...props }: ImageProps) {
  return <Image loader={contentfulLoader} {...props} alt={alt} />;
}
