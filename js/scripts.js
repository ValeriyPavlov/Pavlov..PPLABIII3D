import {actualizarTabla, ordenarTabla} from "./tabla.js";
import {Superheroe} from "./Superheroe.js";
import {validarDatos, limpiarValidaciones} from "./validaciones.js";

let id = null; // ID Global para modificar o eliminar items.
let index = null; // Index Global para modificar o eliminar items.
const $form = document.forms[0];
const $containerTabla = document.getElementById("tabla");
const $containerBotones = document.getElementById("botones-container");
//const listaArmas = ["Armadura", "Espada", "Martillo", "Escudo", "Arma de fuego", "Flechas"];
const listaArmas = JSON.parse(localStorage.getItem("armas")) || [];
localStorage.setItem("armas", JSON.stringify(listaArmas)); 
const lista = JSON.parse(localStorage.getItem("superheroes")) || []; // Lista de items del localStorage.
if(lista.length) actualizarTabla($containerTabla, lista);
document.getElementById("btnGuardar").disabled = false;

// Limpiar form en caso de F5
window.addEventListener("load", ()=>{$form.reset();});

$containerBotones.addEventListener("click", (e) => 
{

    const boton = e.target.textContent;
    if(boton == "Guardar")
    {
        // Desestructuracion del objeto form
        const {txtId, txtNombre, txtAlias, rdoEditorial, txtFuerza, opcArma} = $form;
        if(txtId.value === "")
        {
            //Validacion
            if(validarDatos($form))
            {
                // ALTA
                const newItem = new Superheroe(
                    Date.now(), 
                    txtNombre.value,
                    parseInt(txtFuerza.value),
                    txtAlias.value, 
                    rdoEditorial.value, 
                    opcArma.value
                    );
                lista.push(newItem);
                limpiarForm();
                actualizarTabla($containerTabla, lista);
                localStorage.setItem("superheroes", JSON.stringify(lista)); 
            }
        }
        else
        {
            //Validacion
            if(validarDatos($form) && confirm("¿Desea guardar los cambios?"))
            {
                // MODIFICACION
                const newItem = new Superheroe(
                    parseInt(txtId.value), 
                    txtNombre.value,
                    parseInt(txtFuerza.value),
                    txtAlias.value, 
                    rdoEditorial.value, 
                    opcArma.value
                    );
                lista.splice(index, 1, newItem);
                limpiarForm();
                actualizarTabla($containerTabla, lista);
                localStorage.setItem("superheroes", JSON.stringify(lista));
            }
        }
    }
    else if(boton == "Eliminar")
    {   
        // BAJA
        if(index && confirm("¿Desea ELIMINAR el item seleccionado?"))
        {
            lista.splice(index, 1);
            localStorage.setItem("superheroes", JSON.stringify(lista));
            limpiarForm();
            actualizarTabla($containerTabla, lista);
        }
    }
    else if(boton == "Cancelar")
    {
        limpiarForm();
        limpiarValidaciones();
    }
});

$containerTabla.addEventListener("click", (e)=>
{
    if(e.target.matches("td")) // Solamente cuando haces click sobre TD y no en cualquier lado de la ventana.
    {
        index = e.target.parentElement.getAttribute("data-id");
        id = lista[index].id;
        const selectedItem = lista.find((item)=>item.id == id);
        cargarFormItem($form, selectedItem);
        document.getElementById("btnCancelar").disabled = false;
        document.getElementById("btnEliminar").disabled = false;

        //Limpio etiquetas de validacion
        limpiarValidaciones();
    }
    else if(e.target.matches("th"))
    {
        let claveSort = e.target.textContent;
        ordenarTabla(lista, claveSort);
        localStorage.setItem("superheroes", JSON.stringify(lista));
        limpiarForm();
        actualizarTabla($containerTabla, lista);
    }
});

function cargarFormItem(formulario, item)
{  
    formulario.txtId.value = item.id;
    formulario.txtNombre.value = item.nombre;
    formulario.txtFuerza.value = item.fuerza;
    formulario.txtAlias.value = item.alias;
    formulario.rdoEditorial.value = item.editorial;
    formulario.opcArma.value = item.arma;
}

function limpiarForm()
{
    id = null;
    index = null;
    document.getElementById("txtId").value = "";
    document.getElementById("btnCancelar").disabled = true;
    document.getElementById("btnEliminar").disabled = true;
    $form.reset();
}

cargarArmas(listaArmas);
function cargarArmas(lista)
{
    let input = document.getElementById("txtArma");
    lista.forEach(element => {
        const arma = document.createElement('option');
        input.appendChild(arma);
        arma.value = element;
        arma.textContent = element;
    });
}

