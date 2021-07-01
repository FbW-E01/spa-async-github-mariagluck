const githubForm = document.querySelector(".githubForm");
/// THIS A WAY WITH XMLHttpRequest

githubForm.addEventListener('submit', (e) => {

    e.preventDefault(); 
    let formInput = document.querySelector(".formInput");
    let githubUsername = formInput.value;  
    listGithubUserRepos(githubUsername);
})


function listGithubUserRepos(username){

    const request = new XMLHttpRequest();
    const url = `https://api.github.com/users/${username}/repos`;

   
    request.open('GET', url, true);
    request.onload = function () {

        const data = JSON.parse(this.response);

        for (let i in data) {

            let ul = document.querySelector(".userRepos");
            let li = document.createElement("li");
            li.classList.add("list");
            
            
            li.innerHTML = (`
            <p><strong>Repo: </strong> ${data[i].name}</p>
            <p><strong>Description: </strong> ${data[i].description}</p>
            <p><strong>URL: </strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
            <p>Created: ${moment(data[i].created_at).fromNow()}</p>
            `);

            ul.appendChild(li);

        }

    }

    request.send();

}

//////////////////////////////////
//THIS IS ANOTHER WAY WITH FECTH

// const formInput = document.querySelector("#formInput");

// githubForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const username = formInput.value;
//   console.log(username);

//   const githubRepoList =`https://api.github.com/users/${username}/repos`;
//   fetch(githubRepoList, {
//     method: "GET",
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((results) => {
//       listGithubUserRepos(results);
//     })
//     .catch((e) => {
//       alert("Github USERNAME not found!");
//     });
// });

// function listGithubUserRepos(data) {
//   for (let i = 0; i < data.length; i++) {

//     let ul = document.querySelector(".userRepos");
//     let li = document.createElement("li");
//     li.innerHTML = (` <p><strong>Repo: </strong> ${data[i].name}</p>
//                      <p><strong>Description: </strong> ${data[i].description}</p>
//                      <p><strong>URL: </strong> <a href="${data[i].html_url}">${repository[i].html_url}</a></p>
//                      <p>Created: ${data[i].created_at}</p>
//                     `);

//     ul.appendChild(li);
//   }
// }


////////////////////7#

//  Joels version with constructor and only 1 div container
// class GHWidget {
//   constructor(container) {
//       this.container = container;
//   }

//   handleSearch(e) {
//       const input = this.container.querySelector(".username");

//       fetch(`https://api.github.com/users/${input.value}/repos`)
//           .then(response => {
//               console.log(response);
//               if (response.ok) {
//                   return response.json();
//               } else {
//                   alert("Request failed");
//                   throw "Response is not OK";
//               }
//           })
//           .then(json => {
//               this.handleSearchResults(json);
//           })
//           .catch(err => {
//               console.warn(err);
//               alert("Error!");
//           })
//   }

//   handleSearchResults(repositories) {
//       const oldResults = this.container.querySelectorAll(".result");
//       oldResults.forEach(r => r.remove());

//       repositories.forEach(repo => {
//           const element = document.createElement("div");
//           element.classList.add("result");
//           element.style.border = "1px solid #eee";
//           element.style.margin = "2px";
//           element.style.padding = "1em";
//           element.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`;
//           this.container.appendChild(element);
//       });
//   }

//   init() {
//       const input = document.createElement("input");
//       input.classList.add("username");
//       input.setAttribute("type", "text");
//       this.container.appendChild(input);

//       const button = document.createElement("button");
//       button.classList.add("search");
//       button.innerText = "Submit";
//       button.addEventListener("click", (e) => { this.handleSearch(e); });
//       this.container.appendChild(button);
//   }
// }

// const widget = new GHWidget(document.querySelector(".mainContainer"))
// widget.init();

// const container = document.createElement("div");
// document.body.appendChild(container);
// new GHWidget(container).init();