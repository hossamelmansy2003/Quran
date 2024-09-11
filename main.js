let audio =document.querySelector('.quranPlayer'),
surahContainer=document.querySelector('.surahs'),
ayah =document.querySelector('.ayah'),
next=document.querySelector('.next'),
play=document.querySelector('.play'),
prev=document.querySelector('.prev')
getSurah();
function getSurah() {
    fetch('https://quran-endpoint.vercel.app/quran')
    .then(response=>response.json())
    .then(data=>{
for (let surah  in data.data) {
    // console.log(data.data)
surahContainer.innerHTML +=
`
<div>
<p>${data.data[surah].asma.ar.long}</p>
<p>${data.data[surah].asma.en.long}</p>

</div>
`
}
// select all surah
let allSurahs = document.querySelectorAll('.surahs div'),
 AyahsAudios,
 AyahText;

 allSurahs.forEach((surah, index) => {
    surah.addEventListener('click', () => {
        fetch(`https://quran-endpoint.vercel.app/quran/${index + 1}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data.data.ayahs)
                let surah = data.data.ayahs;
                AyahsAudios=[];
                AyahText=[];

                // Clear existing audio source
                audio.src = ''; 

                surah.forEach(surah => {
                    AyahsAudios.push(surah.audio.url)
                    AyahText.push(surah.text.ar)
                    // console.log(surah.text.ar);
                    // console.log(surah.audio)
                });

                 // Play the first Ayah audio
                if (AyahsAudios.length > 0) {
                    audio.src = AyahsAudios[0]; // Set the audio source to the first Ayah's audio
                    audio.play();               // Automatically play the audio
                }

                let AyahIndex=0;

                // Initial Ayah load and playback
                changeAyah(AyahIndex);
                audio.addEventListener('ended',()=>{
                    AyahIndex++;

                    if(AyahIndex<AyahsAudios.length)
                    {
                        changeAyah(AyahIndex); // Play the next Ayah if available
                    
                    } else {
                        // If all Ayahs have been played, pause the audio and show a success message
                        audio.pause()
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "surah has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // Optionally reset AyahIndex to start over or handle additional logic
                        AyahIndex = 0;
                    
                        // Play/pause logic for UI update (assuming `togglePlay` function handles this)
                        isPlaying = false; // Make sure this reflects the actual play state
                        togglePlay();

                     }
                })


                
                // changeAyah(AyahIndex)
                // audio.addEventListener('ended',()=>{
                //     AyahIndex++;

                //     if(AyahIndex<AyahsAudios.length)
                //     {
                //         changeAyah(AyahIndex)
                //     }
                //      else`
                //      {
                //         changeAyah(AyahIndex);
                //         audio.pause()
                //       Swal.fire({
                //       position: "center",
                //       icon: "success",
                //       title: "surah has been saved",
                //       showConfirmButton: false,
                //       timer: 1500
                //      });
                    
                //      isPlaying = true;
                //      togglePlay();

                //      }

                //     changeAyah(AyahIndex)
                //     // console.log(AyahIndex)
                // })

                // Handle Next And Prev
                next.addEventListener('click',()=>{
                  AyahIndex < AyahsAudios.length-1 ? AyahIndex++ :AyahIndex=0;
                    changeAyah(AyahIndex)
                })
                prev.addEventListener('click',()=>{
                    AyahIndex==0 ? AyahIndex=AyahsAudios.length-1 :AyahIndex--;
                    changeAyah(AyahIndex);
                })

                // Handle play add pause audio
                let isPlaying=false;
                togglePlay();
                function togglePlay()
                {
                    if(isPlaying)
                        {
                         audio.pause();
                         play.innerHTML = `<i class="fa-solid fa-play"></i>`
                         isPlaying =false;
                        }
                        else
                        {
                        audio.play();
                        play.innerHTML = `<i class="fa-solid fa-play"></i>`
                        isPlaying = true;

                        }
                }
                play.addEventListener('click',togglePlay)

                function changeAyah(index)
                {
                  audio=AyahsAudios[index];
                  ayah.innerHTML=AyahText[index]

                }
                // console.log(AyahsAudios)
                // console.log(AyahText)

            })
            // .catch(error => {
            //     console.error('Error fetching data:', error);
            // });
    });
});

    })
}