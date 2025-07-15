// Variables globales
let currentSection = 0
const sections = document.querySelectorAll(".plan-section")
const navLinks = document.querySelectorAll(".plan-nav-menu a")
const progressFill = document.querySelector(".plan-progress-fill")
const progressText = document.querySelector(".plan-progress-text")
const scrollTopBtn = document.getElementById("scrollTop")

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeExpandButtons()
  initializeScrollEffects()
  initializeProgressBar()
  initializeAnimations()
  initializeMobileMenu()
  animateCounters()
  enhanceAccessibility()
})

// Navegación del sidebar
function initializeNavigation() {
  navLinks.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remover clase active de todos los enlaces
      navLinks.forEach((l) => l.classList.remove("active"))

      // Agregar clase active al enlace clickeado
      this.classList.add("active")

      // Scroll suave a la sección
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Expandir automáticamente la sección
        const content = targetSection.querySelector(".plan-section-content")
        const expandBtn = targetSection.querySelector(".plan-expand-btn")

        if (content && !content.classList.contains("active")) {
          toggleSection(content, expandBtn)
        }
      }

      currentSection = index
      updateProgress()
    })
  })
}

// Botones de expandir/contraer secciones
function initializeExpandButtons() {
  const expandButtons = document.querySelectorAll(".plan-expand-btn")

  expandButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const content = document.getElementById(targetId)

      toggleSection(content, this)
    })
  })
}

// Función para expandir/contraer secciones
function toggleSection(content, button) {
  if (content.classList.contains("active")) {
    content.classList.remove("active")
    button.classList.remove("active")
    content.style.maxHeight = "0"
  } else {
    content.classList.add("active")
    button.classList.add("active")
    content.style.maxHeight = content.scrollHeight + "px"

    // Animar elementos internos
    animateContentElements(content)
  }
}

// Animaciones de elementos de contenido
function animateContentElements(content) {
  const elements = content.querySelectorAll(
    ".plan-info-card, .plan-trend-card, .plan-team-member, .plan-process-step, .plan-risk-item",
  )

  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"

    setTimeout(() => {
      element.style.transition = "all 0.6s ease"
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * 100)
  })
}

// Efectos de scroll
function initializeScrollEffects() {
  window.addEventListener("scroll", () => {
    updateActiveSection()
    toggleScrollTopButton()
    updateProgressOnScroll()
  })
}

// Actualizar sección activa basada en scroll
function updateActiveSection() {
  const scrollPosition = window.scrollY + 150

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Actualizar navegación
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLinks[index]) {
        navLinks[index].classList.add("active")
      }

      currentSection = index
    }
  })
}

// Mostrar/ocultar botón de scroll to top
function toggleScrollTopButton() {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }
}

// Funcionalidad del botón scroll to top
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Barra de progreso
function initializeProgressBar() {
  updateProgress()
}

function updateProgress() {
  const progress = ((currentSection + 1) / sections.length) * 100
  progressFill.style.width = progress + "%"
  progressText.textContent = Math.round(progress) + "% Completado"
}

function updateProgressOnScroll() {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight - windowHeight
  const scrolled = window.scrollY
  const progress = (scrolled / documentHeight) * 100

  // Barra de progreso del sidebar
  progressFill.style.width = Math.min(progress, 100) + "%"
  progressText.textContent = Math.round(Math.min(progress, 100)) + "% Completado"

  // Barra de progreso del nav (agregar estas líneas)
  const navProgressFill = document.querySelector(".plan-nav-progress-fill")
  const navProgressText = document.querySelector(".plan-nav-progress-text")
  if (navProgressFill && navProgressText) {
    navProgressFill.style.width = Math.min(progress, 100) + "%"
    navProgressText.textContent = Math.round(Math.min(progress, 100)) + "% Leído"
  }
}

// Animaciones de entrada
function initializeAnimations() {
  // Intersection Observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Animar elementos hijos con delay
        const children = entry.target.querySelectorAll(
          ".plan-info-card, .plan-trend-card, .plan-team-member, .plan-floating-card",
        )
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = "1"
            child.style.transform = "translateY(0)"
          }, index * 100)
        })
      }
    })
  }, observerOptions)

  // Observar elementos para animación
  const animatedElements = document.querySelectorAll(".plan-section, .plan-hero-content, .plan-hero-visual")
  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.8s ease"
    observer.observe(element)
  })
}

// Menú móvil (para futuras mejoras)
function initializeMobileMenu() {
  // Detectar si es dispositivo móvil
  const isMobile = window.innerWidth <= 1024

  if (isMobile) {
    // Crear botón de menú móvil si no existe
    createMobileMenuButton()
  }

  // Escuchar cambios de tamaño de ventana
  window.addEventListener("resize", () => {
    const isNowMobile = window.innerWidth <= 1024

    if (isNowMobile && !isMobile) {
      createMobileMenuButton()
    } else if (!isNowMobile && isMobile) {
      removeMobileMenuButton()
    }
  })
}

