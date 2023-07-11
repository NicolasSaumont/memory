const configuration = {
  difficultyLevel: null,
 
  canPlay: true, // Va servir pour empêcher de retourner les cartes quand message fin de jeu

  departMinutes: null,
  easyDepartMinutes: 1,
  mediumDepartMinutes: 1.5,
  hardDepartMinutes: 3.5,
  nightmareDepartMinutes: 6,
  
  deckName: '',

  easyDeck: [
    'brook.jpg',
    'chopper.jpg',
    'franky.jpg',
    'jinbei.jpg',
    'luffy.jpg',
    'nami.jpg',
    'robin.jpg',
    'sanji.jpg',
    'usopp.jpg',
    'zorro.jpg',
  ],

  mediumDeck: [
    'baggy.jpg',
    'bartolomeo.jpg',
    'bepo.jpg',
    'brook.jpg',
    'cavendish.jpg',
    'chopper.jpg',
    'franky.jpg',
    'jinbei.jpg',
    'law.jpg',
    'luffy.jpg',
    'nami.jpg',
    'perona.jpg',
    'robin.jpg',
    'sanji.jpg',
    'usopp.jpg',
    'zorro.jpg',
  ],

  hardDeck: [
    'apoo.jpg',
    'baggy.jpg',
    'bartolomeo.jpg',
    'bege.jpg',
    'bepo.jpg',
    'bonney.jpg',
    'brook.jpg',
    'cavendish.jpg',
    'chopper.jpg',
    'crocodile.jpg',
    'doflamingo.jpg',
    'drake.jpg',
    'franky.jpg',
    'hancock.jpg',
    'hawkins.jpg',
    'jinbei.jpg',
    'kidd.jpg',
    'killer.jpg',
    'kuma.jpg',
    'law.jpg',
    'luffy.jpg',
    'mihawk.jpg',
    'moria.jpg',
    'nami.jpg',
    'perona.jpg',
    'robin.jpg',
    'sanji.jpg',
    'urouge.jpg',
    'usopp.jpg',
    'zorro.jpg',
  ],

  nightmareDeck: [
    'ace.jpg',
    'apoo.jpg',
    'baggy.jpg',
    'bartolomeo.jpg',
    'bege.jpg',
    'bepo.jpg',
    'bonney.jpg',
    'brook.jpg',
    'cavendish.jpg',
    'chopper.jpg',
    'crocodile.jpg',
    'doflamingo.jpg',
    'dragon.jpg',
    'drake.jpg',
    'enel.jpg',
    'franky.jpg',
    'hancock.jpg',
    'hawkins.jpg',
    'jack.jpg',
    'jinbei.jpg',
    'kaido.jpg',
    'katakuri.jpg',
    'kidd.jpg',
    'killer.jpg',
    'king.jpg',
    'kuma.jpg',
    'law.jpg',
    'linlin.jpg',
    'luffy.jpg',
    'marco.jpg',
    'mihawk.jpg',
    'moria.jpg',
    'nami.jpg',
    'newgate.jpg',
    'perona.jpg',
    'queen.jpg',
    'rayleigh.jpg',
    'robin.jpg',
    'roger.jpg',
    'sabo.jpg',
    'sanji.jpg',
    'shanks.jpg',
    'teach.jpg',
    'urouge.jpg',
    'usopp.jpg',
    'zorro.jpg',
  ],

  handleDifficultyChange(event) {
    // On change la valeur de 'difficultyLevel'
    document.querySelector('.board__game--play').innerHTML = ' ';
    configuration.difficultyLevel = event.target.value;

    configuration.positionCardsOnBoard();

    // On change la valeur du timer
    // On évite d'utiliser eval() car il ya  des risque de sécurité
    // configuration.departMinutes = eval(`configuration.${configuration.difficultyLevel}DepartMinutes`);
    switch (configuration.difficultyLevel){
    case 'easy': 
      configuration.departMinutes = configuration.easyDepartMinutes;
      break;
    case 'medium': 
      configuration.departMinutes = configuration.mediumDepartMinutes;
      break;
    case 'hard': 
      configuration.departMinutes = configuration.hardDepartMinutes;
      break;
    case 'nightmare': 
      configuration.departMinutes = configuration.nightmareDepartMinutes;
      break;
    }

    configuration.showTimer();
    game.init();
  },

  positionCardsOnBoard() {
    // On change le nom du deck en fonction de la difficulté choisie
    switch (configuration.difficultyLevel) {
    case 'easy':
      configuration.deckName = configuration.easyDeck;
      break;
    case 'medium':
      configuration.deckName = configuration.mediumDeck;
      break;
    case 'hard':
      configuration.deckName = configuration.hardDeck;
      break;
    case 'nightmare':
      configuration.deckName = configuration.nightmareDeck;
      break;
    }

    // Création d'un nouveau tableau pour dupliquer le contenur de deckName
    let deckNameComplete = [];

    for (const caracter of configuration.deckName){
      for (let index = 0; index < 2; index++) {
        deckNameComplete.push(caracter);
      }
    }

    // On mélange le contenu du tableau complet    
    const shuffledCaracters = deckNameComplete.sort((a, b) => 0.5 - Math.random());

    // Pour chaque nom de la liste correspondant au niveau de difficulté 'difficultyLevel', on positionne le nombre d'images correspondant au tableau complet et 'randomizer'
    if (shuffledCaracters != undefined) {
      for (const caracter of shuffledCaracters) {
        const divElement = document.createElement('div');
        const imgBackgroundElement = document.createElement('img');
        const imgFrontElement = document.createElement('img');

        divElement.classList.add('board__game-card');

        imgBackgroundElement.classList.add(
          'board__game-card-image--background'
        );
        imgBackgroundElement.src = './img/cards-background.jpg';
        imgFrontElement.classList.add(
          'board__game-card-image--front',
          'hidden'
        );
        imgFrontElement.src = `./img/cards/${caracter}`;

        divElement.append(imgBackgroundElement);
        divElement.append(imgFrontElement);
        if (configuration.difficultyLevel === 'easy'){
          document.querySelector('.board__game--play').style.maxWidth = '650px';
        } else if (configuration.difficultyLevel === 'medium'){
          document.querySelector('.board__game--play').style.maxWidth = '850px';
        } else if (configuration.difficultyLevel === 'hard') {
          document.querySelector('.board__game--play').style.maxWidth = '1050px';
        } else {
          document.querySelector('.board__game--play').style.maxWidth = '1050px';
        }
        
        document.querySelector('.board__game--play').append(divElement);
      }
    }
  },

  showTimer(){
    let temps = configuration.departMinutes * 60;
    let minutes = parseInt(temps / 60, 10);
    let secondes = parseInt(temps % 60, 10);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secondes = secondes < 10 ? '0' + secondes : secondes;  

    const timerElement = document.querySelector('.page-header__timer');

    timerElement.innerText = `${minutes}:${secondes}`;
  },

  listenEvents() {
    // On écoute le changement de niveau de difficulté
    const difficultyChoices = document.querySelector(
      '.page-header__difficulty-choices--input'
    );
    difficultyChoices.addEventListener(
      'change',
      configuration.handleDifficultyChange
    );
  },

  init() {
    configuration.listenEvents();
  },
};
