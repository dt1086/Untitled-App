document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guessedSolutions =[[]];
    let availableSpace = 1;

    let solutionSpace = ["1+2-3*4", "9+8-7*6"];
    let guessedSolutionCount = 0;
    let correctGuesses = 0;

    const keys = document.querySelectorAll(".keyboard-row button");

    function getCurrentSolutionArr() {
      const numberOfguessedSolutions = guessedSolutions.length;
      return guessedSolutions[numberOfguessedSolutions - 1];
    }

    function updateGuessedSolutions(number) {
      const currentSolutionArr = getCurrentSolutionArr();

      if (currentSolutionArr && currentSolutionArr.length < 7) {
        currentSolutionArr.push(number);

        const availableSpaceEl = document.getElementById(String(availableSpace));

        availableSpace = availableSpace + 1;
        availableSpaceEl.textContent = number;
      }
    }

    function getTileColor(number, currentSolution, index) {
      const isCorrectSolution = solutionSpace.includes(currentSolution);

      if (!isCorrectSolution) {
        return "rgb(58, 58, 60)";
      }
  
      if (isCorrectSolution) {
        return "rgb(83, 141, 78)";
      }
  
      return "rgb(181, 159, 59)";
    }

    function handleSubmitNumber() {
      const currentSolutionArr = getCurrentSolutionArr();
      if (currentSolutionArr.length !==7) {
        return window.alert("Solution must be 7 inputs!");
      }

      const currentSolution = currentSolutionArr.join('');

      if (solutionSpace.some(res => res.includes(currentSolution))) {
        correctGuesses += 1;
      }

      const firstNumberId = guessedSolutionCount * 7 + 1;
      const interval = 200;
      currentSolutionArr.forEach((number, index) => {
        setTimeout(() => {
          const tileColor = getTileColor(number, currentSolution, index);

          const numberId = firstNumberId + index;
          const numberEl = document.getElementById(numberId);
          numberEl.classList.add("animate__flipInX");
          numberEl.style = `background-color:${tileColor};border-color:${tileColor}`
        },interval * index);
      });

      guessedSolutionCount += 1;

      if (correctGuesses == 2) {
        return window.alert("Congratulations!");
      }

      if (guessedSolutions.length == 6){
        return windows.alert("Sorry, you have no more guesses left! You lose.")
      }

      guessedSolutions.push([]);
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");
    
        for (let index = 0; index < 42; index++) {
          let square = document.createElement("div");
          square.classList.add("square");
          square.classList.add("animate__animated");
          square.setAttribute("id", index + 1);
          gameBoard.appendChild(square);
        }
      }

      function handleDeleteLetter() {
        currentSolutionArr = getCurrentSolutionArr()
        const removedNumber = currentSolutionArr.pop()

        guessedSolutions[guessedSolutions.length - 1] = currentSolutionArr

        const lastLetterEl = document.getElementById(String(availableSpace - 1))

        lastLetterEl.textContent = ''
        availableSpace = availableSpace - 1
      }

      for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
          const number = target.getAttribute("data-key");

          if (number == 'enter') {
            handleSubmitNumber()
            return;
          }
          
          if (number == 'del') {
            handleDeleteLetter();
            return;
          }


          updateGuessedSolutions(number)
        };
    }
});

