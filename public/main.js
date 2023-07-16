window.addEventListener('load', async () =>{
  if(navigator.serviceWorker)
  {
    try{
      const reg = await navigator.serviceWorker.register('sw.js')
    }
    catch(e){
      console.log("SW register fail")
    }
  }
})
const app = () =>{
  const song  = document.querySelector('.song');
const play  = document.querySelector('.play');
const outline  = document.querySelector('.moving-outline circle');
const video  = document.querySelector('.video-container video');
const pickTimeButtons= document.querySelectorAll('.time-selector button');
const sounds = document.querySelectorAll('.sound-picker button');

  const timeDisplay = document.querySelector('.time-display')
  
  const outlineLength = outline?.getTotalLength();
  
  let duration = 600;
  let currentTime = song.currentTime;
  let elapsed  = duration - currentTime;
  let sec = Math.floor(elapsed % 60).toString().length===1 ?Math.floor(elapsed % 60).toString() + '0' : Math.floor(elapsed % 60).toString();
  let min = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${min}:${sec}`;
  outline.style.strokeDasharray = outlineLength;

  play.addEventListener('click',() =>{
    check(song);
  })
  pickTimeButtons.forEach((e)=>{e.addEventListener('click',(e) =>{
    duration = e.srcElement.attributes[0].value;
    reset();
    currentTime = song.currentTime;
   elapsed  = duration - currentTime;
   sec = Math.floor(elapsed % 60).toString().length===1 ?Math.floor(elapsed % 60).toString() + '0' : Math.floor(elapsed % 60).toString();
   min = Math.floor(elapsed / 60);
   timeDisplay.textContent = `${min}:${sec}`;
  })}
)
song.ontimeupdate = () =>{
   currentTime = song.currentTime;
   elapsed  = duration - currentTime;
   sec = Math.floor(elapsed % 60).toString().length===1 ?Math.floor(elapsed % 60).toString() + '0' : Math.floor(elapsed % 60).toString();
   min = Math.floor(elapsed / 60);

  let progress = outlineLength - (currentTime /duration) * outlineLength;
  outline.style.strokeDasharray = progress;

  timeDisplay.textContent = `${min}:${sec}`;
  if(currentTime >= duration){
    song.paused;
    song.currentTime = 0;
    play.src = './public/svg/play.svg';
    
    video.pause();
  }
}
sounds.forEach((elem)=>{
  elem.addEventListener('click',()=>{
   
    song.src = elem.getAttribute('data-sound');
    video.src = elem.getAttribute('data-video');
    
    reset();
    
   
  })
})
const check = (song) =>{
  if(song.paused){
    play.src = './public/svg/pause.svg';
    video.play();
    song.play();
  }
  else{
   
    play.src = './public/svg/play.svg';
    video.pause();
    song.pause();
  }
}
const reset = () =>{
  play.src = './public/svg/play.svg';
  elapsed = duration;
  song.pause();
  song.currentTime = 0;
  video.pause();
}
}

app();