function createMobileMenuButton() {
  const existingBtn = document.querySelector(".plan-mobile-menu-btn")
  if (existingBtn) return

  const mobileMenuBtn = document.createElement("button")
  mobileMenuBtn.className = "plan-mobile-menu-btn"
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
  mobileMenuBtn.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1001;
      background: var(--gradient-primary);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: var(--shadow-medium);
      transition: var(--transition);
  `

  document.body.appendChild(mobileMenuBtn)

  mobileMenuBtn.addEventListener("click", function () {
    const sidebar = document.querySelector(".plan-sidebar")
    sidebar.classList.toggle("active")

    // Cambiar icono
    const icon = this.querySelector("i")
    if (sidebar.classList.contains("active")) {
      icon.className = "fas fa-times"
    } else {
      icon.className = "fas fa-bars"
    }
  })
}

function removeMobileMenuButton() {
  const mobileMenuBtn = document.querySelector(".plan-mobile-menu-btn")
  if (mobileMenuBtn) {
    mobileMenuBtn.remove()
  }
}

// Funciones de utilidad
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimizar eventos de scroll
const optimizedScrollHandler = debounce(() => {
  updateActiveSection()
  toggleScrollTopButton()
  updateProgressOnScroll()
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)

// Navegación con teclado
document.addEventListener("keydown", (e) => {
  // Navegación con flechas
  if (e.key === "ArrowDown" && e.ctrlKey) {
    e.preventDefault()
    navigateToSection(currentSection + 1)
  } else if (e.key === "ArrowUp" && e.ctrlKey) {
    e.preventDefault()
    navigateToSection(currentSection - 1)
  }

  // Expandir/contraer con Enter
  if (e.key === "Enter" && e.target.classList.contains("plan-expand-btn")) {
    e.target.click()
  }
})

function navigateToSection(index) {
  if (index >= 0 && index < sections.length) {
    const targetSection = sections[index]
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })

    // Actualizar navegación
    navLinks.forEach((link) => link.classList.remove("active"))
    if (navLinks[index]) {
      navLinks[index].classList.add("active")
    }

    currentSection = index
    updateProgress()
  }
}

// Efectos de hover mejorados
function enhanceHoverEffects() {
  // Efecto de hover para tarjetas
  const cards = document.querySelectorAll(".plan-info-card, .plan-trend-card, .plan-team-member, .plan-floating-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Efecto parallax suave para el hero
  const hero = document.querySelector(".plan-hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.3
      hero.style.transform = `translateY(${rate}px)`
    })
  }
}

// Contador animado para números
function animateCounters() {
  const counters = document.querySelectorAll(
    ".plan-stat-number, .plan-investment-amount, .plan-metric-value, .plan-table-number",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

function animateCounter(element) {
  const text = element.textContent
  const number = Number.parseInt(text.replace(/\D/g, ""))

  if (isNaN(number)) return

  const increment = number / 60
  let current = 0

  const timer = setInterval(() => {
    current += increment
    if (current >= number) {
      element.textContent = text
      clearInterval(timer)
    } else {
      const currentText = text.replace(number.toString(), Math.floor(current).toString())
      element.textContent = currentText
    }
  }, 25)
}

// Función para imprimir o exportar (funcionalidad futura)
function exportPlan() {
  window.print()
}

// Función para compartir (funcionalidad futura)
function sharePlan() {
  if (navigator.share) {
    navigator
      .share({
        title: "Plan de Negocios - PixelApp",
        text: "Conoce nuestro plan de negocios para el desarrollo de aplicaciones móviles personalizadas",
        url: window.location.href,
      })
      .catch(console.error)
  } else {
    // Fallback: copiar URL al portapapeles
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        // Mostrar notificación temporal
        const notification = document.createElement("div")
        notification.textContent = "¡URL copiada al portapapeles!"
        notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: var(--gradient-primary);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      box-shadow: var(--shadow-medium);
      z-index: 10000;
      font-weight: 500;
      animation: slideInRight 0.3s ease;
    `

        document.body.appendChild(notification)

        setTimeout(() => {
          notification.style.animation = "slideOutRight 0.3s ease"
          setTimeout(() => notification.remove(), 300)
        }, 2000)
      })
      .catch(() => {
        alert("No se pudo copiar la URL. Por favor, copia manualmente: " + window.location.href)
      })
  }
}

// Modo oscuro (funcionalidad futura)
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode")
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"))
}

// Cargar preferencia de modo oscuro
function loadDarkModePreference() {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode")
  }
}

// Manejo de errores global
window.addEventListener("error", (e) => {
  console.error("Error en plan-script.js:", e.error)
})

// Optimización de rendimiento
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Función de búsqueda (funcionalidad futura)
function searchInPlan(query) {
  const sections = document.querySelectorAll(".plan-section-content")
  const results = []

  sections.forEach((section, index) => {
    const text = section.textContent.toLowerCase()
    if (text.includes(query.toLowerCase())) {
      results.push({
        section: index,
        element: section,
      })
    }
  })

  return results
}

// Accesibilidad mejorada
function enhanceAccessibility() {
  // Agregar roles ARIA
  const sections = document.querySelectorAll(".plan-section")
  sections.forEach((section, index) => {
    section.setAttribute("role", "region")
    section.setAttribute("aria-labelledby", `section-${index}-title`)

    const title = section.querySelector("h2")
    if (title) {
      title.id = `section-${index}-title`
    }
  })

  // Mejorar navegación con teclado
  const expandButtons = document.querySelectorAll(".plan-expand-btn")
  expandButtons.forEach((button) => {
    button.setAttribute("aria-expanded", "false")

    button.addEventListener("click", function () {
      const isExpanded = this.classList.contains("active")
      this.setAttribute("aria-expanded", isExpanded)
    })
  })
}

// Funciones adicionales
function enhancePage() {
  enhanceHoverEffects()
  loadDarkModePreference()
  lazyLoadImages()
}

document.addEventListener("DOMContentLoaded", enhancePage)

console.log("Plan de Negocios PixelApp - Script cargado correctamente")
