import ProductCard from "./ProductCard.js";
import TrendingCard from "./TrendingCard.js";

const navBar = document.querySelector(".header"),
  navBtn = document.querySelector(".header__btn"),
  sections = document.querySelectorAll("section[id]"),
  newContent = document.querySelector(".new__products"),
  shopContent = document.querySelector(".shop__products"),
  trendingContent = document.querySelector(".trending__products"),
  shopCategories = document.querySelectorAll(".shop__category"),
  circleBtn = document.querySelector(".go-down-btn"),
  scrollUpBtn = document.querySelector(".scroll-up");

const API_URL = "../webproject/assets/apis/products.json";

// Initialize cart count
let cartCount = 0;

// Initialize Scroll Reveal
const sr = ScrollReveal({
  origin: "top",
  distance: "100px",
  duration: 2000,
  delay: 300,
});

/* ============== Header ============== */

navBtn.addEventListener("click", () =>
  document.body.classList.toggle("menu-toggled")
);

function changeHeaderBg() {
  const scrollY = window.scrollY;
  if (scrollY > 100) {
    navBar.style.backgroundColor = "var(--white-100-opcty-212)";
  } else {
    navBar.style.backgroundColor = "transparent";
  }
}

/* ============== Home Section ============== */

/* Swiper JS */

const homeSwiper = new Swiper(".home__content", {
  loop: true,
  effect: "fade",
  speed: 2000,
  allowTouchMove: false,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
});

homeSwiper.on("slideChange", () => {
  const activeSlide = homeSwiper.slides[homeSwiper.activeIndex];
  activeSlide.classList.add("reveal");
});

homeSwiper.on("slideChangeTransitionEnd", () => {
  const prevSlide = homeSwiper.slides[homeSwiper.previousIndex];
  prevSlide.classList.remove("reveal");
});

/* Circle Btn */

let circleText = circleBtn.querySelector(".circle-text");
circleText.innerHTML = circleText.textContent
  .split("")
  .map(
    (char, index) =>
      `<span style="transform: rotate(${index * 28.3}deg)">${char}</span>`
  )
  .join("");

/* ============== New Section ============== */

async function renderNewProducts() {
  const respone = await fetch(API_URL);
  const data = await respone.json();
  data.map((product) => {
    if (product.isNew) {
      newContent.innerHTML += ProductCard(product);
    }
  });
  const productCards = newContent.querySelectorAll(".product-card");
  productCards.forEach((product) => {
    product.classList.add("new__product");
    const image = product.querySelector("img");
    product.addEventListener("mouseover", () => {
      if (product.dataset.image2 != "undefined") {
        image.src = product.dataset.image2;
      }
    });
    product.addEventListener("mouseleave", () => {
      image.src = product.dataset.image1;
    });
  });
  /* Swiper JS */
  const newSwiper = new Swiper(".new__content", {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  /* ScrollReveal JS */
  // sr.reveal(newContent);
}

/* ============== Shop Section ============== */

async function renderShopProducts() {
  const respone = await fetch(API_URL);
  const data = await respone.json();
  data.map((product) => {
    shopContent.innerHTML += ProductCard(product);
  });
  const productCards = shopContent.querySelectorAll(".product-card");
  productCards.forEach((product) => {
    product.classList.add("shop__product");
    const image = product.querySelector("img");
    product.addEventListener("mouseover", () => {
      if (product.dataset.image2 != "undefined") {
        image.src = product.dataset.image2;
      }
    });
    product.addEventListener("mouseleave", () => {
      image.src = product.dataset.image1;
    });
  });

  /* ScrollReveal JS */
  // sr.reveal(".shop__product", { interval: 100 });
}

/* Shop categories */
shopCategories.forEach((category) => {
  category.addEventListener("click", () => {
    shopCategories.forEach((category) => category.classList.remove("selected"));
    category.classList.add("selected");
    let categoryType = category.dataset.category;
    const shopProducts = document.querySelectorAll(".shop__product");
    shopProducts.forEach((product) => {
      product.classList.add("hide");
      if (product.dataset.category === categoryType || categoryType === "all") {
        product.classList.remove("hide");
      }
    });
  });
});

/* ============== Trending Section ============== */

async function renderTrendingProducts() {
  const respone = await fetch(API_URL);
  const data = await respone.json();
  data.map((product) => {
    if (product.isTrending) {
      trendingContent.innerHTML += TrendingCard(product);
    }
  });
  /* Swiper JS */
  const trendingSectionSwiper = new Swiper(".trending__content", {
    loop: true,
    effect: "fade",
    speed: 600,
    allowTouchMove: false,
    autoplay: {
      delay: 6000,
    },
  });
  /* ScrollReveal JS */
  // sr.reveal(trendingContent);
}

/* ============== Brands Section ============== */

/* ScrollReveal JS */
// sr.reveal(".brands__logo", { interval: 100 });

/* ============== Footer ============== */

/* ScrollReveal JS */
// sr.reveal(".footer__col", { interval: 100 });

/* ============== Active Scroll ============== */

function activeScroll() {
  const scrollY = window.scrollY;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 16,
      sectionHeight = section.offsetHeight,
      link = document.querySelector(`.header__link a[href='#${section.id}'`);
    if (scrollY >= sectionTop && scrollY <= sectionHeight + sectionTop) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ============== Scroll Up ============== */

function showScrollUpBtn() {
  if (window.scrollY > 300) {
    scrollUpBtn.classList.add("show");
  } else {
    scrollUpBtn.classList.remove("show");
  }
}

scrollUpBtn.addEventListener("click", () =>
  window.scrollTo({ behavior: "smooth", top: 0, left: 0 })
);

/* ============== Modal Functionality ============== */

// Function to handle clicks on "Explore More" buttons
function handleExploreMoreClick(event) {
  if (event.target.classList.contains("explore-more")) {
    event.preventDefault(); // Prevent default link behavior

    const productId = event.target.dataset.productId;

    // Fetch the product details from products.json
    fetch(API_URL)
      .then((response) => response.json())
      .then((products) => {
        const product = products.find((p) => p.id == productId);

        if (product) {
          // Populate the modal with product details
          const modalBody = document.querySelector("#productModal .modal-body");
          modalBody.innerHTML = `
              <img src="${product.image}" alt="${product.title}">
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <p class="price">$${product.price}</p>
              <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button> 
            `;

          // Show the modal
          const modal = document.getElementById("productModal");
          modal.style.display = "block";
        } else {
          console.error("Product not found!");
        }
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }
}
// Function to handle clicks on "Add to Cart" buttons within the modal
function handleAddToCartClick(event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = event.target.dataset.productId;

    // Check if the user is logged in
    checkIfUserIsLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        // Make an AJAX request to add_to_cart.php
        fetch("add_to_cart.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `product_id=${productId}`,
        })
          .then((response) => response.text())
          .then((message) => {
            console.log(message);
            cartCount++;
            updateCartCountDisplay();
          })
          .catch((error) => console.error("Error adding to cart:", error));
      } else {
        showAuthModal(); // Or display a message
      }
    });
  }
}

