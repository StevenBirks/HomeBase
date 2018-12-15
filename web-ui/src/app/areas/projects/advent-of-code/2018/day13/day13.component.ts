import { Component, OnInit, Inject } from '@angular/core';
import { createTNode } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-2018-day13',
  templateUrl: './day13.component.html'
})
export class Day13_2018Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: string;

  private _track: string[][];
  private _carts: iCart[];

  private _collision: boolean;

  ngOnInit() {
  }

  public calculate(): void {
    this.init();

    this.iterateCarts();
  }

  private iterateCarts() {
    this.orderCarts();

    this._carts.forEach((cart) => {
      if (!this._collision) {
        if (cart.direction === direction.up) {
          this.moveUp(cart);
        } else if (cart.direction === direction.down) {
          this.moveDown(cart);
        } else if (cart.direction === direction.left) {
          this.moveLeft(cart);
        } else {
          this.moveRight(cart);
        }
      }
    });

    if (!this._collision) {
      this.iterateCarts();
    }
  }

  private moveUp(cart: iCart) {
    var upChar = this._track[cart.y - 1][cart.x];
    console.log(upChar);
    if (upChar === "/") {
      cart.direction = direction.right;
    }
    else if (upChar === "\\") {
      cart.direction = direction.left;
    } else if (upChar === "+") {
      if (cart.nextTurn === nextTurnDirection.left) {
        cart.direction = direction.left;
        cart.nextTurn = nextTurnDirection.straight;
      } else if (cart.nextTurn == nextTurnDirection.right) {
        cart.direction = direction.right;
        cart.nextTurn = nextTurnDirection.left;
      } else {
        // just goes up
        cart.nextTurn = nextTurnDirection.right;
      }
    } else if (upChar === "|") {
      // just goes up
    } else {
      console.log(upChar);
    }

    cart.y--;

    this.detectCollision(cart.x, cart.y);
  }

  private moveDown(cart: iCart) {
    const downChar = this._track[cart.y + 1][cart.x];
    console.log(downChar);
    if (downChar === "/") {
      cart.direction = direction.left;
    }
    else if (downChar === "\\") {
      cart.direction = direction.right;
    } else if (downChar === "+") {
      if (cart.nextTurn === nextTurnDirection.left) {
        cart.direction = direction.right;
        cart.nextTurn = nextTurnDirection.straight;
      } else if (cart.nextTurn == nextTurnDirection.right) {
        cart.direction = direction.left;
        cart.nextTurn = nextTurnDirection.left;
      } else {
        // just goes down
        cart.nextTurn = nextTurnDirection.right;
      }
    } else if (downChar === "|") {
      // just goes down
    } else {
      console.log(downChar);
    }

    cart.y++;

    this.detectCollision(cart.x, cart.y);
  }

  private moveLeft(cart: iCart) {
    const leftChar = this._track[cart.y][cart.x - 1];
    console.log(leftChar);
    if (leftChar === "/") {
      cart.direction = direction.down;
    }
    else if (leftChar === "\\") {
      cart.direction = direction.up;
    } else if (leftChar === "+") {
      if (cart.nextTurn === nextTurnDirection.left) {
        cart.direction = direction.down;
        cart.nextTurn = nextTurnDirection.straight;
      } else if (cart.nextTurn == nextTurnDirection.right) {
        cart.direction = direction.up;
        cart.nextTurn = nextTurnDirection.left;
      } else {
        // just goes left
        cart.nextTurn = nextTurnDirection.right;
      }
    } else if (leftChar === "-") {
      // just goes left
    } else {
      console.log(leftChar);
    }

    cart.x--;

    this.detectCollision(cart.x, cart.y);
  }

  private moveRight(cart: iCart) {
    const rightChar = this._track[cart.y][cart.x + 1];
    console.log(rightChar);
    if (rightChar === "/") {
      cart.direction = direction.up;
    }
    else if (rightChar === "\\") {
      cart.direction = direction.down;
    } else if (rightChar === "+") {
      if (cart.nextTurn === nextTurnDirection.left) {
        cart.direction = direction.up;
        cart.nextTurn = nextTurnDirection.straight;
      } else if (cart.nextTurn == nextTurnDirection.right) {
        cart.direction = direction.down;
        cart.nextTurn = nextTurnDirection.left;
      } else {
        // just goes left
        cart.nextTurn = nextTurnDirection.right;
      }
    } else if (rightChar === "-") {
      // just goes left
    } else {
      console.log(rightChar);
    }

    cart.x++;

    this.detectCollision(cart.x, cart.y);
  }

  private detectCollision(x: number, y: number) {
    var cartsAtLocation = this._carts.filter((cart) => {
      return cart.x === x && cart.y === y;
    }).length;

    if (cartsAtLocation === 2) {
      this._collision = true;
      this.answer = `${x},${y}`;
    }
  }

  private orderCarts() {
    this._carts.sort((a, b) => {
      if (a.y < b.y) {
        return -1;
      } else if (a.y > b.y) {
        return 1;
      } else {
        if (a.x < b.x) {
          return -1;
        } else if (a.x > b.x) {
          return 1
        } else {
          return 0;
        }
      }
    });

    console.log(this._carts);
  }

  private init() {
    this._track = new Array<Array<string>>();
    this._carts = new Array<iCart>();
    this._collision = false;

    let x = 0;
    let y = -1;

    this.inputString.split("\n").forEach((row) => {
      x = -1;
      y++;

      let newTrackArray = new Array<string>();

      row.split("").forEach((char) => {
        x++;
        if (char !== ">" && char !== "<" && char !== "^" && char !== "v") {
          newTrackArray.push(char);
        } else {
          let newCart = <iCart>{
            direction: direction.up,
            x: x,
            y: y,
            nextTurn: nextTurnDirection.left
          };

          if (char === "<") {
            newTrackArray.push("-");
            newCart.direction = direction.left;
          } else if (char === ">") {
            newTrackArray.push("-");
            newCart.direction = direction.right;
          } else if (char === "v") {
            newTrackArray.push("|");
            newCart.direction = direction.down;
          } else {
            newTrackArray.push("|");
          }

          this._carts.push(newCart);
        }
      });

      this._track.push(newTrackArray);
    });
  }
}

interface iCart {
  x: number,
  y: number,
  direction: direction,
  nextTurn: nextTurnDirection
}

enum direction {
  "up",
  "down",
  "left",
  "right"
}

enum nextTurnDirection {
  "left",
  "straight",
  "right"
}
