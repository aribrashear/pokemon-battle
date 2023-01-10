"use strict"

/*
IDEAS:
User can pick between three starter pokemon, and possibly later on switch out which generation they want to use.
The game will last until somebody gets 5 wins.
OPTIONALLY: Add ability for user to play against computer, or another person.
*/

let player1Wins = 0
let computerWins = 0
let roundWinnerMessage = ""
let currentPlayer = ""

const playRound = (player1Selection, computerSelection) => {
  // Main game logic for each round.
  if (player1Selection === computerSelection) {
    roundWinnerMessage = "tie"
  } else if (
    (player1Selection === "fire" && computerSelection === "grass") ||
    (player1Selection === "grass" && computerSelection === "water") ||
    (player1Selection === "water" && computerSelection === "fire")
  ) {
    player1Wins++
    roundWinnerMessage = "player1"
  } else if (
    (computerSelection === "fire" && player1Selection === "grass") ||
    (computerSelection === "grass" && player1Selection === "water") ||
    (computerSelection === "water" && player1Selection === "fire")
  ) {
    computerWins++
    roundWinnerMessage = "computer"
  }
}

const getComputerChoice = () => {
  // This will generate a random number between 0-2.
  let randomNum = Math.floor(Math.random() * 3)

  // This switch will use the randomly generated number to pick a move from the three available options.
  switch (randomNum) {
    case 0:
      return "fire"
    case 1:
      return "grass"
    case 2:
      return "water"
  }
}

// Setting up variables from the HTML element's via their ID.
const roundWinner = document.getElementById("roundWinner")
const player1Pick = document.getElementById("player1Pick")
const computerPick = document.getElementById("computerPick")
const player1Score = document.getElementById("player1Score")
const computerScore = document.getElementById("computerScore")
const firePokemon = document.getElementById("fire")
const grassPokemon = document.getElementById("grass")
const waterPokemon = document.getElementById("water")
// const startOver = document.getElementById("startOver")
const tryAgain = document.getElementById("tryAgain")
const endGameModal = document.getElementById("endGameModal")
const endGameMessage = document.getElementById("endGameMessage")
const overlay = document.getElementById("overlay")
const firePokeImage = document.getElementById("firePokeImage")
const waterPokeImage = document.getElementById("waterPokeImage")
const grassPokeImage = document.getElementById("grassPokeImage")
const firePokeName = document.getElementById("firePokeName")
const grassPokeName = document.getElementById("grassPokeName")
const waterPokeName = document.getElementById("waterPokeName")

// When a player clicks on a pokemon to confirm their choice, it will trigger the handleClick function and pass it their selected pokemon.
firePokemon.addEventListener("click", () => handleClick("fire"))
grassPokemon.addEventListener("click", () => handleClick("grass"))
waterPokemon.addEventListener("click", () => handleClick("water"))

// Adding event listeners for the reset buttons.
// startOver.addEventListener("click", () => resetGame())
tryAgain.addEventListener("click", () => resetGame())

// Updates the Scoreboard to show what pokémon each player picked.
const updateChoices = (player1Selection, computerSelection) => {
  switch (player1Selection) {
    case "fire":
      player1Pick.textContent = "Player 1's Charizard vs."
      break
    case "grass":
      player1Pick.textContent = "Player 1's Venusaur vs."
      break
    case "water":
      player1Pick.textContent = "Player 1's Blastoise vs."
  }
  switch (computerSelection) {
    case "fire":
      computerPick.textContent = "Computer's Charizard!"
      break
    case "grass":
      computerPick.textContent = "Computer's Venusaur!"
      break
    case "water":
      computerPick.textContent = "Computer's Blastoise!"
  }
}

// Updates the scoreboard to show who won the round.
const updateRoundWinner = () => {
  if (roundWinnerMessage === "tie") {
    roundWinner.textContent = "It's a tie!"
  } else if (roundWinnerMessage === "player1") {
    roundWinner.textContent = "Player 1 Wins!"
  } else if (roundWinnerMessage === "computer") {
    roundWinner.textContent = "Computer Wins!"
  }

  player1Score.textContent = player1Wins
  computerScore.textContent = computerWins
}

