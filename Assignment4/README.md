### Author Detail <br>
**Name**: Dimpleben Kanjibhai Patel <br />
**Email**: [patel.dim@northeastern.edu](mailto:patel.dim@northeastern.edu) <br />
**NUID**: 002965372 <br />

## Introduction
This repository contains basic HTML tags, SASS syntax with CSS properties. The main purpose of this repository is to learn SASS, Gridlayout and positioning elements.
### CSS Postion Property :
- static: Elements are positioned static by default. Elements with static positioned are not affected by left, right, top and botton properties. It always positioned elements according to the noremal flow of page.
- relative: This will positioned the element relative to its normal position.
- absolute: This will positioned the element relative to its nearest positioned ancestor.
- fixed: Element with fixed position always stays in the same place even if the page is scrolled.
- sticky: This will position the element based on the user's scroll position.

### CSS Grid Layout:
Grid layout allows us to offer a grid based layout system with rows and colymns. For elements to be in grid layout, its display property should be set to grid. 

### SASS(Syntactically Awesome Stylesheet):
SASS is a CSS preprocessor. <br>
- Variables: sass variables are used to store information thay can be reused later. It is declared as <br>
    `$variablename : value;`
- Nesting : Sass allows nest CSS selectors. <br>
    ```
    div {
        p {>
        color: white; 
    }
    }
    ```
- @import: Allows us to include content of one file in another.
- @mixin : Allows us to create CSS code that can be resued throughout the website.
- @extend : Allows us to share a set of CSS properties from one selector to another.







## Contributor
- Dimpleben Kanjibhai Patel

## Technnology
- HTML 5
- CSS
- SCSS

## Supported browser
- Google Chrome
- Internet Explorer


## Dependancies
- npm


## How to run this repository?
- Download the repository
- Download npm
- Run below command to set up npm package. <br />
    `npm init`
- Run below command to install SASS <br>
    `npm i sass --save-dev`
- The above command will create package.json file. In package.json file, modify the content in script. <br>
    ``` 
    "scripts": { 
        "sass": "sass scss/main.scss dist/main.css"
  }
  ```
- Run below command every time when you change any scss file. This command will generate css file for that scss file. <br>
    `npm run sass`
- Finally, run index.html file in any supported browser.

 

