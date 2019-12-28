import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';





@Component({
  selector: 'app-projects-dialog',
  templateUrl: './projects-dialog.component.html',
  styleUrls: ['./projects-dialog.component.scss']
})
export class ProjectsDialogComponent implements OnInit {


  url:string;
  constructor( 
    public sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ProjectsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public urlData: string) {
    }



  ngOnInit() {
  }


  closeClick(): void {
    this.dialogRef.close();
  }

}
