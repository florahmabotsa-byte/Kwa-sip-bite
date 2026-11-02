document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome to Kwa Sip & Bite!");

});// Kwa Sip & Bite - Part 3 JavaScript

document.addEventListener("DOMContentLoaded", function () {
    console.log("Welcome to Kwa Sip & Bite!");

    // Interactive food gallery
    const galleryImages = document.querySelectorAll(".gallery img");

    galleryImages.forEach(function (image) {
        image.style.cursor = "pointer";

        image.addEventListener("click", function () {
            const lightbox = document.createElement("div");

            lightbox.style.position = "fixed";
            lightbox.style.top = "0";
            lightbox.style.left = "0";
            lightbox.style.width = "100%";
            lightbox.style.height = "100%";
            lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
            lightbox.style.display = "flex";
            lightbox.style.justifyContent = "center";
            lightbox.style.alignItems = "center";
            lightbox.style.zIndex = "1000";
            lightbox.style.cursor = "pointer";

            const largeImage = document.createElement("img");
            largeImage.src = image.src;
            largeImage.alt = image.alt;
            largeImage.style.maxWidth = "90%";
            largeImage.style.maxHeight = "85%";
            largeImage.style.objectFit = "contain";

            lightbox.appendChild(largeImage);
            document.body.appendChild(lightbox);

            lightbox.addEventListener("click", function () {
                lightbox.remove();
            });
        });
    });
});
// Kwa Sip & Bite - Menu Search, Filtering and Sorting

const menuSearch = document.getElementById("menuSearch");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");
const menuMessage = document.getElementById("menuMessage");

if (menuSearch && categoryFilter && priceSort && menuMessage) {

    const menuSections = Array.from(
        document.querySelectorAll("main section")
    ).filter(section =>
        section.querySelector("h3") &&
        section.querySelector("ul")
    );

    function updateMenu() {
        const searchText = menuSearch.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;
        const sortOrder = priceSort.value;

        let visibleItems = 0;

        menuSections.forEach(section => {
            const heading = section.querySelector("h3");
            const list = section.querySelector("ul");

            const category = heading.textContent.trim();
            const items = Array.from(list.querySelectorAll("li"));

            const categoryMatches =
                selectedCategory === "all" ||
                category === selectedCategory;

            // Sort items by their displayed price.
            if (sortOrder !== "default") {
                items.sort((a, b) => {
                    const priceA = Number(
                        (a.textContent.match(/R\s*(\d+(?:\.\d{2})?)/i) || [0, 0])[1]
                    );

                    const priceB = Number(
                        (b.textContent.match(/R\s*(\d+(?:\.\d{2})?)/i) || [0, 0])[1]
                    );

                    return sortOrder === "low-high"
                        ? priceA - priceB
                        : priceB - priceA;
                });

                items.forEach(item => list.appendChild(item));
            }

            let sectionHasVisibleItems = false;

            items.forEach(item => {
                const matchesSearch = item.textContent
                    .toLowerCase()
                    .includes(searchText);

                const shouldShow =
                    categoryMatches && matchesSearch;

                item.hidden = !shouldShow;

                if (shouldShow) {
                    visibleItems++;
                    sectionHasVisibleItems = true;
                }
            });

            section.hidden = !sectionHasVisibleItems;
        });

        if (visibleItems === 0) {
            menuMessage.textContent =
                "No matching food or drinks found. Try another search.";
        } else {
            menuMessage.textContent =
                visibleItems + " menu item(s) found.";
        }
    }

    menuSearch.addEventListener("input", updateMenu);
    categoryFilter.addEventListener("change", updateMenu);
    priceSort.addEventListener("change", updateMenu);

    updateMenu();
}
// Order Form Validation
// Kwa Sip & Bite Menu Prices
const prices = {
    beefBurger: 65,
    bbqBaconBurger: 85,
    seafoodBoil: 190,
    icedLatte: 30,
    blueberryMocktail: 40,
    passionMocktail: 40,
    oreoFrappe: 45,
    amarulaLatte: 60,
    passionLemonade: 60,
    ginTonic: 55,
    blueLagoon: 65,
    loadedFries: 50,
    dagwoodFries: 65,
    taco: 70,
    chipotleBurrito: 120,
    burritoCombo: 120,
    dagwoodCombo: 170
};

// Order Form Validation
const orderForm = document.getElementById("orderForm");

if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const order = document.getElementById("order");
        const quantity = Number(document.getElementById("quantity").value);
        const instructions = document.getElementById("instructions").value.trim();

        // Validate full name
        if (fullname.length < 2) {
            alert("Please enter your full name.");
            return;
        }

        // Validate phone number
        const phonePattern = /^(?:\+27|0)[6-8][0-9]{8}$/;

        if (!phonePattern.test(phone.replace(/\s+/g, ""))) {
            alert("Please enter a valid South African mobile number.");
            return;
        }

        // Validate meal selection
        if (order.value === "") {
            alert("Please select a meal.");
            return;
        }

        // Validate quantity
        if (!Number.isInteger(quantity) || quantity < 1) {
            alert("Please enter a quantity of at least 1.");
            return;
        }

        // Seafood Boil is available on Sundays only
        if (order.value === "seafoodBoil" &&
            new Date().getDay() !== 0) {
            alert("Seafood Boil is only available on Sundays.");
            return;
        }

        // Calculate order total
        const itemPrice = prices[order.value];
        const total = itemPrice * quantity;

        // Display order summary
        const summary = document.getElementById("orderSummary");

        summary.textContent =
            "ORDER SUMMARY\n" +
            "Customer: " + fullname + "\n" +
            "Phone: " + phone + "\n" +
            "Meal: " + order.options[order.selectedIndex].text + "\n" +
            "Unit Price: R" + itemPrice + "\n" +
            "Quantity: " + quantity + "\n" +
            "TOTAL: R" + total + "\n" +
            "Special Instructions: " + (instructions || "None") +
            "\n\nYour order details have been received successfully!";

        orderForm.reset();
    });
}

// Contact Form Validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const feedback = document.getElementById("contactFeedback");

        if (name === "" || email === "" || message === "") {
            feedback.textContent = "Please complete all fields.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            feedback.textContent = "Please enter a valid email address.";
            return;
        }

        feedback.textContent =
            "Thank you, " + name +
            "! Your message details are valid. This demonstration has not sent your message.";

        contactForm.reset();
    });
}
// Contact Form Validation
const contactForm = document.getElementById("contactform");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate name
        if (name.length < 2) {
            alert("Please enter your full name.");
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate message
        if (message.length < 10) {
            alert("Please enter a message with at least 10 characters.");
            return;
        }

        // Display confirmation
        const feedback = document.getElementById("contactFeedback");

        feedback.textContent =
            "Thank you, " + name +
            "! Your message has been received successfully.";

        contactForm.reset();
    });
}