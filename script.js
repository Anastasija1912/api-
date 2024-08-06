document.addEventListener("DOMContentLoaded", function () {
  const catGallery = document.getElementById("cat-gallery");
  const searchInput = document.getElementById("search-input");

  function fetchCatData() {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=sphy&api_key=${apiKey}")
      .then(response => response.json())
      .then(data => {
        catData = data.map((cat, index) => ({
          id: cat.id,
          url: cat.url,
          name: catNames[index % catNames.length]
        }));
        renderCats(catData);
      })
      .catch(error => console.error("Ошибка загрузки данных:", error));
  }

  const catNames = ["Ричи", "Вайс", "Мотя", "Джеки", "Вест", "Гроу", "Юджи", "Хедер", "Фокси", "Шедоу"];
  function renderCats(cats) {
    catGallery.innerHTML = '';
    cats.forEach(cat => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-2";
      col.innerHTML = ` <div class="card" color="red">
                  <img src="${cat.url}" alt="${cat.name}" class="card-img-top cat-image">
                  <div class="card-body"><h3 class="card-title">${cat.name}</h3>
                  </div>
              </div> `;
      catGallery.appendChild(col);
    });
  }

  function filterCats() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCats = catData.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm)
    );
    renderCats(filteredCats);
  }

  fetchCatData();

  searchInput.addEventListener('input', filterCats);

});
