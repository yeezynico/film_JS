// barre de recherche 
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const search = document.getElementById("searchInput").value;
    getSearchResults(search);
});

// fonction pour récupérer les résultats de la recherche de l'API
const getSearchResults = (search) => {
    fetch(`https://www.omdbapi.com/?s=${search}&apikey=1ff1fd1`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            resultat(data.Search);
        })
        .catch((error) => console.error('Response error:', error.message));
};

// fonction pour afficher les résultats de la recherche
const resultat = (results) => {
    const film = document.getElementById('film');
    film.innerHTML = '';
    if (results) {
        results.forEach((result) => {
            showFilm(result.Title, result.Year, result.Poster);
        });
    } else {
        film.innerHTML = '<p>Aucun résultat trouvé</p>';
    }
};

// fonction pour afficher un film
const showFilm = (Title, Released, Poster) => {
    const filmDiv = document.createElement('div');
    filmDiv.innerHTML = `
        <div>
            <img src="${Poster}">
            <h2> Titre : ${Title}</h2>
            <p> date de sortie : ${Released} </p>
            <button class="readMoreBtn">Read more</button>
        </div>
    `;
    document.getElementById('film').appendChild(filmDiv);

    // Ajouter un gestionnaire d'événement à chaque bouton "Read more"
    filmDiv.querySelector('.readMoreBtn').addEventListener('click', function() {
        openModalWithFilm(Title);
    });
};

// fonction pour ouvrir la modalité avec les détails du film
const openModalWithFilm = (Title) => {
    modal.style.display = "block";
    getFilmDetails(Title);
};

// fonction API pour récupérer les détails du film
const getFilmDetails = (Title) => {
    fetch(`https://www.omdbapi.com/?t=${Title}&apikey=1ff1fd1`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const Released = data.Released;
            const Poster = data.Poster;

            const element = document.getElementById('modal-content');

            element.innerHTML = `
                <div>
                    <span class="close" onclick="closeP()">&times;</span>
                    <img src="${Poster}">
                    <h2> Titre : ${Title}</h2>
                    <p> date de sortie : ${Released} </p>
                </div>
            `;
        })
        .catch((error) => console.error('Response error:', error.message));
};

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close");

// When the user clicks on <span> (x), close the modal
 function closeP() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Modal element
const modal = document.getElementById("myModal");
