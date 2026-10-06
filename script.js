/* =========================================================
   ALA PORTFOLIO — SCRIPT.JS
   ========================================================= */


/* =========================================================
   LOADER
   ========================================================= */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {

    if (loader) {
      loader.classList.add("hidden");
    }

    initParticles();
    initTyping();

  }, 1800);

});


/* =========================================================
   NAVBAR SCROLL
   ========================================================= */

const navbar = document.getElementById("navbar");
const backTop = document.getElementById("back-top");

window.addEventListener("scroll", () => {

  const scrolled = window.scrollY > 50;
  const showBackTop = window.scrollY > 400;

  if (navbar) {
    navbar.classList.toggle("scrolled", scrolled);
  }

  if (backTop) {
    backTop.classList.toggle("visible", showBackTop);
  }

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburger && mobileMenu) {

  hamburger.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

    const isOpen =
      mobileMenu.classList.contains("open");

    hamburger.setAttribute(
      "aria-expanded",
      isOpen
    );

  });

  mobileMenu
    .querySelectorAll(".mob-link")
    .forEach(link => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

}


/* =========================================================
   THEME TOGGLE
   ========================================================= */

const themeToggle =
  document.getElementById("theme-toggle");

const themeIcon =
  document.querySelector(".theme-icon");

let isDark = true;


/* Load saved theme */

const savedTheme =
  localStorage.getItem("ala-theme");

if (savedTheme === "light") {

  isDark = false;

  document.documentElement.setAttribute(
    "data-theme",
    "light"
  );

  if (themeIcon) {
    themeIcon.textContent = "🌙";
  }

}


if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    isDark = !isDark;

    const theme =
      isDark ? "dark" : "light";

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "ala-theme",
      theme
    );

    if (themeIcon) {
      themeIcon.textContent =
        isDark ? "☀" : "🌙";
    }

  });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

