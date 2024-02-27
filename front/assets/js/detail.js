/* #region  User Detail scripts */
const nameContainer = document.querySelector('#name')
const ageContainer = document.querySelector('#userage')
const personaListContainer = document.querySelector('#plist')
const displayArticle = document.querySelector('#displayarticle')
const returnButton = document.querySelector('#returnButton')
const id = getUserId()

function getUserId() {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    return params.get("id")
}

async function getUserdetail() {
    const response = await fetch("http://127.0.0.1:3000/personauser/" + id)
    const personauser = await response.json()
    const personaName = personauser.persona.map(p => p.name)
    const personaList = personaName.map(name => `<li>${name}</li>`).join('');
    nameContainer.textContent = "Nom : " + personauser.name
    ageContainer.textContent = "Age : " + personauser.age
    personaListContainer.innerHTML = "Persona possédées : " + `<ul>${personaList}</ul>`;
}


returnButton.addEventListener('click', function () {
    window.location.href = "../../index.html"
})

const pnameContainer = document.querySelector('#newpersonaname')
const parcanaContainer = document.querySelector('#newpersonaarcana')
const plevelContainer = document.querySelector('#newpersonalevel')
const pmovesContainer = document.querySelector('#newpersonamoves')
const paddForm = document.querySelector('#addnewPersona')
const addPersonaButton = document.querySelector('#addPersonaButton')


async function addPersona() {
    const response = await fetch("http://127.0.0.1:3000/personauser/" + id + "/personas/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: pnameContainer.value,
            arcana: parcanaContainer.value,
            level: plevelContainer.value,
            moves: pmovesContainer.value.split(",")
        })
    });

    const data = await response.json();

    if (response.status == 400) {
        if (data.name && data.name.message) {
            pnameContainer.value = data.name.message;
        }
        if (data.arcana && data.arcana.message) {
            parcanaContainer.value = data.arcana.message;
        }
        if (data.level && data.level.message) {
            plevelContainer.value = data.level.message;
        }
        if (data.moves && data.moves.message) {
            plevelContainer.value = data.moves.message;
        }
    }
}

async function deletePersona(idpersonauser, id) {
    await fetch("http://127.0.0.1:3000/personauser/" + idpersonauser + "/personas/" + id, {
        method: "DELETE"
    })
    await getUserdetail();
}

async function updateDisplayPersonas() {
    const response = await fetch('http://127.0.0.1:3000/personauser/' + id);
    const personauser = await response.json();
    nameContainer.textContent = "Nom : " + personauser.name
    ageContainer.textContent = "Age : " + personauser.age
    const personaNames = personauser.persona.map(p => p.name);
    let nameItems = '';

    personaNames.forEach((name, index) => {
        nameItems += `<li>${name} <button class="persona-delete" data-id="${personauser.persona[index]._id}">Supprimer</button> 
        <button class="persona-details" data-id="${personauser.persona[index]._id}">Détails</button></li>`;
    });
    personaListContainer.innerHTML = "Persona possédées : " + `<ul>${nameItems}</ul>`;

    const deletePersonaButtons = document.querySelectorAll('.persona-delete');
    Array.from(deletePersonaButtons).forEach(button => {
        button.addEventListener('click', async function () {
            const personaId = this.getAttribute('data-id');
            await deletePersona(id, personaId);
            updateDisplayPersonas();
        });
    });
    const detailPersonaButtons = document.querySelectorAll('.persona-details');
    Array.from(detailPersonaButtons).forEach(button => {
        button.addEventListener('click', function () {
            const personaId = this.getAttribute('data-id');
            window.location.href = `detailpersona.html?id=${personaId}`;
        });
    });
}


addPersonaButton.addEventListener('click', async function () {
    await addPersona();
    updateDisplayPersonas();
})


updateDisplayPersonas();

/* #endregion User Detail script*/
