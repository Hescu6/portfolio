import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  about:string = `I'm a Software Developer in the DMV area (DC, MD, VA). I
  love building interactive web apps and finding patterns in structures that resemble chaos.
  Feel free to shoot me a line or two in the message icon below.`

}