// Function to update the cart count display in the header
function updateCartCountDisplay() {
  const cartCountSpan = document.getElementById("cart-count");
  cartCountSpan.textContent = cartCount;
}

// Function to show the login/signup modal
function showAuthModal() {
  const authModal = document.getElementById("authModal");
  authModal.style.display = "block";
}

// Event listener for the account button
const accountBtn = document.getElementById("accountBtn");
accountBtn.addEventListener("click", (event) => {
  event.preventDefault();
  showAuthModal();
});

// Event listener for the modal's close button
const closeAuthModalBtn = document.getElementById("closeAuthModal");
closeAuthModalBtn.addEventListener("click", () => {
  const authModal = document.getElementById("authModal");
  authModal.style.display = "none";
});

// Function to toggle between login and signup forms
function toggleAuthForm() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const toggleBtn = document.getElementById("toggleAuthForm");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    toggleBtn.textContent = "Don't have an account? Sign Up";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    toggleBtn.textContent = "Already have an account? Log In";
  }
}

// Event listener for toggling the auth form
const toggleAuthFormBtn = document.getElementById("toggleAuthForm");
toggleAuthFormBtn.addEventListener("click", toggleAuthForm);

/* ============== Call functions ============== */

window.addEventListener("scroll", () => {
  activeScroll();
  changeHeaderBg();
  showScrollUpBtn();
});

// Function to check login status and update the account button
function checkLoginStatus() {
  fetch("check_login.php")
    .then((response) => response.json())
    .then((data) => {
      const accountBtn = document.getElementById("accountBtn");
      if (data.isLoggedIn) {
        // User is logged in
        accountBtn.innerHTML = `
          <span>${data.username}</span> 
          <a href="#" id="logoutBtn">(Logout)</a> 
        `;
        // Add event listener for logout
        document
          .getElementById("logoutBtn")
          .addEventListener("click", (event) => {
            event.preventDefault();
            handleLogout();
          });
      } else {
        // User is not logged in
        accountBtn.innerHTML = '<a href="#" id="accountBtn">Account</a>';
        accountBtn.addEventListener("click", (event) => {
          event.preventDefault();
          showAuthModal();
        });
      }
    })
    .catch((error) => console.error("Error checking login status:", error));
}
function checkIfUserIsLoggedIn() {
  // Use your existing check_login.php to check for a session variable
  return fetch("check_login.php")
    .then((response) => response.json())
    .then((data) => {
      return data.isLoggedIn; // This will be true or false based on the server response
    })
    .catch((error) => {
      console.error("Error checking session:", error);
      return false; // Return false in case of an error
    });
}

window.addEventListener("load", () => {
  activeScroll();
  renderNewProducts();
  renderShopProducts();
  renderTrendingProducts();
  document.querySelector(".home__slide").classList.add("reveal");

  // Event delegation for "Explore More" buttons
  newContent.addEventListener("click", handleExploreMoreClick);
  shopContent.addEventListener("click", handleExploreMoreClick);
  trendingContent.addEventListener("click", handleExploreMoreClick);

  // Event listener for the modal's close button
  const closeModalBtn = document.getElementById("closeModal");
  closeModalBtn.addEventListener("click", () => {
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
  });

  // Event delegation for "Add to Cart" buttons within the modal
  const modalContent = document.querySelector(".modal-content");
  modalContent.addEventListener("click", handleAddToCartClick);

  // Check if the user is logged in and update the account button
  checkLoginStatus();
});
