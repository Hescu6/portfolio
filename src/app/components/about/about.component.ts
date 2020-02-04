import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  title: string = `Hi there!`;

  intro1: string = `My name is Hildebrando and I'm a software developer 
                  in the Washington DC area. I love to solve problems that
                   require great attention to detail and I'm always curious
                   about how and why things work.
                `;
  intro2: string = `
                  I used to be the kid that always got in trouble for taking electronics
                  apart, though I did get praised every time I'd repair the family
                  computer. I found my passion in software development because it keeps
                  my curiosity entertained and I love the creative aspect of it. For now,
                   my main focus is on software development and DevOps. I also
                  venture into Articial Intelligence (AI) and Data Ccience.
                `;
  intro3: string = `
                  On a personal note, I believe in hard work and honesty. I will always
                  enjoy a silly joke. As hobbies I like riding motorcycles, swimming, going to comedy
                  clubs with friends, keeping up to date with market stuff, and working on DIY projects.
                `;
  intro4: string = `
                Click on the "Projects" tab to see some of my work and
                 shoot me a line or two with "Contact Me" icon below.
              `;

  skillsIntro: string = `Skills used in programming,
                        web development, database design,
                        artificial intelligence, and cloud services`;

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
      path: `devicon-backbonejs-plain `
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
      title: `BitBucket`,
      src: `assets/icons/bitbucket.png`
    },
    {
      title: `SSH`,
      path: `devicon-ssh-plain`
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
      title: `Confluence`,
      src: `assets/icons/confluence.png`
    },
    {
      title: `Bamboo`,
      src: `assets/icons/bamboo.png`
    },
    {
      title: `Express`,
      path: `devicon-express-original `
    },
    {
      title: `NGINX`,
      path: `devicon-nginx-original colored`
    }
  ];
}

interface iconsInterface {
  title: string;
  path?: string;
  src?: string;
}