// Checks whether either player has hit 5 wins.
const checkGameOver = () => {
  return player1Wins === 5 || computerWins === 5
}

// Runs a single round of the game when the player clicks on their pokémon, including calling all the update functions.
const handleClick = (playerSelection) => {
  const computerSelection = getComputerChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  // updateScoreboard()
  updateRoundWinner()

  // Checks at the end of each round to see if either player has won.
  if (checkGameOver()) {
    openEndGameModal()
    setEndGameMessage()
  }
}

// Adding/removing classes to show/hide the endgame modal and overlay.
const openEndGameModal = () => {
  endGameModal.classList.add("active")
  overlay.classList.add("active")
}

const closeEndGameModal = () => {
  endGameModal.classList.remove("active")
  overlay.classList.remove("active")
}

// Displaying the final message on the modal.
const setEndGameMessage = () => {
  return player1Wins > computerWins
    ? (endGameMessage.textContent = "Player 1 wins!")
    : (endGameMessage.textContent = "Computer wins!")
}

// Resets the game back to its original state.
const resetGame = () => {
  player1Wins = 0
  computerWins = 0
  roundWinnerMessage = ""
  currentPlayer = ""
  player1Score.textContent = 0
  computerScore.textContent = 0
  player1Pick.textContent = ""
  computerPick.textContent = ""
  roundWinner.textContent = "The first player to score 5 points wins!"
  closeEndGameModal()
}

const changeGenImage = (gen) => {
  switch (gen) {
    case "gen1":
      firePokeImage.src = "./images/gen1/Charizard.png"
      grassPokeImage.src = "./images/gen1/Venusaur.png"
      waterPokeImage.src = "./images/gen1/Blastoise.png"
      firePokeName.textContent = "Go, Charizard!"
      grassPokeName.textContent = "Go, Venusaur!"
      waterPokeName.textContent = "Go, Blastoise!"
      break
    case "gen2":
      firePokeImage.src = "./images/gen2/Typhlosion.png"
      grassPokeImage.src = "./images/gen2/Meganium.png"
      waterPokeImage.src = "./images/gen2/Feraligatr.png"
      firePokeName.textContent = "Go, Typhlosion!"
      grassPokeName.textContent = "Go, Meganium!"
      waterPokeName.textContent = "Go, Feraligatr!"
      break
    case "gen3":
      firePokeImage.src = "./images/gen3/Blaziken.png"
      grassPokeImage.src = "./images/gen3/Sceptile.png"
      waterPokeImage.src = "./images/gen3/Swampert.png"
      firePokeName.textContent = "Go, Blaziken!"
      grassPokeName.textContent = "Go, Sceptile!"
      waterPokeName.textContent = "Go, Swampert!"
      break
    case "gen4":
      firePokeImage.src = "./images/gen4/Infernape.png"
      grassPokeImage.src = "./images/gen4/Torterra.png"
      waterPokeImage.src = "./images/gen4/Empoleon.png"
      firePokeName.textContent = "Go, Infernape!"
      grassPokeName.textContent = "Go, Torterra!"
      waterPokeName.textContent = "Go, Empoleon!"
      break
    case "gen5":
      firePokeImage.src = "./images/gen5/Emboar.png"
      grassPokeImage.src = "./images/gen5/Serperior.png"
      waterPokeImage.src = "./images/gen5/Samurott.png"
      firePokeName.textContent = "Go, Emboar!"
      grassPokeName.textContent = "Go, Serperior!"
      waterPokeName.textContent = "Go, Samurott!"
      break
  }
}

const showMatchups = () => {
  let showHelp = document.getElementById("rulesContainer")
  let displaySetting = showHelp.style.display
  displaySetting == "none"
    ? (showHelp.style.display = "block")
    : (showHelp.style.display = "none")
  return
}

const hideMatchups = () => {
  let hideHelp = document.getElementById("rulesContainer")
  hideHelp.style.display = "none"
}

// This function call is here to remove the unintentional functionality of having to click twice to open the type matchup modal.
showMatchups()
