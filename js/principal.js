const lista = JSON.parse(localStorage.getItem("superheroes")) || [];
const seccionAnuncios = document.querySelector("#section-cards");

lista.forEach((elemento) => {
    const anuncio = crearAnuncio(elemento);
    seccionAnuncios.appendChild(anuncio);
});

function crearAnuncio(elemento) {
    // Articulo
    const article = document.createElement("article");
    article.classList.add("card");

    Object.keys(elemento).forEach((key) => 
    {
        if (key !== "id") 
        {

            let clave = document.createElement("h3");
            clave.textContent = key;
            article.appendChild(clave);
            let contenido = document.createElement("p")
            contenido.textContent = elemento[key];
            article.appendChild(contenido);
        }
    });

    // Boton
    const button = document.createElement("button");
    button.textContent = "Ver Superheroe";
    article.appendChild(button);

    return article;
}
