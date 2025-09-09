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

   let cart = 
   JSON.parse(localStorage.getItem("cart") || "[]");

function renderCart() {
  let cartList = document.getElementById("cart-items");
  let total = 0;
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    let newItem = document.createElement("li");
    newItem.textContent = `${item.product} - Rs.${item.price.toFixed(2)}`;
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(index);
    newItem.appendChild(removeButton);
    cartList.appendChild(newItem);
    total += item.price;
  });
  document.getElementById("cart-total").textContent = `Total: Rs.${total.toFixed(2)}`;
}
function addToCart(product, price) {
  if (product && price) {
    cart.push({ product, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  } else {
    console.error("Invalid product or price");
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

   const cartBtn = document.getElementById("cart-btn");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");

    cartBtn.addEventListener("click", () => {
      cartOverlay.style.display = "flex"; // show popup
    });

    closeCart.addEventListener("click", () => {
      cartOverlay.style.display = "none"; // close popup
    });

    renderCart();

    document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
    console.log("Button clicked:", button.getAttribute("data-product"));
    const product = button.getAttribute("data-product");
    const price = Number(button.getAttribute("data-price"));
    addToCart(product, price);

    // Change button text for feedback
    const oldText = button.textContent;
    button.textContent = "✅ Added!";
    button.disabled = true; // optional (prevents double-click)

    // Reset back after 1.5s
    setTimeout(() => {
      button.textContent = oldText;
      button.disabled = false;
    }, 600);
   });
   });


const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  document.querySelectorAll(".product").forEach(p => {
    const text = p.textContent.toLowerCase();
    p.style.display = text.includes(value) ? "block" : "none";
  });
});