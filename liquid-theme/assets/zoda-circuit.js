// Snap-scroll behaviour for the ZODA Circuit home page.

  (() => {
    const root = document.getElementById("zoda-circuit-home");
    if (!root || root.dataset.ready === 'true') return;
    root.dataset.ready = 'true';

    const track = root.querySelector('[data-zoda-track]');
    const desiredPanelOrder = [
      'zoda-circuit-home-1',
      'zoda-circuit-home-2',
      'zoda-circuit-home-5',
      'zoda-circuit-home-9',
      'zoda-circuit-home-11',
      'zoda-circuit-home-6',
      'zoda-circuit-home-7',
      'zoda-circuit-home-4',
      'zoda-circuit-home-3',
      'zoda-circuit-home-8',
      'zoda-circuit-home-12',
      'zoda-circuit-home-10'
    ].map((id) => document.getElementById(id)).filter(Boolean);
    desiredPanelOrder.forEach((panel, index) => {
      track?.appendChild(panel);
      panel.dataset.zodaPanel = String(index);
      panel.classList.toggle('is-active', index === 0);
    });
    const panels = Array.from(root.querySelectorAll('[data-zoda-panel]'));
    const dots = Array.from(root.querySelectorAll('[data-zoda-dot]'));
    const fabricTrack = root.querySelector('[data-zoda-fabric-track]');
    const fabricViewport = root.querySelector('[data-zoda-fabric-viewport]');
    const fabricCards = Array.from(root.querySelectorAll('[data-zoda-fabric-card]'));
    const pillarViewport = root.querySelector('.zoda-circuit__panel--pillars .zoda-circuit__cards');
    const pillarCards = Array.from(root.querySelectorAll('.zoda-circuit__panel--pillars .zoda-circuit__pillar-card'));
    const fabricProgress = root.querySelector('[data-zoda-fabric-progress]');
    const fabricCount = root.querySelector('[data-zoda-fabric-count]');
    const collectionPanels = Array.from(root.querySelectorAll('[data-zoda-collection-panel]'));
    const collectionTabs = Array.from(root.querySelectorAll('[data-zoda-collection-tab]'));
    const featureAccordion = root.querySelector('[data-zoda-feature-accordion]');
    const featureItems = Array.from(root.querySelectorAll('[data-zoda-feature-item]'));
    const featureTabs = Array.from(root.querySelectorAll('[data-zoda-feature-tab]'));
    const featureSummaries = Array.from(root.querySelectorAll('[data-zoda-feature-summary]'));
    const mobileMenu = root.querySelector('[data-zoda-mobile-menu]');
    const mobileMenuButton = root.querySelector('[data-zoda-mobile-menu-button]');
    const pillarPanelIndex = panels.findIndex((panel) => panel.classList.contains('zoda-circuit__panel--pillars'));
    const fabricPanelIndex = panels.findIndex((panel) => panel.querySelector('[data-zoda-fabric]'));
    const collectionPanelIndex = panels.findIndex((panel) => panel.querySelector('[data-zoda-collection-accordion]'));
    const featurePanelIndex = panels.findIndex((panel) => panel.querySelector('[data-zoda-feature-accordion]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
    const mobileHorizontalSelector = '[data-zoda-fabric-viewport], .zoda-circuit__panel--pillars .zoda-circuit__cards, [data-zoda-collection-accordion], [data-zoda-feature-accordion]';
    const snapEnabled = root.dataset.snapEnabled !== 'false' && !reduceMotion;
    let activeIndex = 0;
    let pillarIndex = 0;
    let fabricIndex = 0;
    let collectionIndex = 0;
    let featureIndex = 0;
    let featureComplete = false;
    let locked = false;
    let touchStartY = 0;
    let touchStartX = 0;
    let touchMovedInternally = false;
    let touchStartedInHorizontal = false;
    const horizontalScrollSelector = '.zoda-circuit__signal-gallery, .zoda-circuit__fabric-viewport, .zoda-circuit__cards, .zoda-circuit__proof-grid, .zoda-circuit__reviews-grid';
    const isHorizontalSwipe = (event, deltaX, deltaY) => Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 18 && event.target instanceof Element && event.target.closest(horizontalScrollSelector);
    let splashFrame = 0;
    let activeScrollFrame = 0;

    if (!track || !panels.length) return;

    const setMobileMenuOpen = (open) => {
      if (!mobileMenu || !mobileMenuButton) return;
      mobileMenu.classList.toggle('is-open', open);
      mobileMenuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenuButton.setAttribute('aria-label', open ? 'Close ZODA navigation' : 'Open ZODA navigation');
    };

    mobileMenuButton?.addEventListener('click', () => {
      setMobileMenuOpen(!mobileMenu?.classList.contains('is-open'));
    });

    mobileMenu?.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) setMobileMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!mobileMenu?.classList.contains('is-open')) return;
      if (event.target instanceof Node && mobileMenu.contains(event.target)) return;
      setMobileMenuOpen(false);
    });

    const updateSplash = () => {
      if (reduceMotion || isMobile() || !panels.length) return;
      const maxScroll = Math.max(1, track.scrollHeight - track.clientHeight);
      const progress = track.scrollTop / maxScroll;
      const x = Math.sin(progress * Math.PI * 2.4) * 74;
      const y = Math.cos(progress * Math.PI * 1.8) * 54;
      root.style.setProperty('--zoda-splash-x', `${x.toFixed(1)}px`);
      root.style.setProperty('--zoda-splash-y', `${y.toFixed(1)}px`);
      root.style.setProperty('--zoda-splash-scroll-rotate', `${(progress * 68).toFixed(1)}deg`);
    };

    const requestSplashUpdate = () => {
      if (splashFrame || isMobile()) return;
      splashFrame = window.requestAnimationFrame(() => {
        splashFrame = 0;
        updateSplash();
      });
    };

    const setActive = (index) => {
      const nextIndex = Math.max(0, Math.min(index, panels.length - 1));
      if (nextIndex === activeIndex && root.dataset.activePanel === String(nextIndex + 1)) return;
      activeIndex = nextIndex;
      root.dataset.activePanel = String(activeIndex + 1);
      panels.forEach((panel, panelIndex) => {
        panel.classList.toggle('is-active', panelIndex === activeIndex);
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === activeIndex;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      requestSplashUpdate();
    };

    const getNearestPanelIndex = () => {
      if (!track || !panels.length) return activeIndex;
      const currentTop = track.scrollTop;
      return panels.reduce((nearest, panel, panelIndex) => {
        const nearestDistance = Math.abs(panels[nearest].offsetTop - currentTop);
        const panelDistance = Math.abs(panel.offsetTop - currentTop);
        return panelDistance < nearestDistance ? panelIndex : nearest;
      }, activeIndex);
    };

    const syncActiveFromScroll = () => {
      const index = getNearestPanelIndex();
      if (index !== activeIndex) setActive(index);
    };

    const requestActiveSync = () => {
      if (activeScrollFrame) return;
      activeScrollFrame = window.requestAnimationFrame(() => {
        activeScrollFrame = 0;
        syncActiveFromScroll();
      });
    };

    const getPanelIndexAtScroll = () => {
      if (!track || !panels.length) return activeIndex;
      const viewportCenter = track.scrollTop + (track.clientHeight / 2);
      const centeredIndex = panels.findIndex((panel) => viewportCenter >= panel.offsetTop && viewportCenter < panel.offsetTop + panel.offsetHeight);
      return centeredIndex >= 0 ? centeredIndex : getNearestPanelIndex();
    };

    const syncActiveAtScroll = () => {
      const index = getPanelIndexAtScroll();
      if (index !== activeIndex) setActive(index);
      return index;
    };

    const getFabricVisibleCards = () => {
      if (!fabricViewport || !fabricTrack || !fabricCards.length) return 1;
      const style = window.getComputedStyle(fabricTrack);
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      const cardWidth = fabricCards[0].getBoundingClientRect().width || 1;
      const viewportWidth = fabricViewport.clientWidth || cardWidth;
      return Math.max(1, Math.min(fabricCards.length, Math.floor((viewportWidth + gap) / (cardWidth + gap))));
    };

    const getFabricReleaseIndex = () => {
      if (!fabricCards.length) return 0;
      if (!fabricViewport || !fabricTrack) return Math.max(0, fabricCards.length - 1);
      const visibleCards = getFabricVisibleCards();
      return Math.max(0, fabricCards.length - visibleCards);
    };

    const updateFabric = (index, syncViewport = true) => {
      if (!fabricTrack || !fabricCards.length) return;
      const releaseIndex = getFabricReleaseIndex();
      fabricIndex = Math.max(0, Math.min(index, releaseIndex));
      if (fabricViewport && isMobile()) {
        fabricTrack.style.transform = 'none';
        if (syncViewport) fabricViewport.scrollLeft = fabricCards[fabricIndex].offsetLeft;
      } else {
        fabricTrack.style.transform = `translate3d(${-fabricCards[fabricIndex].offsetLeft}px, 0, 0)`;
      }
      fabricCards.forEach((card, cardIndex) => {
        card.classList.toggle('is-active', cardIndex === fabricIndex);
      });
      if (fabricProgress) {
        const visibleCards = getFabricVisibleCards();
        const progress = fabricCards.length > 0 ? Math.min(fabricCards.length, fabricIndex + visibleCards) / fabricCards.length : 1;
        fabricProgress.style.transform = `scaleX(${progress})`;
      }
      if (fabricCount) {
        const visibleCards = getFabricVisibleCards();
        const shownIndex = Math.min(fabricCards.length, fabricIndex + visibleCards);
        fabricCount.textContent = `${String(shownIndex).padStart(2, '0')} / ${String(fabricCards.length).padStart(2, '0')}`;
      }
    };

    const stepFabric = (direction) => {
      if (!fabricCards.length) return false;
      const releaseIndex = getFabricReleaseIndex();
      if (direction > 0 && fabricIndex >= releaseIndex) return false;
      if (direction < 0 && fabricIndex <= 0) return false;
      const next = fabricIndex + direction;
      updateFabric(next);
      return true;
    };

    const getPillarReleaseIndex = () => {
      if (!pillarCards.length) return 0;
      if (!isMobile()) return pillarCards.length - 1;
      if (!pillarViewport) return pillarCards.length - 1;
      const style = window.getComputedStyle(pillarViewport);
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      const cardWidth = pillarCards[0].getBoundingClientRect().width || 1;
      const visibleCards = Math.max(1, Math.floor(((pillarViewport.clientWidth || cardWidth) + gap) / (cardWidth + gap)));
      return Math.max(0, pillarCards.length - visibleCards);
    };

    const updatePillars = (index, syncViewport = true) => {
      if (!pillarCards.length) return;
      const releaseIndex = getPillarReleaseIndex();
      pillarIndex = Math.max(0, Math.min(index, releaseIndex));
      pillarCards.forEach((card, cardIndex) => {
        card.classList.toggle('is-active', cardIndex === pillarIndex);
      });
      if (pillarViewport && isMobile() && syncViewport) {
        pillarViewport.scrollLeft = pillarCards[pillarIndex].offsetLeft;
      }
    };

    const stepPillars = (direction) => {
      if (!pillarCards.length) return false;
      const releaseIndex = getPillarReleaseIndex();
      if (direction > 0 && pillarIndex >= releaseIndex) return false;
      if (direction < 0 && pillarIndex <= 0) return false;
      updatePillars(pillarIndex + direction);
      return true;
    };

    const updateCollection = (index) => {
      if (!collectionPanels.length) return;
      collectionIndex = Math.max(0, Math.min(index, collectionPanels.length - 1));
      collectionPanels.forEach((panel, panelIndex) => {
        const open = panelIndex === collectionIndex;
        panel.classList.toggle('is-open', open);
        panel.classList.toggle('is-past', panelIndex < collectionIndex);
        const tab = collectionTabs[panelIndex];
        if (tab) tab.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    };

    const stepCollection = (direction) => {
      if (!collectionPanels.length) return false;
      if (direction > 0 && collectionIndex >= collectionPanels.length - 1) return false;
      if (direction < 0 && collectionIndex <= 0) return false;
      updateCollection(collectionIndex + direction);
      return true;
    };

    const setFeatureComplete = (complete) => {
      featureComplete = complete;
      featureAccordion?.classList.toggle('is-complete', complete);
      featureTabs.forEach((tab) => tab.classList.toggle('is-complete', complete));
    };

    const updateFeature = (index, clearComplete = true) => {
      if (!featureItems.length) return;
      if (clearComplete) setFeatureComplete(false);
      featureIndex = Math.max(0, Math.min(index, featureItems.length - 1));
      featureItems.forEach((item, itemIndex) => {
        const open = itemIndex === featureIndex;
        item.classList.toggle('is-open', open);
        const tab = featureTabs[itemIndex];
        if (tab) {
          tab.classList.toggle('is-active', open);
          tab.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
      });
      featureSummaries.forEach((summary, summaryIndex) => {
        summary.classList.toggle('is-active', summaryIndex === featureIndex);
      });
    };

    const stepFeature = (direction) => {
      if (!featureItems.length) return false;
      if (direction > 0 && featureIndex >= featureItems.length - 1) {
        setFeatureComplete(true);
        return false;
      }
      if (direction < 0 && featureIndex <= 0) return false;
      updateFeature(featureIndex + direction);
      return true;
    };

    const loopToStart = () => {
      root.classList.add('is-looping');
      window.setTimeout(() => {
        track.scrollTo({ top: panels[0].offsetTop, behavior: 'auto' });
        setActive(0);
      }, reduceMotion ? 0 : 280);
      window.setTimeout(() => {
        root.classList.remove('is-looping');
        locked = false;
      }, reduceMotion ? 80 : 680);
    };

    const goTo = (index, behavior = reduceMotion ? 'auto' : 'smooth') => {
      const next = Math.max(0, Math.min(index, panels.length - 1));
      track.scrollTo({ top: panels[next].offsetTop, behavior });
      setActive(next);
    };

    const step = (direction) => {
      if (!snapEnabled || locked) return;
      locked = true;

      if (!isMobile() && activeIndex === fabricPanelIndex && stepFabric(direction)) {
        window.setTimeout(() => { locked = false; }, 520);
        return;
      }

      if (!isMobile() && activeIndex === pillarPanelIndex && stepPillars(direction)) {
        window.setTimeout(() => { locked = false; }, 520);
        return;
      }

      if (!isMobile() && activeIndex === collectionPanelIndex && stepCollection(direction)) {
        window.setTimeout(() => { locked = false; }, 520);
        return;
      }

      if (!isMobile() && activeIndex === featurePanelIndex && stepFeature(direction)) {
        window.setTimeout(() => { locked = false; }, 520);
        return;
      }

      if (activeIndex === panels.length - 1 && direction > 0) {
        loopToStart();
        return;
      }

      goTo(activeIndex + direction);
      window.setTimeout(() => { locked = false; }, 640);
    };

    const stepInternalHorizontal = (direction) => {
      if (!snapEnabled) return false;
      if (activeIndex === fabricPanelIndex) return stepFabric(direction);
      if (activeIndex === pillarPanelIndex) return stepPillars(direction);
      if (activeIndex === collectionPanelIndex) return stepCollection(direction);
      if (activeIndex === featurePanelIndex) return stepFeature(direction);
      return false;
    };

    const stepInternalForPanel = (panelIndex, direction) => {
      if (!snapEnabled) return false;
      if (isMobile() && panelIndex === collectionPanelIndex) return false;
      if (panelIndex === collectionPanelIndex) return stepCollection(direction);
      if (panelIndex === featurePanelIndex) return stepFeature(direction);
      if (panelIndex === fabricPanelIndex) return stepFabric(direction);
      if (panelIndex === pillarPanelIndex) return stepPillars(direction);
      return false;
    };

    const gateInternalPanelScroll = (direction) => {
      const panelIndex = syncActiveAtScroll();
      if (
        panelIndex !== fabricPanelIndex &&
        panelIndex !== collectionPanelIndex &&
        panelIndex !== featurePanelIndex &&
        panelIndex !== pillarPanelIndex
      ) return false;
      return stepInternalForPanel(panelIndex, direction);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', (event) => {
        event.preventDefault();
        goTo(index);
      });
    });

    collectionTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => updateCollection(index));
    });

    featureTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => updateFeature(index));
    });

    const hydrateHeroVideo = () => {
      const frame = root.querySelector('[data-zoda-video-frame]');
      if (!frame) return null;
      if (isMobile()) {
        frame.removeAttribute('src');
        return null;
      }
      const source = frame.dataset.src;
      if (source && frame.getAttribute('src') !== source) frame.setAttribute('src', source);
      return frame;
    };

    let videoFrame = hydrateHeroVideo();
    const nativeVideo = root.querySelector('[data-zoda-native-video]');
    const requestVideoSound = () => {
      if (videoFrame && videoFrame.contentWindow) {
        videoFrame.contentWindow.postMessage(JSON.stringify({ method: 'setVolume', value: 1 }), 'https://player.vimeo.com');
        videoFrame.contentWindow.postMessage(JSON.stringify({ method: 'play' }), 'https://player.vimeo.com');
      }
      if (nativeVideo) {
        nativeVideo.muted = false;
        nativeVideo.volume = 1;
        nativeVideo.play().catch(() => {});
      }
    };

    window.setTimeout(requestVideoSound, 500);
    ['click', 'touchstart', 'keydown', 'wheel'].forEach((eventName) => {
      root.addEventListener(eventName, requestVideoSound, { once: true, passive: true });
    });

    track.addEventListener('wheel', (event) => {
      if (!snapEnabled) return;
      const primaryDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(primaryDelta) < 8) return;
      if (locked) {
        event.preventDefault();
        return;
      }
      if (gateInternalPanelScroll(primaryDelta > 0 ? 1 : -1)) {
        event.preventDefault();
        locked = true;
        window.setTimeout(() => { locked = false; }, 560);
        return;
      }
      event.preventDefault();
      step(primaryDelta > 0 ? 1 : -1);
    }, { passive: false });

    track.addEventListener('touchstart', (event) => {
      touchStartY = event.touches[0].clientY;
      touchStartX = event.touches[0].clientX;
      touchMovedInternally = false;
      touchStartedInHorizontal = isMobile() && event.target instanceof Element && Boolean(event.target.closest(mobileHorizontalSelector));
    }, { passive: true });

    track.addEventListener('touchmove', (event) => {
      if (locked && touchMovedInternally && isMobile()) {
        event.preventDefault();
        return;
      }
      if (!snapEnabled || locked || !touchStartY || !isMobile()) return;
      const touch = event.touches[0];
      const deltaY = touchStartY - touch.clientY;
      const deltaX = touchStartX - touch.clientX;
      if (Math.abs(deltaY) < 34 || Math.abs(deltaX) > Math.abs(deltaY)) return;
      const moved = gateInternalPanelScroll(deltaY > 0 ? 1 : -1);
      if (!moved) return;
      event.preventDefault();
      touchMovedInternally = true;
      locked = true;
      touchStartY = touch.clientY;
      touchStartX = touch.clientX;
      window.setTimeout(() => { locked = false; }, 520);
    }, { passive: false });

    track.addEventListener('touchend', (event) => {
      if (!snapEnabled || !touchStartY) return;
      const deltaY = touchStartY - event.changedTouches[0].clientY;
      const deltaX = touchStartX - event.changedTouches[0].clientX;
      touchStartY = 0;
      touchStartX = 0;
      if (touchMovedInternally) {
        touchMovedInternally = false;
        touchStartedInHorizontal = false;
        return;
      }
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (absX > absY && absX > 34) {
        const panelIndex = syncActiveAtScroll();
        if (panelIndex === fabricPanelIndex || panelIndex === pillarPanelIndex || panelIndex === collectionPanelIndex || panelIndex === featurePanelIndex) {
          stepInternalForPanel(panelIndex, deltaX > 0 ? 1 : -1);
          touchStartedInHorizontal = false;
          return;
        }
      }
      syncActiveAtScroll();
      if (isMobile()) {
        touchStartedInHorizontal = false;
        return;
      }
      touchStartedInHorizontal = false;
      if (isHorizontalSwipe(event, deltaX, deltaY)) return;
      if (absY < 34) return;
      step(deltaY > 0 ? 1 : -1);
    }, { passive: true });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenu?.classList.contains('is-open')) {
        setMobileMenuOpen(false);
        mobileMenuButton?.focus();
        return;
      }
      if (!snapEnabled) return;
      const keys = ['ArrowDown', 'PageDown', 'ArrowUp', 'PageUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();

      if (event.key === 'Home') goTo(0);
      else if (event.key === 'End') goTo(panels.length - 1);
      else if (activeIndex === fabricPanelIndex && event.key === 'ArrowLeft' && stepFabric(-1)) return;
      else if (activeIndex === fabricPanelIndex && event.key === 'ArrowRight' && stepFabric(1)) return;
      else if (activeIndex === pillarPanelIndex && event.key === 'ArrowLeft' && stepPillars(-1)) return;
      else if (activeIndex === pillarPanelIndex && event.key === 'ArrowRight' && stepPillars(1)) return;
      else if (activeIndex === collectionPanelIndex && event.key === 'ArrowLeft' && stepCollection(-1)) return;
      else if (activeIndex === collectionPanelIndex && event.key === 'ArrowRight' && stepCollection(1)) return;
      else if (activeIndex === featurePanelIndex && event.key === 'ArrowLeft' && stepFeature(-1)) return;
      else if (activeIndex === featurePanelIndex && event.key === 'ArrowRight' && stepFeature(1)) return;
      else if (event.key === 'ArrowUp' || event.key === 'PageUp') step(-1);
      else step(1);
    }, true);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.zodaPanel);
          if (!Number.isNaN(index)) setActive(index);
        });
      }, { root: track, threshold: 0.56 });

      panels.forEach((panel) => observer.observe(panel));
    }

    window.addEventListener('resize', () => {
      videoFrame = hydrateHeroVideo();
      updateFabric(fabricIndex);
      updatePillars(pillarIndex, false);
      requestActiveSync();
    });
    track.addEventListener('scroll', () => {
      requestSplashUpdate();
      requestActiveSync();
    }, { passive: true });
    if (fabricViewport) {
      fabricViewport.addEventListener('scroll', () => {
        if (!isMobile() || !fabricCards.length) return;
        const style = window.getComputedStyle(fabricTrack);
        const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
        const cardWidth = fabricCards[0].getBoundingClientRect().width || 1;
        updateFabric(Math.round(fabricViewport.scrollLeft / (cardWidth + gap)), false);
      }, { passive: true });
    }
    if (pillarViewport) {
      pillarViewport.addEventListener('scroll', () => {
        if (!isMobile() || !pillarCards.length) return;
        const style = window.getComputedStyle(pillarViewport);
        const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
        const cardWidth = pillarCards[0].getBoundingClientRect().width || 1;
        updatePillars(Math.round(pillarViewport.scrollLeft / (cardWidth + gap)), false);
      }, { passive: true });
    }
    updatePillars(0);
    updateFabric(0);
    updateCollection(0);
    updateFeature(0);
    setActive(getNearestPanelIndex());
  })();
