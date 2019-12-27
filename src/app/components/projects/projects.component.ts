import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  pInfo: pInfoInterface[] = [
    {
      title: `Maze Game`,
      webUrl: `https://hescu6.github.io/MazeGame/`,
      codeUrl: `https://github.com/Hescu6/MazeGame`,
      iconUrl: `./../../../assets/images/iconmaze.png`,
      alt: `Maze`,
      description: `Classic maze game with multiplayer capabilities, simply open in another tab or
    device and play.Developed using JQuery, JavaScript, and
    Firebase cloud services`
    },
    {
      title: `Four Square Cipher Encryptor`,
      webUrl: `http://ec2-52-10-153-141.us-west-2.compute.amazonaws.com`,
      codeUrl: `https://github.com/Hescu6/FourCipherEncrpt/tree/master`,
      iconUrl: `./../../../assets/images/iconfourencode.png`,
      alt: `Four Square Cipher`,
      description: `Originally developed in Python, code was then retrofitted
      to work as a web application using PHP and AWS Elastic Beanstalk.`
    },
    {
      title: `UDC Tribute Webpage`,
      webUrl: `https://hescu6.github.io/UDCBasicWebpage/`,
      codeUrl: `https://github.com/Hescu6/UDCBasicWebpage`,
      iconUrl: `./../../../assets/images/iconudc.png`,
      alt: `UDC`,
      description: `Tribute webpage for the University of the District of Columbia.
      Designed in HTML with CSS styling as well as JavaScript for the
      drop down menus.`
    }
  ];



  openLink(url: string) {
    window.open(url, "_blank")
  }

} //End projectsComponent Class

interface pInfoInterface {
  title: string,
  webUrl: string,
  codeUrl: string,
  iconUrl: string,
  alt: string,
  description: string
}
