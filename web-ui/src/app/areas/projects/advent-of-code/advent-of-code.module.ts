import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdventOfCodeService } from './advent-of-code.service';
import { AdventOfCodeComponent } from './advent-of-code.component';
import { AngularMaterialModule } from '../../../shared/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { DayBlockBaseComponent } from './day-block/day-block-base.component';
// 2017
import { DayBlock_2017Component } from './2017/day-block/day-block.component';
import { Day10_5Component } from './2017/day10/day10-5.component';
import { Day1Component } from './2017/day1/day1.component';
import { Day1_5Component } from './2017/day1/day1-5.component';
import { Day2Component } from './2017/day2/day2.component';
import { Day2_5Component } from './2017/day2/day2-5.component';
import { Day3Component } from './2017/day3/day3.component';
import { Day3_5Component } from './2017/day3/day3-5.component';
import { Day4_5Component } from './2017/day4/day4-5.component';
import { Day4Component } from './2017/day4/day4.component';
import { Day5Component } from './2017/day5/day5.component';
import { Day5_5Component } from './2017/day5/day5-5.component';
import { Day6Component } from './2017/day6/day6.component';
import { Day6_5Component } from './2017/day6/day6-5.component';
import { Day7_5Component } from './2017/day7/day7-5.component';
import { Day7Component } from './2017/day7/day7.component';
import { Day8Component } from './2017/day8/day8.component';
import { Day8_5Component } from './2017/day8/day8-5.component';
import { Day9Component } from './2017/day9/day9.component';
import { Day9_5Component } from './2017/day9/day9-5.component';
import { Day10Component } from './2017/day10/day10.component';
import { Day20Component } from './2017/day20/day20.component';
import { Day20_5Component } from './2017/day20/day20-5.component';
import { Day25Component } from './2017/day25/day25.component';
import { Day24_5Component } from './2017/day24/day24-5.component';
import { Day24Component } from './2017/day24/day24.component';
import { Day23_5Component } from './2017/day23/day23-5.component';
import { Day23Component } from './2017/day23/day23.component';
import { Day22_5Component } from './2017/day22/day22-5.component';
import { Day22Component } from './2017/day22/day22.component';
import { Day21_5Component } from './2017/day21/day21-5.component';
import { Day21Component } from './2017/day21/day21.component';
import { Day19_5Component } from './2017/day19/day19-5.component';
import { Day19Component } from './2017/day19/day19.component';
import { Day18_5Component } from './2017/day18/day18-5.component';
import { Day18Component } from './2017/day18/day18.component';
import { Day17_5Component } from './2017/day17/day17-5.component';
import { Day17Component } from './2017/day17/day17.component';
import { Day16_5Component } from './2017/day16/day16-5.component';
import { Day16Component } from './2017/day16/day16.component';
import { Day15_5Component } from './2017/day15/day15-5.component';
import { Day15Component } from './2017/day15/day15.component';
import { Day14_5Component } from './2017/day14/day14-5.component';
import { Day14Component } from './2017/day14/day14.component';
import { Day13_5Component } from './2017/day13/day13-5.component';
import { Day13Component } from './2017/day13/day13.component';
import { Day12_5Component } from './2017/day12/day12-5.component';
import { Day12Component } from './2017/day12/day12.component';
import { Day11_5Component } from './2017/day11/day11-5.component';
import { Day11Component } from './2017/day11/day11.component';

