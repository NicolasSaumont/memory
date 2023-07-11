const game = {

  timerOn: false,

  firstCard: null,
  secondCard: null,

  points: null, 

  verificationOn: false,

  timer: null,

  handleCardClick(event) {
    if (game.verificationOn === false) {

      // On lance le chrono
      game.turnOnTimer();

      // On affiche le bouton reset
      game.showResetButton();

      // On désactive la choix de la difficulté
      const selectionDifficulty = document.querySelector('.page-header__difficulty-choices--input');
      selectionDifficulty.disabled = 'disabled';

      // On retourne la carte sélectionnée
      const selectedCard = event.currentTarget;
      game.cardBackToFront(selectedCard);

      // On inclut dans les variables firstCard et secondCard les sources des deux cartes sélectionnées
      if (game.firstCard === null){
        game.firstCard = selectedCard.nextSibling;
      } else {
        game.secondCard = selectedCard.nextSibling;

        // On lance la vérification
        game.verifyPair(game.firstCard, game.secondCard);
      }
    }
  }, 

  handleResetButtonClic(){
    location.reload();
  },

  cardBackToFront(selectedCard){
    if (configuration.canPlay === true){
      // On retourne la carte sélectionnée
      selectedCard.style.transition = 'transform 0.1s';
      selectedCard.style.transform = 'rotateY(90deg)';
      setTimeout(function () {
        selectedCard.classList.add('hidden');
        selectedCard.nextSibling.classList.remove('hidden');
      }, 200);
    }
    
  },

  cardFrontToBack(selectedCard) {
    // On retourne la carte sélectionnée
    selectedCard.style.transition = 'transform 0.1s';
    selectedCard.style.transform = 'rotateY(90deg)';
    setTimeout(function () {
      selectedCard.classList.add('hidden');
      selectedCard.previousSibling.classList.remove('hidden');
      selectedCard.previousSibling.style.transform = 'rotateY(0deg)';
      selectedCard.style.transform = 'rotateY(0deg)';
    }, 200);
  },

  showDefeat(){
    const gameDefeatMessage = document.querySelector('.board__game-results-result--lose');
    gameDefeatMessage.classList.remove('hidden');
    configuration.canPlay = false;
  },

  showVictory(){
    const gameVictoryMessage = document.querySelector('.board__game-results-result--win');
    gameVictoryMessage.classList.remove('hidden');
  },

  showResetButton() {
    const resetButton = document.querySelector('.page-header__reset');
    resetButton.classList.remove('hidden');
  },

  turnOnTimer(){
    // On lance le timer s'il n'est pas déjà lancé
    if (!game.timerOn){
      game.timerOn = true;
      
      let temps = configuration.departMinutes * 60;

      game.timer = setInterval(function(){
        
        let minutes = parseInt(temps / 60, 10);
        let secondes = parseInt(temps % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        secondes = secondes < 10 ? '0' + secondes : secondes;

        const timerElement = document.querySelector('.page-header__timer');

        timerElement.innerText = `${minutes}:${secondes}`;

        if (temps <= 0 ){
          clearInterval(game.timer);
          game.timer = null;
          temps = 0;
          game.showDefeat();
        } else {
          temps--;
        }
            
      }, 1000);
    }
  },

  verifyPair(firstCard, secondCard){
    game.verificationOn = true;
    if (firstCard.src === secondCard.src){
      
      game.points++;

      if (game.points === configuration.deckName.length) {

        setTimeout(function(){
          game.showVictory();
          clearInterval(game.timer);
        },1000);
        
      } else {
        game.firstCard = null;
        game.secondCard = null;
        game.verificationOn = false;
      }
      
    } else {
      setTimeout(function(){
        game.cardFrontToBack(firstCard);
        game.cardFrontToBack(secondCard);
        game.firstCard = null;
        game.second = null;
        game.verificationOn = false;
      }, 1000);
    }
  },

  eventsListener() {

    // On écoute le clic sur une carte
    const selectedCards = document.querySelectorAll('.board__game-card-image--background');

    for (const selectedCard of selectedCards) {
      selectedCard.addEventListener('click', game.handleCardClick);
    }

    // On écoute le clic sur le button reset en cours de jeu
    const resetButton = document.querySelector('.page-header__reset');
    resetButton.addEventListener('click', game.handleResetButtonClic);

    // On écoute le clic sur le button reset si le jeu est perdu
    const defeatButtonElement = document.querySelector('.new-game--lose');
    defeatButtonElement.addEventListener('click', game.handleResetButtonClic);

    // On écoute le clic sur le button reset si le jeu est gagné
    const victoryButtonElement = document.querySelector('.new-game--win');
    victoryButtonElement.addEventListener('click', game.handleResetButtonClic);
  },

  init() {
    game.eventsListener();
  },
};
