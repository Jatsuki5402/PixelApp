// Sticky Navigation Menu
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
let logo = document.getElementById("logo"); // 👈 asegúrate que el <img> tenga id="logo"

// Show/hide sticky navigation, scroll button y CAMBIO DE LOGO
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
    logo.src = "img/logo-trans.png"; // 👈 logo con fondo transparente o para navbar azul
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
    logo.src = "img/logo-claro.png"; // 👈 logo para navbar blanca
  }
};

// Side Navigation Menu
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");

// Open side navigation
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};

const hideNavMenu = () => {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Close side navigation
cancelBtn.onclick = hideNavMenu;

// Close side navigation when a menu link is clicked
let navLinks = document.querySelectorAll(".menu li a");
navLinks.forEach((link) => {
  link.addEventListener("click", hideNavMenu);
});

const swiper = new Swiper(".wrapper", {
  loop: true,
  spaceBetween: 30,

  // Autoplay
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


// JAVASCRIPT FINAL DEL PORTAFOLIO - ARCHIVO SEPARADO

// JAVASCRIPT ÚNICO PARA EVITAR CONFLICTOS

// Variables globales con nombres únicos
let miImagenActual =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2020.28.19_dc23ba91.jpg-ZrW9UMPnwvZ1qMz2sAluzfEJduZff.jpeg"
let miDescripcionActual = "Dashboard Principal"
let miPantallaActual = 0

const miPantallas = ["dashboard", "inventario", "ventas", "agregar", "editar", "reportes"]

// Función para cambiar imagen principal
function cambiarMiImagen(nuevaImagen, descripcion) {
  const imagenPrincipal = document.getElementById("miImagenPrincipal")
  const miniaturas = document.querySelectorAll(".mi-foto-mini")

  imagenPrincipal.style.opacity = "0.5"

  setTimeout(() => {
    imagenPrincipal.src = nuevaImagen
    imagenPrincipal.alt = descripcion
    imagenPrincipal.style.opacity = "1"

    miniaturas.forEach((mini) => mini.classList.remove("active"))
    event.currentTarget.classList.add("active")

    miImagenActual = nuevaImagen
    miDescripcionActual = descripcion
  }, 200)
}

// Función para abrir showcase interactivo
function abrirMiShowcase() {
  const showcase = document.getElementById("miShowcaseInteractivo")
  showcase.style.display = "block"
  document.body.style.overflow = "hidden"

  // Resetear a la primera pantalla
  miPantallaActual = 0
  mostrarMiPantalla(0)
}

// Función para cerrar showcase
function cerrarMiShowcase() {
  const showcase = document.getElementById("miShowcaseInteractivo")
  showcase.style.display = "none"
  document.body.style.overflow = "auto"
}

// Función para mostrar pantalla específica
function mostrarMiPantalla(index) {
  // Ocultar todas las pantallas
  document.querySelectorAll(".mi-pantalla-info").forEach((pantalla) => {
    pantalla.classList.remove("active")
  })

  // Mostrar pantalla seleccionada
  document.getElementById(miPantallas[index]).classList.add("active")

  // Actualizar navegación
  document.querySelectorAll(".mi-nav-item").forEach((item, i) => {
    item.classList.toggle("active", i === index)
  })

  // Actualizar indicadores
  document.querySelectorAll(".mi-indicador").forEach((indicador, i) => {
    indicador.classList.toggle("active", i === index)
  })

  miPantallaActual = index
}

// Función para pantalla anterior
function anteriorMiPantalla() {
  if (miPantallaActual > 0) {
    mostrarMiPantalla(miPantallaActual - 1)
  }
}

// Función para siguiente pantalla
function siguienteMiPantalla() {
  if (miPantallaActual < miPantallas.length - 1) {
    mostrarMiPantalla(miPantallaActual + 1)
  }
}

// Event Listeners cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Cerrar showcase al hacer clic fuera de él
  window.onclick = (event) => {
    const showcase = document.getElementById("miShowcaseInteractivo")
    if (event.target === showcase) {
      cerrarMiShowcase()
    }
  }

  // Cerrar showcase con tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cerrarMiShowcase()
    }

    // Navegación con flechas
    if (document.getElementById("miShowcaseInteractivo").style.display === "block") {
      if (event.key === "ArrowLeft") {
        anteriorMiPantalla()
      } else if (event.key === "ArrowRight") {
        siguienteMiPantalla()
      }
    }
  })

  // Event listeners para navegación del showcase
  document.querySelectorAll(".mi-nav-item").forEach((item, index) => {
    item.addEventListener("click", () => {
      mostrarMiPantalla(index)
    })
  })

  // Event listeners para indicadores
  document.querySelectorAll(".mi-indicador").forEach((indicador, index) => {
    indicador.addEventListener("click", () => {
      mostrarMiPantalla(index)
    })
  })

  // Animación de entrada para elementos del portafolio
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos para animación
  const elementosAnimados = document.querySelectorAll(
    ".mi-proyecto-card, .mi-timeline-item, .mi-feature-item, .mi-seccion-info",
  )

  elementosAnimados.forEach((elemento) => {
    elemento.style.opacity = "0"
    elemento.style.transform = "translateY(30px)"
    elemento.style.transition = "all 0.6s ease"
    observer.observe(elemento)
  })

  // Contador animado para estadísticas
  const contadores = document.querySelectorAll(".mi-stat-number")

  function animarMiContador(elemento) {
    const valorFinal = elemento.textContent
    const numero = Number.parseInt(valorFinal.replace(/\D/g, ""))
    const incremento = numero / 60
    let valorActual = 0

    const timer = setInterval(() => {
      valorActual += incremento
      if (valorActual >= numero) {
        elemento.textContent = valorFinal
        clearInterval(timer)
      } else {
        elemento.textContent = Math.floor(valorActual) + (valorFinal.includes("%") ? "%" : "")
      }
    }, 25)
  }

  // Observar contadores
  const contadorObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animarMiContador(entry.target)
          contadorObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  contadores.forEach((contador) => {
    contadorObserver.observe(contador)
  })

  // Efecto parallax suave para el hero
  let ticking = false

  function updateMiParallax() {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".mi-portafolio-hero")

    if (hero) {
      const rate = scrolled * -0.3
      hero.style.transform = `translateY(${rate}px)`
    }

    ticking = false
  }

  function requestMiTick() {
    if (!ticking) {
      requestAnimationFrame(updateMiParallax)
      ticking = true
    }
  }

  window.addEventListener("scroll", requestMiTick)

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Precargar imágenes para transiciones más suaves
  const imagenes = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2020.28.19_dc23ba91.jpg-ZrW9UMPnwvZl1qMz2sAluzfEJduZff.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2020.28.19_31ca9541.jpg-62BWgIhwVhu5dgdZ5nqSBHsbBJiYuZ.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2020.28.19_e78a6057.jpg-H8Smff0B2wfdoEs3709ufIuWK7wnsH.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2020.28.19_0292eebf.jpg-GZPanHc3Ih2crAyPNoAcE4aEpJfRXr.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-07-09%20a%20las%2020.28.19_53dd2d83.jpg-Bajfldum2PwKN0m9GTkNp7ztuFEB8N.jpeg",
    "/images/captura-reportes.png",
  ]

  imagenes.forEach((src) => {
    const img = new Image()
    img.src = src
  })
})