// 2016
import { DayBlock_2016Component } from './2016/day-block/day-block.component';
import { Day1_2016Component } from './2016/day1/day1.component';
import { Day1_5_2016Component } from './2016/day1/day1-5.component';
import { Day1_5_2015Component } from './2015/day1/day1-5.component';
import { Day1_2015Component } from './2015/day1/day1.component';
import { DayBlock_2015Component } from './2015/day-block/day-block.component';
import { Day2_2015Component } from './2015/day2/day2.component';
import { Day2_5_2015Component } from './2015/day2/day2-5.component';
import { Day3_5_2015Component } from './2015/day3/day3-5.component';
import { Day3_2015Component } from './2015/day3/day3.component';
import { Day4_2015Component } from './2015/day4/day4.component';
import { Day4_5_2015Component } from './2015/day4/day4-5.component';
import { Day5_5_2015Component } from './2015/day5/day5-5.component';
import { Day5_2015Component } from './2015/day5/day5.component';
import { Day6_5_2015Component } from './2015/day6/day6-5.component';
import { Day6_2015Component } from './2015/day6/day6.component';
import { Day7_5_2015Component } from './2015/day7/day7-5.component';
import { Day7_2015Component } from './2015/day7/day7.component';
import { Day8_5_2015Component } from './2015/day8/day8-5.component';
import { Day8_2015Component } from './2015/day8/day8.component';
import { Day9_5_2015Component } from './2015/day9/day9-5.component';
import { Day9_2015Component } from './2015/day9/day9.component';
import { Day10_5_2015Component } from './2015/day10/day10-5.component';
import { Day10_2015Component } from './2015/day10/day10.component';
import { Day11_5_2015Component } from './2015/day11/day11-5.component';
import { Day11_2015Component } from './2015/day11/day11.component';
import { Day12_5_2015Component } from './2015/day12/day12-5.component';
import { Day12_2015Component } from './2015/day12/day12.component';
import { Day13_5_2015Component } from './2015/day13/day13-5.component';
import { Day13_2015Component } from './2015/day13/day13.component';
import { Day14_5_2015Component } from './2015/day14/day14-5.component';
import { Day14_2015Component } from './2015/day14/day14.component';

// 2018
import { DayBlock_2018Component } from './2018/day-block/day-block.component';
import { Day1_2018Component } from './2018/day1/day1.component';
import { Day1_5_2018Component } from './2018/day1/day1-5.component';
import { Day2_2018Component } from './2018/day2/day2.component';
import { Day2_5_2018Component } from './2018/day2/day2-5.component';
import { Day3_2018Component } from './2018/day3/day3.component';
import { Day3_5_2018Component } from './2018/day3/day3-5.component';
import { Day4_2018Component } from './2018/day4/day4.component';
import { Day4_5_2018Component } from './2018/day4/day4-5.component';
import { Day5_2018Component } from './2018/day5/day5.component';
import { Day5_5_2018Component } from './2018/day5/day5-5.component';
import { Day6_2018Component } from './2018/day6/day6.component';
import { Day6_5_2018Component } from './2018/day6/day6-5.component';
import { Day7_2018Component } from './2018/day7/day7.component';
import { Day7_5_2018Component } from './2018/day7/day7-5.component';
import { Day8_2018Component } from './2018/day8/day8.component';
import { Day8_5_2018Component } from './2018/day8/day8-5.component';
import { Day9_2018Component } from './2018/day9/day9.component';
import { Day9_5_2018Component } from './2018/day9/day9-5.component';
import { Day10_2018Component, AnswerDialogComponent } from './2018/day10/day10.component';
import { Day10_5_2018Component } from './2018/day10/day10-5.component';
import { Day11_2018Component } from './2018/day11/day11.component';
import { Day11_5_2018Component } from './2018/day11/day11-5.component';
import { Day12_2018Component } from './2018/day12/day12.component';
import { Day12_5_2018Component } from './2018/day12/day12-5.component';
import { Day13_2018Component } from './2018/day13/day13.component';
import { Day13_5_2018Component } from './2018/day13/day13-5.component';
import { Day14_2018Component } from './2018/day14/day14.component';
import { Day14_5_2018Component } from './2018/day14/day14-5.component';
import { Day15_2018Component } from './2018/day15/day15.component';
import { Day15_5_2018Component } from './2018/day15/day15-5.component';
import { GameDisplayComponent } from './2018/day15/game-display/game-display.component';
import { Day16_2018Component } from './2018/day16/day16.component';
import { Day16_5_2018Component } from './2018/day16/day16-5.component';
import { Day17_2018Component } from './2018/day17/day17.component';
import { Day17_5_2018Component } from './2018/day17/day17-5.component';
import { WaterDisplayComponent } from './2018/day17/water-display/water-display.component';
import { Lumber201818DisplayComponent } from './2018/day18/lumber-display/lumber-display.component';
import { Day18_2018Component } from './2018/day18/day18.component';
import { Day18_5_2018Component } from './2018/day18/day18-5.component';
import { Day19_2018Component } from './2018/day19/day19.component';
import { Day19_5_2018Component } from './2018/day19/day19-5.component';
// 2019
import { DayBlock_2019Component } from './2019/day-block/day-block.component';
import { Day1_2019Component } from './2019/day1/day1.component';
import { Day1_5_2019Component } from './2019/day1/day1-5.component';
import { Day2_2019Component } from './2019/day2/day2.component';
import { Day2_5_2019Component } from './2019/day2/day2-5.component';

