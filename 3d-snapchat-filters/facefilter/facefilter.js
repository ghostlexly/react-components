const THREE = require("./three");
import JeelizResizer from "./JeelizResizer";
import JeelizThreeHelper from "./JeelizThreeHelper";

let THREECAMERA = null;
let threeStuffs = null;
let threeObjects = [];

// callback: launched if a face is detected or lost.
function detect_callback(faceIndex, isDetected) {
  if (isDetected) {
    console.log("INFO in detect_callback(): DETECTED");
  } else {
    console.log("INFO in detect_callback(): LOST");
  }
}

// build the 3D. called once when Jeeliz Face Filter is OK
function init_threeScene(spec) {
  threeStuffs = JeelizThreeHelper.init(spec, detect_callback);

  // CREATE A CUBE
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshNormalMaterial();
  const threeCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  threeCube.frustumCulled = false;
  threeStuffs.faceObject.add(threeCube);
  threeObjects.push(threeCube);

  //CREATE THE CAMERA
  THREECAMERA = JeelizThreeHelper.create_camera();
}

export function clearFilters() {
  threeObjects.forEach((obj) => {
    threeStuffs.faceObject.remove(obj);
  });
}

// entry point:
export function main() {
  JeelizResizer.size_canvas({
    canvasId: "jeeFaceFilterCanvas",
    callback: function (isError, bestVideoSettings) {
      init_faceFilter({ maxWidth: 350, maxHeight: 350 });
    },
  });
}

function init_faceFilter(videoSettings) {
  JEELIZFACEFILTER.init({
    followZRot: true,
    canvasId: "jeeFaceFilterCanvas",
    NNCPath: "../../../neuralNets/", // root of NN_DEFAULT.json file
    maxFacesDetected: 1,
    callbackReady: function (errCode, spec) {
      if (errCode) {
        console.log("AN ERROR HAPPENS. ERR =", errCode);
        return;
      }

      console.log("INFO: JEELIZFACEFILTER IS READY");
      init_threeScene(spec);
    },

    // called at each render iteration (drawing loop):
    callbackTrack: function (detectState) {
      JeelizThreeHelper.render(detectState, THREECAMERA);
    },
  }); //end JEELIZFACEFILTER.init call
}
