const nameContainer = document.querySelector('#name')
const ageContainer = document.querySelector('#userage')
const upForm = document.querySelector('#updateForm')
const modButton = document.querySelector('#modificationButton')
const id = getUserId()

function getUserId() {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    console.log(params.get("id"))
    return params.get("id")
}

window.onload = function() {
    getUser();
}

async function getUser() {
    const response = await fetch("http://127.0.0.1:3000/personauser/" + id)
    const personauser = await response.json()
    nameContainer.value = personauser.name
    ageContainer.value = personauser.age
}



async function updateUser() {
    fetch("http://127.0.0.1:3000/personauser/" + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameContainer.value,
            age: ageContainer.value
        })
    })
        .then(response => {
            response.json().then(data => {
                if (response.status == 400) {
                    console.log(data.name.message);
                } else {
                    window.location.href = "../../index.html";
                }
            });
        })
}

modButton.addEventListener('click', function () {
    updateUser();
})

