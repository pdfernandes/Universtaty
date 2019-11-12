# Universtaty 
<p align='center'>
 <img src='https://github.com/pdfernandes/Universtaty/blob/master/src/styles/assets/graduation_cap_favicon.png' width='150'/>
</p>

## Overview 
As a former high school teacher, a major part of my job was preparing students for university. Students were always overwhelmed by the vast and convoluted college pamphlets and brochures. This visualization if an objective view on college statistics that is meant to be easily digestible.

The project seeks to make the process of looking through universities simple and interactive. Students are able to search for universities, view statistics on gender demographics, majors and more!

## Table of Contents
* [Technologies](#technologies)
* [Project Timeline](#project-timeline)
* [Wireframe](#wireframe)
* [Features](#features)
  * [Homepage](#homepage)
  * [Statistics](#statistics)

## Technologies 
* D3.js 5.12.0
* JavaScript 9
* Webpack 4.41.2
* CSS3
* HTML5
* Animejs 3.1.0
* APIs
  * https://collegescorecard.ed.gov/data/ & https://nces.ed.gov/ipeds/use-the-data
    * Api used for getting university data. 
  * Google Maps API
    * Allow users to get a location of their universities on a map.

## Project Timeline

* Day 1 - Explore D3, set up tentative file sctructure
  * Go through d3 documentation and outline essential aspects that will be utilizedin the project.
  * Set up the project directory and file skeleton.

* Day 2 - Implement search
  * Users will be able to search for universities by various criteria.
  * The search bar will include sliders for GPA, ACT/SAT scores, price.

* Day 3 - Implement Google Maps API
  * The map will populate with the information from the search criteria. 
  * The map will have onClick event listeners to delve deeper into college statistics.

 * Day 4 - Implement data visualization for university statistics
   * universities will display graduation rate, prices and retention rates.
   * pie charts break down diversity and gender statics
   * bar charts display major percentages, and testing scores.

* Day 6 - Styling Day
  * Work on cleaning up any styling

## Wireframe
![display](https://github.com/pdfernandes/Universtaty/blob/master/src/styles/assets/staty_wf.png)

## Features

### Homepage
The homepage includes the search section, a map and a directions container. Users can search by school name. Names do not have to be specific (example: If "New York" is typed into the search, all schools with "New York" will be populated on the map). Users can see where the school is located via markers and by clicking on a marker, users can see more school information.
The map is created using the Google Maps API.
<p align='center'>
 <img src='https://github.com/pdfernandes/Universtaty/blob/master/src/styles/assets/universtaty_display.gif' alt='homepage' width='500'/>
</p>

### Statistics
Several buttons allow the user to shift between different statistics. Pie charts and bar charts display information on gender, race, majors and test scores. Users can see at-a-glance information regarding graduation rates, prices and financial aid. Charts are created and animated using D3. DOM manipulation is handled by D3 and animejs animation libraries.
<p align='center'>
 <img src='https://github.com/pdfernandes/Universtaty/blob/master/src/styles/assets/universtaty_charts.gif' alt='homepage' width='500'/>
</p>

##






