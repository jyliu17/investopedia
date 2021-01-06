/************ GLOBAL DOM elements *************/
const listings = document.querySelector("#project-collection")
const projectDetail = document.querySelector(".container")
const newProjectForm = document.querySelector("#new-project")



newProjectForm.addEventListener("submit", event => {
  event.preventDefault()
  console.log('submit')

})

function renderOneProject(projectObj) {
  /****************** DOM Elements ******************/

  
  // const projectDiv = document.createElement("div");
  
  const img = document.createElement("img");

  /****************** DOM attributes ******************/
  // projectDiv.setAttribute('class', 'card');
  img.setAttribute('class', 'project-image');
  // newH2.textContent = projectArray.name;
  img.src = projectObj.image;
  img.alt = projectObj.name
  
  listings.append(img);
  img.addEventListener("click", event => {

    
    getProjectById(projectObj.id)       
    console.log("clicked", projectObj.id) 
  })
}

  /******************* Fetch Array  ******************/
  function getProjects() {
    return fetch('http://localhost:3000/projects')
    .then(res => res.json())
  }
  
  getProjects().then(projectArray => {
    projectArray.forEach(project => {
    renderOneProject(project)
    })
  })


function renderProject(projectObj){
  
  
  const name = document.querySelector(".name");
  name.textContent = projectObj.name
  
  const description = document.querySelector(".description")
  description.textContent = projectObj.description
  
 
  
  
  const imageProject = document.querySelector(".detail-image")
  imageProject.src = projectObj.image
  imageProject.alt = projectObj.name
  
  const industry = document.querySelector(".industry")
  industry.textContent = projectObj.industry
  
  const valuation = document.querySelector(".valuation")
  valuation.textContent = projectObj.valuation
  
  const funding = document.querySelector(".funding")
  funding.textContent = projectObj.funding_goal 

  const website = document.querySelector(".website")
  website.href = projectObj.website
  website.target = "_blank"
  website.textContent = "Website"
  
  projectDetail.append(imageProject,name,description,industry,valuation,funding,website)
}

function getProjectById(id){
  fetch(`http://localhost:3000/projects/${id}`)
    .then((r) => r.json())
    .then((projectObj) => renderProject(projectObj)) 

}






// function createProject() {
//   fetch("http://localhost:3000/projects", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updateObj),
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log("success:", data)
//       })
//     }

getProjectById(1)



// this is js for nav bar
// No JS library used

;(function(document, window, index) {
  'use strict';

  var elSelector = '.header',
      element = document.querySelector(elSelector);

  if (!element) return true;

  var elHeight = 0,
      elTop = 0,
      dHeight = 0,
      wHeight = 0,
      wScrollCurrent = 0,
      wScrollBefore = 0,
      wScrollDiff = 0;

  window.addEventListener('scroll', function() {
      elHeight = element.offsetHeight;
      dHeight = document.body.offsetHeight;
      wHeight = window.innerHeight;
      wScrollCurrent = window.pageYOffset;
      wScrollDiff = wScrollBefore - wScrollCurrent;
      elTop = parseInt(window.getComputedStyle(element).getPropertyValue('top')) + wScrollDiff;

      if (wScrollCurrent <= 0)
          element.style.top = '0px';

      else if (wScrollDiff > 0)
          element.style.top = (elTop > 0 ? 0 : elTop) + 'px';

      else if (wScrollDiff < 0) {
          if (wScrollCurrent + wHeight >= dHeight - elHeight)
              element.style.top = ((elTop = wScrollCurrent + wHeight - dHeight) < 0 ? elTop : 0) + 'px';

          else
              element.style.top = (Math.abs(elTop) > elHeight ? -elHeight : elTop) + 'px';
      }

      wScrollBefore = wScrollCurrent;
  });

}(document, window, 0));