const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const recipeContainer = document.querySelector("#recipeContainer");
const message = document.querySelector("#message");

searchBtn.addEventListener("click", searchRecipes);

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchRecipes();
    }
});

recipeContainer.replaceChildren();
message.textContent = "Search for a recipe to get started.";

async function searchRecipes() {
    const query = searchInput.value.trim();

    if (!query) {
        message.textContent = "Enter a recipe name to search.";
        return;
    }

    message.textContent = "Searching recipes...";
    recipeContainer.replaceChildren();

    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
        );
        if (!response.ok) {
            throw new Error("Search failed");
        }

        const data = await response.json();
        renderRecipes(data.meals || []);
    } catch {
        message.textContent = "Could not load recipes. Check your connection and try again.";
    }
}

function renderRecipes(meals) {
    if (meals.length === 0) {
        message.textContent = "No recipes found. Try another search.";
        return;
    }

    message.textContent = `${meals.length} recipe${meals.length === 1 ? "" : "s"} found.`;

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "cards";
        const image = document.createElement("img");
        image.src = meal.strMealThumb;
        image.alt = meal.strMeal;
        const content = document.createElement("div");
        content.className = "recipeContent";
        const title = document.createElement("h2");
        title.textContent = meal.strMeal;
        const category = document.createElement("p");
        category.textContent = `Category: ${meal.strCategory || "Not specified"}`;
        const cuisine = document.createElement("p");
        cuisine.textContent = `Cuisine: ${meal.strArea || "Not specified"}`;
        const viewButton = document.createElement("button");
        viewButton.type = "button";
        viewButton.className = "view";
        viewButton.textContent = "View Recipe";
        viewButton.addEventListener("click", () => {
            alert(`${meal.strMeal}\n\n${meal.strInstructions || "No instructions available."}`);
        });

        content.append(title, category, cuisine, viewButton);
        card.append(image, content);
        recipeContainer.append(card);
    });
}

