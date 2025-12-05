// Wait for the DOM to be fully loaded
window.onload = function() {
    // Get references to the elements
    const lookupButton = document.getElementById('lookup');
    const lookupCitiesButton = document.getElementById('lookup-cities');
    const countryInput = document.getElementById('country');
    const resultDiv = document.getElementById('result');

    // Function to perform AJAX request
    function performLookup(lookupType) {
        // Get the country value from the input
        const country = countryInput.value.trim();

        // Create XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Build the URL with the country parameter and lookup type
        let url = `world.php?country=${encodeURIComponent(country)}`;
        if (lookupType === 'cities') {
            url += '&lookup=cities';
        }

        console.log('Making request to:', url);

        // Configure the request
        xhr.open('GET', url, true);

        // Set up the callback for when the request completes
        xhr.onreadystatechange = function() {
            console.log('ReadyState:', xhr.readyState, 'Status:', xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Response received:', xhr.responseText.substring(0, 100));
                    // Update the result div with the response
                    resultDiv.innerHTML = xhr.responseText;
                    console.log('AJAX request successful - result div updated');
                } else {
                    console.error('AJAX request failed with status:', xhr.status);
                    resultDiv.innerHTML = '<p>Error loading data. Please try again.</p>';
                }
            }
        };

        // Send the request
        xhr.send();
    }

    // Add click event listener to the lookup country button
    lookupButton.addEventListener('click', function() {
        performLookup('countries');
    });

    // Add click event listener to the lookup cities button
    if (lookupCitiesButton) {
        lookupCitiesButton.addEventListener('click', function() {
            console.log('Lookup Cities button clicked');
            performLookup('cities');
        });
    } else {
        console.error('Lookup Cities button not found');
    }

    // Optional: Allow Enter key to trigger lookup
    countryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            lookupButton.click();
        }
    });
};
