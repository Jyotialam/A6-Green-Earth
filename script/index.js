// remove active
const removeActiveAll = () => {
  const categoryBtns = document.querySelectorAll(".un-active");
  // console.log(unActiveBtn);
  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.classList.remove("active");
  });
};
// all tree
const loadAllCards = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      removeActiveAll(); /// remove all active
      // add active
      const addActive = document.getElementById(`card-btn`);
      // console.log(clickBtn);
      addActive.classList.add("active"); // add active
      displayAllCards(data.plants);
    });
};
const displayAllCards = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
              <div class="text-left max-h-[450px] object-cover bg-white    rounded-xl p-4 shadow-md h-fit space-y-3">
              <img class="w-full h-40 object-cover rounded-md" src="${
                plant.image
              }" alt="${plant.name}" />
                <h2 class="text-lg font-bold cursor-pointer">${plant.name}</h2>
                <p class="text-sm">${plant.description.slice(0, 120)}</p>
              <div class="flex justify-between items-center">
                <p class="bg-[#dcfce7] text-xs px-3 py-1 rounded-full">${
                  plant.category
                }</p>
                <p>৳ ${plant.price}</p>
              </div>  
            <button
                class="bg-[#15803d] text-white text-sm py-2 px-5 w-full rounded-full cursor-pointer hover:bg-green-500 mt-3 text-center"
              >
                Add to card
              </button>
            </div>`;
    cardContainer.append(card);
  });
};

// categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    });
};
// remove active
const removeActive = () => {
  const categoryBtns = document.querySelectorAll(".un-active");
  // console.log(unActiveBtn);
  categoryBtns.forEach((categoryBtn) => {
    categoryBtn.classList.remove("active");
  });
};
// card
const loadCategoryCard = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); /// remove all active

      // add active
      const addActive = document.getElementById(`card-btn-${id}`);
      // console.log(clickBtn);
      addActive.classList.add("active"); // add active

      displayCategoryCards(data.plants);
    });
};

const displayCategoryCards = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
              <div class="text-left max-h-[450px] object-cover bg-white    rounded-xl p-4 shadow-md h-fit space-y-3">
              <img class="w-full h-40 object-cover rounded-md" src="${
                plant.image
              }" alt="${plant.name}" />
                <h2 class="text-xl font-bold cursor-pointer">${plant.name}</h2>
                <p class="text-lg">${plant.description.slice(0, 120)}</p>
              <div class="flex justify-between items-center">
                <p class="bg-[#dcfce7] text-sm px-3 py-1 rounded-full">${
                  plant.category
                }</p>
                <p>৳ ${plant.price}</p>
              </div>  
            <button
                class="bg-[#15803d] text-white text-sm py-2 px-5 w-full rounded-full cursor-pointer hover:bg-green-500 mt-3 text-center"
              >
                Add to card
              </button>
            </div>`;
    cardContainer.append(card);
  });
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
              <button id="card-btn-${category.id}" onclick = "loadCategoryCard('${category.id}')" class="un-active cursor-pointer w-full text-left py-2" >${category.category_name}</button>`;
    categoryContainer.append(categoryDiv);
  });
};
loadAllCards();

loadCategories();
