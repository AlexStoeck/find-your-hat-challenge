const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let currentlyPlaying = true;
let illegalMove = false;
let possibleNext = false;

class Field {
  constructor(field) {
    this._field = [];
    this.x = 4;
    this.y = 5;
    this.percentage = 0.3;
  }

  get field() {
    return this._field;
  }

  print() {
  for (let i = 0; i < this._field.length; i++) {
    console.log(this._field[i].join(' ')); // Mit Leerzeichen zwischen den Symbolen
    }
  }



 plainField(field) {

      this._field = new Array(this.y)
      .fill(null)
      .map(() => new Array(this.x).fill(fieldCharacter));

    let numberOfHoles = (this.x * this.y * this.percentage);
    let holesCount = 0;

    while (holesCount < numberOfHoles) {
      const holeX = Math.floor(Math.random() * this.x);
      const holeY = Math.floor(Math.random() * this.y);
      if (this._field[holeX][holeY] === fieldCharacter) {
        this._field[holeX][holeY] = hole;
        holesCount++;
      }
    }


    do {
            this._field[Math.floor(Math.random() * this.x)][Math.floor(Math.random() * this.y)] = hat;
        }   while (this._field[0][0] == hat);
    
    this.x = 0;
    this.y = 0;
    this._field[0][0] = pathCharacter;

}

movement() {
    console.log(`Current player Position: x=${this.x}, y=${this.y}`);
    let gameMove = prompt(
      "Move to find the hat (u for up, d for down, r for right, l for left, x for exit): "
    );
    gameMove = gameMove.toLowerCase();

    switch (gameMove) {
      case 'u':
      console.log('Moving Up');
      this.y -= 1;
      break;
      case 'd':
      console.log('Moving Down');
      this.y += 1;
      break;
      case 'r':
      console.log('Moving right')
      this.x += 1;
      break;
      case 'l':
      console.log('Moving left')
      this.x -= 1;
      break;
      case 'x':
      console.log('Exiting the game');
      process.exit(); 
      currentlyPlaying = false;
      default:
      break;
    }
    
  }


result() {
  
  if (this.x < 0 || this.x >= this._field.length || this.y < 0 || this.y >= this._field[0].length || this._field[this.y][this.x] === undefined) {
        console.log('You lose - Out of boundary');
        currentlyPlaying = false;
        possibleNext = false;
        illegalMove = true;
        return;
    }

        switch (this.field[this.y][this.x]) {
            case hole:
                console.log('You lose - You fell in a hole!');
                currentlyPlaying = false;
                possibleNext = false;
                break;
            case undefined:
                console.log('You lose - Out of boundary');
                currentlyPlaying = false;
                possibleNext = false;
                break;
            case hat:
                console.log('You win - You found the hat!');
                currentlyPlaying = true;
                possibleNext = true;
                break;
            case fieldCharacter:
                console.log('Keep looking for the hat...');
                this.field[this.y][this.x] = pathCharacter;
                break;
            case pathCharacter:
                console.log('You are stepping on *');
                break;
            default:
            console.log('Invalid move. Try again.');
            break;
       }       
}

  nextLevel() {
    if (possibleNext) {
      let nextLevelCall = prompt('Go to next level? (y for yes, n for no): ');
      nextLevelCall = nextLevelCall.toLowerCase();
      if (nextLevelCall === 'y') {
        this.x += 1;
        this.y += 1;
        this.percentage += 0.1;
        this.plainField();
      } else {
        currentlyPlaying = false;
      }
    }
  }
}


const test = new Field();
function game() {
  test.plainField(); // Spielfeld initialisieren

  while (currentlyPlaying) {
    console.log(test.print());
    test.movement();
    test.result();
    test.nextLevel();
  }
}

game();
