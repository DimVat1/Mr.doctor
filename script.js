

document.addEventListener('DOMContentLoaded', function () {
    const symptomsInput = document.getElementById('symptomsInput');
    const submitSymptoms = document.getElementById('submitSymptoms');
    const googleResponse = document.getElementById('googleResponse');
    const searchEngineId = '068ca60f22f294386'; // Replace with your actual Search Engine ID
    const apiKey = 'AIzaSyDPVqP6l-NdTAJ1Zg5oKFiLORz-M5tDZvE'; // Replace with your Google API key

    const isMouseTrackingEnabled = window.innerWidth > 600;
    let circularCursor;

    if (isMouseTrackingEnabled) {
        circularCursor = document.createElement('div');
        circularCursor.classList.add('circular-cursor');
        document.body.appendChild(circularCursor);

        document.addEventListener('mousemove', function (e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            circularCursor.style.left = mouseX + 'px';
            circularCursor.style.top = mouseY + 'px';
        });
    }

    submitSymptoms.addEventListener('click', function () {
        const userSymptoms = symptomsInput.value;

        // Clear previous Google search results
        googleResponse.innerHTML = '';

        // Perform Google Search
        performGoogleSearch(userSymptoms);
    });

    function performGoogleSearch(query) {
        const googleSearchUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${searchEngineId}&key=${apiKey}`;

        fetch(googleSearchUrl)
            .then(response => response.json())
            .then(data => {
                // Process and display search results
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('Google Search API Error:', error);
            });
    }

    function displaySearchResults(data) {
        // Check if there are search results
        if (data.items && data.items.length > 0) {
            // Loop through the search results
            data.items.forEach(item => {
                // Create a container for each search result
                const resultContainer = document.createElement('div');
                resultContainer.classList.add('search-result');

                // Create a title element for the search result
                const titleElement = document.createElement('h3');
                titleElement.textContent = item.title;

                // Create a link to the search result
                const linkElement = document.createElement('a');
                linkElement.href = item.link;
                linkElement.textContent = item.link;

                // Create a snippet element for the search result
                const snippetElement = document.createElement('p');
                snippetElement.textContent = item.snippet;

                // Append the elements to the result container
                resultContainer.appendChild(titleElement);
                resultContainer.appendChild(linkElement);
                resultContainer.appendChild(snippetElement);

                // Append the result container to the Google response box
                googleResponse.appendChild(resultContainer);
            });
        } else {
            // Display a message when there are no search results
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No search results found.';
            googleResponse.appendChild(noResultsMessage);
        }
    }
});
