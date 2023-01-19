/** @author Tolga MALKOC <ghostlexly@gmail.com>
 *
 * 1) install
 *    yarn add video.js
 *
 * 2) append
 *    @import "video.js/dist/video-js.css";
 * on your globals.css file.
 */

import { useCallback, useEffect, useState } from "react";
import videojs from "video.js";

export default function GhostVideo({ src, contentType, className, ...props }) {
  const [videoEl, setVideoEl] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return;
    const player = videojs(
      videoEl,
      {
        sources: [
          {
            src: src,
            type: contentType,
          },
        ],
      },
      function () {
        this.on("error", function (event) {
          // important - retry to load the video-player 3 times if it fails
          if (retryCount < 3) {
            setRetryCount((current) => current + 1);
            this.load();
          }
        });
      }
    );

    return () => {
      player.dispose();
    };
  }, [videoEl]);

  return (
    <>
      <div data-vjs-player="">
        <video ref={onVideo} className={`video-js ${className}`} playsInline {...props} />
      </div>
    </>
  );
}
