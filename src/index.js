//DOM elements
const projectList = document.querySelector("#project-list")

//render 

function renderProject(projObj) {
    const projectDiv = document.createElement("div")
    const projectImg = document.createElement("img")
    projectImg.className = "proj-img"
    projectImg.src = project.image
    cont

}


//fetch
function getProjects() {
    fetch("")
     .then(r => r.json())
     .then(data => {
       console.log(data)
     })
   }
