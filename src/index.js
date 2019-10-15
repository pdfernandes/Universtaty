import "./styles/index.scss";
import * as d3 from 'd3';
import fetchData from './fetch';
import search from './search';

document.addEventListener("DOMContentLoaded", () => {

   document.getElementById("btn").addEventListener("click", () => {
       let options = []
       const value = document.getElementsByClassName("search-name")[0].value
       options.push(value) 
       fetchData(options)
   })
  

   
})

