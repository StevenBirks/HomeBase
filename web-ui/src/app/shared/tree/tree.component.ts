import { Component, OnInit, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { of as observableOf } from 'rxjs';
import { TreeService } from './tree.service';
import { DirectoryTreeDto } from './directoryTree.dto';

export type Item = {name: string, children: Item[], isFile: boolean};

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnInit {

  constructor(treeService: TreeService) {
    this.treeService = treeService;
  }

  @Input() finalLocation: string;

  public loading: boolean;
  public subLocation: string;
  protected treeService: TreeService;
  private directoryTree: DirectoryTreeDto[];
  public treeControl = new NestedTreeControl<Item>(node => observableOf(node.children));

  ngOnInit() {
    console.log(this.finalLocation);
    this.subLocation = 'music tab';
    this.getTreeData();
  }

  getTreeData() {
    this.loading = true;
    this.treeService.getDirectoryTreeData(`${this.subLocation}/${this.finalLocation}`)
      .subscribe((data: DirectoryTreeDto[]) => {
        this.directoryTree = data;
        this.loading = false;
        console.log(this.directoryTree);
      });
  }   
}