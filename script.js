import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

console.log("Mulltibox JS connected");

// Clear all containers
document.getElementById("movies-container").innerHTML = "";
document.getElementById("series-container").innerHTML = "";
document.getElementById("anime-container").innerHTML = "";
document.getElementById("trending-container").innerHTML = "";
document.getElementById("recommended-container").innerHTML = "";


function createCard(movie, id) {

    return `
        <div class="card">

            <img src="${movie.image}" alt="${movie.title}">

            <div class="card-info">

                <div class="movie-top">

                    <span class="rating">
                        ⭐ ${movie.rating || "N/A"}
                    </span>

                    <span class="quality">
                        ${movie.quality || "HD"}
                    </span>

                </div>

                <h3>${movie.title}</h3>

                <p>${movie.genre}</p>

                <a href="${
                (movie.category === "Series" || movie.category === "Anime")
                ?
                "series-details.html?id="+id
                :
                "movie.html?id="+id
                }" class="watch-btn">

                Watch Now

                </a>

            </div>

        </div>
    `;
}



async function loadMovies() {

    const snapshot = await getDocs(collection(db, "movies"));

    snapshot.forEach((doc) => {

        const movie = doc.data();
        movie.id = doc.id;

        console.log(movie);

        let container;

        switch (movie.category) {

            case "Movies":
                container = document.getElementById("movies-container");
                break;

            case "Series":
                container = document.getElementById("series-container");
                break;

            case "Anime":
                container = document.getElementById("anime-container");
                break;

            case "Trending":
                container = document.getElementById("trending-container");
                break;

            case "Recommended":
                container = document.getElementById("recommended-container");
                break;

        }

        if (container) {
            container.innerHTML += createCard(movie, movie.id);
        }

    });

}

loadMovies();
