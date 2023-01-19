// CanvasRecorder.js - smusamashah
// To record canvas effitiently using MediaRecorder
// https://webrtc.github.io/samples/src/content/capture/canvas-record/

/**
 * Usage:
 * const recorder = new CanvasRecorder(document.querySelector("#jeeFaceFilterCanvas"));
 * recorder.start();
 *
 *  setTimeout(() => {
 *       recorder.stop();
 *       recorder.save("coucou.webm");
 *  }, 9000);
 *
 * @param canvas
 * @param video_bits_per_sec
 * @param isRunning
 * @param setIsRunning
 * @constructor
 */

export function CanvasRecorder({ canvas, video_bits_per_sec, isRunning, setIsRunning }) {
  this.start = startRecording;
  this.stop = stopRecording;
  this.save = download;
  this.getRecordedBlobs = getRecordedBlobs;
  this.getMediaRecorder = getMediaRecorder;

  let recordedBlobs = [];
  let supportedType = null;
  let mediaRecorder = null;

  const video = document.createElement("video");
  video.style.display = "none";

  async function startRecording() {
    setIsRunning(true);

    canvas.getContext("webgl2");
    let stream = canvas.captureStream();
    if (typeof stream == undefined || !stream) {
      return;
    }

    // let types = ["video/mp4", "video/webm"];
    let types = ["video/webm", "video/mp4", "video/webm;codecs=vp8", "video/webm;codecs=h264", "video/webm;codecs=vp9"];

    for (let i in types) {
      if (MediaRecorder.isTypeSupported(types[i])) {
        supportedType = types[i];
        break;
      }
    }
    if (supportedType == null) {
      console.log("No supported type found for MediaRecorder");
      alert("No supported type found for MediaRecorder");
    }
    let options = {
      mimeType: supportedType,
      videoBitsPerSecond: video_bits_per_sec || 1500000, // 2.5Mbps
    };

    recordedBlobs = [];
    try {
      // request access to micro & camera
      const constraints = { audio: true, video: true };
      const audioStream = await navigator.mediaDevices.getUserMedia(constraints);
      const mixedStream = new MediaStream([stream.getVideoTracks()[0], audioStream.getAudioTracks()[0]]);

      mediaRecorder = new MediaRecorder(mixedStream, options);
    } catch (e) {
      console.error("Exception while creating MediaRecorder:", e);
      alert("Navigateur incompatible.");
    }

    console.log("Created MediaRecorder", mediaRecorder, "with options", options);
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(100); // collect 100ms of data blobs
    console.log("MediaRecorder started", mediaRecorder);
  }

  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  function handleStop(event) {
    console.log("Recorder stopped: ", event);
    const superBuffer = new Blob(recordedBlobs, { type: supportedType });
    video.src = window.URL.createObjectURL(superBuffer);
  }

  function stopRecording() {
    setIsRunning(false);

    mediaRecorder.stop();
    console.log("Recorded Blobs: ", recordedBlobs);
    video.controls = true;
  }

  function getRecordedBlobs() {
    return new Blob(recordedBlobs, { type: supportedType });
  }

  function download(file_name) {
    const name = file_name || "recording.webm";
    const blob = new Blob(recordedBlobs, { type: supportedType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  function getMediaRecorder() {
    return mediaRecorder;
  }
}
