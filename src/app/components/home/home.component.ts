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

  about:string = `I'm a Software Developer based in the DMV area (Washington D.C). I
  LOVE building interactive web apps and I'm extremely curious about how things work.
  Feel free to shoot me a line or two in the message icon below.`

}
