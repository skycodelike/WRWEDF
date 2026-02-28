/* =========================
   Component Loader
========================= */

function loadComponent(id, path) {
    fetch(path)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

function initComponents() {
    const isSubPage = window.location.pathname.includes("/pages/");

    if (isSubPage) {
        loadComponent("header", "../../components/header.html");
        loadComponent("footer", "../../components/footer.html");
    } else {
        loadComponent("header", "components/header.html");
        loadComponent("footer", "components/footer.html");
    }
}

/* =========================
   Copy Code Function
========================= */

async function copyCode(button) {
    const code = button.parentElement.nextElementSibling.innerText;

    try {
        await navigator.clipboard.writeText(code);

        const originalText = button.textContent;
        button.textContent = "Copied ✓";
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);

    } catch (err) {
        console.error("Copy failed:", err);
    }
}

/* =========================
   Carousel
========================= */

function initCarousel() {

    const track = document.getElementById("HCJSS01-code-demo-track");
    const leftBtn = document.querySelector(".HCJSS01-code-demo-left");
    const rightBtn = document.querySelector(".HCJSS01-code-demo-right");
    const viewport = document.getElementById("HCJSS01-code-demo-viewport");

    if (!track || !viewport) return;

    let gap = 30;
    let isMoving = false;
    let autoScroll;

    function getCardWidth() {
        return track.children[0].offsetWidth + gap;
    }

    function moveRight() {
        if (isMoving) return;
        isMoving = true;

        const cardWidth = getCardWidth();
        track.style.transform = `translateX(-${cardWidth}px)`;

        setTimeout(() => {
            track.appendChild(track.firstElementChild);
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            track.offsetHeight;
            track.style.transition = "transform 0.6s cubic-bezier(.77,0,.18,1)";
            isMoving = false;
        }, 600);
    }

    function moveLeft() {
        if (isMoving) return;
        isMoving = true;

        const cardWidth = getCardWidth();

        track.insertBefore(track.lastElementChild, track.firstElementChild);
        track.style.transition = "none";
        track.style.transform = `translateX(-${cardWidth}px)`;
        track.offsetHeight;

        track.style.transition = "transform 0.6s cubic-bezier(.77,0,.18,1)";
        track.style.transform = "translateX(0)";

        setTimeout(() => isMoving = false, 600);
    }

    function startAuto() {
        autoScroll = setInterval(moveRight, 5000);
    }

    function stopAuto() {
        clearInterval(autoScroll);
    }

    rightBtn?.addEventListener("click", moveRight);
    leftBtn?.addEventListener("click", moveLeft);

    viewport.addEventListener("mouseenter", stopAuto);
    viewport.addEventListener("mouseleave", startAuto);

    startAuto();
}

/* =========================
   Header Hide On Scroll
========================= */

function initHeaderScroll() {
    const header = document.querySelector("#header");
    const footer = document.querySelector("#footer");

    window.addEventListener("scroll", () => {
        if (!footer || !header) return;

        const footerTop = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        header.classList.toggle(
            "hide-header",
            footerTop <= windowHeight
        );
    });
}

/* =========================
   Init
========================= */

document.addEventListener("DOMContentLoaded", () => {
    initComponents();
    initCarousel();
    initHeaderScroll();
});
//about
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active"); 
        }
    });
},{
    threshold: 0.2
});

reveals.forEach(reveal=>{
    observer.observe(reveal);
});