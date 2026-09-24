import { preload } from "react-dom";
import { photoProps } from "../lib/images";

// One <picture> for every photo on the site (AVIF, then WebP, then JPEG).
// - While it loads the <img> sits on a solid neutral surface; there is no
//   blur-up preview that could be left blurred.
// - Lazy by default. `priority` marks the first visible photo on a page:
//   it loads eagerly with fetchpriority="high" and is preloaded from <head>
//   (AVIF only; browsers without AVIF skip the hint and load normally).
// - `alt=""` marks a photo as purely decorative. Extra props (className,
//   onError, ...) go to the <img>.
export default function Photo({
  photo,
  width,
  ratio,
  sizes,
  priority = false,
  alt,
  style,
  pictureClassName = "photo-picture",
  ...rest
}) {
  const { sources, img } = photoProps(photo, { width, ratio, sizes });

  if (priority) {
    preload(img.src, {
      as: "image",
      type: "image/avif",
      imageSrcSet: sources[0].srcSet,
      imageSizes: img.sizes,
      fetchPriority: "high",
    });
  }

  return (
    <picture className={pictureClassName}>
      {sources.map((source) => (
        <source
          key={source.type}
          type={source.type}
          srcSet={source.srcSet}
          sizes={img.sizes}
        />
      ))}
      <img
        {...img}
        alt={alt ?? photo.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={style}
        {...rest}
      />
    </picture>
  );
}
