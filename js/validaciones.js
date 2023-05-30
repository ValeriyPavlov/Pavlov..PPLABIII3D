export function validarDatos(form)
{
    let retorno = false;
    
    if( limitadorLargoString(form.txtNombre, 25) &
        limitadorLargoString(form.txtAlias, 25) &
        rangoNumerico(form.txtFuerza, 1, 100) 
        ) 
    {
        retorno = true;
    }

    return retorno;
}

function validarVacio(item, small)
{
    let retorno = true;
    if(item.value.trim() != "")
    {
        item.classList.remove("errorValidacion");
        small.textContent = "";
        retorno = false;
    }
    return retorno;
}

function limitadorLargoString(item, largo)
{
    let retorno = false;
    const small = item.nextElementSibling;
    if(validarVacio(item, small))
    {
        item.classList.add("errorValidacion");
        small.textContent = `El campo no puede estar vacio!`;
    }
    else if(item.value.trim().length > largo)
    {
        item.classList.add("errorValidacion");
        small.textContent = `El texto no puede superar los ${largo} caracteres.`;
    }
    else
    {
        retorno = true;
    }
    return retorno;
}

function rangoNumerico(item, min, max)
{
    let retorno = false;
    const small = item.nextElementSibling;
    if(validarVacio(item, small))
    {
        item.classList.add("errorValidacion");
        small.textContent = `El campo no puede estar vacio!`;
    }
    else if(isNaN(item.value) || parseInt(item.value) < min || parseInt(item.value) > max)
    {
        item.classList.add("errorValidacion");
        small.textContent = `Numeros validos entre: ${min} y ${max}.`;
    }
    else
    {
        retorno = true;
    }
    return retorno;
}

export function limpiarValidaciones()
{
    let elementoHtml = document.documentElement;
    let elemento = elementoHtml.querySelectorAll("*");
    let smallTags = document.getElementsByTagName('small');

    for (let i = 0; i < elemento.length; i++) 
    {
        let element = elemento[i];
        if (element.classList.contains("errorValidacion")) 
        {
            element.classList.remove("errorValidacion");
        }
    }
    for (let i = 0; i < smallTags.length; i++) 
    {
        smallTags[i].innerHTML = '';
    }
}