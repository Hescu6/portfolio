import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  p5 = new p5(p => {
    let x = 100;
    let y = 100;

    p.setup = () => {
      p.createCanvas(300, 300);
    };

    p.draw = () => {
      p.background(0);
      p.fill(255);
      p.rect(x, y, 50, 50);
    };
  });

}
