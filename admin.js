import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const cloudName = "liqcadtf";
const uploadPreset = "mulltibox_uploads";


async function uploadVideo(){

    const file = document.getElementById("videoFile").files[0];

    if(!file){
        alert("Please select a video");
        return null;
    }


    const status = document.getElementById("uploadStatus");


    return new Promise((resolve, reject)=>{


        const formData = new FormData();

        formData.append("file", file);

        formData.append("upload_preset", uploadPreset);



        const xhr = new XMLHttpRequest();


        xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`
        );



        // Upload percentage
        xhr.upload.onprogress = function(event){


            if(event.lengthComputable){


                let percent = Math.round(
                    (event.loaded / event.total) * 100
                );


                status.innerHTML =
                `Uploading video... ${percent}%`;

            }

        };



        xhr.onload = function(){


            if(xhr.status === 200){


                const data = JSON.parse(xhr.responseText);


                status.innerHTML =
                "Upload completed ✅";


                resolve(data.secure_url);


            } else {


                status.innerHTML =
                "Upload failed ❌";


                reject(xhr.responseText);

            }

        };



        xhr.onerror = function(){

            status.innerHTML =
            "Network error ❌";

            reject("Network error");

        };



        xhr.send(formData);


    });

}
// ADD MOVIE

async function addMovie(){


    let movie = {


        title: document.getElementById("movieTitle").value,

        genre: document.getElementById("movieGenre").value,

        year: document.getElementById("movieYear").value,

        image: document.getElementById("movieImage").value,

        videoUrl: await uploadVideo(),

        desc: document.getElementById("movieDesc").value,

        category: document.getElementById("movieCategory").value,


        rating:"8.5",

        quality:"HD"


    };



    await addDoc(collection(db,"movies"), movie);



    alert("Movie Added Successfully");


    showMovies();


}




// SHOW MOVIES IN ADMIN

async function showMovies(){


    let list = document.getElementById("movieList");


    if(!list) return;



    list.innerHTML="";



    const snapshot = await getDocs(collection(db,"movies"));



    snapshot.forEach((doc)=>{


        let movie = doc.data();



        list.innerHTML += `


        <div class="movie-item">


        <h3>${movie.title}</h3>

        <p>${movie.category}</p>


        <button onclick="deleteMovie('${doc.id}')">

        Delete

        </button>


        </div>


        `;


    });



}



// DELETE MOVIE

async function deleteMovie(id){


    await deleteDoc(doc(db,"movies",id));


    showMovies();


}



window.addMovie = addMovie;
window.deleteMovie = deleteMovie;



showMovies();
