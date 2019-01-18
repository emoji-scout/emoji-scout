points=0;
$(document).ready(function () {

    asyncTimer();

    $("#predict-button").click(async function () {
        if (model == undefined) {

        }
        let image  = document.getElementById("webcam");
        let tensor = preprocessImage(image, modelName);

        let predictions = await model.predict(tensor).data();
        let results = Array.from(predictions)
            .map(function (p, i) {
                return {
                    probability: p,
                    className: Emoji_Classes[i],
                    classID: i
                };
            }).sort(function (a, b) {
                return b.probability - a.probability;
            }).slice(0, 5);
        let del= arr.indexOf(randomnumber);

        document.getElementById("points").innerHTML=points;
        // initializing points

        if(results[0].className === randomnumber){

            let del= arr.indexOf(randomnumber);
            arr.splice(del,1);
            points++; //increase points
            document.getElementById("points").innerHTML=points;

            document.getElementById("predict-box").style.display = "block";
            document.getElementById("prediction").innerHTML = " Emoji-Scout predicted <br><b>" + results[0].className + "</b>";

            document.getElementById("prediction").innerHTML += "<br><b>"+ " Correct !!"+ "</b>";
            $('#awesome').show();
            awesomeTimer();

        }
        else {
            let del= arr.indexOf(randomnumber);
            console.log(del);
            if(del>=0){
                arr.splice(del,1);}
            document.getElementById("prediction").innerHTML = " Emoji-Scout predicted <br><b>" + results[0].className + "</b>";
            document.getElementById("prediction").innerHTML += "<br><b>"+" Required <br><b>" + randomnumber + "</b>";
            document.getElementById("prediction").innerHTML += "<br><b>"+" Wrong !!"+ "</b>";
            $('#tryAgain').show();
            tryagain();
        }



    });
})
async function asyncTimer(){
    let sec=0;
    let min=0;
    await setInterval(()=>{
        document.getElementById("seconds").innerHTML=sec;
        document.getElementById("minutes").innerHTML=min;
        sec++;
        if(sec===60){
            sec=0;
            min++;
            if(min===10){
                window.location.replace("Loser.html");
            }
        }
    },1000);
}
async function awesomeTimer() {
    await setTimeout(function () {
        $('#awesome').hide();
    },1000);
}
async function tryagain() {
    setTimeout(function () {
        $('#tryAgain').hide();
    },1000);
}