if (backTop) {

  backTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener("click", event => {

      const href =
        anchor.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target =
        document.querySelector(href);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

function initTyping() {

  const el =
    document.getElementById("typed");

  if (!el) return;


  const phrases = [

    "AI Solutions",
    "Generative AI Applications",
    "Machine Learning Models",
    "AI Agentforce Solutions",
    "Intelligent Systems",
    "AI-Powered Applications"

  ];


  let phraseIndex = 0;
  let charIndex = 0;

  let deleting = false;


  function tick() {

    const current =
      phrases[phraseIndex];


    if (!deleting) {

      charIndex++;

      el.textContent =
        current.substring(
          0,
          charIndex
        );


      if (charIndex >= current.length) {

        deleting = true;

        setTimeout(
          tick,
          1700
        );

        return;

      }

      setTimeout(
        tick,
        65
      );

    }

    else {

      charIndex--;

      el.textContent =
        current.substring(
          0,
          charIndex
        );


      if (charIndex <= 0) {

        deleting = false;

        phraseIndex =
          (phraseIndex + 1) %
          phrases.length;

        setTimeout(
          tick,
          400
        );

        return;

      }

      setTimeout(
        tick,
        35
      );

    }

  }


  tick();

}


/* =========================================================
   PARTICLE CANVAS
   ========================================================= */

function initParticles() {

  const canvas =
    document.getElementById(
      "particle-canvas"
    );

  if (!canvas) return;


  const ctx =
    canvas.getContext("2d");

  if (!ctx) return;


  let W = 0;
  let H = 0;

  let particles = [];


  function resize() {

    const ratio =
      window.devicePixelRatio || 1;

    W =
      canvas.offsetWidth;

    H =
      canvas.offsetHeight;


    canvas.width =
      W * ratio;

    canvas.height =
      H * ratio;

    ctx.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );

  }


  function random(min, max) {

    return Math.random() *
      (max - min) + min;

  }


  function createParticle() {

    return {

      x: random(0, W),

      y: random(0, H),

      vx: random(-0.25, 0.25),

      vy: random(-0.25, 0.25),

      radius: random(0.8, 2),

      alpha: random(0.2, 0.65),

      hue:
        Math.random() < .5
          ? 195
          : 270

    };

  }


  function spawnParticles() {

    const area =
      W * H;

    const count =
      Math.min(
        100,
        Math.max(
          25,
          Math.floor(
            area / 15000
          )
        )
      );

    particles =
      Array.from(
        {
          length: count
        },
        createParticle
      );

  }


  resize();
  spawnParticles();


  let mouseX =
    W / 2;

  let mouseY =
    H / 2;


  canvas.addEventListener(
    "mousemove",
    event => {

      const rect =
        canvas.getBoundingClientRect();

      mouseX =
        event.clientX -
        rect.left;

      mouseY =
        event.clientY -
        rect.top;

    }
  );


  canvas.addEventListener(
    "mouseleave",
    () => {

      mouseX = W / 2;
      mouseY = H / 2;

    }
  );


  window.addEventListener(
    "resize",
    () => {

      resize();
      spawnParticles();

    }
  );


  function draw() {

    ctx.clearRect(
      0,
      0,
      W,
      H
    );


    /* Connections */

    for (
      let i = 0;
      i < particles.length;
      i++
    ) {

      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {

        const dx =
          particles[i].x -
          particles[j].x;

        const dy =
          particles[i].y -
          particles[j].y;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );


        if (distance < 110) {

          ctx.beginPath();

          ctx.strokeStyle =
            `rgba(
              0,
              212,
              255,
              ${0.07 *
              (1 -
                distance /
                110)}
            )`;

          ctx.lineWidth = .5;

          ctx.moveTo(
            particles[i].x,
            particles[i].y
          );

          ctx.lineTo(
            particles[j].x,
            particles[j].y
          );

          ctx.stroke();

        }

      }

    }


    /* Particles */

    particles.forEach(p => {

      const dx =
        p.x - mouseX;

      const dy =
        p.y - mouseY;

      const distance =
        Math.sqrt(
          dx * dx +
          dy * dy
        );


      if (
        distance > 0 &&
        distance < 100
      ) {

        p.vx +=
          (dx / distance) *
          .025;

        p.vy +=
          (dy / distance) *
          .025;

      }


      p.vx *= .985;
      p.vy *= .985;


      p.x += p.vx;
      p.y += p.vy;


      if (p.x < 0)
        p.x = W;

      if (p.x > W)
        p.x = 0;

      if (p.y < 0)
        p.y = H;

      if (p.y > H)
        p.y = 0;


      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `hsla(
          ${p.hue},
          100%,
          70%,
          ${p.alpha}
        )`;

      ctx.fill();

    });


    requestAnimationFrame(draw);

  }


  draw();

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "visible"
          );

        }

      });

    },
    {
      threshold: .1
    }
  );


revealElements.forEach(
  element =>
    revealObserver.observe(element)
);


/* =========================================================
   SKILL BARS
   ========================================================= */

const skillGrid =
  document.getElementById(
    "skills-grid"
  );


if (skillGrid) {

  const skillBarObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .querySelectorAll(
                ".skill-bar"
              )
              .forEach(bar => {

                const width =
                  bar.getAttribute(
                    "data-w"
                  );

                bar.style.width =
                  `${width}%`;

              });


            skillBarObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: .1
      }
    );


  skillBarObserver.observe(
    skillGrid
  );

}


/* =========================================================
   SKILL FILTER
   ========================================================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-btn"
  );


const skillCards =
  document.querySelectorAll(
    ".skill-card"
  );


filterButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterButtons.forEach(btn =>
        btn.classList.remove(
          "active"
        )
      );


      button.classList.add(
        "active"
      );


      const filter =
        button.getAttribute(
          "data-filter"
        );


      skillCards.forEach(card => {

        const category =
          card.getAttribute(
            "data-cat"
          );


        if (
          filter === "all" ||
          category === filter
        ) {

          card.classList.remove(
            "hidden"
          );

        }

        else {

          card.classList.add(
            "hidden"
          );

        }

      });

    }
  );

});


/* =========================================================
   COUNTER ANIMATION
   ========================================================= */

