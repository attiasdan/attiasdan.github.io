const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const allowParallax = window.matchMedia("(pointer: fine) and (min-width: 900px)").matches;

if (!reduceMotion) {
  document.documentElement.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal-section").forEach((section) => {
    revealObserver.observe(section);
  });

  if (allowParallax) {
    let pointerX = 0;
    let pointerY = 0;
    let scrollY = window.scrollY;
    let animationFrame;

    const updateParallax = () => {
      const root = document.documentElement;
      root.style.setProperty("--grid-x", `${pointerX * 5}px`);
      root.style.setProperty("--grid-y", `${scrollY * -0.025}px`);
      root.style.setProperty("--stars-back-x", `${pointerX * -7}px`);
      root.style.setProperty("--stars-back-y", `${scrollY * -0.045}px`);
      root.style.setProperty("--stars-front-x", `${pointerX * 11}px`);
      root.style.setProperty("--stars-front-y", `${scrollY * -0.09}px`);
      root.style.setProperty("--hero-copy-x", `${pointerX * -4}px`);
      root.style.setProperty("--hero-copy-y", `${pointerY * -3}px`);
      root.style.setProperty("--portrait-x", `${pointerX * 8}px`);
      root.style.setProperty("--portrait-y", `${pointerY * 6}px`);
      animationFrame = null;
    };

    const requestParallaxUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("pointermove", (event) => {
      pointerX = (event.clientX / window.innerWidth) - 0.5;
      pointerY = (event.clientY / window.innerHeight) - 0.5;
      requestParallaxUpdate();
    }, { passive: true });

    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;
      requestParallaxUpdate();
    }, { passive: true });

    requestParallaxUpdate();
  }
} else {
  document.querySelectorAll(".reveal-section").forEach((section) => {
    section.classList.add("is-visible");
  });
}
