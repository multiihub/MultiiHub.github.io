import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} 
from 
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



const cloudName = "liqcadtf";
const uploadPreset = "mulltibox_uploads";





// ============================
// CLOUDINARY UPLOAD
// ============================


async function uploadVideo(fileInput,statusID){


    const file =
    document.getElementById(fileInput).files[0];


    if(!file){

        alert("Please select video");

        return null;

    }



    const status =
    document.getElementById(statusID);



    return new Promise((resolve,reject)=>{


        const formData = new FormData();


        formData.append(
            "file",
            file
        );


        formData.append(
            "upload_preset",
            uploadPreset
        );



        const xhr = new XMLHttpRequest();



        xhr.open(

        "POST",

        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`

        );




        xhr.upload.onprogress=function(e){


            if(e.lengthComputable){


                let percent =
                Math.round(
                (e.loaded/e.total)*100
                );


                status.innerHTML =
                `Uploading ${percent}%`;

            }


        };






        xhr.onload=function(){


            if(xhr.status===200){


                let data =
                JSON.parse(xhr.responseText);


                status.innerHTML =
                "Upload Complete ✅";


                resolve(data.secure_url);


            }

            else{


                reject("Upload Failed");


            }


        };



        xhr.send(formData);



    });



}


async function addSeries(){


let series={


title:
document.getElementById("seriesTitle").value,


genre:
document.getElementById("seriesGenre").value,


year:
document.getElementById("seriesYear").value,


image:
document.getElementById("seriesImage").value,


desc:
document.getElementById("seriesDesc").value,


category:"Series",


rating:"8.5",

quality:"HD"


};





let ref =
await addDoc(

collection(db,"movies"),

series

);



alert(
"Series Created ID:\n"+ref.id
);

}





async function addTop(){


let series={


title:
document.getElementById("seriesTitle").value,


genre:
document.getElementById("seriesGenre").value,


year:
document.getElementById("seriesYear").value,


image:
document.getElementById("seriesImage").value,


desc:
document.getElementById("seriesDesc").value,


category:"Top",


rating:"8.5",

quality:"HD"


};




let ref =
await addDoc(

collection(db,"movies"),

series

);



alert(
"Series Created ID:\n"+ref.id
);


}

// ============================
// ADD MOVIE
// ============================


async function addMovie(){



let movie={


title:
document.getElementById("movieTitle").value,


genre:
document.getElementById("movieGenre").value,


year:
document.getElementById("movieYear").value,


image:
document.getElementById("movieImage").value,


videoUrl:
await uploadVideo(
"videoFile",
"uploadStatus"
),



desc:
document.getElementById("movieDesc").value,



category:"Movies",


rating:"8.5",

quality:"HD"


};





await addDoc(

collection(db,"movies"),

movie

);



alert("Movie Added Successfully");


showMovies();



}




// ============================
// ADD SERIES
// ============================


async function addAnime(){



let series={


title:
document.getElementById("seriesTitle").value,


genre:
document.getElementById("seriesGenre").value,


year:
document.getElementById("seriesYear").value,


image:
document.getElementById("seriesImage").value,


desc:
document.getElementById("seriesDesc").value,


category:"Anime",


rating:"8.5",

quality:"HD"


};





let ref =
await addDoc(

collection(db,"movies"),

series

);



alert(
"Series Created ID:\n"+ref.id
);



}



// ============================
// ADD EPISODE
// ============================


async function addEpisode(){



let episode={



parentID:
document.getElementById("episodeParent").value,



title:
document.getElementById("episodeTitle").value,



episodeNumber:
document.getElementById("episodeNumber").value,



image:
document.getElementById("episodeImage").value,



desc:
document.getElementById("episodeDesc").value,



videoUrl:

await uploadVideo(

"episodeVideo",

"episodeUploadStatus"

)


};





await addDoc(

collection(db,"episodes"),

episode

);



alert(
"Episode Added Successfully"
);



}









// ============================
// SHOW DATABASE
// ============================


async function showMovies(){


let list =
document.getElementById("movieList");



if(!list)return;



list.innerHTML="";



const snapshot =
await getDocs(

collection(db,"movies")

);



snapshot.forEach((doc)=>{



let movie=doc.data();



list.innerHTML += `


<div class="movie-item">


<h3>
${movie.title}
</h3>


<p>
${movie.category}
</p>



<button onclick="deleteMovie('${doc.id}')">

Delete

</button>



</div>


`;



});



}









// ============================
// DELETE
// ============================


async function deleteMovie(id){


await deleteDoc(

doc(db,"movies",id)

);


showMovies();


}









window.addMovie=addMovie;

window.addTrending = addTrending;

window.addRecommended = addRecommended;

window.addSeries=addSeries;

window.addEpisode=addEpisode;

window.deleteMovie=deleteMovie;




showMovies();
