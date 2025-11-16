

let songIndex=0;
let audioElement= new Audio('1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById("myProgressBar");
let Gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
// let songItems=Array.from(document.getElementsByClassName("songItem"));
let songItems=document.querySelectorAll(".songItem"); 
let songItemPlay=document.querySelectorAll(".songItemPlay");




let songs=[
    {songName: "pal-pal", filePath:"1.mp3", coverPath:"1.jpg"},
    {songName: "Mast Mast Nain", filePath:"2.mp3", coverPath:"2.jpg"},
    {songName: "Pyaro vrindavan", filePath:"3.mp3", coverPath:"3.jpg"},
    {songName: "salam-e-Ishq", filePath:"4.mp3", coverPath:"4.jpg"},
    {songName: "salam-e-Ishq", filePath:"5.mp3", coverPath:"5.jpg"},
    {songName: "salam-e-Ishq", filePath:"6.mp3", coverPath:"6.jpg"},
    {songName: "salam-e-Ishq", filePath:"7.mp3", coverPath:"7.jpg"},
]

songItems.forEach((elem,i)=>{
    elem.getElementsByTagName("img")[0].src=songs[i].coverPath;
    elem.getElementsByClassName("songName")[0].textContent=songs[i].songName;
})


masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    Gif.style.opacity=1;
    }else{
        audioElement.pause();
        makeAllPlays();
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
    Gif.style.opacity=0;

    }
})

audioElement.addEventListener("timeupdate",()=>{
    let progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;
});

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;

});

function makeAllPlays(){
    songItemPlay.forEach((e)=>{
        e.classList.add("fa-circle-play");
        e.classList.remove("fa-circle-pause");
    })
};

songItemPlay.forEach((element) => {
    element.addEventListener("click", (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
            Gif.style.opacity = 0;
        } else {
            makeAllPlays(); 
            songIndex = clickedIndex;
            audioElement.src = `${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();

            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            masterSongName.textContent = songs[songIndex].songName;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            Gif.style.opacity = 1;
        }
    });
});

document.querySelector("#Next").addEventListener("click",()=>{
    if(songIndex>=6){
        songIndex =0;
    }else{
        songIndex += 1;
    }
    
    masterSongName.textContent=songs[songIndex].songName;
    audioElement.src=`${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    Gif.style.opacity=1;
})

document.querySelector("#previous").addEventListener("click",()=>{
       if(songIndex<=0){
        songIndex=0;
       }else{
        songIndex -= 1;
       }
       masterSongName.textContent=songs[songIndex].songName;
       masterPlay.classList.remove("fa-circle-play");
       masterPlay.classList.add("fa-circle-pause");
       audioElement.src=`${songIndex+1}.mp3`;
       audioElement.currentTime=0;
       audioElement.play();
       Gif.style.opacity=1;

})





