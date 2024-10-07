const urlPeliculas = 'https://japceibal.github.io/japflix_api/movies-data.json';

let peliculasGuardadas = [];

const cargarPeliculas = () => {
  fetch(urlPeliculas).then((resultadoFetch) =>
    resultadoFetch
      .json()
      .then((resultadoPromesa) => {
        peliculasGuardadas = resultadoPromesa;
      })
      .catch((error) => {
        console.error(error);
      })
  );
};

const borrarPeliculas = () => {
  const listaPeliculas = document.getElementById('lista');
  listaPeliculas.innerHTML = '';
};

const generarEstrellas = (voto) => {
  const cantidadEstrellas = Math.floor(voto / 2) || 1;

  const totalEstrellas = 5;

  let htmlEstrellas = '';

  for (let i = 0; i < cantidadEstrellas; i++) {
    htmlEstrellas += '<span class="fa fa-star checked"></span>';
  }

  for (let i = 0; i < totalEstrellas - cantidadEstrellas; i++) {
    htmlEstrellas += '<span class="fa fa-star"></span>';
  }

  return htmlEstrellas;
};

const cerrarModal = () => {
  document.getElementById('modal')?.remove();
};

const generarGeneros = (generos) => {
  const nombresDeGeneros = generos.map((genero) => genero.name);

  const stringGeneros = nombresDeGeneros.join(' - ');

  return stringGeneros;
};

const abrirModal = (idPelicula) => {
  const pelicula = peliculasGuardadas.find(
    (pelicula) => pelicula.id.toString() === idPelicula.toString()
  );

  const mainElement = document.getElementById('main-container');

  mainElement.innerHTML += `<div class="modal-container" id="modal">
        <div class="modal-info">
          <span class="fa fa-close close" onclick="cerrarModal()"></span>
          <h4>${pelicula.title}</h4>
          <p>
            ${pelicula.overview}
          </p>
          <hr />
          <div class="info-container">
            <span>
            ${generarGeneros(pelicula.genres)}
            </span>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    More
                </button>
                <ul class="dropdown-menu">
                    <li><div class="dropdown-element"><span>Year: </span> <span>${
                      pelicula.release_date.split('-')[0]
                    }</span></div></li>
                    <li><div class="dropdown-element"><span>Runtime: </span> <span>${
                      pelicula.runtime
                    }</span></div></li>
                    <li><div class="dropdown-element"><span>Budget: </span> <span>$${
                      pelicula.budget
                    }</span></div></li>
                    <li><div class="dropdown-element"><span>Revenue: </span> <span>$${
                      pelicula.revenue
                    }</span></div></li>
                </ul>
            </div>
          </div>
        </div>
      </div>`;
};

const agregarPeliculas = (peliculas) => {
  const listaPeliculas = document.getElementById('lista');
  peliculas.forEach((pelicula) => {
    listaPeliculas.innerHTML += `<li class="pelicula" onclick="abrirModal(${
      pelicula.id
    })">
            <div class="contenedor-pelicula">
              <div>
                <h4>${pelicula.title}</h4>
                <p>
                  ${pelicula.tagline}
                </p>
              </div>
              <div>
                ${generarEstrellas(pelicula.vote_average)}
              </div>
            </div>
          </li>`;
  });
};

const clickBuscar = () => {
  borrarPeliculas();

  const texto = document.getElementById('inputBuscar').value;

  if (!texto) return;

  const peliculasFiltradas = peliculasGuardadas.filter(
    (pelicula) =>
      pelicula.title.toLowerCase().includes(texto.toLowerCase()) ||
      pelicula.tagline.toLowerCase().includes(texto.toLowerCase()) ||
      pelicula.overview.toLowerCase().includes(texto.toLowerCase()) ||
      pelicula.genres.filter((genre) =>
        genre.name.toLowerCase().includes(texto.toLowerCase())
      ).length
  );

  if (peliculasFiltradas.length) {
    agregarPeliculas(peliculasFiltradas);
  }
};

const cargaInicial = () => {
  document.getElementById('btnBuscar').addEventListener('click', clickBuscar);

  cargarPeliculas();
};

cargaInicial();
