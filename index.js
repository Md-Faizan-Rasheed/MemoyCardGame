
const cards = document.querySelectorAll(".box");

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

var back;
function shuffleCard() {
    matched= 0;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    shuffleArray(arr);
    console.log(arr);

    cards.forEach((card, i) => {
        let imgTag = card.querySelector(".back_view img");
        imgTag.src = `img-${arr[i]}.png`;
        back = card.querySelector(".box .back_view");
        card.addEventListener("click", afterClick);
    });
}

function resetCards() {
    cardOne.querySelector(".back_view").style.visibility = "hidden";
    cardTwo.querySelector(".back_view").style.visibility = "hidden";
    cardOne = null;
    cardTwo = null;
    disableDeck = false;
}

function matchCards(img1,img2){
    if(img1 === img2){
        matched++;

        if(matched === 8){
            setTimeout(() =>{
                window.location.reload();
            },1000);
        }

        cardOne.removeEventListener("click", afterClick);
        cardTwo.removeEventListener("click", afterClick);
        cardOne = null;
        cardTwo = null;
        disableDeck = false;
    }
    else {
        // If cards don't match, reset them after a delay
        setTimeout(resetCards, 1000);
    }
}

let matched = 0;
let cardOne = null;
let cardTwo = null;
let disableDeck = false;

function afterClick({target:clickedCard}){
    if(cardOne !== clickedCard && !disableDeck){
        let backdiv = clickedCard.querySelector(".back_view");
        backdiv.style.visibility="visible"
        if(!cardOne){
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck=true;

        let cardOneImg = cardOne.querySelector(".back_view img").src;
        let cardTwoImg = cardTwo.querySelector(".back_view img").src;
        matchCards(cardOneImg,cardTwoImg);
    }
}

shuffleCard();

const ask_box = document.querySelector(".ask");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
let timer = document.querySelector(".timer");
const easywork = () => {
    ask_box.style.visibility = "hidden";
}

easy.addEventListener("click", easywork);

const mediumwork = () => {
    ask_box.style.visibility = "hidden";
    let timeinputbox = document.querySelector(".timeinput");
    // console.log(timeinputbox);
    timeinputbox.style.visibility="visible";
    let timebox = document.querySelector(".timeinput");
    let timeinput = document.querySelector(".timeinput input");
    // console.log(timeinput.value);
    let setbtn = document.querySelector(".set");
    setbtn.addEventListener("click", () => {
        timeinputbox.style.visibility="hidden";

        let userinput = timeinput.value.split(":");
        displayTime(userinput);
        countdownInterval = setInterval(() => {
            userinput--;
            if (userinput >= 0) {
                displayTime(userinput);
            } else {
                clearInterval(countdownInterval);
                // Handle timer completion here
                alert("Time's up!");
            }
        }, 1000);
    })
}

function displayTime(totalSeconds) {
    console.log("displayf lsdjflkj")
    console.log(totalSeconds);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    console.log(minutes);
    console.log(seconds);
    // Format minutes and seconds with leading zeros if necessary
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    console.log(formattedMinutes);
    console.log(formattedSeconds);

    // Update the timer display
    
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

let timeup = document.querySelector(".timeup");
medium.addEventListener("click", mediumwork);

hard.addEventListener("click",()=>{
    ask_box.style.visibility = "hidden";
    timer.style.color="red";
    let userinput=60;
    displayTime(userinput);
    countdownInterval = setInterval(() => {
        userinput--;
        if (userinput >= 0) {
            displayTime(userinput);
        } else {
            clearInterval(countdownInterval);
            // Handle timer completion here
            // alert("Time's up!");
            timeup.style.visibility = "visible";
            console.log(timeup);
        }
    }, 1000);
})