@NgModule({
  declarations: [
    AdventOfCodeComponent,
    DayBlockBaseComponent,
    AnswerDialogComponent,
    // 2017
    DayBlock_2017Component,
    Day1Component,
    Day1_5Component,
    Day2Component,
    Day2_5Component,
    Day3Component,
    Day3_5Component,
    Day4Component,
    Day4_5Component,
    Day5Component,
    Day5_5Component,
    Day6Component,
    Day6_5Component,
    Day7Component,
    Day7_5Component,
    Day8Component,
    Day8_5Component,
    Day9Component,
    Day9_5Component,
    Day10Component,
    Day10_5Component,
    Day11Component,
    Day11_5Component,
    Day12Component,
    Day12_5Component,
    Day13Component,
    Day13_5Component,
    Day14Component,
    Day14_5Component,
    Day15Component,
    Day15_5Component,
    Day16Component,
    Day16_5Component,
    Day17Component,
    Day17_5Component,
    Day18Component,
    Day18_5Component,
    Day19Component,
    Day19_5Component,
    Day20Component,
    Day20_5Component,
    Day21Component,
    Day21_5Component,
    Day22Component,
    Day22_5Component,
    Day23Component,
    Day23_5Component,
    Day24Component,
    Day24_5Component,
    Day25Component,
    DayBlock_2016Component,
    Day1_2016Component,
    Day1_5_2016Component,
    // 2015
    DayBlock_2015Component,
    Day1_2015Component,
    Day1_5_2015Component,
    Day2_2015Component,
    Day2_5_2015Component,
    Day3_2015Component,
    Day3_5_2015Component,
    Day4_5_2015Component,
    Day4_2015Component,
    Day5_5_2015Component,
    Day5_2015Component,
    Day6_5_2015Component,
    Day6_2015Component,
    Day7_5_2015Component,
    Day7_2015Component,
    Day8_5_2015Component,
    Day8_2015Component,
    Day9_5_2015Component,
    Day9_2015Component,
    Day10_5_2015Component,
    Day10_2015Component,
    Day11_5_2015Component,
    Day11_2015Component,
    Day12_5_2015Component,
    Day12_2015Component,
    Day13_5_2015Component,
    Day13_2015Component,
    Day14_5_2015Component,
    Day14_2015Component,
    //2018
    DayBlock_2018Component,
    Day1_2018Component,
    Day1_5_2018Component,
    Day2_2018Component,
    Day2_5_2018Component,
    Day3_2018Component,
    Day3_5_2018Component,
    Day4_2018Component,
    Day4_5_2018Component,
    Day5_2018Component,
    Day5_5_2018Component,
    Day6_2018Component,
    Day6_5_2018Component,
    Day7_2018Component,
    Day7_5_2018Component,
    Day8_2018Component,
    Day8_5_2018Component,
    Day9_2018Component,
    Day9_5_2018Component,
    Day10_2018Component,
    Day10_5_2018Component,
    Day11_2018Component,
    Day11_5_2018Component,
    Day12_2018Component,
    Day12_5_2018Component,
    Day13_2018Component,
    Day13_5_2018Component,
    Day14_2018Component,
    Day14_5_2018Component,
    Day15_2018Component,
    Day15_5_2018Component,
    GameDisplayComponent,
    Day16_2018Component,
    Day16_5_2018Component,
    Day17_2018Component,
    Day17_5_2018Component,
    WaterDisplayComponent,
    Day18_2018Component,
    Day18_5_2018Component,
    Lumber201818DisplayComponent,
    Day19_2018Component,
    Day19_5_2018Component,
    // 2019
    DayBlock_2019Component,
    Day1_2019Component,
    Day1_5_2019Component,
    Day2_2019Component,
    Day2_5_2019Component,
    ],
  imports: [
      CommonModule,
      AngularMaterialModule,
      FormsModule,
      ClipboardModule,
      HttpClientModule
  ],
  exports: [
    AdventOfCodeComponent
  ],
  providers: [
    AdventOfCodeService
  ],
  entryComponents: [
    AnswerDialogComponent,
    GameDisplayComponent,
    WaterDisplayComponent,
    Lumber201818DisplayComponent
  ]
})
export class AdventOfCodeModule { }
