import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
const URL = "http://localhost:3000/categories"

const tbody = document.querySelector('tbody')
const form = document.querySelector("form")
const name = document.querySelector("#name")
const image = document.querySelector("#url-image")
let idCache

index()

form.addEventListener('submit', async (event) => {
    //ACA DEBEMOS LLAMAR A LA FUNCION QUE SE ENCARGA DE GUARDAR

    if (idCache === undefined) {
        create(name, image)
    } else {
        update(idCache, name, image)
    }
    event.preventDefault()
    await index()

})

tbody.addEventListener('click', async function (event) {
    // ACA DEBEMOS LOCALIZAR A LOS ESCUCHADORES DE EVENTOS

    if (event.target.classList.contains("btn-danger")) {
        const id = event.target.getAttribute('data-id')
        await deleteItem(id)
        await index()
    }

    if (event.target.classList.contains("btn-warning")) {
        const id = event.target.getAttribute('data-id')
        const categoryFound = await find(id)
        //find: es el mètodo buscar
        name.value = categoryFound.name
        image.value = categoryFound.image
    }
})

async function index() {
    const response = await fetch(URL)
    const data = await response.json()

    tbody.innerHTML = ""
    data.forEach(element => {
        tbody.innerHTML += `
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>
                <img width="100px" src=${element.image} alt=${element.name}>
            </td>
            <td>${element.creationAt}</td>
            <td>${element.updatedAt}</td>
            <td>
                <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
            </td>
        `
    })
}

async function find(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA BUSCAR UNA CATEGORIA
    const response = await fetch(`${URL}/${id}`)
    const data = await response.json()
    return data
}

async function create(name, image) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA CREAR UNA CATEGORIA

    const newCategory = {
        name: name.value,
        image: image.value
    }

    await fetch(`${URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
    })
}

async function update(idCache, name, image) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ACTUALIZAR UNA CATEGORIA
    const updateCategory = {
        name: name.value,
        image: image.value
    }

    await fetch(`${URL}/${idCache}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateCategory)
    })

    idCache = undefined

}

async function deleteItem(id) {
    //ACA DEBEMOS PROGRAMAR LA PETICION PARA ELIMINAR UNA CATEGORIA
    await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

}