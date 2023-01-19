/** @author Tolga Malkoc <ghostlexly@gmail.com> */

// 1) install: yarn add dropzone 5.9.3 (attention à la version ! - les dernières versions ne fonctionnent pas en mode production sur NextJS)
// 2) add @import "dropzone/dist/dropzone.css"; inside /styles/globals.css
// infos: https://www.dropzone.dev/
// ps: Pour centrer les images de thumbnail, il suffit de mettre text-center sur le div parent quand on utilise DropzoneComponent, qui englobe le composant DropzoneComponent (pas dans ce fichier)
// ps: Si tu utilise SWR pour transmettre les infos au dropzone, il faut désactiver les caches du SWR sans quoi ça risque de bug
// all dropzone events that i can listen with "this.on" and override them, are available in the file "options.js" : https://github.com/dropzone/dropzone/blob/6249bfc1af493aba43fe4b7198f9571b2d3d9c24/src/options.js

import { useEffect, useMemo, useState } from "react";
import { makeRandom } from "../../helpers/helpers";
import { useAxios } from "../../helpers/ghostlexly-auth";

export default function GhostDropzone({
  uploadUrl,
  deleteUrl = uploadUrl,
  previewUrl = uploadUrl,
  existingFiles = [],
  maxFiles = 1,
  inputName = "media_uuid",
  previewIdentifierProp = "uuid",
  deleteIdentifierProp = "uuid",
  existingFileDeleteIdentifierProp = "uuid",
  filenameProp = "filename",
  thumbnailResizeWidth = "150",
  thumbnailResizeHeight = "150",
  imgClassNames = "", // add thumbnail resize settings with classnames on img parent div
  label = "Par ici la photo !",
}) {
  const api = useAxios();

  let random = makeRandom(20);
  let random2 = makeRandom(20);
  const [dropzoneInstance, setDropzoneInstance] = useState(false);
  const [existingFilesInitialized, setExistingFilesInitialized] = useState(false);
  const [filesDragged, setFilesDragged] = useState([]);

  useEffect(() => {
    async function initDropzone() {
      let dropContainer = dropzoneInstance ? dropzoneInstance : null;

      // prevent attaching dropzone 2 times
      if (!dropContainer) {
        const Dropzone = (await import("dropzone")).default;

        Dropzone.autoDiscover = false;

        if (!document.querySelector(`#${random}`) || !document.querySelector(`#${random2}`)) {
          return false;
        }

        // attach dropzone
        dropContainer = new Dropzone(`#${random}`, {
          url: uploadUrl,
          paramName: "file",
          maxFiles: maxFiles,
          previewTemplate: document.querySelector(`#${random2}`).innerHTML,
          thumbnailWidth: thumbnailResizeWidth,
          thumbnailHeight: thumbnailResizeHeight,

          // customize errors output for my error system
          error: (file, message) => {
            if (file.previewElement) {
              file.previewElement.classList.add("dz-error");

              if (message.message) {
                message = message.message;
              } else if (message.exception) {
                message = message.exception;
              }

              for (let node of file.previewElement.querySelectorAll("[data-dz-errormessage]")) {
                node.textContent = message;
              }
            }
          },

          init: function () {
            this.on("removedfile", (file) => {
              if (file.status === "success") {
                const resp = JSON.parse(file.xhr.response);
                api.delete(`${deleteUrl}/${resp[deleteIdentifierProp]}`);
              } else if (file.dataURL && new RegExp("^/").exec(file.dataURL)) {
                api.delete(file.dataURL);
              }
            });

            this.on("success", (file) => {
              // examples...
              // file.previewElement.querySelectorAll("[data-dz-remove]")...
              // myDropzone.removeFile(file);

              if (file.xhr.response) {
                const resp = JSON.parse(file.xhr.response);
                setFilesDragged([...filesDragged, resp[deleteIdentifierProp]]);
              }
            });
          },

          // dictDefaultMessage: "traductions",
          // clickable: "#clickhere", // make this div's onClick event opens the dropzone's file select dialog
        });

        setDropzoneInstance(dropContainer);
      }

      // attach and display already existing files retrived from database
      if (existingFiles && dropContainer && !existingFilesInitialized) {
        setExistingFilesInitialized(true);

        // if (dropzoneInstance.files.length !== 0) {
        //   dropzoneInstance.removeAllFiles();
        // }

        existingFiles.map((item) => {
          let mockFile = {
            name: item[filenameProp] ? item[filenameProp] : "Nom inconnu",
            dataURL: `${deleteUrl}/${item[existingFileDeleteIdentifierProp]}`,
          };
          dropContainer.options.addedfile.call(dropContainer, mockFile);
          dropContainer.files.push(mockFile); // here you add them into the files array

          if (!item.mime_type || /image\//.exec(item.mime_type)) {
            dropContainer.options.thumbnail.call(
              dropContainer,
              mockFile,
              `${previewUrl}/${item[previewIdentifierProp]}`
            );
          }

          dropContainer.options.success.call(dropContainer, mockFile);
          dropContainer.options.complete.call(dropContainer, mockFile);

          setFilesDragged([...filesDragged, item[existingFileDeleteIdentifierProp]]);
        });
      }
    }

    initDropzone();
  }, [existingFiles]);
  return (
    <>
      <div>
        <div
          className={`dropzone rounded-[2.5rem] border-white bg-[length:16px_16px] shadow`}
          id={random}
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.03) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0.03) 75%, transparent 75%, transparent",
          }}
        >
          <div className={`dz-message`}>
            <h4 className={"text-2xl font-semibold text-gray-800"}>{label}</h4>
            <p>Déposez vos fichiers ici !</p>
          </div>
        </div>

        {/*Set custom template for Dropbox*/}
        <div id={random2} className={"hidden"}>
          <div className="dz-preview dz-file-preview">
            <div className={"dz-image " + imgClassNames}>
              <img data-dz-thumbnail="" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div className="dz-details">
              <div className="dz-size">
                <span data-dz-size=""></span>
              </div>
              <div className="dz-filename">
                <span data-dz-name=""></span>
              </div>
            </div>
            <div className="dz-progress">
              <span className="dz-upload" data-dz-uploadprogress=""></span>
            </div>

            <div className="dz-error-message">
              <span data-dz-errormessage=""></span>
            </div>

            <div className="dz-success-mark bg-gray-500/90 rounded-full">
              <svg width="54" height="54" viewBox="0 0 54 54" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z"></path>
              </svg>
            </div>

            <div className="dz-error-mark bg-red-500/90 rounded-full" data-dz-remove="">
              <svg width="54" height="54" viewBox="0 0 54 54" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z"></path>
              </svg>
            </div>

            <div className={"text-center mt-1"} data-dz-remove="" style={{ cursor: "pointer" }}>
              <svg
                className={"m-auto cursor-pointer"}
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path
                  className={"cursor-pointer"}
                  d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/*Automatically generate hidden inputs for each file*/}
        {filesDragged.map((item, i) => (
          <input
            type={"hidden"}
            name={filesDragged.length > 1 ? `${inputName}[]` : `${inputName}`}
            key={item + i}
            value={item}
          />
        ))}
      </div>

      <style jsx>{`
      .dropzone .dz-preview .dz-success-mark, .dropzone .dz-preview .dz-error-mark {
        pointer-events: all !important;
      }
      .
      `}</style>
    </>
  );
}
