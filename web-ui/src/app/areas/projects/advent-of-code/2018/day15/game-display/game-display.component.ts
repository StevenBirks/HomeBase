import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { iCombatant } from '../day15.component';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit {
  _caveRows: string[];
  _combatants: iCombatant[];
  _victory: number;
  _victoryText: string;
  _displayVictory: boolean;
  playPause: string;
  _elfAttack: number;


  constructor(public dialogRef: MatDialogRef<GameDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) data: { cave: string[][], combatants: iCombatant[], elfAttack: number }) {

    this.playPause = "Play";

    this.updateValues(data.cave, data.combatants, data.elfAttack); 
  }

  @Output() iterateParent = new EventEmitter<any>();
  @Output() togglePause = new EventEmitter<any>();

  public updateValues(cave: string[][], combatants: iCombatant[], elfAttack: number = 3) {
    this._caveRows = new Array<string>();
    this._combatants = new Array<iCombatant>();

    cave.forEach((row) => {
      this._caveRows.push(row.join(""));
    }); 
    
    combatants.filter((comb) => {
      return comb.health > 0;
    }).forEach((combatant) => {
      this._combatants.push(combatant);
    })

    this._elfAttack = elfAttack;
  }

  public victory(roundCount: number, winners: string) {
    let totalHealth = 0;
    this._combatants.forEach((combatant) => {
      if (combatant.health > 0) {
        totalHealth += combatant.health;

      }
    });

    this._victory = totalHealth * roundCount;
    this._victoryText = `${winners} win!`;
    this._displayVictory = true;
  }

  public iterate(): void {
    this.iterateParent.emit();
  }

  public toggle(): void {
    this.togglePause.emit();

    if (this.playPause === "Play") {
      this.playPause = "Pause";
      this.iterate();
    } else {
      this.playPause = "Play";

    }    
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
