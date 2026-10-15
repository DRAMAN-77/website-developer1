
"use strict";

// ========================================
// CREATIVE WEB DESIGNER PORTFOLIO
// Website interactions
// ========================================


// 1. AUTOMATIC COPYRIGHT YEAR

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// 2. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function closeNavigation() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        document.body.classList.toggle("menu-open", isOpen);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeNavigation();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) {
            closeNavigation();
        }
    });
}


// 3. PORTFOLIO FILTERS

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(function (filterButton) {
            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });

        projectCards.forEach(function (card) {
            const projectCategory = card.dataset.category;

            const shouldShow =
                selectedCategory === "all" ||
                projectCategory === selectedCategory;

            card.hidden = !shouldShow;
        });
    });
});


// 4. WHATSAPP CONTACT SETTINGS

/*
    Replace the example number below with your real WhatsApp
    number in international format.

    Example format for Ghana:
    233XXXXXXXXX

    Do not include the + sign, spaces or hyphens.
*/

const WHATSAPP_NUMBER = "233000000000";

function createWhatsAppLink(message) {
    const numberIsConfigured =
        /^\d{10,15}$/.test(WHATSAPP_NUMBER) &&
        !WHATSAPP_NUMBER.endsWith("0000000000");

    if (!numberIsConfigured) {
        return null;
    }

    return (
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message)
    );
}


// Configure the floating WhatsApp button
const whatsappFloat = document.getElementById("whatsappFloat");

if (whatsappFloat) {
    const generalMessage =
        "Hello! I visited your portfolio and would like to discuss a website design project.";

    const whatsappUrl = createWhatsAppLink(generalMessage);

    if (whatsappUrl) {
        whatsappFloat.href = whatsappUrl;
    } else {
        whatsappFloat.href = "#contact";
        whatsappFloat.removeAttribute("target");
        whatsappFloat.removeAttribute("rel");
    }
}


// 5. SERVICE REQUEST BUTTONS

document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function (event) {
        const serviceName = link.dataset.service;

        const message =
            "Hello! I am interested in your " +
            serviceName +
            " service. Please share more information.";

        const whatsappUrl = createWhatsAppLink(message);

        if (whatsappUrl) {
            event.preventDefault();
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        }
    });
});


// 6. PORTFOLIO PROJECT CONTACT LINKS

document.querySelectorAll("[data-project]").forEach(function (link) {
    link.addEventListener("click", function (event) {
        const projectName = link.dataset.project;

        const message =
            "Hello! I would like to discuss a project similar to your " +
            projectName +
            ".";

        const whatsappUrl = createWhatsAppLink(message);

        if (whatsappUrl) {
            event.preventDefault();
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        }
    });
});


// 7. CONTACT FORM: SEND DETAILS THROUGH WHATSAPP

const contactForm = document.getElementById("contactForm");
const contactMessage = document.getElementById("contactMessage");

if (contactForm && contactMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const clientName =
            document.getElementById("clientName").value.trim();

        const clientEmail =
            document.getElementById("clientEmail").value.trim();

        const projectType =
            document.getElementById("projectType").value;

        const projectDetails =
            document.getElementById("projectMessage").value.trim();

        const message = [
            "Hello! I have a new website project enquiry.",
            "",
            "Name: " + clientName,
            "Email: " + clientEmail,
            "Service: " + projectType,
            "Project details: " + projectDetails
        ].join("\n");

        const whatsappUrl = createWhatsAppLink(message);

        if (!whatsappUrl) {
            contactMessage.textContent =
                "Please configure your WhatsApp number in script.js before sending enquiries.";

            return;
        }

        contactMessage.textContent =
            "Opening WhatsApp. Review and send your message there.";

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
}
