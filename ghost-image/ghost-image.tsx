/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Property } from "csstype";
import ObjectFit = Property.ObjectFit;

/**
 * Generate a react-optimized image with automatic lazy, blur and quality change.
 *
 * Sharp is highly recommanded for optimization: yarn add sharp
 *
 * @param src can contains external URL or (better for performance) a direct link with "import profilePic from "../public/me.png""
 * @param alt
 * @param className
 * @param containerClassName
 * @param objectFit
 * @param objectPosition
 * @param priority
 * @param preview
 * @returns {JSX.Element}
 * @constructor
 */
export default function GhostImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  objectFit = "fill" as ObjectFit,
  objectPosition = "center",
  priority = false,
  preview = false,
}) {
  // ! important ! - fix src paths with Docker - replace domain name with http://nginx
  if (typeof src === "string") {
    src = src.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/g, "https://nginx");
  }

  const [placeholder, setPlaceholder] = useState(() => {
    // set placeholder (blur) image
    if (preview) {
      return "data:image/jpeg;base64," + preview;
    } else if (typeof src === "object") {
      return null;
    } else {
      return "empty";
    }
  });

  return (
    <div className={containerClassName}>
      <div className={`relative h-full w-full`}>
        <Image
          className={className}
          key={src.toString()}
          src={src}
          alt={alt}
          quality={75}
          layout={"fill"}
          objectFit={objectFit}
          objectPosition={objectPosition}
          placeholder={placeholder !== "empty" ? "blur" : null}
          blurDataURL={placeholder}
          priority={priority}
          style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
        />
      </div>
    </div>
  );
}
