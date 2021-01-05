/************ GLOBAL DOM elements *************/
const listings = document.querySelector("#project-collection")
const dogModal = document.querySelector(".modal")






function renderOneProject(projectArray) {
  /****************** DOM Elements ******************/

  
  const projectDiv = document.createElement("div");
  const newH2 = document.createElement("h2");
  const img = document.createElement("img");

  /****************** DOM attributes ******************/
  projectDiv.setAttribute('class', 'card');
  img.setAttribute('class', 'project-image');
  // newH2.textContent = projectArray.name;
  img.src = projectArray.image;
  
  projectDiv.append(newH2, img);
  listings.append(projectDiv);

  img.addEventListener("click", function(event){
    showProject()
    console.log(event.target)
  })
  
function showProject(newProject) {
   debugger
  fetch(`http://localhost:3000/projects/${id}`)
  .then( r => r.json())
  .then( newProject => {
      let modalContent = document.querySelector("#project-modal")

    
      let child = modalContent.lastElementChild;
      while (child) {
          modalContent.removeChild(child);
          child = modalContent.lastElementChild;
      }
      
      let modalImg = document.createElement("img")
      modalImg.setAttribute("class", "modal-img")
      const p = document.createElement("p");
      const H2 = document.createElement("h2");

      modalImg.src = newProject.image_url
      p.textContent = newProject.description
      H2.textContent = newProject.nam


      modalContent.append(modalImg, p, h2)

      dogModal.style.display = "block";
      scrollButton.style.display = "none";

  })

}





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



//   function projectShow() {
//       return fetch(`http://localhost:3000/projects/${id}`)
//   const projectDiv = document.createElement("div");
//   const newH2 = document.createElement("h2");
//   const img = document.createElement("img");


//   /****************** DOM attributes ******************/
//   projectDiv.setAttribute('class', 'card');
//   img.setAttribute('class', 'project-image');
//   // newH2.textContent = projectArray.name;
//   img.src = projectArray.image;
  
//   projectDiv.append(newH2, img);
//   listings.append(projectDiv);
//   }





