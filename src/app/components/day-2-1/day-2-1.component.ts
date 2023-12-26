import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';

type Present = {
  length: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-day-2-1',
  templateUrl: './day-2-1.component.html',
  styleUrls: ['./day-2-1.component.scss']
})
export class Day21Component extends DayComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.httpClient.get('assets/day-2/input.txt', { responseType: 'text' }).subscribe((data: any) => {
      this.process(data);
    });
  }

  override process(data: string): void {
    // console.log(' ');
    const splittedStringList = data.split('\n').slice(0, -1);
    // console.log('splittedStringList', splittedStringList);

    const presents = this.retrievePresents(splittedStringList);
    // console.log('presents', presents);

    this.result = this.calculateResult(presents);

    // console.log('=====');
    // console.log(`Day 2.1 result: ${this.result}`);
  }

  retrievePresents(presentsStringList: string[]): Present[] {
    return presentsStringList.map((presentString: string) => ({
      length: parseInt(presentString.substring(0, presentString.indexOf('x')), 10),
      width: parseInt(presentString.substring(presentString.indexOf('x') + 1, presentString.lastIndexOf('x')), 10),
      height: parseInt(presentString.substring(presentString.lastIndexOf('x') + 1), 10)
    }));
  }

  calculateResult(presents: Present[]): number {
    return presents.reduce((acc: number, present: Present) => {
      const lengthWidthMultiplication = present.length * present.width;
      const widthHeightMultiplication = present.width * present.height;
      const heightLengthMultiplication = present.height * present.length;

      const presentWrappingPaper =
        2*lengthWidthMultiplication +
        2*widthHeightMultiplication +
        2*heightLengthMultiplication +
        Math.min(lengthWidthMultiplication, widthHeightMultiplication, heightLengthMultiplication)

      // console.log('presentWrappingPaper', presentWrappingPaper);
      return acc + presentWrappingPaper;
    }, 0);
  }
}
