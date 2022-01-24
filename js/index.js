let appCards = {
    score: 0,
    scoreText: document.querySelector(".header__score-number"),
    paperNode: document.querySelector(".app__paper"),
    rockNode: document.querySelector(".app__rock"),
    scissorNode: document.querySelector(".app__scissor"),
    appCardNode: document.querySelectorAll(".app__card"),
    appContainer: document.querySelector(".app__container"),
    resultContainer: document.querySelector(".result__container"),
    playerChoise: document.querySelectorAll(".result__card")[0],
    houseChoise: document.querySelectorAll(".result__card")[1],
    houseResult: 0,
    playerResult: '',
    classPlayerResult: '',
    classHouseResult: '',
    resultPlayerGradientCircle: document.querySelector(".player"),
    resultGameOver: document.querySelector(".result__game-over"),
    resultWinLose: document.querySelector(".result__text"),
    playAgainButton: document.querySelector('.result__button'),
    gameStart() {
        //The local storage stores a string so it has to be converted to a numver
        let mySavedScore = Number(localStorage.getItem('myScore'));

        if (localStorage.getItem('myScore') && mySavedScore > 0) {
            this.score = mySavedScore;
            this.scoreText.innerText = mySavedScore;
        } else {
            this.scoreText.innerText = 0;
        }


        this.appCardNode.forEach((card) => {
            card.addEventListener("click", () => {

                //random number beetween 0 and 2 to simulate the house choise
                this.houseResult = Math.floor(Math.random() * 3);


                if (this.houseResult === 0) {
                    this.classHouseResult = 'paper'
                } else if (this.houseResult === 1) {
                    this.classHouseResult = 'scissors'
                } else if (this.houseResult === 2) {
                    this.classHouseResult = 'rock'
                }


                this.appContainer.classList.add("app__flip--active");
                this.classPlayerResult = `app__${card.dataset.value}`;
                this.playerChoise.classList.add(this.classPlayerResult, "result__card--active");

                setTimeout(() => {
                    this.playerResult = card.dataset.value;

                    if (card.dataset.value === "paper" && this.classHouseResult === "paper" || card.dataset.value === "scissors" && this.classHouseResult === "scissors" || card.dataset.value === "rock" && this.classHouseResult === "rock") {
                        this.resultWinLose.innerHTML = "DRAW";
                        this.resultGameOver.style.display = "flex";

                    } else if (card.dataset.value === "paper" && this.classHouseResult === "rock" || card.dataset.value === "scissors" && this.classHouseResult === "paper" || card.dataset.value === "rock" && this.classHouseResult === "scissors") {

                        this.score++;
                        this.resultWinLose.innerHTML = "YOU WIN";
                        this.resultGameOver.style.display = "flex";


                    } else if (this.classHouseResult === "paper" && card.dataset.value === "rock" || this.classHouseResult === "scissors" && card.dataset.value === "paper" || this.classHouseResult === "rock" && card.dataset.value === "scissors") {

                        this.resultWinLose.innerHTML = "YOU LOSE";
                        this.resultGameOver.style.display = "flex";

                        if (this.score > 0) {
                            this.score--;
                        }


                    }
                    //Store the score in local storage so it won't be resetted when the page is refreshed
                    localStorage.setItem('myScore', this.score);
                    this.scoreText.innerText = this.score;
                }, 2000);


                setTimeout(() => {
                    this.resultContainer.classList.add("player--active");
                }, 1000);

                setTimeout(() => {
                    this.houseChoise.classList.add(`result__${this.classHouseResult}`, "result__card--active");
                }, 1500);

            });

        })


    },
    playAgain() {
        this.playAgainButton.addEventListener("click", () => {
            this.appContainer.classList.remove("app__flip--active");

            setTimeout(() => {
                this.playerChoise.classList.remove(this.classPlayerResult, "result__card--active");
                this.resultContainer.classList.remove("player--active");
                this.houseChoise.classList.remove(`result__${this.classHouseResult}`, "result__card--active");

                this.resultGameOver.style.display = "none";
            }, 500)
        });
        return
    }
}

let rulesSection = {
    rulesBtn: document.querySelector(".rules__btn"),
    rulesBtnClose: document.querySelector(".rules__close-btn"),
    rulesExplaination: document.querySelector(".rules__explaination-section"),
    activeRulesExplaination() {
        this.rulesBtn.addEventListener("click", () => {
            this.rulesExplaination.classList.add("rules__explaination-section--active");
        })
    },
    closeRulesExplaination() {
        this.rulesBtnClose.addEventListener("click", () => {
            this.rulesExplaination.classList.remove("rules__explaination-section--active");
        })
    }
}


appCards.gameStart();
appCards.playAgain();
rulesSection.activeRulesExplaination();
rulesSection.closeRulesExplaination();


