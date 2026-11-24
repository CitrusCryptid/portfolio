/* Drop-in, shadow-DOM sidebar shared by the portfolio pages. */
(function () {
  'use strict';

  var HOST_ID = 'bf-sidebar-host';
  var script = document.currentScript;
  var applyOffset = !(script && script.dataset.offset === 'false');

  var CONFIG = {
    name: 'Ben Finkelstein',
    subtitle: 'EdTech',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Website Documentation', href: '/website-documentation/' },
      { label: 'Contact', href: '/contact/' },
    ],
    otherLinks: [
      { label: 'Muscle Trainer Game', href: 'https://anatomy.bfmediasolutions.com' },
    ],
    projects: [
      { label: 'Image projects', href: '/eme6208-project-1/' },
      { label: 'Gibbon Quiz', href: '/gibbon-quiz/' },
      { label: 'Drag & Drop - OG', href: '/drag-drop/' },
      { label: 'Drag & Drop - AI Version', href: '/drag-ai/' },
      { label: 'Gibbons & Snoop Educational Video', href: '/gibbons-and-snoop/' },
      { label: 'Scapular Control Animation', href: '/scapular-control/' },
      { label: 'Screencasts', href: '/screencasts/' },
    ],
  };

  var SIDEBAR_CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    :host {
      all: initial;
    }

    .sidebar,
    .sidebar *,
    .project-scrim {
      box-sizing: border-box;
    }

    .sidebar * {
      margin: 0;
      padding: 0;
    }

    .sidebar {
      --sidebar-width: 300px;
      --bg: #1e1e1e;
      --border: #3c3c3c;
      --text: #d4d4d4;
      --muted: #b3b3b3;
      --accent: #007acc;

      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      width: var(--sidebar-width);
      height: 100vh;
      height: 100dvh;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 1.5rem 1rem;
      border-right: 1px solid var(--border);
      color: var(--text);
      background: linear-gradient(155deg, #2d2d30, var(--bg) 72%);
      box-shadow: 8px 0 32px rgba(0, 0, 0, .22);
      font-family: 'Poppins', system-ui, -apple-system, sans-serif;
      font-size: 16px;
      line-height: 1.5;
      text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      transition: width .24s ease, background-color .24s ease;
    }

    .sidebar.is-expanded {
      width: min(600px, calc(100vw - 24px));
      background: linear-gradient(
        90deg,
        #2d2d30 0,
        #1e1e1e 300px,
        rgba(30, 30, 30, .92) 100%
      );
      -webkit-backdrop-filter: blur(5px);
      backdrop-filter: blur(5px);
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      padding: 1rem .5rem 1.25rem;
      border-bottom: 1px solid var(--border);
    }

    .logo {
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: center;
      gap: .2rem;
      white-space: nowrap;
    }

    .logo-name {
      max-width: none;
      color: var(--text);
      font-family: 'Poppins', system-ui, -apple-system, sans-serif;
      font-size: 2.2rem;
      font-weight: 600;
      letter-spacing: -.03em;
      line-height: 1.05;
      text-align: center;
      text-shadow: 0 2px 0 rgba(0, 0, 0, .7), 0 5px 14px rgba(0, 0, 0, .55);
      white-space: nowrap;
    }

    .logo-subtitle {
      color: #4fc1ff;
      font-family: 'Poppins', system-ui, -apple-system, sans-serif;
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: .08em;
      text-align: center;
      text-shadow: 0 2px 0 rgba(0, 0, 0, .7), 0 5px 14px rgba(0, 0, 0, .55);
      text-transform: uppercase;
    }

    .nav-list,
    .project-subnav {
      display: flex;
      flex-direction: column;
      gap: .45rem;
      list-style: none;
    }

    .nav-link {
      display: flex;
      width: 100%;
      min-width: 0;
      min-height: 44px;
      align-items: center;
      justify-content: space-between;
      gap: .75rem;
      padding: .7rem .85rem;
      border: 1px solid transparent;
      border-radius: 10px;
      color: var(--muted);
      background: rgba(255, 255, 255, .025);
      font-family: 'Poppins', system-ui, -apple-system, sans-serif;
      font-size: .9rem;
      font-weight: 500;
      line-height: 1.4;
      text-align: left;
      text-decoration: none;
      white-space: normal;
      overflow-wrap: anywhere;
      transition: color .2s ease, background .2s ease, border-color .2s ease,
        transform .2s ease, box-shadow .2s ease;
    }

    button.nav-link {
      cursor: pointer;
    }

    .nav-link:hover,
    .nav-link:focus-visible,
    .project-toggle[aria-expanded='true'] {
      border-color: rgba(55, 148, 255, .35);
      color: #4fc1ff;
      background: linear-gradient(135deg, rgba(55, 148, 255, .14), rgba(0, 122, 204, .04));
      box-shadow: 0 6px 18px rgba(0, 0, 0, .18);
    }

    .nav-link:focus-visible {
      outline: 2px solid #4fc1ff;
      outline-offset: 2px;
    }

    .project-toggle-label {
      min-width: 0;
    }

    .project-chevron {
      width: .55rem;
      height: .55rem;
      flex: 0 0 .55rem;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform: rotate(45deg) translateY(-2px);
      transition: transform .2s ease;
    }

    .project-toggle[aria-expanded='true'] .project-chevron {
      transform: rotate(225deg) translate(-1px, -1px);
    }

    .project-subnav {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: .4rem;
      margin: .5rem 0 .35rem;
      padding-left: .65rem;
      border-left: 1px solid rgba(79, 193, 255, .5);
    }

    .project-subnav[hidden] {
      display: none;
    }

    .project-subnav .nav-link {
      min-height: 40px;
      padding: .55rem .7rem;
      background: rgba(255, 255, 255, .04);
      font-size: .82rem;
    }

    .project-scrim {
      position: fixed;
      z-index: 999;
      inset: 0;
      border: 0;
      background: rgba(10, 14, 18, .08);
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
      cursor: default;
    }

    .project-scrim[hidden] {
      display: none;
    }

    @media (max-width: 768px) {
      .sidebar {
        position: relative;
        width: 100%;
        height: auto;
        max-height: 45vh;
        max-height: 45dvh;
        padding: .8rem 1rem;
        border-right: 0;
        border-bottom: 1px solid var(--border);
      }

      .sidebar.is-expanded {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        max-height: 90vh;
        max-height: 90dvh;
        background: rgba(30, 30, 30, .96);
      }

      .sidebar-header {
        margin-bottom: .55rem;
        padding: .25rem .5rem .65rem;
      }

      .logo {
        gap: .1rem;
      }

      .logo-subtitle {
        font-size: .9rem;
      }

      .nav-list {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: .4rem;
      }

      .nav-item {
        min-width: 0;
      }

      .nav-link {
        width: auto;
        min-height: 38px;
        padding: .5rem .75rem;
        font-size: .8rem;
        transform: none;
      }

      .nav-link:hover,
      .nav-link:focus-visible {
        transform: translateY(-2px);
      }

      .nav-item-projects {
        position: static;
      }

      .project-subnav {
        width: 100%;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin-top: .75rem;
        padding-top: .65rem;
        border-top: 1px solid rgba(79, 193, 255, .35);
        border-left: 0;
      }

      .project-subnav .nav-link {
        width: 100%;
        min-height: 38px;
        font-size: .78rem;
      }

      .project-scrim {
        background: rgba(10, 14, 18, .1);
        -webkit-backdrop-filter: blur(3px);
        backdrop-filter: blur(3px);
      }
    }

    @media (max-width: 480px) {
      .sidebar {
        padding: .65rem .75rem;
      }

      .nav-link {
        min-height: 34px;
        padding: .4rem .6rem;
        font-size: .75rem;
      }

      .project-subnav {
        grid-template-columns: 1fr;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .sidebar,
      .nav-link,
      .project-chevron {
        transition: none;
      }
    }
  `;

  var PAGE_CSS = `
    body {
      margin-left: 300px;
    }

    @media (max-width: 768px) {
      body {
        margin-left: 0;
      }
    }
  `;

  function escapeHTML(value) {
    var div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
  }

  function resolveHref(href) {
    if (href.charAt(0) !== '/') return href;

    var siteRoot = script && script.src
      ? new URL('.', script.src).href
      : new URL('.', window.location.href).href;

    return new URL(href.slice(1), siteRoot).href;
  }

  function buildLink(link, className) {
    var external = link.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';

    return (
      '<li class="nav-item">' +
      '<a href="' + escapeHTML(resolveHref(link.href)) + '" class="nav-link ' + className + '"' + external + '>' +
      '<span>' + escapeHTML(link.label) + '</span>' +
      '</a>' +
      '</li>'
    );
  }

  function buildMarkup() {
    var links = CONFIG.links.map(function (link) {
      return buildLink(link, '');
    }).join('');

    var projects = CONFIG.projects.map(function (link) {
      return buildLink(link, 'project-link');
    }).join('');

    return (
      '<button class="project-scrim" type="button" aria-label="Close project menu" tabindex="-1" hidden></button>' +
      '<aside class="sidebar" aria-label="Site navigation">' +
      '<div class="sidebar-header">' +
      '<div class="logo">' +
      '<span class="logo-name">' + escapeHTML(CONFIG.name) + '</span>' +
      '<span class="logo-subtitle">' + escapeHTML(CONFIG.subtitle) + '</span>' +
      '</div>' +
      '</div>' +
      '<nav aria-label="Portfolio">' +
      '<ul class="nav-list">' +
      links +
      '<li class="nav-item nav-item-projects">' +
      '<button class="nav-link project-toggle" type="button" aria-expanded="false" aria-controls="sidebar-project-links">' +
      '<span class="project-toggle-label">EME6208 Projects</span>' +
      '<span class="project-chevron" aria-hidden="true"></span>' +
      '</button>' +
      '<ul class="project-subnav" id="sidebar-project-links" hidden>' + projects + '</ul>' +
      '</li>' +
      CONFIG.otherLinks.map(function (link) {
        return buildLink(link, '');
      }).join('') +
      '</ul>' +
      '</nav>' +
      '</aside>'
    );
  }

  function mount() {
    if (document.getElementById(HOST_ID)) return;

    var host = document.createElement('div');
    host.id = HOST_ID;

    var shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = '<style>' + SIDEBAR_CSS + '</style>' + buildMarkup();

    document.body.insertBefore(host, document.body.firstChild);

    var sidebar = shadow.querySelector('.sidebar');
    var toggle = shadow.querySelector('.project-toggle');
    var projectLinks = shadow.querySelector('.project-subnav');
    var scrim = shadow.querySelector('.project-scrim');

    function setExpanded(expanded) {
      sidebar.classList.toggle('is-expanded', expanded);
      toggle.setAttribute('aria-expanded', String(expanded));
      projectLinks.hidden = !expanded;
      scrim.hidden = !expanded;
    }

    toggle.addEventListener('click', function () {
      setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
    });

    scrim.addEventListener('click', function () {
      setExpanded(false);
      toggle.focus();
    });

    projectLinks.addEventListener('click', function (event) {
      if (event.target.closest('a')) setExpanded(false);
    });

    shadow.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setExpanded(false);
        toggle.focus();
      }
    });

    if (applyOffset) {
      var style = document.createElement('style');
      style.id = HOST_ID + '-page-style';
      style.textContent = PAGE_CSS;
      document.head.appendChild(style);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
