# Exemple d'utilisation

```jsx
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import useFormToApi from "../../../../helpers/form-to-api";
import { useAxios } from "../../../../helpers/ghostlexly-auth";
import useSWR from "swr";
import LoadingDotsComponent from "../../../../components/loading-dots";
import LazyButton from "../../../../components/forms/lazy-button";
import GhostDropzone from "../../../../components/ghost-dropzone/ghost-dropzone";
import React from "react";

export default function MessageSenderPhoto() {
  const router = useRouter();
  const { uuid = "" } = router.query;
  const [loading, setLoading] = useState(false);
  const [messagePhoto, setMessagePhoto] = useState(false);
  const [existingFiles, setExistingFiles] = useState([]);
  const mainForm = useRef();
  const formToApi = useFormToApi();
  const api = useAxios();
  const random = React.useRef(Date.now());

  // retrieve from database the infos for this message
  const { data, error } = useSWR([`/api/messages/${uuid}?include=Company`, random]);

  useMemo(() => {
    setMessagePhoto(data && data.message_photo ? data.message_photo : false);

    if (data && data.message_photo) {
      setExistingFiles((existingFiles) => [...existingFiles, data.message_photo.media]);
    }
  }, [data]);
  if (!data && !error) return <LoadingDotsComponent />;

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    formToApi
      .send(mainForm.current)
      .then((res) => {
        router.push(`/message/${uuid}/sender/confirm`);
      })
      .catch((err) => {
        setLoading(false);
      });
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
              d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"
            />
          </svg>
          <h2 className="max-w-lg my-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl sm:leading-none text-center m-auto">
            Envoyer une <span className="inline-block text-primary-600">photo</span>
          </h2>
          <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
            Capturez un moment magique et transmettez vos sentiments et émotions avec une photo !
          </p>

          <form
            action={messagePhoto ? `/api/message_photos/${messagePhoto.uuid}` : `/api/message_photos`}
            method={messagePhoto ? "PATCH" : "POST"}
            ref={mainForm}
          >
            <input type={"hidden"} name={"message_uuid"} value={uuid} />
            <div className={"text-center max-w-md m-auto"}>
              <GhostDropzone
                uploadUrl={"/api/media?temporary=1"}
                deleteUrl={"/api/media"}
                previewUrl={"/api/media"}
                existingFiles={existingFiles}
                thumbnailWidth={900}
                thumbnailHeight={900}
                imgClassNames={"!w-[300px] !h-[300px]"}
                filenameProp={"filename"}
              />
            </div>
            <div className={"mt-5 max-w-xs text-center m-auto"}>
              <LazyButton
                label={"Envoyer"}
                onClick={onSubmit}
                loading={loading}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-primary-600 rounded-md hover:bg-primary-400 focus:outline-none focus:bg-gray-600"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
```
