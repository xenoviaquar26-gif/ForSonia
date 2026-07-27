/* ==========================================================
   HAPPY 2ND WEDDING ANNIVERSARY
   SCRIPT V3 FINAL
   Compatible with index.html & style.css
========================================================== */

"use strict";

/* ==========================================================
   DOM
========================================================== */

const loader = document.getElementById("loader");

const openGift = document.getElementById("openGift");

const replay = document.getElementById("replay");

const bgMusic = document.getElementById("bgMusic");

const typingText = document.getElementById("typingText");

const loveLetter = document.getElementById("love-letter");

/* ==========================================================
   LOADER
========================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }

    }, 1800);

});

/* ==========================================================
   MUSIC
========================================================== */

let musicStarted = false;

function playMusic() {

    if (!bgMusic) return;

    if (musicStarted) return;

    musicStarted = true;

    bgMusic.volume = 0.45;

    bgMusic.play().catch(() => {

        musicStarted = false;

    });

}

/* ==========================================================
   LOVE LETTER
========================================================== */

const letter = `Dear Sonia ❤️,

Happy 2nd Wedding Anniversary.

Terima kasih karena sudah menjadi
istri terbaik,
teman terbaik,
dan rumah terbaik
untukku.

Terima kasih
untuk semua cinta,
kesabaran,
perhatian,
dan doa yang selalu
kamu berikan.

Semoga Tuhan
memberkati keluarga kecil kita.

Aku akan selalu
mencintaimu.

Hari ini.

Besok.

Selamanya.

❤️ I Love You ❤️

- Suamimu
`;

let typingIndex = 0;

let typingRunning = false;

/* ==========================================================
   TYPE EFFECT
========================================================== */

function typeLetter() {

    if (!typingText) return;

    if (typingIndex >= letter.length) return;

    typingText.innerHTML += letter.charAt(typingIndex);

    typingIndex++;

    setTimeout(typeLetter, 38);

}

/* ==========================================================
   OBSERVER
========================================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            if(!typingRunning){

                typingRunning = true;

                typeLetter();

            }

        }

    });

},{
    threshold:0.45
});

if(loveLetter){

    observer.observe(loveLetter);

}

/* ==========================================================
   OPEN GIFT
========================================================== */

if(openGift){

    openGift.addEventListener("click",()=>{

        playMusic();

        loveLetter.scrollIntoView({

            behavior:"smooth"

        });

    });

}

/* ==========================================================
   REPLAY
========================================================== */

if(replay){

    replay.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

        if(bgMusic){

            bgMusic.currentTime=0;

            musicStarted=false;

            playMusic();

        }

        if(typingText){

            typingText.innerHTML="";

            typingIndex=0;

            typingRunning=true;

            typeLetter();

        }

    });

}

/* ==========================================================
   PRELOAD IMAGES
========================================================== */

[
    "assets/images/foto1.jpg",
    "assets/images/foto2.jpg",
    "assets/images/foto3.jpg"

].forEach(src=>{

    const img=new Image();

    img.src=src;

});
/* ==========================================================
   GALLERY
========================================================== */

const photos = document.querySelectorAll(".gallery-photo");

const dots = document.querySelectorAll(".dot");

const prevBtn = document.querySelector(".gallery-btn.prev");

const nextBtn = document.querySelector(".gallery-btn.next");

let currentPhoto = 0;

let galleryInterval;

/* ==========================================================
   SHOW PHOTO
========================================================== */

function showPhoto(index){

    if(photos.length===0) return;

    if(index<0){

        currentPhoto=photos.length-1;

    }else if(index>=photos.length){

        currentPhoto=0;

    }else{

        currentPhoto=index;

    }

    photos.forEach(photo=>{

        photo.classList.remove("active");

    });

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    photos[currentPhoto].classList.add("active");

    if(dots[currentPhoto]){

        dots[currentPhoto].classList.add("active");

    }

}

/* ==========================================================
   NEXT
========================================================== */

function nextPhoto(){

    showPhoto(currentPhoto+1);

}

/* ==========================================================
   PREVIOUS
========================================================== */

function previousPhoto(){

    showPhoto(currentPhoto-1);

}

/* ==========================================================
   AUTO PLAY
========================================================== */

function startGallery(){

    stopGallery();

    galleryInterval=setInterval(()=>{

        nextPhoto();

    },4000);

}

function stopGallery(){

    if(galleryInterval){

        clearInterval(galleryInterval);

    }

}

