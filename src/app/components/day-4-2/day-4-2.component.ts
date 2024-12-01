import { Component, OnInit } from '@angular/core';
import { formatNumber, registerLocaleData } from '@angular/common';
import nl from '@angular/common/locales/nl';
import { DayComponent } from '../day/day.component';
import { md5 } from '../../../scripts/md5-util';

@Component({
  selector: 'app-day-4-2',
  templateUrl: './day-4-2.component.html',
  styleUrls: ['./day-4-2.component.scss'],
})
export class Day42Component extends DayComponent implements OnInit {
  readonly INPUT = 'ckczppom';
  readonly HASH_PREFIX = '000000'; // 6 leading zeros instead of 5

  ngOnInit(): void {
    registerLocaleData(nl);

    console.log('=====');

    this.result = this.calculateResult();
    console.log(`Day 4.2 result: ${this.result}`);
  }

  calculateResult(): number {
    let currentIndex = 0;

    while (true) {
      const hash = this.createM5Hash(`${this.INPUT}${currentIndex}`);

      // if (currentIndex % 1_000_000 === 0) {
      //   console.log(formatNumber(currentIndex, 'nl') + ' - ' + hash);
      // }
      if (hash.substring(0, 6) === this.HASH_PREFIX) {
        // console.log('hash', hash);
        break;
      }
      currentIndex++;
    }

    return currentIndex;
  }

  createM5Hash(input: string) {
    return md5(input);
  }
}
