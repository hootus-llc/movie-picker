export async function fetchData(movieTitle) {
    const url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=cb64a76e`;
    
    // Basic Fetch
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.Error || data.Response === 'False') {
            localStorage.setItem(movieTitle, JSON.stringify({ Title: movieTitle}))
        } else {
            localStorage.setItem(movieTitle, JSON.stringify(data))
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