function animateCounter(element) {

  const target =
    parseFloat(
      element.getAttribute(
        "data-target"
      )
    );


  const decimal =
    parseInt(
      element.getAttribute(
        "data-decimal"
      ) || "0"
    );


  const suffix =
    element.getAttribute(
      "data-suffix"
    ) || "";


  const duration =
    1600;

  const start =
    performance.now();


  function update(now) {

    const progress =
      Math.min(
        (now - start) /
        duration,
        1
      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      target * eased;


    if (decimal > 0) {

      element.textContent =
        value.toFixed(
          decimal
        ) + suffix;

    }

    else {

      element.textContent =
        Math.floor(
          value
        ) + suffix;

    }


    if (progress < 1) {

      requestAnimationFrame(
        update
      );

    }

  }


  requestAnimationFrame(
    update
  );

}


const counters =
  document.querySelectorAll(
    ".big-num"
  );


const counterObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          animateCounter(
            entry.target
          );

          counterObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: .3
    }
  );


counters.forEach(counter =>
  counterObserver.observe(counter)
);


/* =========================================================
   CONTACT FORM
   ========================================================= */

const contactForm =
  document.getElementById(
    "contact-form"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "name"
        ).value.trim();

      const email =
        document.getElementById(
          "email"
        ).value.trim();

      const message =
        document.getElementById(
          "message"
        ).value.trim();


      if (
        !name ||
        !email ||
        !message
      ) {

        return;

      }


      const button =
        contactForm.querySelector(
          'button[type="submit"]'
        );


      const success =
        document.getElementById(
          "form-success"
        );


      button.disabled = true;

      button.textContent =
        "Preparing Message...";


      /*
       * Frontend mail fallback.
       * This opens the visitor's email client.
       */

      const subject =
        encodeURIComponent(
          `Portfolio Contact from ${name}`
        );


      const body =
        encodeURIComponent(
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}`
        );


      const mailto =
        `mailto:lakshmiaiswaryaakella@gmail.com` +
        `?subject=${subject}` +
        `&body=${body}`;


      setTimeout(() => {

        window.location.href =
          mailto;


        button.disabled = false;

        button.textContent =
          "Send Message →";


        if (success) {

          success.classList.add(
            "show"
          );

          setTimeout(() => {

            success.classList.remove(
              "show"
            );

          }, 5000);

        }

      }, 700);

    }
  );

}


/* =========================================================
   RESUME BUTTON
   ========================================================= */

const resumeButton =
  document.getElementById(
    "resume-btn"
  );


if (resumeButton) {

  resumeButton.addEventListener(
    "click",
    event => {

      /*
       * The resume button expects:
       *
       * resume.pdf
       *
       * to be placed in the same folder
       * as index.html.
       */

      const resumePath =
        resumeButton.getAttribute(
          "href"
        );


      if (
        !resumePath ||
        resumePath === "#"
      ) {

        event.preventDefault();

        alert(
          "Please add your resume as 'resume.pdf' in the portfolio folder."
        );

      }

    }
  );

}


/* =========================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
  "click",
  event => {

    if (
      mobileMenu &&
      hamburger &&
      mobileMenu.classList.contains(
        "open"
      )
    ) {

      const clickedInsideMenu =
        mobileMenu.contains(
          event.target
        );

      const clickedHamburger =
        hamburger.contains(
          event.target
        );


      if (
        !clickedInsideMenu &&
        !clickedHamburger
      ) {

        mobileMenu.classList.remove(
          "open"
        );

      }

    }

  }
);
