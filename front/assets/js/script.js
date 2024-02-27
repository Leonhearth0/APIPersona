/* #region  UserContainer */
const personaUsersContainer = document.querySelector("#personaUsersContainer")

async function getPersonaUser() {
    const response = await fetch("http://127.0.0.1:3000/personauser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const data = await response.json()
    console.log(data)
    return data

}

async function displayPersonaUsers() {
    personaUsersContainer.innerHTML = '';
    const personaUsers = await getPersonaUser();
    personaUsers.forEach(personaUser => {
        const article = document.createElement("article")
        article.id = "personaUserSingle"
        const title = document.createElement("h3")
        const age = document.createElement("p")
        const persona = document.createElement("p")
        const buttonContainer = document.createElement("div")
        buttonContainer.id = "buttonContainer"

        /* #region Bouton supprimer  */
        const delButton = document.createElement("button")
        delButton.id = "delButton"
        delButton.textContent = "Supprimer"
        delButton.addEventListener('click', async function () {
            await deletePersonaUsers(personaUser._id)
        })
        /* #endregion */

        /* #region  Bouton éditer */
        const editButton = document.createElement("button")
        editButton.id = "editButton"
        editButton.textContent = "Editer"
        editButton.addEventListener('click', function () {
            window.location.href = "../assets/pages/updateuser.html?id=" + personaUser._id;
        })
        /* #endregion */

        /* #region  Bouton détails */
        const detailButton = document.createElement("button")
        detailButton.id = "detailButton"
        detailButton.textContent = "Détails"
        detailButton.addEventListener('click', function () {
            window.location.href = "../assets/pages/detailuser.html?id=" + personaUser._id;
        })
        /* #endregion */


        title.textContent = personaUser.name
        age.textContent = personaUser.age + " ans"


        personaUsersContainer.appendChild(article)

        article.appendChild(title)
        article.appendChild(age)
        article.appendChild(persona)
        article.appendChild(buttonContainer)

        buttonContainer.appendChild(detailButton)
        buttonContainer.appendChild(editButton)
        buttonContainer.appendChild(delButton)


    });
}

async function deletePersonaUsers(id) {
    await fetch("http://127.0.0.1:3000/personauser/" + id, {
        method: "DELETE"
    })
    await displayPersonaUsers()
}
/* #endregion */

const addUserForm = document.querySelector('#addPersonaUser')
const newusernameContainer = document.querySelector('#newusername')
const newuserageContainer = document.querySelector('#newuserage')
const adduserButton = document.querySelector('#addUserButton')

async function addPersonaUser() {
    await fetch("http://127.0.0.1:3000/personauser/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newusernameContainer.value,
            age: newuserageContainer.value,

        })
    })
        .then(response => {
            response.json().then(data => {
                if (response.status == 400) {
                    if (data.name && data.name.message) {
                        newusernameContainer.value = data.name.message;
                    }
                    if (data.age && data.age.message) {
                        newuserageContainer.value = data.age.message;
                    }
                } else {
                    displayPersonaUsers()
                }
            });
        })
}


adduserButton.addEventListener('click', function () {
    addPersonaUser();
})

displayPersonaUsers();


