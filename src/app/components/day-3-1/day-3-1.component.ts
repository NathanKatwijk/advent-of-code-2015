import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';

type House = {
  xIndex: number,
  yIndex: number,
  amountOfVisits: number;
}

@Component({
  selector: 'app-day-3-1',
  templateUrl: './day-3-1.component.html',
  styleUrls: ['./day-3-1.component.scss']
})
export class Day31Component extends DayComponent implements OnInit {
  readonly DIRECTION_NORTH = '^';
  readonly DIRECTION_SOUTH = 'v';
  readonly DIRECTION_WEST = '<';
  readonly DIRECTION_EAST = '>';

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.httpClient.get('assets/day-3/input.txt', { responseType: 'text' }).subscribe((data: any) => {
    // this.httpClient.get('assets/day-3/example-input-1.txt', { responseType: 'text' }).subscribe((data: any) => {
      this.process(data);
    });
  }

  override process(data: string): void {
    // console.log(' ');
    const splittedStringList = data.split('\n').slice(0, -1);
    // console.log('splittedStringList', splittedStringList);

    const visitedHouses = this.retrieveVisitedHouses(splittedStringList[0]);
    // console.log('visitedHouses', visitedHouses);

    this.result = visitedHouses.length;

    // console.log('=====');
    // console.log(`Day 3.1 result: ${this.result}`);
  }

  retrieveVisitedHouses(directionMoves: string): House[] {
    const houses = [{ xIndex: 0, yIndex: 0, amountOfVisits: 1 }];
    let currentXIndex = 0;
    let currentYIndex = 0;

    directionMoves.split('').forEach((directionMove: string) => {
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

      const existingHouseIndex = houses.findIndex((house) => house.xIndex === currentXIndex && house.yIndex === currentYIndex);

      if (existingHouseIndex > -1) {
        houses[existingHouseIndex].amountOfVisits = houses[existingHouseIndex].amountOfVisits + 1;
      } else {
        houses.push({
          xIndex: currentXIndex,
          yIndex: currentYIndex,
          amountOfVisits: 1
        })
      }
    });

    return houses;
  }
}
