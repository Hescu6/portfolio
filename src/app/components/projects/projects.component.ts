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
      title: `Maze Game`,
      webUrl: `https://hescu6.github.io/MazeGame/`,
      codeUrl: `https://github.com/Hescu6/MazeGame`,
      iconUrl: `./../../../assets/images/iconmaze.png`,
      alt: `Maze`,
      display: 'dialog',
      description: `Classic maze game with multiplayer capabilities, simply open in another tab or
    device and play.Developed using JQuery, JavaScript, and
    Firebase cloud services`
    },
    {
      title: `Four Square Cipher Encryptor`,
      webUrl: `http://ec2-52-10-153-141.us-west-2.compute.amazonaws.com`,
      codeUrl: `https://github.com/Hescu6/FourCipherEncrpt/tree/master`,
      iconUrl: `./../../../assets/images/iconfourencode.png`,
      display: 'dialog',
      alt: `Four Square Cipher`,
      description: `Originally developed in Python, code was then retrofitted
      to work as a web application using PHP and AWS Elastic Beanstalk.`
    },
    {
      title: `UDC Tribute Webpage`,
      webUrl: `https://hescu6.github.io/UDCBasicWebpage/`,
      codeUrl: `https://github.com/Hescu6/UDCBasicWebpage`,
      iconUrl: `./../../../assets/images/iconudc.png`,
      display: 'web',
      alt: `UDC`,
      description: `Tribute webpage for the University of the District of Columbia.
      Designed in HTML with CSS styling as well as JavaScript for the
      drop down menus.`
    }
  ];



  openLink(url: string, display: string) {

    if (display == "web") {
      window.open(url, "_blank")
    } else if (display == "dialog") {
      this.openDialog(url);
    }
  }

  openDialog(url: string): void {


    // const dialogRef = this.dialog.open(ProjectsDialogComponent, {
    //   maxWidth: '80%',
    //   maxHeight: '80%',
    //   data: url
    // });
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
  blockInfo?:string
}
