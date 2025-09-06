const slides = 
document.querySelector(".slides");
const slidesCount = 
document.querySelectorAll(".slides img").length;
let index = 0;

function updateSlides() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

document.querySelector(".next").addEventListener("click", () => {
  index = (index + 1) % slidesCount; // move right
  updateSlides();
});

document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + slidesCount) % slidesCount; // move left
  updateSlides();
});

const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const links = document.querySelectorAll(".lightbox-link");

  let currentIndex = 0;

  // Open lightbox
  links.forEach((link, index) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      currentIndex = index;
      showImage();
      lightbox.style.display = "flex";
    });
  });
  // Show image based on index
  function showImage() {
    lightboxImg.src = links[currentIndex].href;
  }

  // Close
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Prev
  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + links.length) % links.length;
    showImage();
  });

  // Next
  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % links.length;
    showImage();
  });
// Close on clicking outside image
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", e => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowLeft") prevBtn.click();
      if (e.key === "ArrowRight") nextBtn.click();
      if (e.key === "Escape") lightbox.style.display = "none";
    }
  });