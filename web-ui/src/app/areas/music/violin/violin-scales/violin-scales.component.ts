import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-violin-scales',
  templateUrl: './violin-scales.component.html',
  styleUrls: ['./violin-scales.component.scss']
})

export class ViolinScalesComponent implements OnInit {
  private _key: string;
  private readonly keys: MusicKey[] = [
  { key: "c", notes: ["c", "d", "e", "f", "g", "a", "b"] },
  { key: "c#", notes: ["c#", "d#", "e#", "f#", "g#", "a#", "b#"] },
  { key: "db", notes: ["c", "db", "eb", "f", "gb", "ab", "bb"] },
  { key: "d", notes: ["c#", "d", "e", "f#", "g", "a", "b"] },
  { key: "eb", notes: ["c", "d", "eb", "f", "g", "ab", "bb"] },
  { key: "e", notes: ["c#", "d#", "e", "f#", "g#", "a", "b"] },
  { key: "f", notes: ["c", "d", "e", "f", "g", "a", "bb"] },
  { key: "f#", notes: ["c#", "d#", "e#", "f#", "g#", "a#", "b"] },
  { key: "gb", notes: ["cb", "db", "eb", "f", "gb", "ab", "bb"] },
  { key: "g", notes: ["c", "d", "e", "f#", "g", "a", "b"] },
  { key: "ab", notes: ["c", "db", "eb", "f", "g", "ab", "bb"] },
  { key: "a", notes: ["c#", "d", "e", "f#", "g#", "a", "b"] },
  { key: "bb", notes: ["c", "d", "eb", "f", "g", "a", "bb"] },
  { key: "b", notes: ["c#", "d#", "e", "f#", "g#", "a#", "b"] }];

  constructor() { }

  ngOnInit() {
    this.setKey('c');
  }

  public setKey(key: string): void {
    this._key = key;

    const element = document.getElementById('key-image');
    if (element != null) {
      let className = this._key;
      className = className.replace('#', '-sharp');
      element.className = '';
      element.classList.add(`key-${className}`);
    }
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
