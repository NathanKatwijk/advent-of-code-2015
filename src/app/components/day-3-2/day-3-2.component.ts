import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';

type House = {
  xIndex: number,
  yIndex: number,
  amountOfVisits: number;
}

@Component({
  selector: 'app-day-3-2',
  templateUrl: './day-3-2.component.html',
  styleUrls: ['./day-3-2.component.scss']
})
export class Day32Component extends DayComponent implements OnInit {
  readonly DIRECTION_NORTH = '^';
  readonly DIRECTION_SOUTH = 'v';
  readonly DIRECTION_WEST = '<';
  readonly DIRECTION_EAST = '>';

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.httpClient.get('assets/day-3/input.txt', { responseType: 'text' }).subscribe((data: any) => {
    // this.httpClient.get('assets/day-3/example-input-3.txt', { responseType: 'text' }).subscribe((data: any) => {
      this.process(data);
    });
  }

  override process(data: string): void {
    // console.log(' ');
    const splittedStringList = data.split('\n').slice(0, -1);
    // console.log('splittedStringList', splittedStringList);

    const directionMovesSanta = splittedStringList[0].split('').filter((_, index) => index % 2 === 0);
    const directionMovesRoboSanta = splittedStringList[0].split('').filter((_, index) => index % 2 === 1);

    const visitedHouses = [{ xIndex: 0, yIndex: 0, amountOfVisits: 2 }];
    const visitedHousesSanta = this.retrieveVisitedHouses(directionMovesSanta, visitedHouses);
    const visitedHousesSantaAndRoboSanta = this.retrieveVisitedHouses(directionMovesRoboSanta, visitedHousesSanta);
    // console.log('visitedHouses Santa and Robo Santa', visitedHouses);

    this.result = visitedHousesSantaAndRoboSanta.length;

    // console.log('=====');
    // console.log(`Day 3.2 result: ${this.result}`);
  }

  retrieveVisitedHouses(directionMoves: string[], alreadyVisitedHouses: House[]): House[] {
    let currentXIndex = 0;
    let currentYIndex = 0;

    directionMoves.forEach((directionMove: string) => {
      switch(directionMove) {
        case this.DIRECTION_NORTH:
          currentYIndex--;
          break;
        case this.DIRECTION_SOUTH:
          currentYIndex++;
          break;
        case this.DIRECTION_WEST:
          currentXIndex--;
          break;
        case this.DIRECTION_EAST:
          currentXIndex++;
          break;
        default:
          break;
      }

      const existingHouseIndex = alreadyVisitedHouses.findIndex((house) => house.xIndex === currentXIndex && house.yIndex === currentYIndex);

      if (existingHouseIndex > -1) {
        alreadyVisitedHouses[existingHouseIndex].amountOfVisits = alreadyVisitedHouses[existingHouseIndex].amountOfVisits + 1;
      } else {
        alreadyVisitedHouses.push({
          xIndex: currentXIndex,
          yIndex: currentYIndex,
          amountOfVisits: 1
        })
      }
    });

    return alreadyVisitedHouses;
  }

}
