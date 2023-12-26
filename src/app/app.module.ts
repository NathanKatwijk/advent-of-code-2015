import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DayComponent } from './components/day/day.component';
import { Day11Component } from './components/day-1-1/day-1-1.component';
import { Day12Component } from './components/day-1-2/day-1-2.component';
import { Day21Component } from './components/day-2-1/day-2-1.component';
import { Day22Component } from './components/day-2-2/day-2-2.component';
import { Day31Component } from './components/day-3-1/day-3-1.component';
import { Day32Component } from './components/day-3-2/day-3-2.component';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    Day11Component,
    Day12Component,
    Day21Component,
    Day22Component,
    Day31Component,
    Day32Component,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