// Función para manejar el redimensionamiento de ventana
window.addEventListener("resize", () => {
  // Ajustar showcase en dispositivos móviles
  const showcase = document.getElementById("miShowcaseInteractivo")
  if (showcase && showcase.style.display === "block") {
    const showcaseContent = showcase.querySelector(".mi-modal-contenido")
    if (window.innerWidth <= 768) {
      showcaseContent.style.margin = "5% auto"
      showcaseContent.style.width = "98%"
    } else {
      showcaseContent.style.margin = "2% auto"
      showcaseContent.style.width = "95%"
    }
  }
})

// LÓGICA DEL MODAL DE CONTACTO Y FORMULARIO

document.addEventListener("DOMContentLoaded", () => {
  const openModalBtn = document.getElementById("openContactModalBtn");
  const contactModal = document.getElementById("contactModal");
  const closeModalBtn = contactModal.querySelector(".modal-close-btn");
  const contactForm = document.getElementById("contactForm");
  const formStatusMessage = document.getElementById("formStatusMessage");
  const submitBtn = contactForm.querySelector(".submit-btn");

  // Función para abrir el modal
  function openModal(event) {
    event.preventDefault(); // Evita que el enlace salte a #slider-equipo
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Evita el scroll del fondo
  }

  // Función para cerrar el modal
  function closeModal() {
    contactModal.classList.remove("active");
    document.body.style.overflow = "auto"; // Restaura el scroll del fondo
    // Limpiar mensajes de estado y formulario al cerrar
    formStatusMessage.textContent = "";
    formStatusMessage.classList.remove("success", "error");
    contactForm.reset();
    submitBtn.disabled = false; // Habilitar el botón de nuevo
    submitBtn.textContent = "Enviar Mensaje "; // Restaurar texto del botón
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-paper-plane');
    submitBtn.appendChild(icon);
  }

  // Event listener para abrir el modal
  if (openModalBtn) {
    openModalBtn.addEventListener("click", openModal);
  }

  // Event listener para cerrar el modal con el botón X
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  // Event listener para cerrar el modal al hacer clic fuera del contenido
  if (contactModal) {
    contactModal.addEventListener("click", (event) => {
      if (event.target === contactModal) {
        closeModal();
      }
    });
  }

  // Event listener para cerrar el modal con la tecla ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Manejo del envío del formulario
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Previene el envío tradicional del formulario

      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      formStatusMessage.textContent = ""; // Limpiar mensaje anterior
      formStatusMessage.classList.remove("success", "error");

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Reemplaza 'YOUR_FORMSPREE_ENDPOINT' con tu endpoint real de Formspree
      // Puedes obtenerlo en https://formspree.io/
      // Asegúrate de deshabilitar reCAPTCHA en Formspree si no proporcionas tu propia clave [^1]
      const formspreeEndpoint = "https://formspree.io/f/xldlryjv"; // Ejemplo: https://formspree.io/f/xnqkkrkr

      try {
        const response = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          formStatusMessage.textContent = "¡Gracias! Tu mensaje ha sido enviado con éxito.";
          formStatusMessage.classList.add("success");
          contactForm.reset(); // Limpiar el formulario
          setTimeout(() => {
            closeModal(); // Cerrar el modal después de un breve retraso
          }, 2000);
        } else {
          const errorData = await response.json();
          formStatusMessage.textContent = errorData.error || "Hubo un error al enviar tu mensaje. Inténtalo de nuevo.";
          formStatusMessage.classList.add("error");
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        formStatusMessage.textContent = "Error de red. Por favor, verifica tu conexión e inténtalo de nuevo.";
        formStatusMessage.classList.add("error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar Mensaje ";
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-paper-plane');
        submitBtn.appendChild(icon);
      }
    });
  }
});