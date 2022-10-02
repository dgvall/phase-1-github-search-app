document.addEventListener("DOMContentLoaded", () => {

gitSearch()
})

// Search button
function gitSearch () {
  let form = document.getElementById("github-form")

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    clearSearch()
    returnUsers(e.target.search.value)

  })
}

// GET request to return users
function returnUsers (search) {
fetch(`https://api.github.com/search/users?q=${search}`)
.then((res) => res.json())
.then((data) => {
  for(let user of data.items) {
  createUser(user)
}
})
}

// Create users from request
function createUser(user) {
  let list = document.getElementById("user-list")
  let container = document.createElement("div")
  let li = document.createElement("li")
  let img = document.createElement("img")

  img.className = "avatar"
  container.className = "user-container"

  li.textContent = `${user.login} `
  img.src = user.avatar_url

  container.addEventListener("click", (e) => {
    searchRepo(user.login, e)
  })

  list.appendChild(container)
  container.appendChild(li)
  container.appendChild(img)
}

// GET request to return repositories
function searchRepo(username, e) {
  fetch(`https://api.github.com/users/${username}/repos`)
  .then((res) => res.json())
  .then ((data) => {
    clearRepo()
    for(repo of data) {
      createRepo(repo)
    }
  })
}

// Create reposotory list from request
function createRepo(repo) {
  console.log(repo)
  let list = document.getElementById("repos-list")
  let li = document.createElement("li")
  let a = document.createElement("a")
  
  a.textContent = repo.name
  a.href = repo.clone_url

  list.appendChild(li)
  li.append(a)
}

// Clear search results
function clearSearch() {
  clearRepo()
  let list = document.getElementById("user-list")
  list.innerHTML = ``

}

// Clear repository results
function clearRepo() {
  let list = document.getElementById("repos-list")
  list.innerHTML = ``
}


