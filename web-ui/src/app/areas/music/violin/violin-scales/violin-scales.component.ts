import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-violin-scales',
  templateUrl: './violin-scales.component.html',
  styleUrls: ['./violin-scales.component.scss']
})

export class ViolinScalesComponent implements OnInit {
  private _key: string;
  private keys: MusicKey[];

  constructor() { }

  ngOnInit() {
    this.keys = new Array<MusicKey>();
    this._key = "c";

    this.keys.push({key: "c", notes:["c", "d", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "c#", notes:["c", "db", "eb", "f", "g", "ab", "bb"]});
    this.keys.push({key: "db", notes:["c", "db", "eb", "f", "g", "ab", "bb"]});
    this.keys.push({key: "d", notes:["c#", "d", "e", "f#", "g", "a", "b"]});

    this.keys.push({key: "d#", notes:["c#", "d#", "e#", "f#", "g#", "a#", "b"]});
    this.keys.push({key: "e", notes:["c", "d#", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "f", notes:["c", "d#", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "f#", notes:["c", "d#", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "g", notes:["c", "d#", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "g#", notes:["c", "d#", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "a", notes:["c", "d#", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "a#", notes:["c", "d#", "e", "f", "g", "a", "b"]});
    this.keys.push({key: "b", notes:["c", "d#", "e", "f", "g", "a", "b"]});
  }

  public setKey(key: string): void {
    this._key = key;
  };


  public noteInKey(notes: string[]): boolean {
    const notesInCurrentKey = this.keys.find(o => o.key === this._key).notes;
    return notesInCurrentKey.some(n => notes.includes(n));
  }
}

interface MusicKey {
  key: string;
  notes: string[];
}
