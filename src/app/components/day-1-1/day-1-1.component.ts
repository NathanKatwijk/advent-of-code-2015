import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-day-1-1',
  templateUrl: './day-1-1.component.html',
  styleUrls: ['./day-1-1.component.scss']
})
export class Day11Component extends DayComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.httpClient.get('assets/day-1/input.txt', { responseType: 'text' }).subscribe((data: any) => {
      this.process(data);
    });
  }

  override process(data: string): void {
    // console.log(' ');
    const splittedStringList = data.split('\n').slice(0, -1);
    // console.log('splittedStringList', splittedStringList);

    this.result = this.calculateResult(splittedStringList[0]);

    // console.log('=====');
    // console.log(`Day 1.1 result: ${this.result}`);
  }

  calculateResult(instructionsInput: string): number {
    const instructionsList = instructionsInput.split('');

    return instructionsList.reduce((acc: number, input: string) => {
      if (input === '(') {
        acc = acc + 1;
      } else {
        acc = acc - 1;
      }
      return acc;
    }, 0);
  }
}
