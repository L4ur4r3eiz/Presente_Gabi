// Password Check
function checkPassword() {
  const input = document.getElementById("password-input")
  const errorMessage = document.getElementById("error-message")
  const passwordScreen = document.getElementById("password-screen")
  const mainContent = document.getElementById("main-content")

  // Change this to your desired password
  const correctPassword = "30082009"

  if (input.value.toLowerCase() === correctPassword) {
    passwordScreen.classList.add("hidden")
    mainContent.classList.remove("hidden")
    errorMessage.textContent = ""
  } else {
    errorMessage.textContent = "❌ Senha incorreta! Tente novamente."
    input.value = ""
    input.focus()
  }
}

// Allow Enter key to submit password
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password-input")
  if (passwordInput) {
    passwordInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkPassword()
      }
    })
  }
})

// Carousel functionality
let currentSlide = 0
const track = document.getElementById("carousel-track")
const items = document.querySelectorAll(".carousel-item")
const totalSlides = items.length

// Create dots
const dotsContainer = document.getElementById("carousel-dots")
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div")
  dot.className = "dot"
  if (i === 0) dot.classList.add("active")
  dot.addEventListener("click", () => goToSlide(i))
  dotsContainer.appendChild(dot)
}

function updateCarousel() {
  const itemWidth = items[0].offsetWidth
  const gap = 32 // 2rem gap
  const offset = currentSlide * (itemWidth + gap)
  track.style.transform = `translateX(-${offset}px)`

  // Update dots
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide)
  })
}

function moveCarousel(direction) {
  currentSlide += direction

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0
  }

  updateCarousel()
}

function goToSlide(index) {
  currentSlide = index
  updateCarousel()
}

// Auto-play carousel
let autoplayInterval = setInterval(() => {
  moveCarousel(1)
}, 5000)

// Pause autoplay on hover
const carouselContainer = document.querySelector(".carousel-container")
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval)
})

carouselContainer.addEventListener("mouseleave", () => {
  autoplayInterval = setInterval(() => {
    moveCarousel(1)
  }, 5000)
})

// Modal functionality
function openModal() {
  const modal = document.getElementById("birthday-modal")
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("birthday-modal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})

// Smooth scroll
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

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections
document.querySelectorAll(".content-section, .gallery-section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(50px)"
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(section)
})

// Update carousel on window resize
window.addEventListener("resize", updateCarousel)
