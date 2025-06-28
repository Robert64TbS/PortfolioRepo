'use strict';

// funcion de alternar clase
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// funcionalidad del botón de la barra lateral
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// testimonios variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector("[data-modal-time]");
const modalImgWrapper = document.querySelector(".modal-img-wrapper");

// Testimonios
document.querySelectorAll("[data-testimonials-item]").forEach(item => {
  item.addEventListener("click", function () {
    modalImgWrapper.style.display = "";
    modalTime.style.display = "";
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.textContent = this.querySelector("[data-testimonials-title]").textContent;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    modalTime.textContent = this.querySelector("[data-testimonials-time]")?.textContent || "";
    modalContainer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Proyectos
document.querySelectorAll(".project-item").forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    modalImgWrapper.style.display = "none";
    modalTime.style.display = "none";
    modalTitle.textContent = item.getAttribute("data-project-title") || item.querySelector(".project-title").textContent;
    modalText.innerHTML = `<p>${item.getAttribute("data-project-desc") || ""}</p>`;
    modalContainer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// añadir evento de clic al botón de cierre del modal y al overlay
modalCloseBtn.addEventListener("click", function () {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});
overlay.addEventListener("click", function () {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

// variables de selección y filtro
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// añadir evento de clic a todos los elementos de selección
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// funcion filtrar elementos del select
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "todos") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// añadir evento de clic a todos los botones de filtro en pantalla completa
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// variables del formulario de contacto
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// validación del formulario
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// variables de navegación
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// añadir evento de clic a todos los enlaces de navegación
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Cambiar favicon y título al cambiar la visibilidad de la página
const favicon = document.getElementById("favicon");
const originalTitle = document.title;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    favicon.href = "./assets/images/derrame.png";
    document.title = " ¡Tu café se derramó!";
  } else {
    favicon.href = "./assets/images/cafe.png";
    document.title = originalTitle;
  }
});

//Enviar correo electrónico con Formspree

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/xanjlbgl', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert("✅ ¡Gracias por tu mensaje! Te responderé pronto.");
      form.reset();
    } else {
      alert("⚠️ Ocurrió un error al enviar el mensaje. Intenta más tarde.");
    }
  } catch (error) {
    alert("❌ Error de red o de conexión.");
  }
});