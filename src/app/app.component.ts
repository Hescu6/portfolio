import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
// import * as $ from './../assets/icons/'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  
  constructor(private dialog: MatDialog) { }
  
  title = "Portfolio";
 
  footerVals: footerIcons[] = [
    {
      iconurl:'assets/icons/linkedin32.png',
      weburl:'https://www.linkedin.com/in/hiescudero',
      alt:'Open LinkedIn Profile'
    },
    {
      iconurl:'assets/icons/github32.png',
      weburl:'https://github.com/Hescu6',
      alt:'Open GitHub Repo'
    },
    {
      iconurl:'assets/icons/resume32.png',
      weburl:'assets/webRes.pdf',
      alt:'View Resume'
    },
    {
      iconurl:'assets/icons/mail32.png',
      open:'contactDialog',
      alt:'Contact Me'
    }
  ] 

  openDialog(path: string): void {

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.data = url;
    dialogConfig.height = '70%';
    dialogConfig.width = '60em';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
  
    const dialogRef = this.dialog.open(ContactDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}

interface footerIcons {
  iconurl: string,
  weburl?: string,
  alt: string,
  open?:string
}