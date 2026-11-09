(() => {
  "use strict";

  // Dados de contato ficam vazios neste projeto conceitual.
  // Quando houver uma profissional real, configure os canais autorizados aqui.
  const CONTACT = {
    email: "",
    whatsapp: ""
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = [...document.querySelectorAll("[data-nav] a")];

  // Ano do rodapé.
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Cabeçalho acompanha a rolagem sem alterar o fluxo da página.
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 36);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Menu móvel acessível por toque, teclado e tecla Escape.
  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) closeMenu();
    });
  }

  // Revelações suaves: o conteúdo continua visível quando movimento reduzido é solicitado.
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -45px 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Imagens reais substituem os cenários gráficos assim que forem adicionadas ao repositório.
  document.querySelectorAll(".media-frame img").forEach((image) => {
    const frame = image.closest(".media-frame");
    if (!frame) return;

    const markLoaded = () => frame.classList.add("media-loaded");
    const markMissing = () => frame.classList.add("media-missing");
    const decodeAndReveal = () => {
      if (typeof image.decode === "function") {
        image.decode().then(markLoaded).catch(() => {
          if (image.naturalWidth > 0) markLoaded();
          else markMissing();
        });
      } else {
        markLoaded();
      }
    };

    if (image.complete) {
      if (image.naturalWidth > 0) decodeAndReveal();
      else markMissing();
    } else {
      image.addEventListener("load", decodeAndReveal, { once: true });
      image.addEventListener("error", markMissing, { once: true });
    }
  });

  // Vídeos: carrega somente perto da viewport, mostra a primeira imagem válida
  // e mantém o poster/fallback quando o navegador não consegue reproduzir o MP4.
  const videos = [...document.querySelectorAll("[data-video]")];
  videos.forEach((video) => {
    const frame = video.closest(".media-frame");
    const revealVideo = () => frame?.classList.add("video-loaded");
    const restoreFallback = () => {
      frame?.classList.remove("video-loaded");
      frame?.classList.add("media-video-error");
    };

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.addEventListener("loadeddata", revealVideo, { once: true });
    video.addEventListener("playing", revealVideo);
    video.addEventListener("error", restoreFallback);
    video.addEventListener("abort", restoreFallback);

    if (prefersReducedMotion) {
      // Com movimento reduzido, a imagem de poster permanece estática.
      video.pause();
      return;
    }

    const startVideo = () => {
      if (video.readyState === 0) {
        video.preload = "auto";
        video.load();
      }
      const attemptPlayback = () => {
        video.play().then(revealVideo).catch(() => restoreFallback());
      };
      if (video.readyState >= 2) attemptPlayback();
      else video.addEventListener("canplay", attemptPlayback, { once: true });
    };

    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startVideo();
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.01, rootMargin: "220px 0px" });
      videoObserver.observe(video);
    } else {
      startVideo();
    }
  });

  // Parallax discreto apenas em telas com ponteiro preciso e quando o usuário permite movimento.
  // Indicador de leitura: acompanha a posição real da página, sem prender o scroll.
  const progressBar = document.querySelector("[data-scroll-progress]");
  let progressTicking = false;
  const updateScrollProgress = () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressBar.style.transform = "scaleX(" + progress + ")";
    progressTicking = false;
  };
  const requestScrollProgress = () => {
    if (progressTicking) return;
    window.requestAnimationFrame(updateScrollProgress);
    progressTicking = true;
  };
  updateScrollProgress();
  window.addEventListener("scroll", requestScrollProgress, { passive: true });
  window.addEventListener("resize", requestScrollProgress);

  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (!prefersReducedMotion && hasFinePointer && parallaxItems.length) {
    let ticking = false;
    const updateParallax = () => {
      const viewportHeight = window.innerHeight || 1;
      parallaxItems.forEach((element) => {
        const speed = Number(element.dataset.parallax || 0.08);
        const rect = element.getBoundingClientRect();
        const centerOffset = (rect.top + rect.height / 2 - viewportHeight / 2) * speed;
        element.style.setProperty("--parallax-y", Math.max(-35, Math.min(35, centerOffset)) + "px");
      });
      ticking = false;
    };
    const requestParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);
    updateParallax();
  }

  // Destaque da navegação conforme a seção visível.
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = "#" + entry.target.id;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === activeId;
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
          link.classList.toggle("is-active", active);
        });
      });
    }, { rootMargin: "-38% 0px -52% 0px", threshold: 0 });
    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  // Indicador de capítulos: identifica a cena atual sem controlar ou prender a rolagem.
  const chapterRail = document.querySelector("[data-chapter-rail]");
  const chapterNumber = document.querySelector("[data-current-chapter]");
  const chapterName = document.querySelector("[data-current-chapter-name]");
  const chapters = [...document.querySelectorAll("[data-chapter]")];

  const updateChapterRailVisibility = () => {
    if (!chapterRail) return;
    chapterRail.classList.toggle("is-visible", window.scrollY > Math.min(260, window.innerHeight * 0.35));
  };
  updateChapterRailVisibility();
  window.addEventListener("scroll", updateChapterRailVisibility, { passive: true });

  let chapterSwitchTimer = null;
  const setCurrentChapter = (section) => {
    if (!chapterRail || !chapterNumber || !chapterName || !section) return;
    const nextNumber = section.dataset.chapter || "01";
    const nextName = section.dataset.chapterName || "Abertura";
    const nextTone = section.dataset.tone || "light";
    if (chapterNumber.textContent === nextNumber) {
      chapterRail.dataset.tone = nextTone;
      return;
    }

    window.clearTimeout(chapterSwitchTimer);
    chapterRail.classList.add("is-switching");
    chapterSwitchTimer = window.setTimeout(() => {
      chapterNumber.textContent = nextNumber;
      chapterName.textContent = nextName;
      chapterRail.dataset.tone = nextTone;
      chapterRail.classList.remove("is-switching");
    }, 150);
  };

  if (chapters.length && "IntersectionObserver" in window) {
    const chapterObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setCurrentChapter(visible[0].target);
    }, { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.15, 0.35, 0.6] });
    chapters.forEach((section) => chapterObserver.observe(section));
  }

  // Linha da jornada avança quando a seção entra em cena.
  const journey = document.querySelector("[data-journey]");
  if (journey && "IntersectionObserver" in window && !prefersReducedMotion) {
    const journeyObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        journey.classList.add("is-visible");
        journeyObserver.disconnect();
      }
    }, { threshold: 0.2 });
    journeyObserver.observe(journey);
  } else {
    journey?.classList.add("is-visible");
  }

  // FAQ: mantém uma resposta aberta por vez para facilitar a leitura.
  const faq = document.querySelector("[data-faq]");
  if (faq) {
    faq.addEventListener("toggle", (event) => {
      const current = event.target;
      if (!(current instanceof HTMLDetailsElement) || !current.open) return;
      faq.querySelectorAll("details[open]").forEach((item) => {
        if (item !== current) item.open = false;
      });
    }, true);
  }

  // CTA de contato: só abre um canal quando um endereço real tiver sido configurado.
  const contactLink = document.querySelector("[data-contact-link]");
  if (contactLink) {
    if (CONTACT.whatsapp) {
      contactLink.href = "https://wa.me/" + CONTACT.whatsapp.replace(/\D/g, "");
      contactLink.target = "_blank";
      contactLink.rel = "noopener noreferrer";
    } else if (CONTACT.email) {
      contactLink.href = "mailto:" + CONTACT.email;
    } else {
      contactLink.href = "#contato";
      contactLink.addEventListener("click", (event) => {
        event.preventDefault();
        showNotice("Este é um projeto demonstrativo. O canal de contato será configurado com os dados autorizados da profissional.");
      });
    }
  }

  let noticeTimer;
  function showNotice(message) {
    let notice = document.querySelector("[data-site-notice]");
    if (!notice) {
      notice = document.createElement("div");
      notice.className = "site-notice";
      notice.dataset.siteNotice = "";
      notice.setAttribute("role", "status");
      notice.setAttribute("aria-live", "polite");
      document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.classList.add("is-visible");
    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => notice.classList.remove("is-visible"), 4200);
  }
})();