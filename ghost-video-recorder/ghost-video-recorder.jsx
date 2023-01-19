/** @author Tolga Malkoc <ghostlexly@gmail.com> */

// import VideoRecorder from "../helpers/video-recorder/video-recorder";
// import VideoRecorder from "react-video-recorder";

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import ButtonWithIcon from "./../forms/button-with-icon";

export default function GhostVideoRecorderComponent({
  isRecordingDone,
  setIsRecordingDone,
  blobsRecorded,
  setBlobsRecorded,
  videoTimeoutInitial = 60, // in seconds
}) {
  const [cameraStream, setCameraStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer1, setTimer1] = useState(null);
  const [timeoutTimer, setTimeoutTimer] = useState(null);
  const [timeoutRemaining, setTimeoutRemaining] = useState(null);
  let videoRef = useRef();
  let videoReplayRef = useRef();
  let groupStopRecording = useRef();

  const startCamera = async (e) => {
    e.preventDefault();

    // ask for permissions
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (!stream) {
      return false;
    }

    videoRef.current.srcObject = stream;

    try {
      videoRef.current.play();
    } catch (ex) {
      console.log("Can't autoplay the video stream.");
    }

    setCameraStream(stream);
  };

  const startRecording = async (e) => {
    // try mime types
    let supportedType = null;
    let types = ["video/webm", "video/mp4", "video/webm;codecs=h264", "video/webm;codecs=vp9", "video/webm;codecs=vp8"];

    for (let i in types) {
      if (MediaRecorder.isTypeSupported(types[i])) {
        supportedType = types[i];
        break;
      }
    }
    if (supportedType == null) {
      console.log("No supported type found for MediaRecorder");
      alert(
        "Votre navigateur est obsolète. Veuillez télécharger Google Chrome ou Firefox afin de procéder à l'enregistrement de votre vidéo."
      );
    }

    // set MIME type of recording as the first inside the types that is supported by this browser
    let mRecorder = new MediaRecorder(cameraStream, {
      mimeType: supportedType,
    });
    setMediaRecorder(mRecorder);

    // event : new recorded video blob available
    mRecorder.addEventListener("dataavailable", function (e) {
      setBlobsRecorded((blobsRecorded) => [...blobsRecorded, e.data]);
    });

    // event : recording stopped & all blobs sent
    mRecorder.addEventListener("stop", function () {
      setIsRecordingDone(true);
    });

    // start recording with each recorded blob having 1 second video
    console.log("started recording");
    mRecorder.start(1000);

    videoTimeoutStart();
  };

  const stopRecording = async (e) => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();

      cameraStream
        .getTracks() // get all tracks from the MediaStream
        .forEach((track) => track.stop()); // stop each of them
    }
  };

  useEffect(() => {
    if (isRecordingDone) {
      videoReplayRef.current.src = window.URL.createObjectURL(new Blob(blobsRecorded, { type: "video/mp4" }));
    }
  }, [isRecordingDone, blobsRecorded]);

  const startDownload = (e) => {
    e.preventDefault();

    // create local object URL from the recorded video blobs
    let dwnlUrl = URL.createObjectURL(new Blob(blobsRecorded, { type: "video/webm" }));

    let tempLink = document.createElement("a");
    tempLink.href = dwnlUrl;
    tempLink.setAttribute("download", "video.webm");
    tempLink.click();
  };

  const retryVideo = (e) => {
    e.preventDefault();
    setBlobsRecorded([]);
    setIsRecordingDone(false);
    setCameraStream(null);
  };

  const automaticHideWithTime = (ref) => {
    if (!ref.current) {
      return false;
    }

    let classList = ref.current.classList;

    classList.remove("opacity-0");
    classList.remove("duration-1000");
    classList.add("opacity-100");
    classList.add("duration-500");

    if (timer1) {
      clearTimeout(timer1);
    }

    setTimer1(
      setTimeout(() => {
        classList.remove("opacity-100");
        classList.remove("duration-500");

        classList.add("opacity-0");
        classList.add("duration-1000");
      }, 3000)
    );
  };

  const videoTimeoutStart = () => {
    if (timeoutTimer) {
      clearTimeout(timeoutTimer);
    }

    setTimeoutRemaining(videoTimeoutInitial);
  };

  // start timeout timer for this video
  useEffect(() => {
    if (timeoutRemaining !== null) {
      setTimeoutTimer(
        setTimeout(() => {
          if (timeoutRemaining > 0) {
            setTimeoutRemaining(timeoutRemaining - 1);
          } else {
            stopRecording();
          }
        }, 1000)
      );
    }
  }, [timeoutRemaining]);

  const DownloadIcon = () => {
    return (
      <svg
        className={"text-white"}
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path
          stroke="currentColor"
          d="M11.5 8h1v7.826l2.5-3.076.753.665-3.753 4.585-3.737-4.559.737-.677 2.5 3.064v-7.828zm7 12h-13c-2.481 0-4.5-2.019-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.79c.185-3.447 3.031-6.146 6.48-6.146 3.449 0 6.295 2.699 6.479 6.146l.043.79.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.481-2.019 4.5-4.5 4.5m.979-9.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408"
        />
      </svg>
    );
  };

  const RetryIcon = () => {
    return (
      <svg
        className={"text-white"}
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path
          stroke={"currentColor"}
          d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"
        />
      </svg>
    );
  };
  return (
    <>
      {!isRecordingDone && (
        <div
          className={"relative w-[auto] m-auto min-h-[90vh] h-full bg-gray-300 flex"}
          onMouseMove={(e) => automaticHideWithTime(groupStopRecording)}
        >
          {/*Start Camera Button*/}
          {!cameraStream && (
            <div className={"m-auto z-10"}>
              <p className={"font-semibold text-xl sm:text-lg"}>Appuyez pour démarrer la webcam</p>
              <div className={"h-[80px] w-[80px] border-8 rounded-[50%] border-white/50 m-auto mt-5"}>
                <button
                  onClick={startCamera}
                  className={"bg-red-500/50 w-[64px] h-[64px] cursor-pointer rounded-[50%] hover:bg-red-300"}
                ></button>
              </div>
            </div>
          )}

          {/*Start Recording Button*/}
          {cameraStream && (!mediaRecorder || mediaRecorder.state !== "recording") && (
            <div className={"m-auto z-10"}>
              <p className={"font-bold text-xl sm:text-xl text-white [text-shadow:0_4px_8px_rgb(20,19,19,0.85)]"}>
                Appuyez pour commencer à enregistrer
              </p>
              <div
                className={
                  "h-[80px] w-[80px] border-8 rounded-[50%] border-white/50 m-auto mt-5 shadow-[7px_7px_7px_#2824244d]"
                }
              >
                <button
                  onClick={startRecording}
                  className={
                    "bg-red-500/50 w-[64px] h-[64px] cursor-pointer rounded-[50%] hover:bg-red-300 drop-shadow-2xl"
                  }
                ></button>
              </div>
            </div>
          )}

          {/*Stop Recording Button*/}
          {cameraStream && mediaRecorder && mediaRecorder.state === "recording" && (
            <div className={"m-auto z-10 transition-opacity"} ref={groupStopRecording}>
              <p className={"font-bold text-xl sm:text-xl text-white [text-shadow:0_4px_8px_rgb(20,19,19,0.85)]"}>
                Appuyez pour terminer l'enregistrement
              </p>

              <div className={"w-[64px] h-[64px] cursor-pointer mt-5 rounded-[50%] m-auto"}>
                <svg
                  onClick={stopRecording}
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                >
                  <path d="M2 2h20v20h-20z" className={"fill-white/80 hover:fill-white"} />
                </svg>
              </div>
            </div>
          )}

          {/* Timeout video in seconds */}
          {cameraStream && mediaRecorder && mediaRecorder.state === "recording" && (
            <div className={"absolute right-10 top-5 z-10"}>
              <p className={"text-white text-4xl [text-shadow:0_4px_4px_rgb(20,19,19,0.65)]"}>{timeoutRemaining}s</p>
            </div>
          )}

          {/*Video Scene*/}
          <video
            ref={videoRef}
            muted
            autoPlay
            playsInline
            className={
              "absolute top-[50%] left-[50%] min-w-[100%] min-h-[100%] object-cover w-full h-full translate-y-[-50%] translate-x-[-50%]"
            }
          />
        </div>
      )}

      {isRecordingDone && (
        <div>
          <div className={"relative w-[auto] m-auto min-h-[90vh] h-full bg-gray-300 flex"}>
            <video
              ref={videoReplayRef}
              autoPlay
              playsInline
              loop
              controls
              className={
                "absolute top-[50%] left-[50%] min-w-[100%] min-h-[100%] object-cover w-full h-full translate-y-[-50%] translate-x-[-50%]"
              }
            />
          </div>

          <div className={"flex justify-center mt-5 gap-4"}>
            <ButtonWithIcon
              onClick={startDownload}
              className={"w-full max-w-xs text-white bg-blue-600 hover:bg-blue-300"}
              label={"Sauvegarder"}
              icon={DownloadIcon}
            />

            <ButtonWithIcon
              onClick={retryVideo}
              className={"w-full max-w-xs text-white bg-red-600 hover:bg-red-300"}
              label={"Recommencer"}
              icon={RetryIcon}
            />
          </div>
        </div>
      )}
    </>
  );
}
