import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const params = new URLSearchParams(
    window.location.search
);


const episodeId = params.get("id");


const title = document.getElementById("seriesTitle");

const video = document.getElementById("seriesVideo");

const description = document.getElementById("seriesDescription");



async function loadEpisode(){


    if(!episodeId){

        title.textContent = "Episode not found";

        return;

    }



    const episodeRef = doc(db,"episodes",episodeId);


    const snap = await getDoc(episodeRef);



    if(snap.exists()){


        const episode = snap.data();



        title.textContent = episode.title;


        description.textContent =
        episode.description || "";



        video.src = episode.videoUrl;



    }
    else{


        title.textContent =
        "Episode not found";


    }



}



loadEpisode();
