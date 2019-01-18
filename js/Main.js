

const webcamElement = document.getElementById('webcam');
let arr= ['Watch','Umbrella','Suit','Sock','Shoe','Printer','Mouse','Mobile','Laptop','Keys','Keyboard','Handbag, Wallet','Flowerpot','Computer'];
let maximum = 13;
let model;



async function loadModel() {
    console.log("model loading..");
    loader = document.getElementById("progress-box");
    load_button = document.getElementById("load-button");
    loader.style.display = "block";
    modelName = "emojiModel";
    model = undefined;
    model = await tf.loadModel('output/emojiModel/model.json');
    loader.style.display = "none";
    load_button.disabled = true;
    load_button.innerHTML = "Loaded Model";
    console.log("model loaded..");
}







function preprocessImage(image, modelName) {
    let tensor = tf.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat();

    if (modelName === undefined) {
        return tensor.expandDims();
    } else if (modelName === "emojiModel") {
        let offset = tf.scalar(127.5);
        return tensor.sub(offset)
            .div(offset)
            .expandDims();
    } else {
        alert("Unknown model name..")
    }
}
let randomnumber=0;
let index = 0;
function loadDemoImage() {
    document.getElementById("predict-box").style.display = "table-cell";
    //  document.getElementById("prediction").innerHTML = "Click predict to find my label!";
    document.getElementById("select-file-box").style.display = "table-cell";
    document.getElementById("predict-list").innerHTML = "";


    base_path = "emoji/"

    randomnumber =arr[index];
    index++;
    img_path = base_path + randomnumber + ".png"
    document.getElementById("test-image").src = img_path;
    if(index===arr.length-1){
        index=0;
    }
}



async function setupWebcam() {
    const constraints = {
      facingMode:'environment'
    };
    console.log("loading cmaera..");
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: constraints},
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata',  () => resolve(), false);
                },
                error => reject());
        } else {
            reject();
        }
    });

}


async function app(){

    await setupWebcam();
    await loadModel();

}
app();

