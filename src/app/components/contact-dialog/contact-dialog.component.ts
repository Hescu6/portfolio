import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators, Form } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from './../../services/api.service'


@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {

  contactGroup: FormGroup;
  matcher = new MyErrorStateMatcher();


  constructor(
    private apiService: ApiService,
    public sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public urlData: string) {

  }


  ngOnInit() {
    this.contactGroup = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      messageFormControl: new FormControl('', [
        Validators.required
      ]),
      nameFormControl: new FormControl('', [
        Validators.required
      ]),
    })
  }

  async onSubmit({ value }: { value: Object }) {
    // console.log("MESSAGE", value);
    this.hideEl("contactcontainer")
    this.showEl("spinner");
    let response = await this.apiService.sendEmail(value);
    this.hideEl("spinner");

    if (response['sucess']) {
      console.log("EMAIL SENT")
      this.showEl("sucess")
    } else {
      this.showEl("error")
      console.log('Email was not delivered, check browser console for more details', response)
    }
    setTimeout(() => {
      this.closeClick();
    }, 2900);

  }

  closeClick(): void {
    this.dialogRef.close();
  }

  showEl(el: string) {
    let x = document.getElementsByClassName(el) as HTMLCollectionOf<HTMLElement>;
    if (x.length != 0) {
      x[0].style.display = "block";
    }
  }

  hideEl(el: string) {
    let x = document.getElementsByClassName(el) as HTMLCollectionOf<HTMLElement>;
    if (x.length != 0) {
      x[0].style.display = "none";
    }
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


