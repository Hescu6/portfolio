import { Component, OnInit } from '@angular/core';
import { ProjectsDialogComponent } from '../projects-dialog/projects-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }


  pInfo: pInfoInterface[] = [
    {
      title: `Countries ETF Charts`,
      webUrl: `https://hescu6.github.io/portfolio/markets/`,
      codeUrl: `https://github.com/Hescu6/portfolio/tree/master/src/app/components/markets`,
      iconUrl: `assets/images/iconmarket.png`,
      display: 'web',
      alt: `Countries ETF Charts`,
      description: `Developed an Angular webpage with an interactive map and chart that
      displays different ETF's historical prices. The map was made with Leaflet.js
      and the candlestick chart was made using D3.js. The data is provided by
      Yahoo Finance and my own API service`
    },
    {
      title: `Workflow Builder`,
      webUrl: `https://wfnpr.herokuapp.com/`,
      codeUrl: `NA`,
      iconUrl: `assets/images/iconworkflow.png`,
      display: 'web',
      alt: `NPR Workflow Builder`,
      description: `Workflow builder for NPR's internal orchestrator. A different
      API was developed to perform CRUD operations on a set of sample workflows. Upon saving, 
      the workflow is displayed on the console. Application was build with Angular 8 and JointJs`,
      blockInfo:`Code not available, I was allowed to take a
       modified version upon completing the internship`
    },
    {
      title: `Portfolio API server`,
      webUrl: `https://hescu6server.herokuapp.com/`,
      codeUrl: `https://github.com/Hescu6/server`,
      iconUrl: `assets/images/iconapi.png`,
      display: 'dialog',
      alt: `Portfolio API server`,
      description: `General purpose API server for the portfolio and other applications. 
      Developed with Express and deployed with Heroku`,
      blockInfo:``
    },
    {
      title: `Maze Game`,
      webUrl: `https://hescu6.github.io/MazeGame/`,
      codeUrl: `https://github.com/Hescu6/MazeGame`,
      iconUrl: `assets/images/iconmaze.png`,
      alt: `Maze`,
      display: 'web',
      description: `Classic maze game with multiplayer capabilities, simply open in another tab or
    device and play.Developed using JQuery, JavaScript, and
    Firebase cloud services`
    },
    {
      title: `Four Square Cipher Encryptor`,
      webUrl: `http://ec2-52-10-153-141.us-west-2.compute.amazonaws.com`,
      codeUrl: `https://github.com/Hescu6/FourCipherEncrpt/tree/master`,
      iconUrl: `assets/images/iconfourencode.png`,
      display: 'web',
      alt: `Four Square Cipher`,
      description: `Originally developed in Python, code was then retrofitted
      to work as a web application using PHP and AWS Elastic Beanstalk.`
    },
    {
      title: `UDC Tribute Webpage`,
      webUrl: `https://hescu6.github.io/UDCBasicWebpage/`,
      codeUrl: `https://github.com/Hescu6/UDCBasicWebpage`,
      iconUrl: `assets/images/iconudc.png`,
      display: 'web',
      alt: `UDC`,
      description: `Tribute webpage for the University of the District of Columbia.
      Designed in HTML with CSS styling as well as JavaScript for the
      drop down menus.`
    }
  ];

  openLink(url: string, display?: string) {

    if (display == "web" || !display) {
      window.open(url, "_blank")
    } else if (display == "dialog") {
      this.openDialog(url);
    }
  }

  openDialog(url: string): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = url;
    dialogConfig.height = '85%';
    dialogConfig.width = '85%';
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ProjectsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

} //End projectsComponent Class

interface pInfoInterface {
  title: string,
  webUrl: string,
  codeUrl: string,
  iconUrl: string,
  display: string,
  alt: string,
  description: string,
  blockInfo?: string
}
