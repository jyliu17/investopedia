/************ GLOBAL DOM elements *************/
const listings = document.querySelector("#project-collection")
const projectDetail = document.querySelector(".container")
const newProjectForm = document.querySelector(".form-style-9")
const commentForm = document.querySelector(".comment-form")
 let commentId = 1
const commentUl = document.querySelector(".comments")
const likeDiv = document.querySelector(".likeDiv")


newProjectForm.addEventListener("submit", event => {
  event.preventDefault()
 

  const newName = event.target.name.value
  const newDescription = event.target.description.value
  const newWebsite = event.target.website.value
  const newImage = event.target.image.value
  const newIndustry = event.target.industry.value
  const newValuation = event.target.valuation.value
  const newFG = event.target.fundinggoal.value

  const newProject = {
    name: newName, 
    description: newDescription, 
    website: newWebsite, 
    image: newImage,
    industry: newIndustry,
    valuation: newValuation, 
    funding_goal: newFG
  }

 
    fetch("http://localhost:3000/projects", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })
      .then(response => response.json())
      .then(projectObj => {
        renderOneProject(projectObj)
      })
})


function renderOneProject(projectObj) {
  /****************** DOM Elements ******************/

  
  // const projectDiv = document.createElement("div");
  
  const img = document.createElement("img");
  const deleteBtn = document.createElement("button")
  /****************** DOM attributes ******************/
  // projectDiv.setAttribute('class', 'card');
  const span = document.createElement("span")
  deleteBtn.textContent = "💣"
  deleteBtn.setAttribute('class', 'delete-btn')

  img.setAttribute('class', 'project-image');
  // newH2.textContent = projectArray.name;
  img.src = projectObj.image;
  img.alt = projectObj.name
  span.append(deleteBtn)
  listings.append(img,span);
 
  
  img.addEventListener("click", event => {
    

    
    getProjectById(projectObj.id)       
    console.log("clicked", projectObj.id) 
  })


  deleteBtn.addEventListener('click', event => {
    console.log(projectObj.id)
    fetch(`http://localhost:3000/projects/${projectObj.id}`, {
      method:'DELETE'
    })
    .then(response => response.json())
    .then((params) => {
      img.remove()
      span.remove()
    })
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

  const website = document.querySelector("#website")

  const likeB = document.createElement("div")
  likeB.setAttribute('class','like-btn-svg')

  const p = document.createElement("p")
  p.setAttribute('class', 'like-p')
  p.textContent = projectObj.num

  
  
  // website.href = projectObj.website
  // website.target = "_blank"
  // website.textContent = "🔎"
  likeDiv.innerHTML = ""
  likeB.append(p)
  likeDiv.append(likeB)
  // projectDetail.append(likeDiv)
  commentForm.dataset.id = projectObj.id
  commentUl.innerHTML = ""

 
  

  projectObj.comments.forEach(commentObj => {
    renderComment(commentObj)
  })


  

  likeB.addEventListener('click', event => {
    console.log("click")
    const newLikes = {num: projectObj.num +=1}

    fetch(`http://localhost:3000/projects/${projectObj.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLikes),
    })
    .then(response => response.json())
    .then(updateLikes => {
      console.log('Success:', updateLikes);
      p.innerText = updateLikes.num
      
    
    })  
  })
 

  
}

function getProjectById(id){
  fetch(`http://localhost:3000/projects/${id}`)
    .then((r) => r.json())
    .then((projectObj) => renderProject(projectObj)) 

}


commentForm.addEventListener("submit", event => {
  event.preventDefault()
  
  console.log('submit')

  const commentObj = {
    author: event.target.name.value,
    content: event.target.comment.value,
    project_id: commentForm.dataset.id,
  }
  
  fetch("http://localhost:3000/comments", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  })
  .then(response => response.json())
  .then(dataObj => {
    renderComment(dataObj)
  })
})

function renderComment(comObj){
  const li = document.createElement("li")

  const h4 = document.createElement("h4")
  h4.setAttribute('class','h4')
  h4.textContent = comObj.author
  
  const h5 = document.createElement("h5")
  h5.setAttribute('class','h5')
  h5.textContent = comObj.content

  
  const deleteB = document.createElement("button")
  deleteB.setAttribute('class','comment-delete')
  deleteB.textContent = "💣"

  

  

  li.append(deleteB,h4,h5)
  commentUl.append(li)

 


  deleteB.addEventListener('click', event => {
    console.log(comObj.id)
    fetch(`http://localhost:3000/comments/${comObj.id}`, {
      method:'DELETE'
    })
    .then(response => response.json())
    .then((params) => {
      li.remove()
    })
  })
}







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


