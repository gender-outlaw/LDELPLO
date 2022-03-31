import Phaser from "phaser";
import Lobby from "./Lobby";

export default class Scrammble extends Phaser.Scene {
  constructor() {
    super("Scrammble");
  }

  preload() {
    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#000000");

  }

  create() {
    const scrammble = this;
    const game = document.getElementById("game");
    const userGuess = document.getElementById("user-guess");
    const submitBtn = document.getElementById("submit");
    const usersWord = document.getElementById("scrambled-word");
    const info = document.getElementById("info");
    const levelOutput = document.getElementById("level");
    const scoreOutput = document.getElementById("score");
    const attemptsOutput = document.getElementById("attempts");
    const gameContainer = document.getElementById("game-container");
    const guessContainer = document.getElementById("guess-container");
    const rules = document.getElementById("scrammblerules");
    const playBtn = document.getElementById("play-btn");
    const resetBtn = document.getElementById("reset-btn");
    const backToLobby = document.getElementById("back-to-lobby");
    const canvas = document.querySelector('canvas');
    canvas.classList.add('hidden');
    game.classList.remove("hidden");

    let level = 1;
    let score = 0;
    let word;
    let attempts = 0;
    let correct = 0;

    const lvlOneWords = ["code"];

    const lvlTwoWords = ["java"];

    const lvlThreeWords = ["react"];

    const lvlFourWords = ["python"];

    const lvlFiveWords = ["javascript"];

    const lvlSixWords = ["debug"];

    const lvlSevenWords = ["sequelize"];

    const lvlEightWords = ["algorithms"];

    function reset() {
      level = 1;
      score = 0;
      correct = 0;
      attempts = 0;
      word = "";
      updateBoard();
      info.innerHTML = "";
      userGuess.value = "";
    }

    function exitScrammble () {
        scrammble.scene.stop("Scrammble");
        let engBlock = document.getElementById("engineering-clues")
        engBlock.classList.toggle("hidden")
        canvas.classList.remove('hidden');
        scrammble.scene.start("Lobby", Lobby);
        game.classList.toggle("hidden");

    }

    function randomWord(lvl) {
      word = lvl[Math.floor(Math.random() * lvl.length + 1) - 1];
      return word;
    }

    function scrambleWord(word) {
      //[c, o, d, e]
      let letters = word.split("");

      // 0
      let currentIndex = letters.length;

      let temporaryValue;
      let randomIndex;

      // While there remain elements to shuffle...
      // 0 !== 4

      //letters = [o, e, c, d]
      while (0 !== currentIndex) {
        // Pick a remaining element...

        // 1
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.

        // temporaryValue = e //letters[0]
        temporaryValue = letters[currentIndex];

        // letters[0] = letters[1]
        // letters[1] = e
        letters[currentIndex] = letters[randomIndex];
        letters[randomIndex] = temporaryValue;
      }

      return letters.join(" ");
    }
    function updateBoard() {
      scoreOutput.innerHTML = score;
      levelOutput.innerHTML = level;
      attemptsOutput.innerHTML = attempts;
    }

    function checkAnswer(guess) {
      console.log(`Correct: ${correct}`);
      // if (correct == 3) {
      //   level += 1;
      //   correct = 0;
      // }

      if (attempts == 3) {
        guessContainer.classList.toggle("hidden");
        info.innerHTML =
          "<p class='retry'>Sorry. You are out of chances. <button id='retry-button'>Retry</button> </p>";
        reset();
      }

      if (guess === word) {
        info.innerHTML = "<span class='correct'>CORRECT</span>";
        score += 1;
        correct += 1;
        attempts = 0;
        level += 1;
        setLevel();
      } else {
        info.innerHTML =
          "<span class='incorrect'>Bzzzt! That's not right!</span>";
        score -= 1;
        attempts += 1;
      }

      updateBoard();
    }

    function setLevel() {
      if (level == 1) {
        randomWord(lvlOneWords);
      } else if (level == 2) {
        randomWord(lvlTwoWords);
      } else if (level == 3) {
        randomWord(lvlThreeWords);
      } else if (level == 4) {
        randomWord(lvlFourWords);
      } else if (level == 5) {
        randomWord(lvlFiveWords);
      } else if (level == 6) {
        randomWord(lvlSixWords);
      } else if (level == 7) {
        randomWord(lvlSevenWords);
      } else if (level == 8) {
        randomWord(lvlEightWords);
      } else if (level > 8) {
        info.innerHTML = "<span class='win'>You Win! Great job! </br></span>";
        exitScrammble()
      }

      console.log(`Word: ${word}`);
      usersWord.innerHTML = scrambleWord(word);
    }

   

    playBtn.addEventListener("click", function (e) {
      rules.classList.toggle("hidden");
      gameContainer.classList.remove("hidden");
    });

    submitBtn.addEventListener("click", function (e) {
      checkAnswer(userGuess.value.toLowerCase());
      userGuess.value = "";
    });

      backToLobby.addEventListener("click", function (e) {
        console.log('im in the backtolobbybbybydfjdfh')
        exitScrammble()
    });
    
    

    window.addEventListener(
      "keypress",
      function (e) {
        if (e.key === "Enter") {
          checkAnswer(userGuess.value.toLowerCase());
          userGuess.value = "";
        }
      },
      false
    );

    resetBtn.addEventListener("click", function (e) {
      reset();
      setLevel();
      guessContainer.classList.remove("hidden");
      userGuess.value = "";
    });

    setLevel();
  }
}
