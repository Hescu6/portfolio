import { Component } from '@angular/core';
// import * as $ from './../assets/icons/'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = "Portfolio";
  
  footerVals: footerIcons[] = [
    {
      iconurl:'./../assets/icons/linkedin32.png',
      linkurl:'https://www.linkedin.com/in/hiescudero',
      alt:'Open LinkedIn Profile'
    },
    {
      iconurl:'./../assets/icons/github32.png',
      linkurl:'https://github.com/Hescu6',
      alt:'Open GitHub Repo'
    },
    {
      iconurl:'./../assets/icons/resume32.png',
      linkurl:'./../assets/webRes.pdf',
      alt:'View Resume'
    }
  ] 

}

interface footerIcons {
  iconurl: string,
  linkurl: string,
  alt: string
}