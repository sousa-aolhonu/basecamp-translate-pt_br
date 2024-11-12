// ==UserScript==
// @name         Basecamp Translate (pt-BR)
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  Interface do Basecamp traduzida e ajustada para o pt-BR
// @author       Saon
// @match        *://*.basecamp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Função para alterar o texto de um elemento
    function alterarTexto(link, textoOriginal, textoNovo) {
        if (link) {
            link.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === textoOriginal) {
                    node.textContent = textoNovo;
                }
            });
        }
    }

    // Função para aplicar todas as traduções necessárias
    function aplicarTraducoes() {
        // Traduções de links e botões
        const homeLink = document.querySelector('.nav__link--home');
        if (homeLink) alterarTexto(homeLink, "Home", "Início");

        const activityLink = document.querySelector('.nav__link--activity');
        if (activityLink) alterarTexto(activityLink, "Activity", "Atividade");

        // Traduzir o "My Stuff" para "Minhas Coisas"
        document.querySelectorAll('.u-hide-on-media-small').forEach(span => {
            if (span.textContent.trim() === "My Stuff") {
                span.textContent = "Minhas Coisas";
            }
        });

        // Traduzir o link "Find" para "Pesquisar"
        document.querySelectorAll('a.nav__link--search').forEach(link => {
            if (link && link.innerHTML.includes('Find')) {
                link.innerHTML = link.innerHTML.replace('Find', 'Pesquisar');
            }
        });

        // Traduzir botões específicos
        document.querySelectorAll('a.btn--primary[href*="/projects/new"]').forEach(link => {
            if (link && link.textContent.trim() === "Make a new project") {
                link.textContent = "Criar um novo projeto";
            }
        });

        document.querySelectorAll('a.btn--primary[href*="/enrollments/new"]').forEach(link => {
            if (link && link.textContent.trim() === "Invite people") {
                link.textContent = "Convidar pessoas";
            }
        });

        // Traduzir links de visualização de projetos e modelos
        document.querySelectorAll('a.decorated[href*="/projects/directory"]').forEach(link => {
            if (link && link.textContent.trim() === "View all in a list") {
                link.textContent = "Ver todos em uma lista";
            }
        });

        document.querySelectorAll('a.decorated[href*="/templates"]').forEach(link => {
            if (link && link.textContent.trim() === "View templates") {
                link.textContent = "Ver modelos";
            }
        });

        // Traduzir o atalho de teclado "Ctrl+J"
        document.querySelectorAll('a.btn__keyboard-shortcut[data-behavior="show_jump_menu_button"]').forEach(link => {
            if (link && link.innerHTML.includes("Ctrl+J")) {
                if (!link.innerHTML.includes("Pressione")) {  // Verifica se a tradução já foi feita
                    link.innerHTML = link.innerHTML.replace('Press', 'Pressione').replace('anytime to jump', 'a qualquer momento para pular');
                }
            }
        });

        // Traduzir o parágrafo "Pinned & recent projects below"
        document.querySelectorAll('p.txt--x-small.push--ends.centered').forEach(paragraph => {
            if (paragraph.textContent.includes("Pinned & recent projects below")) {
                if (!paragraph.innerHTML.includes("Projetos fixados e recentes abaixo")) {  // Verifica se a tradução já foi feita
                    paragraph.innerHTML = paragraph.innerHTML.replace('Pinned &amp; recent projects below', 'Projetos fixados e recentes abaixo');
                }
            }
        });

        // Traduzir o conteúdo do <span class="hide_on_mobile">
        document.querySelectorAll('span.hide_on_mobile').forEach(span => {
            if (span.innerHTML.includes("Press")) {
                if (!span.innerHTML.includes("Pressione")) {  // Evita repetição
                    span.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE) {
                            node.textContent = node.textContent.replace('· Press', '· Pressione').replace('anytime to jump', 'a qualquer momento para pular');
                        }
                    });
                }
                // Altera especificamente o texto do link "Ctrl+J", mantendo formatação
                const link = span.querySelector('a.btn__keyboard-shortcut[data-behavior="show_jump_menu_button"]');
                if (link && link.querySelector('span[data-role="jump-menu-modifier-key"]')) {
                    const modifierSpan = link.querySelector('span[data-role="jump-menu-modifier-key"]');
                    if (modifierSpan && modifierSpan.textContent.trim() === 'Ctrl+') {
                        // Mantemos "Ctrl+" como está
                    }
                }
            }
        });
    }

    // Aplica as traduções ao carregar a página
    window.addEventListener('load', aplicarTraducoes);

    // MutationObserver para observar alterações no DOM e reaplicar as traduções
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // Se nós forem adicionados, aplica as traduções
            if (mutation.addedNodes.length > 0) {
                aplicarTraducoes();
            }
        });
    });

    // Configura o observer para observar mudanças no corpo da página
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
