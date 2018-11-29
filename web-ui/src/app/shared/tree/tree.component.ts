import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Observable, of as observableOf } from 'rxjs';
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

  public loading: boolean;
  public subLocation: string;
  protected treeService: TreeService;
  private directoryTree: DirectoryTreeDto[];
  public treeControl = new NestedTreeControl<Item>(node => observableOf(node.children));

  ngOnInit() {
    this.subLocation = 'music/drums';
    this.getTreeData();
  }

  getTreeData() {
    this.loading = true;
    this.treeService.getDirectoryTreeData(this.subLocation)
      .subscribe((data: DirectoryTreeDto[]) => {
        this.directoryTree = data;
        this.loading = false;
        console.log(this.directoryTree);
      });
  }   
}