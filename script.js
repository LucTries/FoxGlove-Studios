document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     TEAM BIOS TOGGLE
  ========================= */
  document.querySelectorAll(".toggle-btn").forEach(button => {
    button.addEventListener("click", function(){
      const bio = this.previousElementSibling;

      bio.classList.toggle("open");

      this.textContent = bio.classList.contains("open")
        ? "Show less"
        : "Show more";
    });
  });


  /* =========================
     EVENTS SLIDER
  ========================= */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");

  let currentSlide = 0;

  function showSlide(index){
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  if (rightArrow && leftArrow) {
    rightArrow.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    leftArrow.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }


  /* =========================
     PROJECT VIDEO SWITCHER
  ========================= */
  const cards = document.querySelectorAll(".video-card");
  const mainVideo = document.getElementById("main-video");
  const title = document.getElementById("video-title");
  const desc = document.getElementById("video-desc");

  cards.forEach(card => {
    card.addEventListener("click", function(e) {
      e.preventDefault();

      cards.forEach(c => c.classList.remove("active"));
      this.classList.add("active");

      mainVideo.src = this.dataset.video;
      title.textContent = this.dataset.title;
      desc.innerText = this.dataset.desc;
    });
  });


  /* =========================
     BACKGROUND FADE SYSTEM
  ========================= */
  const bg1 = document.getElementById("bg1");
  const bg2 = document.getElementById("bg2");
  const sections = document.querySelectorAll("section");

  let currentBgLayer = 1;
  let activeBg = "";

  function switchBackground(newBg) {
    if (!newBg || newBg === activeBg) return;

    if (currentBgLayer === 1) {
      bg2.style.backgroundImage = `url(${newBg})`;
      bg2.classList.add("active");
      bg1.classList.remove("active");
      currentBgLayer = 2;
    } else {
      bg1.style.backgroundImage = `url(${newBg})`;
      bg1.classList.add("active");
      bg2.classList.remove("active");
      currentBgLayer = 1;
    }

    activeBg = newBg;
  }

  function handleScroll() {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        const bg = section.getAttribute("data-bg");
        switchBackground(bg);
      }
    });
  }

  window.addEventListener("scroll", handleScroll);

  // Run once on load
  handleScroll();

});