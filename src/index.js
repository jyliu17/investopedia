/************ GLOBAL DOM elements *************/
const listings = document.querySelector("#project-collection")
const list = document.querySelector(".project")
const newProjectForm = document.querySelector("#new-project")



// newProjectForm.addEventListener("submit", event => {
//   event.preventDefault()
//   console.log('submit')

// })

function renderOneProject(projectArray) {
  /****************** DOM Elements ******************/

  
  const projectDiv = document.createElement("div");
  
  const img = document.createElement("img");

  /****************** DOM attributes ******************/
  projectDiv.setAttribute('class', 'card');
  img.setAttribute('class', 'project-image');
  // newH2.textContent = projectArray.name;
  img.src = projectArray.image;
  
  projectDiv.append(img);
  listings.append(projectDiv);
}

  /******************* Fetch Array  ******************/
  function getProjects() {
    return fetch('http://localhost:3000/projects')
    .then(res => res.json())
  }
  
  getProjects().then(projects => {
    projects.forEach(project => {
    renderOneProject(project)
    })
  })


function renderProject(projectObj){
  
  
  const name = document.createElement("h2");
  name.textContent = projectObj.name
  
  const description = document.createElement("p")
  description.textContent = projectObj.description
  
  // const website = document.createElement("a")
  // website.href = projectObj.website
  // website.target = "_blank"
  // website.textContent = `Link to: ${projectObj.name}`
  
  
  const imageProject = document.createElement("img")
  imageProject.setAttribute('class', 'single')
  imageProject.src = projectObj.image
  imageProject.alt = projectObj.name
  
  const industry = document.createElement("h3")
  industry.textContent = projectObj.industry
  
  const valuation = document.createElement("h3")
  valuation.textContent = projectObj.valuation
  
  const funding = document.createElement("h3")
  funding.textContent = projectObj.funding_goal 
  
  list.append(imageProject,name,description,industry,valuation,funding)
}

function getOneProject(id){
  fetch(`http://localhost:3000/projects/${id}`)
    .then((r) => r.json())
    .then((projectObj) => renderProject(projectObj)) 

}


// listings.addEventListener("click", event => {
 
//   console.log("clicked")        
  
// })



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

getOneProject(17)



// this is js for nav bar
("nav ul li").click(function(){
  var xcoord = $(this).data("xcoord");
  
  $("nav div").stop().animate({marginLeft:xcoord}, 500, "easeInOutExpo");
  $(this).addClass("active");
  $("nav ul li").not(this).removeClass("active");
  
});