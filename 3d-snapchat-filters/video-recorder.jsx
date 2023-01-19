import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { CanvasRecorder } from "../helpers/facefilter/canvas-recorder";
import { useAxios } from "../helpers/ghostlexly-auth";
import { clearFilters } from "../helpers/facefilter/facefilter";

export default function VideoRecorderThree() {
  const canvas = useRef();
  const [downloadLink, setDownloadLink] = useState("");
  const [mediaRec, setMediaRec] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [blobsRecorded, setBlobsRecorded] = useState([]);
  const api = useAxios();

  useEffect(() => {
    if (document.querySelector("#jeeFaceFilterCanvas") && window && !isStarted) {
      setIsStarted(true);

      setMediaRec(
        new CanvasRecorder({ canvas: document.querySelector("#jeeFaceFilterCanvas"), isRunning, setIsRunning })
      );
    }
  });

  const stopRecording = async (e) => {
    clearFilters();
    console.log("clear filters");
    return false;

    console.log(isRunning);
    console.log("recorder stopping");
    mediaRec.stop();

    let data = new FormData();
    // let recording = new File(blobsRecorded, "recording.webm", { type: "video/webm" });
    console.log(blobsRecorded);
    data.append("file", new Blob(blobsRecorded, { type: "video/webm" }), "test.webm");

    api.post("/api/media/video", data, {
      header: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      },
    });
  };

  const startRecording = async (e) => {
    e.preventDefault();

    // if it's already running, ignore it
    if (mediaRec && mediaRec.state === "recording") {
      return false;
    }

    let supportedType = null;
    let mRecorder = null;
    setBlobsRecorded([]);

    canvas.current.getContext("webgl2");

    let stream = canvas.current.captureStream();
    if (!stream) {
      return;
    }

    setIsRunning(true);

    let types = ["video/webm", "video/mp4", "video/webm;codecs=vp8", "video/webm;codecs=h264", "video/webm;codecs=vp9"];

    for (let i in types) {
      if (MediaRecorder.isTypeSupported(types[i])) {
        supportedType = types[i];
        break;
      }
    }

    if (supportedType == null) {
      console.log("No supported type found for MediaRecorder");
      alert(
        "Votre navigateur internet est obsolète, veuillez réessayer avec le navigateur internet Google Chrome ou Firefox."
      );
    }

    let options = {
      mimeType: supportedType,
      videoBitsPerSecond: 1500000, // 2.5Mbps
    };

    try {
      // request access to micro & camera
      const constraints = { audio: true, video: true };
      const audioStream = await navigator.mediaDevices.getUserMedia(constraints);
      const mixedStream = new MediaStream([stream.getVideoTracks()[0], audioStream.getAudioTracks()[0]]);

      mRecorder = new MediaRecorder(mixedStream, options);
      setMediaRec(mRecorder);
    } catch (e) {
      console.error("Exception while creating MediaRecorder:", e);
      alert(
        "2 - Votre navigateur internet est obsolète, veuillez réessayer avec le navigateur internet Google Chrome ou Firefox."
      );
      return false;
    }

    // event : new recorded video blob available
    mRecorder.addEventListener("dataavailable", function (e) {
      setBlobsRecorded((blobsRecorded) => [...blobsRecorded, e.data]);
    });

    // event : recording stopped & all blobs sent
    mRecorder.addEventListener("stop", function () {
      // create local object URL from the recorded video blobs
      let dwnlUrl = URL.createObjectURL(new Blob(blobsRecorded, { type: "video/webm" }));
      setDownloadLink(dwnlUrl);
    });

    mRecorder.start(100); // collect 100ms of data blobs
    console.log("recording started");
  };

  return (
    <>
      <canvas ref={canvas} id="jeeFaceFilterCanvas" className={"w-[500px] h-[500px] m-auto"}></canvas>

      <a onClick={startRecording}>Start Recording</a>

      <a onClick={stopRecording}>Stop Recording</a>

      <a href={downloadLink} download="test.webm">
        Download Video
      </a>
    </>
  );
}
