import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-2018-day13-5',
  templateUrl: './day13-5.component.html'
})
export class Day13_5_2018Component implements OnInit {

  constructor() { }

  public inputString: string;
  public answer: string;

  private _track: string[][];
  private _carts: iCart[];

  private _crashCount: number;

  ngOnInit() {
  }

  public calculate(): void {
    this.init();

    while (this._crashCount < this._carts.length - 1) {
      this.iterateCarts();

      if (this._crashCount === (this._carts.length - 1)) {
        this.end();
      }
    }
  }

  private end() {
    const uncrashed = this._carts.filter((cart) => {
      return !cart.crashed;
    });

    this.answer = `${uncrashed[0].x},${uncrashed[0].y}`;
  }

  private iterateCarts() {
    this.orderCarts();

    this._carts.forEach((cart) => {
      if (!cart.crashed) {
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
  }

  private moveUp(cart: iCart) {
    var upChar = this._track[cart.y - 1][cart.x];
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
    }

    cart.y--;

    this.detectCollision(cart.x, cart.y);
  }

  private moveDown(cart: iCart) {
    const downChar = this._track[cart.y + 1][cart.x];
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
    }

    cart.y++;

    this.detectCollision(cart.x, cart.y);
  }

  private moveLeft(cart: iCart) {
    const leftChar = this._track[cart.y][cart.x - 1];
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
    }

    cart.x--;

    this.detectCollision(cart.x, cart.y);
  }

  private moveRight(cart: iCart) {
    const rightChar = this._track[cart.y][cart.x + 1];
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
    }

    cart.x++;

    this.detectCollision(cart.x, cart.y);
  }

  private detectCollision(x: number, y: number) {
    var cartsAtLocation = this._carts.filter((cart) => {
      return cart.x === x && cart.y === y && !cart.crashed
    });

    if (cartsAtLocation.length > 2) {
      debugger;
    }

    if (cartsAtLocation.length == 2) {
      cartsAtLocation.forEach((cart) => {
        cart.crashed = true;
      });

      this._crashCount += 2;
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
  }

  private init() {
    this._track = new Array<Array<string>>();
    this._carts = new Array<iCart>();
    this._crashCount = 0;

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
            nextTurn: nextTurnDirection.left,
            crashed: false
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
  nextTurn: nextTurnDirection,
  crashed: boolean
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