showPhoto(0);

startGallery();

/* ==========================================================
   BUTTON
========================================================== */

if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        nextPhoto();

        startGallery();

    });

}

if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        previousPhoto();

        startGallery();

    });

}

/* ==========================================================
   DOT
========================================================== */

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        showPhoto(index);

        startGallery();

    });

});

/* ==========================================================
   SWIPE MOBILE
========================================================== */

const galleryWrapper=document.querySelector(".gallery-wrapper");

let touchStartX=0;

let touchEndX=0;

if(galleryWrapper){

    galleryWrapper.addEventListener("touchstart",(e)=>{

        touchStartX=e.changedTouches[0].clientX;

    });

    galleryWrapper.addEventListener("touchend",(e)=>{

        touchEndX=e.changedTouches[0].clientX;

        const distance=touchStartX-touchEndX;

        if(Math.abs(distance)<50){

            return;

        }

        if(distance>0){

            nextPhoto();

        }else{

            previousPhoto();

        }

        startGallery();

    });

}

/* ==========================================================
   PAUSE HOVER
========================================================== */

const gallery=document.querySelector(".gallery-slider");

if(gallery){

    gallery.addEventListener("mouseenter",stopGallery);

    gallery.addEventListener("mouseleave",startGallery);

}

/* ==========================================================
   FULLSCREEN
========================================================== */

photos.forEach(photo=>{

    photo.addEventListener("click",()=>{

        if(photo.requestFullscreen){

            photo.requestFullscreen();

        }else if(photo.webkitRequestFullscreen){

            photo.webkitRequestFullscreen();

        }

    });

});
/* ==========================================================
   ANNIVERSARY COUNTER
========================================================== */

const yearsElement = document.getElementById("years");

const monthsElement = document.getElementById("months");

const daysElement = document.getElementById("days");

const hoursElement = document.getElementById("hours");

const minutesElement = document.getElementById("minutes");

const secondsElement = document.getElementById("seconds");

/* ==========================================================
   WEDDING DATE
========================================================== */

const weddingDate = new Date(2024,6,7,0,0,0);

/* ==========================================================
   UPDATE COUNTER
========================================================== */

function updateCounter(){

    const now = new Date();

    let years = now.getFullYear() - weddingDate.getFullYear();

    let months = now.getMonth() - weddingDate.getMonth();

    let days = now.getDate() - weddingDate.getDate();

    if(days < 0){

        months--;

        const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        );

        days += lastMonth.getDate();

    }

    if(months < 0){

        years--;

        months += 12;

    }

    const diff = now - weddingDate;

    const totalSeconds = Math.floor(diff / 1000);

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    if(yearsElement){

        yearsElement.textContent = years;

    }

    if(monthsElement){

        monthsElement.textContent = months;

    }

    if(daysElement){

        daysElement.textContent = days;

    }

    if(hoursElement){

        hoursElement.textContent =
            String(hours).padStart(2,"0");

    }

    if(minutesElement){

        minutesElement.textContent =
            String(minutes).padStart(2,"0");

    }

    if(secondsElement){

        secondsElement.textContent =
            String(seconds).padStart(2,"0");

    }

}

updateCounter();

setInterval(updateCounter,1000);

/* ==========================================================
   COUNTER ANIMATION
========================================================== */

const counterCards =
document.querySelectorAll(".counter-card");

const counterObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.animate([

                {

                    opacity:0,

                    transform:"translateY(60px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],{

                duration:900,

                easing:"ease-out",

                fill:"forwards"

            });

        }

    });

},{
    threshold:0.2
});

counterCards.forEach(card=>{

    counterObserver.observe(card);

});

/* ==========================================================
   NUMBER GLOW
========================================================== */

setInterval(()=>{

    counterCards.forEach(card=>{

        card.classList.add("glow");

        setTimeout(()=>{

            card.classList.remove("glow");

        },900);

    });

},5000);

/* ==========================================================
   REVEAL SECTION
========================================================== */

const revealSections =
document.querySelectorAll("section");

const revealObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

revealSections.forEach(section=>{

    revealObserver.observe(section);

});
/* ==========================================================
   PREMIUM NIGHT SKY
========================================================== */

