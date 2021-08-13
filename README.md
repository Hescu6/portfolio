# Hildebrando's Personal Portfolio

Personal website that serves as a portfolio to display some of my apps
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

# To run Dev
    npm install
    npm start

# To test Prod without Deploying

    ng serve --prod

# To deploy to Github Pages

    ng build --prod --output-path docs --base-href /portfolio/

**IMPORTANT: make sure base href in docs/index.html is set to a relative path (/portfolio/) and not an absolute path. Also make sure to create a copy of docs/index.html and rename it docs/404.html, this will ensure that all the routes which are not found will be rerouted to the angular router.**
    
    git add .

    git commit -m "Deploy to Github Pages"

    git push


