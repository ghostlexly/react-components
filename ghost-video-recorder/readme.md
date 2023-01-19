# Exemple d'utilisation

```jsx
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useAxios } from "../../../../../helpers/ghostlexly-auth";
import useSWR from "swr";
import LoadingDotsComponent from "../../../../../components/loading-dots";
import { toast } from "react-toastify";
import LazyButton from "../../../../../components/forms/lazy-button";
import React from "react";
import GhostVideoRecorderComponent from "../../../../../components/ghost-video-recorder/ghost-video-recorder";

export default function MessageSenderVideoRecorder() {
  const router = useRouter();
  const { uuid = "" } = router.query;
  const [loading, setLoading] = useState(false);
  const [messageVideo, setMessageVideo] = useState(null);
  const [isRecordingDone, setIsRecordingDone] = useState(false);
  const [blobsRecorded, setBlobsRecorded] = useState([]);
  const api = useAxios();
  const random = React.useRef(Date.now());

  // retrieve from database the infos for this message
  const { data, error } = useSWR([`/api/messages/${uuid}?include=Company`, random], (url) =>
    api.get(url).then((res) => res.data)
  );

  useMemo(() => {
    setMessageVideo(data && data.message_video ? data.message_video : null);
  }, [data]);
  if (!data && !error) return <LoadingDotsComponent color={"purple"} />;

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // send video first & receive api
    let formData = new FormData();
    formData.append("file", new Blob(blobsRecorded), "video_recorded_on_website.webm");

    const res = await api
      .post("/api/media/video", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }

        return false;
      });

    // check if request has not returned error
    if (!res) {
      setLoading(false);
      return false;
    }

    if (!messageVideo) {
      api.post("/api/message_videos", { message_uuid: uuid, media_uuid: res.data.uuid }).then((res) => {
        toast.success("Votre message a bien été enregistré.");
        router.push(`/company/${data.company.name}/sender/${data.sender_email}/packages`);
      });
    } else {
      api.patch(`/api/message_videos/${messageVideo.uuid}`, { media_uuid: res.data.uuid }).then((res) => {
        toast.success("Votre message a bien été mis à jour.");
        router.push(`/company/${data.company.name}/sender/${data.sender_email}/packages`);
      });
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="container px-6 py-10 mx-auto text-center">
          <svg
            width="100px"
            height="100px"
            viewBox="0 0 25 25"
            className={"text-primary-600 mx-auto mb-5"}
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path
              stroke="currentColor"
              strokeWidth="1"
              d="M15 3c1.104 0 2 .896 2 2v4l7-4v14l-7-4v4c0 1.104-.896 2-2 2h-13c-1.104 0-2-.896-2-2v-14c0-1.104.896-2 2-2h13zm0 17c.552 0 1-.448 1-1v-14c0-.551-.448-1-1-1h-13c-.551 0-1 .449-1 1v14c0 .552.449 1 1 1h13zm2-9.848v3.696l6 3.429v-10.554l-6 3.429z"
            />
          </svg>

          <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl text-primary-700">Envoyer une vidéo</h1>

          <p className="my-6 text-gray-500">
            Faites une surprise à vos proches avec une vidéo ! <br />
            Utilisez nos filtres pour les surprendre. <br />
          </p>

          <GhostVideoRecorderComponent
            isRecordingDone={isRecordingDone}
            setIsRecordingDone={setIsRecordingDone}
            blobsRecorded={blobsRecorded}
            setBlobsRecorded={setBlobsRecorded}
          />

          {isRecordingDone && (
            <div className={"mt-5 max-w-xs text-center m-auto"}>
              <LazyButton
                label={"Envoyer"}
                onClick={onSubmit}
                loading={loading}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-primary-600 rounded-md hover:bg-primary-400 focus:outline-none focus:bg-gray-600"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
```
