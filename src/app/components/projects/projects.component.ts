import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProjectsDialogComponent } from "../projects-dialog/projects-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  pInfo: pInfoInterface[] = [
    {
      title: `Countries ETF Charts`,
      webUrl: `markets`,
      codeUrl: `https://github.com/Hescu6/portfolio/tree/master/src/app/components/markets`,
      iconUrl: `assets/images/iconmarket.png`,
      display: "self",
      alt: `Countries ETF Charts`,
      description: `Interactive map and chart that
      displays different ETF's historical prices. Leaflet.js and D3.js were used for the map and chart. 
      The data is acquired from Yahoo Finance API
      and other APIs online`
    },
    {
      title: `Workflow Builder`,
      webUrl: `https://wfnpr.herokuapp.com/`,
      codeUrl: `NA`,
      iconUrl: `assets/images/iconworkflow.png`,
      display: "web",
      alt: `NPR Workflow Builder`,
      description: `Workflow builder for NPR's internal orchestrator. Performs CRUD operations on a set of sample workflows from an API. Upon saving, 
      the workflow is displayed on the console. Application was build with Angular 8 and JointJs`,
      blockInfo: `Code not available, I was allowed to take a
       modified DIST folder upon completing the internship`
    },
    {
      title: `Portfolio API server`,
      webUrl: `https://hescu6server.herokuapp.com/`,
      codeUrl: `https://github.com/Hescu6/server`,
      iconUrl: `assets/images/iconapi.png`,
      display: "dialog",
      alt: `Portfolio API server`,
      description: `General purpose API server for the portfolio and other applications. 
      Developed with Express and deployed with Heroku`,
      blockInfo: ``
    },
    {
      title: `Maze Game`,
      webUrl: `https://hescu6.github.io/MazeGame/`,
      codeUrl: `https://github.com/Hescu6/MazeGame`,
      iconUrl: `assets/images/iconmaze.png`,
      alt: `Maze`,
      display: "web",
      description: `Classic maze game with multiplayer capabilities, simply open in another tab or
    device and play.Developed using JQuery, JavaScript, and
    Firebase cloud services`
    },
    {
      title: `Four Square Cipher Encryptor`,
      webUrl: `http://ec2-52-10-153-141.us-west-2.compute.amazonaws.com`,
      codeUrl: `https://github.com/Hescu6/FourCipherEncrpt/tree/master`,
      iconUrl: `assets/images/iconfourencode.png`,
      display: "web",
      alt: `Four Square Cipher`,
      description: `Originally developed in Python, code was then retrofitted
      to work as a web application using PHP and AWS Elastic Beanstalk.`
    },
    {
      title: `UDC Tribute Webpage`,
      webUrl: `https://hescu6.github.io/UDCBasicWebpage/`,
      codeUrl: `https://github.com/Hescu6/UDCBasicWebpage`,
      iconUrl: `assets/images/iconudc.png`,
      display: "web",
      alt: `UDC`,
      description: `Tribute webpage for the University of the District of Columbia.
      Designed in HTML with CSS styling as well as JavaScript for the
      drop down menus.`
    }
  ];

  openLink(url: string, display?: string) {
    if (display == "web" || !display) {
      window.open(url, "_blank");
    } else if (display == "dialog") {
      this.openDialog(url);
    } else if (display == "self") {
      this.router.navigate(["/", url]);
    }
  }

  openDialog(url: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = url;
    dialogConfig.height = "85%";
    dialogConfig.width = "85%";
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ProjectsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
} //End projectsComponent Class

interface pInfoInterface {
  title: string;
  webUrl: string;
  codeUrl: string;
  iconUrl: string;
  display: string;
  alt: string;
  description: string;
  blockInfo?: string;
}
