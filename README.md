# yatravel - Travel Agency Website

This is a modern, responsive, and feature-rich website for a travel agency named "yatravel". The site is built with pure HTML, CSS, and "vanilla" JavaScript, demonstrating a clean, multi-page static site with advanced dynamic features and third-party API integrations.


## Live Demo

(Link to your live demo once you deploy it on services like Netlify, Vercel, or GitHub Pages)

## Features

This project is more than just a static page. It includes a variety of dynamic and user-friendly features:

### Core Layout & UI
* **Fully Responsive:** Looks great on all devices, from mobile phones to desktops.
* **Sticky Navigation:** The header sticks to the top on scroll for easy navigation.
* **Smooth Scroll Animations:** Cards and sections gracefully fade in as the user scrolls down.
* **"Go to Top" Button:** Appears on scroll to quickly return to the top of the page.

### Interactive Modules
* **User Authentication (Clerk.js):** Complete user login and sign-up functionality powered by Clerk.js, with dedicated `/login.html` and `/signup.html` pages.
* **Newsletter Form (Formspree):** A functional newsletter subscription form in the footer that:
    * Validates for a correct email format.
    * Sends the email to your personal account via a Formspree backend.
    * Shows real-time success/error messages to the user.
* **Dynamic Package Filtering:** On the homepage, users can filter the "Popular Packages" by category (All, Mountains, Beach, etc.) without a page reload.
* **Interactive Tour Search:**
    * "Book Now" buttons scroll the user to the form and pre-fill the destination.
    * The form validates dates in real-time (e.g., check-out must be after check-in, no past dates).
* **Testimonials Slider:** A swipe-friendly (on mobile) and clickable (on desktop) slider to display customer reviews.
* **Gallery Lightbox:** All gallery images can be clicked to open in a full-screen, high-resolution modal.

## Tech Stack

This project was built using:
* **HTML5:** For semantic markup and structure.
* **CSS3:** For all styling, using Custom Properties (Variables) for easy theme management.
* **JavaScript (ES6+):** For all interactivity, including form validation, DOM manipulation, and API calls. No jQuery or frameworks used (except for integrations).
* **[Formspree](https://formspree.io/):** As a serverless backend to handle the newsletter form submissions.
* **[Ionicons](https://ionicons.com/):** For clean and modern icons.

## File Structure