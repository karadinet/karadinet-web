document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Basic form submission handling for the contact form
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // In a real scenario, you would send this data to a server
            // via AJAX (fetch API or XMLHttpRequest)
            // For now, we'll just simulate a success message.

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Form submitted:', { name, email, message });

            // Simulate success
            formStatus.textContent = 'Thank you for your message! We will get back to you shortly.';
            formStatus.style.color = 'green';
            contactForm.reset(); // Clear the form

            // You could also show an error:
            // formStatus.textContent = 'There was an error sending your message. Please try again.';
            // formStatus.style.color = 'red';
        });
    }
})

// Get all elements with class 'mySlides'
        const slides = document.querySelectorAll('.mySlides');
        let slideIndex = 0; // Keep track of the current slide

        /**
         * Function to display a specific slide.
         * Hides all slides and then shows the one at the given index.
         * @param {number} n - The index of the slide to display.
         */
        function showSlides() {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });

            // Increment slideIndex, reset to 0 if it exceeds the number of slides
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1; // Go back to the first slide
            }

            // Show the current slide (adjusted for 0-based index)
            slides[slideIndex - 1].classList.add('active');

            // Call showSlides again after 3 seconds (3000 milliseconds)
            setTimeout(showSlides, 3000);
        }

        // Start the slideshow when the window loads
        window.onload = function() {
            // Initially display the first slide before the timer starts
            // The first slide is already active by default in HTML
            // This ensures a smooth start and the timer will then cycle through
            showSlides();
        };

        // JavaScript for Weather Forecast
        // IMPORTANT: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.
        // You can get one for free at: https://openweathermap.org/
        const API_KEY = 'YOUR_API_KEY'; // <-- REMEMBER TO REPLACE THIS!
        const BASE_URL = 'https://weather.com/';

        const cityInput = document.getElementById('city-input');
        const getWeatherBtn = document.getElementById('get-weather-btn');
        const cityNameElement = document.getElementById('city-name');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        const weatherIconElement = document.getElementById('weather-icon');
        const errorMessageElement = document.getElementById('error-message');
        const weatherDisplayArea = document.getElementById('weather-display');

        getWeatherBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeatherData(city);
            } else {
                displayError('Please enter a city name.');
            }
        });

        async function fetchWeatherData(city) {
            // Clear previous data and errors
            cityNameElement.textContent = '';
            temperatureElement.textContent = '';
            descriptionElement.textContent = '';
            weatherIconElement.src = '';
            weatherIconElement.classList.add('hidden');
            errorMessageElement.classList.add('hidden');
            weatherDisplayArea.classList.remove('has-data'); // Remove class that might show/hide

            const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`; // units=metric for Celsius

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (response.ok) {
                    displayWeatherData(data);
                } else {
                    displayError(data.message || 'City not found. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                displayError('Could not retrieve weather data. Please try again later.');
            }
        }

        function displayWeatherData(data) {
            cityNameElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Weather icon
            const iconCode = data.weather[0].icon;
            weatherIconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIconElement.alt = data.weather[0].description;
            weatherIconElement.classList.remove('hidden');

            weatherDisplayArea.classList.add('has-data'); // Add class to show data
        }

        function displayError(message) {
            errorMessageElement.textContent = message;
            errorMessageElement.classList.remove('hidden');
            weatherDisplayArea.classList.remove('has-data'); // Ensure data area is hidden
        }
    