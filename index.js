const userName = document.querySelector("#formInput");
const form = document.querySelector("#githubForm");
const repoGH = document.querySelector("#repositories");

const githubForm = document.querySelector(".githubForm");


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
            <p>Created: ${data[i].created_at}</p>
            `);

            ul.appendChild(li);

        }

    }

    request.send();

}

//////////////////////////////////
//THIS IS ANOTHER WAY WITH FECTH


githubForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = formInput.value;
  console.log(username);

  const githubRepoList =`https://api.github.com/users/${username}/repos`;
  fetch(githubRepoList, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      repoOnPage(results);
    })
    .catch((e) => {
      alert("Github USERNAME not found!");
    });
});

function listGithubUserRepos(data) {
  for (let i = 0; i < data.length; i++) {
      
    let ul = document.querySelector(".userRepos");
    let li = document.createElement("li");
    li.innerHTML = ` <p><strong>Repo: </strong> ${data[i].name}</p>
                    <p><strong>Description: </strong> ${data[i].description}</p>
                    <p><strong>URL: </strong> <a href="${data[i].html_url}">${repository[i].html_url}</a></p>
                    <p>Created: ${data[i].created_at}</p>
                    `

    ul.appendChild(li);
  }
}
