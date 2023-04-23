// Custom Scripts

// Here is request to api and infinite scroll 
//-----------------------------------------
//
const cardContainer = document.getElementById("card-container");
const loading = document.getElementById("loading");
let page = 1;

// Promise for loop picsum object to cards
const loadCards = async () => {
  try {

    // Set the api url with page counter variable
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=6`
    );

    // Convert to JSON
    const data = await response.json();

    // Loop recieved object to cards
    data.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add('col-md-6', 'mb-4');
      cardElement.innerHTML = `
                <div class="card">
                  <img
                    src="${card.download_url}"
                    class="card-img-top"
                    alt="${card.author}"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${card.author}</h5>
                    <p class="card-text">${card.width} x ${card.height}</p>
                  </div>
                  <div class="card-footer py-4">
                    <a href="#" style="--djn-btn-color: #fff" class="btn btn-primary me-3">Save to collection</a>
                    <a href="#" class="btn btn-outline-dark">Share</a>
                  </div>
                </div>
      `;

      // Pass item to container
      cardContainer.appendChild(cardElement);
    });

    // Increment page counter
    page++;
  } catch (error) {
    console.error(error);
  }
};

// Here used just easy but not best solution,
// using some library would be better for good performance
const handleScroll = () => {

  // Destructure needed properties
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Calculate distance between top of visible and top of general document,
  // add whole height of document to detect when client reach bottom
  // to trigger loading, by add .show (default bootstrap class) 
  // and call card render again after timeout
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loading.classList.add("show");
    setTimeout(() => {
      loading.classList.remove("show");
      loadCards();
    }, 500);
  }
};

// Set listener to call handleScroll() function while scrolling
window.addEventListener("scroll", handleScroll);

// Init
loadCards();


// Dark Light theme switcher
const checkbox = document.getElementById('darkLightSwitch');
checkbox.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }
});