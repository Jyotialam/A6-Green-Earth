const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("card-container").classList.remove("hidden");
  }
};
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
  manageSpinner(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      removeActiveAll(); /// remove all active
      // add active
      const addActive = document.getElementById(`card-btn`);
      // console.log(clickBtn);
      addActive.classList.add("active"); // add active
      displayAllCards(data.plants);
      manageSpinner(false);
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
                <button onclick="loadPlantDetail(${
                  plant.id
                })" class="text-xl font-bold cursor-pointer">${
      plant.name
    }</button>
                <p class="text-sm">${plant.description.slice(0, 120)}</p>
              <div class="flex justify-between items-center">
                <p class="bg-[#dcfce7] text-xs font-bold px-3 py-1 rounded-full">${
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
  manageSpinner(true);
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
      manageSpinner(false);
    });
};
//modal api load
const loadPlantDetail = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlantDetail(data.plants);
    });
};
//display modal detail
const displayPlantDetail = (plant) => {
  const detailContainer = document.getElementById("details-container");
  detailContainer.innerHTML = `<div
              class="text-left object-cover bg-white rounded-xl p-4  h-fit space-y-3"
            >
              <h1 class="text-2xl font-bold">${plant.name}</h1>
              <img
                class="w-full h-60 object-cover rounded-md shadow-lg"
                src="${plant.image}"
                alt="${plant.name}"
              />
              <p class="text-lg">
                <span class="font-bold">Category:</span> ${plant.category}
              </p>
              <p class="text-lg">
                <span class="font-bold">Price:</span>
                ৳${plant.price}
              </p>
              <p class="text-lg">
                <span class="font-bold">Description:</span>
                ${plant.description}
              </p>
            </div>`;
  document.getElementById("plant_detail_modal").showModal();
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
              <button onclick="loadPlantDetail(${
                plant.id
              })" class="text-xl font-bold cursor-pointer">${
      plant.name
    }</button>
              <p class="text-sm">${plant.description.slice(0, 120)}</p>
              <div class="flex justify-between items-center">
              <p class="bg-[#dcfce7] text-xs px-3 py-1 font-bold rounded-full">${
                plant.category
              }</p>
              <p>৳ ${plant.price}</p>
              </div>  
              <button class="bg-[#15803d] text-white text-sm py-2 px-5 w-full rounded-full cursor-pointer hover:bg-green-500 mt-3 text-center">Add to card
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
              <button id="card-btn-${category.id}" onclick = "loadCategoryCard('${category.id}')" class="un-active cursor-pointer hover:bg-[#6cd191] w-full text-left py-2" >${category.category_name}</button>`;
    categoryContainer.append(categoryDiv);
  });
};
loadAllCards();

loadCategories();
