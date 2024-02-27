/* #region Persona Detail script*/

    
    returnButton.addEventListener('click', function () {
        window.location.href = "../../index.html"
    })

const personaNameContainer = document.querySelector('#personaname')
const personaArcanaContainer = document.querySelector('#personaarcana')
const personaLevelContainer = document.querySelector('#personalevel')
const personaMovesContainer = document.querySelector('#personamlist')
const displayPersonaArticle = document.querySelector('#displaypersonaarticle')
const personaID = getPersonaId()

function getPersonaId() {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    return params.get("id")
}

async function getPersonadetail() {
    const response = await fetch("http://127.0.0.1:3000/personas/" + personaID)
    const persona = await response.json()
    const personaMoves = persona.moves.map(move => `<li>${move}</li>`).join('');
    personaNameContainer.textContent = "Nom : " + persona.name
    personaArcanaContainer.textContent = "Arcana : " + persona.arcana
    personaLevelContainer.textContent = "Niveau : " + persona.level
    personaMovesContainer.innerHTML = "Attaques : " + `<ul>${personaMoves}</ul>`;}


getPersonadetail()