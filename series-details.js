import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    where
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";





const params = new URLSearchParams(
    window.location.search
);


const seriesId = params.get("id");



const details =
document.getElementById("series-details");


const episodesContainer =
document.getElementById("episodes-container");







async function loadSeries(){


    if(!seriesId){

        details.innerHTML =
        "<h2>Series not found</h2>";

        return;

    }



    // GET SERIES DATA


    const seriesRef =
    doc(db,"movies",seriesId);



    const seriesSnap =
    await getDoc(seriesRef);





    if(seriesSnap.exists()){


        const series =
        seriesSnap.data();



        details.innerHTML = `


        <img 
        src="${series.image}" 
        class="details-poster"
        >



        <div class="details-info">


        <h1>
        ${series.title}
        </h1>



        <div class="details-meta">


        <span>
        ⭐ ${series.rating || "N/A"}
        </span>


        <span>
        ${series.quality || "HD"}
        </span>


        </div>



        <p>
        ${series.genre || ""}
        </p>




        <p>
        ${series.desc || "No description available"}
        </p>



        </div>



        `;



    }









    // LOAD EPISODES


    const episodeQuery =
    query(

        collection(db,"episodes"),

        where(
            "parentID",
            "==",
            seriesId
        )

    );




    const episodeSnap =
    await getDocs(episodeQuery);




    episodesContainer.innerHTML="";





    if(episodeSnap.empty){


        episodesContainer.innerHTML = `

        <h3>
        No Episodes Added Yet
        </h3>

        `;


        return;

    }







    episodeSnap.forEach((episodeDoc)=>{



        const episode =
        episodeDoc.data();



        episodesContainer.innerHTML += `



        <div class="card">



        <img 
        src="${episode.image}"
        >



        <div class="card-info">



        <h3>
        ${episode.title}
        </h3>



        <p>
        Episode ${episode.episodeNumber}
        </p>



        <a 
        href="episode-player.html?id=${episodeDoc.id}"
        class="watch-btn">

        Watch Episode

        </a>



        </div>



        </div>



        `;



    });



}







loadSeries();
