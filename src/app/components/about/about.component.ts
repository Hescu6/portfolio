import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title: string = `Software Developer`;

  intro: string = `My name is Hildebrando and I'm a software developer 
                  in the Washington DC area. 
                  I'm well organized and I love to solve problems
                  with high attention to detail. I continuously 
                  seek opportunities to advance my growth in the
                   tech industry.`;

  skillsIntro: string = `Skills used in programming,
                        web development, database design,
                        artificial intelligence, and cloud services`

  skillsIcons: iconsInterface[] = [
  
    {
      title: `Node.js`,
      path: `devicon-nodejs-plain colored`
    },
    {
      title: `Angular`,
      path: `devicon-angularjs-plain colored`
    },
    {
      title: `React`,
      path: `devicon-react-original colored`
    },
    {
      title: `JavaScript`,
      path: `devicon-javascript-plain colored`
    },
    {
      title: `TypeScript`,
      path: `devicon-typescript-plain colored`
    },
    {
      title: `BackBone`,
      path: `devicon-backbonejs-plain colored`
    },
    {
      title: `Python`,
      path: `devicon-python-plain colored`
    },
    {
      title: `C/C++`,
      path: `devicon-c-plain colored`
    },
    {
      title: `Git`,
      path: `devicon-git-plain colored`
    },
    {
      title:`BitBucket`,
      src: `assets/icons/bitbucket.png`
    },
    {
      title: `SSH`,
      path: `devicon-ssh-plain colored`
    },
    {
      title: `Oracle db`,
      path: `devicon-oracle-plain colored`
    },
    {
      title: `Mongo`,
      path: `devicon-mongodb-plain colored`
    },
    {
      title: `SQL`,
      path: `devicon-mysql-plain colored`
    },
    {
      title: `AWS`,
      path: `devicon-amazonwebservices-plain-wordmark colored`
    },
    {
      title: `Google Firebase`,
      src: `https://img.icons8.com/color/48/000000/firebase.png`
    },
    {
      title:`Confluence`,
      src: `assets/icons/confluence.png`
    },
    {
      title:`Bamboo`,
      src: `assets/icons/bamboo.png`
    },
    {
      title:`Express`,
      path: `devicon-express-original colored`
    },
    {
      title:`NGINX`,
      path: `devicon-nginx-original colored`
    },
  ]

}

interface iconsInterface {
  title: string,
  path?: string,
  src?:string
}
