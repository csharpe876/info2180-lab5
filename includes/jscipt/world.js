// Wait for the DOM to be fully loaded
window.onload = function() {
    // Get references to the elements
    const lookupButton = document.getElementById('lookup');
    const countryInput = document.getElementById('country');
    const resultDiv = document.getElementById('result');

    // Add click event listener to the lookup button
    lookupButton.addEventListener('click', function() {
        // Get the country value from the input
        const country = countryInput.value.trim();

        // Create XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Build the URL with the country parameter
        const url = `world.php?country=${encodeURIComponent(country)}`;

        // Configure the request
        xhr.open('GET', url, true);

        // Set up the callback for when the request completes
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Update the result div with the response
                resultDiv.innerHTML = xhr.responseText;
            }
        };

        // Send the request
        xhr.send();
    });

    // Optional: Allow Enter key to trigger lookup
    countryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            lookupButton.click();
        }
    });
};
