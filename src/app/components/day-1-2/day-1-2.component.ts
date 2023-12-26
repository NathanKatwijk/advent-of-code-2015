import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-day-1-2',
  templateUrl: './day-1-2.component.html',
  styleUrls: ['./day-1-2.component.scss'],
})
export class Day12Component extends DayComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.httpClient
      .get('assets/day-1/input.txt', { responseType: 'text' })
      .subscribe((data: any) => {
        this.process(data);
      });
  }

  override process(data: string): void {
    // console.log(' ');
    const splittedStringList = data.split('\n').slice(0, -1);
    // console.log('splittedStringList', splittedStringList);

    this.result = this.calculateResult(splittedStringList[0]);

    // console.log('=====');
    // console.log(`Day 1.2 result: ${this.result}`);
  }

  calculateResult(instructionsInput: string): number {
    const instructionsList = instructionsInput.split('');
    let currentPosition = 0;

    const positions = instructionsList.map((input: string) => {
      if (input === '(') {
        currentPosition++;
      } else {
        currentPosition--;
      }
      return currentPosition;
    }, 0);
    // console.log('positions', positions);

    return positions.findIndex((position) => position === -1) + 1;
  }
}