const canvas = document.getElementById("nightCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

let stars = [];
let shootingStars = [];

/* ==========================================================
   RESIZE
========================================================== */

function resizeCanvas(){

    if(!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",()=>{

    resizeCanvas();

    createStars();

});

/* ==========================================================
   CREATE STARS
========================================================== */

function createStars(){

    if(!canvas) return;

    stars=[];

    for(let i=0;i<250;i++){

        stars.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height,

            radius:Math.random()*2+0.5,

            alpha:Math.random(),

            speed:(Math.random()*0.02)+0.004

        });

    }

}

createStars();

/* ==========================================================
   SHOOTING STAR
========================================================== */

function spawnShootingStar(){

    if(!canvas) return;

    shootingStars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height*0.35,

        length:80+Math.random()*120,

        speed:10+Math.random()*8,

        alpha:1

    });

}

setInterval(spawnShootingStar,4500);

/* ==========================================================
   DRAW
========================================================== */

function animateSky(){

    if(!ctx) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.alpha+=star.speed;

        if(star.alpha>=1 || star.alpha<=0){

            star.speed*=-1;

        }

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.radius,0,Math.PI*2);

        ctx.fillStyle=`rgba(255,255,255,${star.alpha})`;

        ctx.fill();

    });

    shootingStars.forEach((star,index)=>{

        ctx.beginPath();

        ctx.moveTo(star.x,star.y);

        ctx.lineTo(

            star.x-star.length,

            star.y+star.length*0.5

        );

        ctx.strokeStyle=`rgba(255,255,255,${star.alpha})`;

        ctx.lineWidth=2;

        ctx.stroke();

        star.x+=star.speed;

        star.y+=star.speed*0.35;

        star.alpha-=0.01;

        if(star.alpha<=0){

            shootingStars.splice(index,1);

        }

    });

    requestAnimationFrame(animateSky);

}

animateSky();

/* ==========================================================
   FLOATING HEART
========================================================== */

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤";

    heart.className="floating-heart";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(16+Math.random()*18)+"px";

    heart.style.animationDuration=(5+Math.random()*4)+"s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },9000);

}

setInterval(createHeart,1400);

/* ==========================================================
   PETALS
========================================================== */

function createPetal(){

    const petal=document.createElement("div");

    petal.className="petal";

    petal.style.left=Math.random()*100+"vw";

    petal.style.animationDuration=(7+Math.random()*5)+"s";

    petal.style.opacity=(0.4+Math.random()*0.5);

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },12000);

}

setInterval(createPetal,900);

/* ==========================================================
   PARALLAX HERO
========================================================== */

const hero=document.getElementById("hero");

window.addEventListener("scroll",()=>{

    if(!hero) return;

    const y=window.scrollY;

    hero.style.backgroundPosition=`center ${y*0.35}px`;

});
/* ==========================================================
   BUTTON RIPPLE
========================================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";

        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },700);

    });

});

/* ==========================================================
   CONFETTI
========================================================== */

function createConfetti(){

    const colors=[
        "#FFD700",
        "#FFFFFF",
        "#FFB6C1",
        "#FF7EB3",
        "#87CEFA"
    ];

    for(let i=0;i<180;i++){

        const confetti=document.createElement("div");

        confetti.className="confetti";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.background=
            colors[Math.floor(Math.random()*colors.length)];

        confetti.style.animationDuration=
            (3+Math.random()*3)+"s";

        confetti.style.transform=
            `rotate(${Math.random()*360}deg)`;

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.remove();

        },7000);

    }

}

/* ==========================================================
   OPEN GIFT CONFETTI
========================================================== */

if(openGift){

    openGift.addEventListener("click",()=>{

        createConfetti();

    });

}

/* ==========================================================
   IMAGE DRAG OFF
========================================================== */

document.querySelectorAll("img").forEach(img=>{

    img.draggable=false;

});

/* ==========================================================
   RIGHT CLICK OFF
========================================================== */

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});

/* ==========================================================
   SMOOTH ANCHOR
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(

            this.getAttribute("href")

        );

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================================
   PERFORMANCE
========================================================== */

window.addEventListener("blur",()=>{

    if(bgMusic){

        bgMusic.pause();

    }

});

window.addEventListener("focus",()=>{

    if(bgMusic && musicStarted){

        bgMusic.play().catch(()=>{});

    }

});

/* ==========================================================
   FINAL MESSAGE
========================================================== */

console.clear();

console.log(

"%c❤️ Happy 2nd Wedding Anniversary ❤️",

"font-size:22px;color:#FFD700;font-weight:bold;"

);

console.log(

"%cMade With Love For Sonia",

"font-size:16px;color:#FFFFFF;"

);

/* ==========================================================
   END
========================================================== */
