import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, of as observableOf } from 'rxjs'

export type Classification = {name: string, children: Classification[], newSpecies?: number};

@Component({
  selector: 'app-material-design',
  templateUrl: './material-design.component.html',
  styleUrls: ['./material-design.component.scss']
})
export class MaterialDesignComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  rootLevelNodes = ['class1', 'class2'];

  classifications: Classification[] = [
    {
      name: "class1",
      newSpecies: 2,
      children: 
        [
          {name: "subclass11", children: [], newSpecies: 1}, 
          {name: "subclass12", children: []}
        ]
    },
    {
      name: "class2",
      newSpecies: 10,
      children: 
        [
          {name: "subclass21", children: []}, 
          {name: "subclass22", children: []}
        ]
    }
  ];    
  
  treeControl = new NestedTreeControl<Classification>(node => observableOf(node.children));
}
