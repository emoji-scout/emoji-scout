points=0;
wrongPredictionCounter=0;
let neededPath= window.location.hash.substring(1);
let splitPath=neededPath.split('#');
let minutes=splitPath[3];
let NoOfPlayers=splitPath[2];
let playerId=splitPath[1];
let userId=splitPath[0];

$(document).ready(function () {

    asyncTimer(minutes);

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
             fb=firebase.database();
            fb.ref('scout-game/'+userId+'/').child(playerId+'/LastGamePoints').set(points);
            loadDemoImage();

        }
        else {
            let del= arr.indexOf(randomnumber);
            console.log(del);
            if(del>=0){
                arr.splice(del,1);}
             if(wrongPredictionCounter<2) {
            document.getElementById("prediction").innerHTML = " Emoji-Scout predicted <br><b>" + results[0].className + "</b>";
            document.getElementById("prediction").innerHTML += "<br><b>"+" Required <br><b>" + randomnumber + "</b>";
            document.getElementById("prediction").innerHTML += "<br><b>"+" Wrong !!"+ "</b>";
            $('#tryAgain').show();
            tryagain();
            wrongPredictionCounter++;
        }else {
            loadDemoImage();
        }

        }

    });
})
async function asyncTimer(mnts){
    let sec=0;
    let min=mnts;
    await setInterval(()=>{
        document.getElementById("seconds").innerHTML=sec;
        document.getElementById("minutes").innerHTML=min;

        if(sec===0){
             if(min === 0) {
                if (NoOfPlayers === "m") {
                    window.location.href = "Winner.html#" + userId;
                }

                if (NoOfPlayers === "1") {
                    // window.location.href="Result.html#"+userId+"#";
                }
             }
    
            sec=59;
            min--;
        }
        else if(sec>0){
           sec--;
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

