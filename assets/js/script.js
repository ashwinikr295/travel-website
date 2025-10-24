'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});


/**
 * ========================================
 * NEW MODULE: Testimonial Slider
 * ========================================
 */

const slider = document.querySelector("[data-slider]");
const prevBtn = document.querySelector("[data-slider-prev]");
const nextBtn = document.querySelector("[data-slider-next]");

// Check if the slider element exists before running the code
if (slider) {

  // Get the width of a single slide
  const slideWidth = () => slider.querySelector(".testimonial-slide").clientWidth;
  
  // Get the gap from your CSS (it's 20px)
  const gap = () => 20; 

  const slideNext = () => {
    // Scroll right by the width of one slide + the gap
    slider.scrollBy({ left: slideWidth() + gap(), behavior: 'smooth' });
  };

  const slidePrev = () => {
    // Scroll left by the width of one slide + the gap
    slider.scrollBy({ left: -(slideWidth() + gap()), behavior: 'smooth' });
  };

  // Attach the events to the buttons
  nextBtn.addEventListener("click", slideNext);
  prevBtn.addEventListener("click", slidePrev);
}



/**
 * ========================================
 * NEW MODULE: Gallery Lightbox
 * ========================================
 */

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImg = document.querySelector("[data-lightbox-img]");
const lightboxCloseBtn = document.querySelector("[data-lightbox-close]");
const galleryLinks = document.querySelectorAll(".gallery-link");

// Function to open the lightbox
const openLightbox = function (e) {
  e.preventDefault(); // Stop the link from trying to navigate to the image file
  const imgSrc = this.getAttribute("href");
  lightboxImg.setAttribute("src", imgSrc);
  lightbox.classList.add("active");
}

// Function to close the lightbox
const closeLightbox = function () {
  lightbox.classList.remove("active");
}

// Check if lightbox elements exist before adding listeners
if (galleryLinks.length > 0 && lightbox && lightboxImg && lightboxCloseBtn) {

  // Add click event to all gallery links
  galleryLinks.forEach(link => {
    link.addEventListener("click", openLightbox);
  });
  
  // Add click event to close button
  lightboxCloseBtn.addEventListener("click", closeLightbox);
  
  // Add click event to lightbox background (to close it)
  lightbox.addEventListener("click", function (e) {
    // Only close if the click is on the dark background itself,
    // not on the image.
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

}

/**
 * ========================================
 * NEW MODULE: Tour Search Form Validation
 * ========================================
 */

const tourSearchForm = document.querySelector("[data-search-form]");
const formError = document.querySelector("[data-form-error]");

if (tourSearchForm) {

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Set the minimum checkin date to today
  const checkinInput = tourSearchForm.querySelector("#checkin");
  const checkoutInput = tourSearchForm.querySelector("#checkout");
  checkinInput.setAttribute('min', today);

  // Validation on checkin date change
  checkinInput.addEventListener('change', () => {
    // Set the minimum checkout date to be the selected checkin date
    checkoutInput.setAttribute('min', checkinInput.value);

    // If checkout is earlier than new checkin, clear it
    if (new Date(checkoutInput.value) < new Date(checkinInput.value)) {
      checkoutInput.value = "";
    }
  });

  // Handle form submission
  tourSearchForm.addEventListener("submit", function (e) {
    
    // Clear previous errors
    formError.classList.remove("active");
    checkinInput.classList.remove("invalid");
    checkoutInput.classList.remove("invalid");
    
    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    let errorMessage = "";

    if (checkinDate >= checkoutDate) {
      // Check if checkout is before or same as checkin
      errorMessage = "Checkout date must be after your checkin date.";
      checkoutInput.classList.add("invalid");
    } else if (checkinDate < new Date(today)) {
      // This is a fallback, but 'min' attribute should handle it
      errorMessage = "Checkin date cannot be in the past.";
      checkinInput.classList.add("invalid");
    }

    if (errorMessage) {
      e.preventDefault(); // Stop the form from submitting
      formError.textContent = errorMessage;
      formError.classList.add("active");
    }
    
    // If no error, the form will submit as normal.
    // In a real project, you would send this data to a server.
  });
}

/**
 * ========================================
 * NEW MODULE: "Book Now" Scroll & Pre-fill
 * ========================================
 */

const bookNowBtns = document.querySelectorAll("[data-scroll-to]");
const destinationInput = document.querySelector("#destination");

if (bookNowBtns.length > 0 && destinationInput) {

  bookNowBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault(); // Stop any default button behavior

      // 1. Get the target section ID
      const targetId = this.getAttribute("data-scroll-to"); // e.g., "#tour-search"
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // 2. Scroll smoothly to the target section
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // 3. Check for and pre-fill the destination
      const destination = this.getAttribute("data-destination");
      if (destination) {
        destinationInput.value = destination;
      }
      
    });
  });

}

/**
 * ========================================
 * NEW MODULE: Package Filter
 * ========================================
 */

const filterBtns = document.querySelectorAll("[data-filter]");
const packageList = document.querySelector("[data-package-list]");

if (filterBtns.length > 0 && packageList) {
  const packageItems = packageList.querySelectorAll("li");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      
      // 1. Remove 'active' class from all buttons
      filterBtns.forEach(b => b.classList.remove("active"));
      // 2. Add 'active' class to the clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      // 3. Filter the package items
      packageItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
      
    });
  });
}



/**
 * ========================================
 * UPDATED MODULE 8: Newsletter Form Validation (with Formspree)
 * ========================================
 */

const newsletterForm = document.querySelector("[data-newsletter-form]");
const newsletterMessage = document.querySelector("[data-form-message]");

if (newsletterForm && newsletterMessage) {
  
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop form from submitting normally

    const emailInput = this.querySelector("input[type='email']");
    const emailValue = emailInput.value.trim();
    const formData = new FormData(this); // Get form data
    
    // Simple regex for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous messages and states
    newsletterMessage.classList.remove("success", "error");
    emailInput.classList.remove("invalid");

    if (emailValue === "") {
      newsletterMessage.textContent = "Please enter your email address.";
      newsletterMessage.classList.add("error");
      emailInput.classList.add("invalid");
    } else if (!emailPattern.test(emailValue)) {
      newsletterMessage.textContent = "Please enter a valid email address.";
      newsletterMessage.classList.add("error");
      emailInput.classList.add("invalid");
    } else {
      // --- START: New Formspree Submission Code ---
      
      // Show a "sending..." message
      newsletterMessage.textContent = "Sending...";
      newsletterMessage.classList.add("success"); // Use 'success' style for sending
      
      fetch(newsletterForm.getAttribute("action"), {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Success!
          newsletterMessage.textContent = "Thank you for subscribing!";
          newsletterMessage.classList.add("success");
          emailInput.value = ""; // Clear the input field
          
          // Remove success message after 3 seconds
          setTimeout(() => {
            newsletterMessage.classList.remove("success");
          }, 3000);
        } else {
          // Handle server errors
          newsletterMessage.textContent = "Oops! Something went wrong.";
          newsletterMessage.classList.add("error");
        }
      })
      .catch(error => {
        // Handle network errors
        console.error('Error:', error);
        newsletterMessage.textContent = "Network error. Please try again.";
        newsletterMessage.classList.add("error");
      });
      // --- END: New Formspree Submission Code ---
    }
  });
}

