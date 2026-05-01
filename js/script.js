feather.replace();

const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

if (hamburger && navbarNav) {
  hamburger.onclick = (e) => {
    e.preventDefault();
    navbarNav.classList.toggle("active");
  };

  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove("active");
    }
  });
}

const filterBtns = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");

    btn.classList.add("active");

    const filter = btn.dataset.filter;

    menuCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

const registerRight = document.querySelector(".register-right");
const loginPanel = document.getElementById("loginPanel");
const leftRegister = document.querySelector(".left-register-content");
const leftLogin = document.querySelector(".left-login-content");

function showLogin(e) {
  e?.preventDefault();

  if (!registerRight || !loginPanel) return;

  registerRight.style.display = "none";
  loginPanel.classList.add("active");
  leftRegister?.classList.remove("active");
  leftLogin?.classList.add("active");

  feather.replace();
}

function showRegister(e) {
  e?.preventDefault();

  if (!registerRight || !loginPanel) return;

  registerRight.style.display = "";
  loginPanel.classList.remove("active");
  leftRegister?.classList.add("active");
  leftLogin?.classList.remove("active");

  feather.replace();
}

document.getElementById("goToLogin")?.addEventListener("click", showLogin);
document
  .getElementById("goToRegister")
  ?.addEventListener("click", showRegister);
document
  .getElementById("goToRegister2")
  ?.addEventListener("click", showRegister);

const togglePass = document.getElementById("togglePass");

if (togglePass) {
  togglePass.addEventListener("click", function () {
    const input = document.getElementById("loginPassword");
    const icon = document.getElementById("eyeIcon");

    if (!input || !icon) return;

    if (input.type === "password") {
      input.type = "text";
      icon.setAttribute("data-feather", "eye-off");
    } else {
      input.type = "password";
      icon.setAttribute("data-feather", "eye");
    }

    feather.replace();
  });
}

function msg(id, text = "") {
  const el = document.getElementById(id + "-msg");
  if (el) el.textContent = text;
}

function successToast(text) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerHTML = `<i data-feather="check-circle"></i> ${text}`;
  toast.classList.add("show");

  feather.replace();

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document
  .getElementById("registerForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    if (!name || !phone || !email) return;

    let valid = true;

    msg("fullName");
    msg("phone");
    msg("email");

    if (name.value.trim().length < 3) {
      msg("fullName", "Name min 3 characters");
      valid = false;
    }

    if (phone.value.trim().length < 10) {
      msg("phone", "Invalid phone");
      valid = false;
    }

    if (!email.value.includes("@")) {
      msg("email", "Invalid email");
      valid = false;
    }

    if (valid) {
      successToast("Account created successfully 🎉");
      this.reset();
    }
  });

document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  successToast("Signed in successfully 👋");
  this.reset();
});

const productData = {
  sandwiches: [
    "Smoky Beef Artisan",
    "Tuna Mayo Delight",
    "Ultimate Cheese Beef",
    "Chicken Teriyaki",
    "Egg Mayo",
  ],
  salads: [
    "Roasted Chicken Salad",
    "Classic Caesar Salad",
    "Tuna Garden Salad",
  ],
  sides: [
    "Golden Hashbrown",
    "French Fries",
    "Onion Rings",
    "Chicken Nuggets",
    "Cheese Bites",
  ],
  sauces: [
    "Honey Mustard",
    "Spicy Chili Sauce",
    "Smoky BBQ Sauce",
    "Garlic Aioli",
    "Truffle Mayo",
  ],
  drinks: [
    "Iced Artisan Latte",
    "Iced Americano",
    "Matcha Latte",
    "Fresh Lemon Tea",
  ],
};

const category = document.getElementById("category");
const product = document.getElementById("product");

if (category && product) {
  category.addEventListener("change", function () {
    const selected = this.value;

    product.innerHTML = `<option value="">-- Select Product --</option>`;

    if (selected && productData[selected]) {
      productData[selected].forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        product.appendChild(option);
      });
    }
  });
}

/* Event */
const sideItems = document.querySelectorAll(".event-side-item");

const heroBanner = document.getElementById("heroBanner");
const heroBadge = document.getElementById("heroBadge");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const heroDate = document.getElementById("heroDate");

const bannerClass = {
  ongoing: "",
  upcoming: "banner--green",
};

const iconClass = {
  "🏆": "side-icon--orange",
  "🎉": "side-icon--orange",
  "💳": "side-icon--orange",
  "🥗": "side-icon--green",
  "🍔": "side-icon--brown",
};

sideItems.forEach((item) => {
  item.addEventListener("click", () => {
    sideItems.forEach((el) => el.classList.remove("active"));
    item.classList.add("active");

    const icon = item.dataset.icon;
    const status = item.dataset.status;
    const title = item.dataset.title;
    const desc = item.dataset.desc;
    const date = item.dataset.date;

    heroBanner.textContent = icon;
    heroBanner.className = "event-hero-banner " + (bannerClass[status] || "");

    heroBadge.textContent = status === "ongoing" ? "Ongoing" : "Upcoming";
    heroBadge.className = "badge " + status;

    heroTitle.textContent = title;
    heroDesc.textContent = desc;
    heroDate.querySelector("span").textContent = date;

    feather.replace();
  });
});
