/*
 * RECIPENEST — CORE APPLICATION LOGIC
 * ------------------------------------------------------------
 * Handles pantry ingredients, recipe matching, the original
 * single-meal selections, and grocery-list interactions.
 * The recipe collection itself is defined in recipes.js.
 */


/*
==================================================
RECIPENEST V1 - MAIN JAVASCRIPT
Beginner-friendly interactions

The recipe database is loaded from recipes.js.
==================================================
*/


// ================================================
// 1. MAIN WEBSITE DATA
// ================================================

// Default pantry ingredients for demonstration.
// Users can remove these and add their own.

let pantry = [];

// One recipe can be selected for each meal.

let mealPlan = {
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snack: null
};

// Current category filter.

let currentCategory = "All";

// Used when someone clicks an Add button
// inside a meal planner slot.

let selectedSlot = null;


// ================================================
// 2. HELPER FUNCTIONS
// ================================================

// Short way to select an HTML element by ID.

// DOM helper: safely retrieve an element by its HTML id.
function getElement(id) {
    return document.getElementById(id);
}


// Make ingredient names look attractive.

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


// Display a small notification.

function showToast(message) {

    const toast = getElement("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}


// ================================================
// 3. PANTRY MANAGEMENT
// ================================================


// Add a new ingredient to the pantry.

// PANTRY MANAGEMENT
// Add, remove, display and clear ingredients the user has at home.
function addIngredient() {

    const input = getElement("ingredientInput");

    const ingredient = input.value.trim().toLowerCase();

    // Do not add empty ingredients.

    if (ingredient === "") {
        showToast("Please enter an ingredient.");
        return;
    }

    // Prevent duplicates.

    if (pantry.includes(ingredient)) {
        showToast("Ingredient already exists!");
        input.value = "";
        return;
    }

    pantry.push(ingredient);

    input.value = "";

    renderPantry();

    renderRecipes();

    renderGroceryList();

    showToast("Ingredient added!");
}


// Remove an ingredient.

function removeIngredient(ingredient) {

    pantry = pantry.filter(function (item) {
        return item !== ingredient;
    });

    renderPantry();

    renderRecipes();

    renderGroceryList();
}


// Show all ingredients in the pantry.

function renderPantry() {

    const container = getElement("pantryItems");

    container.innerHTML = "";

    pantry.forEach(function (ingredient) {

        const chip = document.createElement("span");

        chip.className = "ingredient-chip";

        chip.innerHTML = `
            ${capitalize(ingredient)}
            <button aria-label="Remove ingredient">×</button>
        `;

        chip.querySelector("button").addEventListener("click", function () {
            removeIngredient(ingredient);
        });

        container.appendChild(chip);

    });

    getElement("pantryCount").textContent =
        pantry.length + " ingredients added";

    if (pantry.length === 0) {
        container.innerHTML =
            "<span class='empty-message'>Your pantry is empty.</span>";
    }
}


// Clear all pantry ingredients.

function clearPantry() {

    pantry = [];

    renderPantry();

    renderRecipes();

    renderGroceryList();

    showToast("Pantry cleared!");
}


// ================================================
// 4. RECIPE MATCHING SYSTEM
// ================================================

/*
The matching system compares:

Ingredients in a recipe
        VS
Ingredients in the user's pantry

Example:

Recipe needs:
eggs, onion, tomato, bread

User has:
eggs, tomato, bread

Result:
3 out of 4 ingredients = 75% match.
*/


// RECIPE MATCHING
// Compare a recipe ingredient list with the current pantry contents.
function calculateMatch(recipe) {

    let matched = [];

    let missing = [];

    recipe.ingredients.forEach(function (ingredient) {

        if (pantry.includes(ingredient)) {

            matched.push(ingredient);

        } else {

            missing.push(ingredient);

        }

    });

    let percentage = Math.round(
        (matched.length / recipe.ingredients.length) * 100
    );

    return {
        matched: matched,
        missing: missing,
        percentage: percentage
    };
}




// ================================================
// 5. RECIPE IMAGES
// ================================================

// Temporary image collection.
// Replace these image links with your own images later.

const recipeImages = {
    Breakfast:
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&q=80",

    Lunch:
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80",

    Dinner:
    "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80",

    Snack:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&q=80",

    Drinks:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=700&q=80"
};


// ================================================
// 6. DISPLAY RECIPE CARDS
// ================================================

// RECIPE DISCOVERY
// Choose and display recipes based on the active search and category filters.
function getDailyRecipes() {

    // Create a number based on today's date.
    // This makes the five suggestions change each day.

    const today = new Date();

    let seed = Number(
        today.getFullYear().toString() +
        String(today.getMonth() + 1).padStart(2, "0") +
        String(today.getDate()).padStart(2, "0")
    );

    // Make a copy of all recipes.
    let shuffledRecipes = RECIPES.slice();

    // Shuffle the recipes.
    for (let i = shuffledRecipes.length - 1; i > 0; i--) {

        seed = (seed * 9301 + 49297) % 233280;

        let j = Math.floor((seed / 233280) * (i + 1));

        [shuffledRecipes[i], shuffledRecipes[j]] =
            [shuffledRecipes[j], shuffledRecipes[i]];
    }

    // Return only five recipes.
    return shuffledRecipes.slice(0, 5);
}


function renderRecipes() {

    const grid = getElement("recipeGrid");

    const search = getElement("recipeSearch").value.trim().toLowerCase();

    // First, filter recipes by category and search.
    let filteredRecipes = RECIPES.filter(function (recipe) {

        const categoryMatches =
            currentCategory === "All" ||
            recipe.category === currentCategory;

        const searchableText = (
            recipe.name + " " +
            recipe.ingredients.join(" ") + " " +
            recipe.description
        ).toLowerCase();

        const searchMatches = searchableText.includes(search);

        return categoryMatches && searchMatches;
    });


    // If the pantry has ingredients, only show recipes
    // that match at least one ingredient.
    if (pantry.length > 0) {

        filteredRecipes = filteredRecipes.filter(function (recipe) {

            return calculateMatch(recipe).matched.length > 0;

        });

        // Show the best matching recipes first.
        filteredRecipes.sort(function (a, b) {

            return calculateMatch(b).percentage -
                   calculateMatch(a).percentage;

        });

        getElement("recipeCount").textContent =
            filteredRecipes.length + " matching recipes";

    }


    // If the pantry is empty and the search box is empty,
    // show only five daily suggestions.
    else if (search === "") {

        filteredRecipes = getDailyRecipes().filter(function (recipe) {

            return currentCategory === "All" ||
                   recipe.category === currentCategory;

        });

        getElement("recipeCount").textContent =
            filteredRecipes.length + " daily picks";

    }


    // If the pantry is empty but someone searches,
    // search the entire recipe collection.
    else {

        getElement("recipeCount").textContent =
            filteredRecipes.length + " search results";

    }


    // Clear the old recipe cards.
    grid.innerHTML = "";


    // Create a card for every recipe.
    filteredRecipes.forEach(function (recipe) {

        const match = calculateMatch(recipe);

        const card = document.createElement("article");

        card.className = "recipe-card";

        const difficulty = recipe.minutes <= 15 ? "Easy" : (recipe.minutes <= 25 ? "Medium" : "A little effort");
        const foodIcon = recipe.category === "Breakfast" ? "🥑" :
                         recipe.category === "Lunch" ? "🥗" :
                         recipe.category === "Dinner" ? "🍲" : recipe.category === "Drinks" ? "🥤" : "🍓";
        const shortSteps = [
            "Prepare and measure the ingredients.",
            "Cook or combine everything until ready.",
            "Season to taste and serve fresh."
        ];

        card.innerHTML = `
            <img
                class="recipe-image"
                src="${recipeImages[recipe.category]}"
                alt="${recipe.name}"
                loading="lazy"
            >

            <div class="recipe-card-content recipe-detail-content">
                <div class="recipe-food-icon" aria-hidden="true">${foodIcon}</div>

                <div class="recipe-detail-meta">
                    ${recipe.category} <span>·</span> ${recipe.minutes} min <span>·</span> ${difficulty}
                    <span class="match-label">${pantry.length === 0 ? "Daily pick" : match.percentage + "% Match"}</span>
                </div>

                <h3>${recipe.name}</h3>
                <p class="recipe-description">${recipe.description}</p>

                <div class="recipe-detail-section">
                    <h4>Ingredients</h4>
                    <ul class="recipe-ingredient-list">
                        ${recipe.ingredients.map(function (ingredient) { return `<li>${capitalize(ingredient)}</li>`; }).join("")}
                    </ul>
                </div>

                <div class="recipe-detail-section recipe-method">
                    <h4>How to make it</h4>
                    <ol>
                        ${shortSteps.map(function (step) { return `<li>${step}</li>`; }).join("")}
                    </ol>
                </div>

                <div class="recipe-actions recipe-detail-actions">
                    <button class="add-grocery-from-recipe" type="button">Add ingredients to grocery list</button>
                    <button class="add-plan" type="button">Add to meal plan</button>
                </div>
            </div>
        `;

        // Add only ingredients not already available in the pantry.
        card.querySelector(".add-grocery-from-recipe").addEventListener("click", function () {
            let added = 0;
            recipe.ingredients.forEach(function (ingredient) {
                if (!pantry.includes(ingredient) && !manualGroceryItems.includes(ingredient)) {
                    manualGroceryItems.push(ingredient);
                    added++;
                }
            });
            renderGroceryList();
            showToast(added ? added + " ingredients added to your grocery list" : "You already have everything for this recipe!");
        });

        // Add this recipe to its meal slot.
        card.querySelector(".add-plan").addEventListener("click", function () {
            addToMealPlan(recipe);
        });

        grid.appendChild(card);

    });


    // Show a message if no recipes match.
    if (filteredRecipes.length === 0) {

        grid.innerHTML = `

            <p class="empty-message">
                No matching recipes found.
                Try adding more ingredients or changing your search.
            </p>

        `;

    }

}


// ================================================
// 7. CATEGORY FILTERS
// ================================================

function setupCategoryFilters() {

    const buttons = document.querySelectorAll(".filter");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            currentCategory = button.dataset.category;

            // Remove active class from all buttons.

            buttons.forEach(function (item) {
                item.classList.remove("active");
            });

            // Highlight selected button.

            button.classList.add("active");

            renderRecipes();

        });

    });

}


// ================================================
// 8. ADD RECIPES TO MEAL PLANNER
// ================================================

// MEAL PLAN
// Add a selected recipe to the meal slot currently being edited.
function addToMealPlan(recipe) {

    let targetSlot = selectedSlot || recipe.category;

    // Safety check.

    if (!mealPlan.hasOwnProperty(targetSlot)) {
        showToast("Invalid meal category.");
        return;
    }

    mealPlan[targetSlot] = recipe;

    selectedSlot = null;

    updateMealPlan();

    showToast(recipe.name + " added to " + targetSlot);

}


// ================================================
// 9. UPDATE MEAL PLANNER
// ================================================

function updateMealPlan() {

    let totalCalories = 0;

    const slots = [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack"
    ];


    slots.forEach(function (slot) {

        const recipe = mealPlan[slot];

        const key = slot.toLowerCase();

        const nameElement = getElement(key + "Name");

        const calorieElement = getElement(key + "Calories");


        if (recipe !== null) {

            nameElement.textContent = recipe.name;

            calorieElement.textContent =
                recipe.calories + " kcal";

            totalCalories += recipe.calories;

        } else {

            nameElement.textContent = "No meal selected";

            calorieElement.textContent = "—";

        }

    });


    // Calculate calorie progress.

    let goal = Number(getElement("calorieGoal").value);

    if (!goal || goal < 500) {
        goal = 2000;
    }

    getElement("totalCalories").textContent =
        totalCalories.toLocaleString();

    getElement("goalText").textContent =
        goal.toLocaleString();


    let percentage = Math.min(
        (totalCalories / goal) * 100,
        100
    );

    getElement("progressFill").style.width =
        percentage + "%";


    if (totalCalories === 0) {

        getElement("calorieMessage").textContent =
            "Add meals to calculate your daily total.";

    } else if (totalCalories > goal) {

        getElement("calorieMessage").textContent =
            "You are " +
            (totalCalories - goal) +
            " kcal above your target.";

    } else {

        getElement("calorieMessage").textContent =
            (goal - totalCalories) +
            " kcal remaining to your target.";

    }


    // Update grocery list too.

    renderGroceryList();

}


// ================================================
// 10. CLEAR MEAL PLAN
// ================================================

function clearMealPlan() {

    mealPlan = {
        Breakfast: null,
        Lunch: null,
        Dinner: null,
        Snack: null
    };

    updateMealPlan();

    showToast("Meal plan cleared!");

}


// ================================================
// 11. SMART GROCERY LIST
// ================================================

// Manual grocery items are kept separately from recipe-generated items.
// GROCERY LIST
// Keep manually entered items separate from ingredients generated by recipes.
let manualGroceryItems = [];
let completedGroceryItems = [];

// Combine recipe ingredients and manual items into the visible grocery list.
function getGroceryItems() {
    const missingIngredients = [];

    // Ingredients required by planned meals, excluding items already in the pantry.
    Object.values(mealPlan).forEach(function (recipe) {
        if (recipe !== null) {
            recipe.ingredients.forEach(function (ingredient) {
                if (!pantry.includes(ingredient) &&
                    !missingIngredients.includes(ingredient)) {
                    missingIngredients.push(ingredient);
                }
            });
        }
    });

    // Combine recipe ingredients and items added manually, without duplicates.
    const allItems = [...missingIngredients];

    manualGroceryItems.forEach(function (ingredient) {
        if (!allItems.includes(ingredient)) {
            allItems.push(ingredient);
        }
    });

    return allItems;
}


// Draw the grocery list.
function renderGroceryList() {
    const container = getElement("groceryList");
    const items = getGroceryItems();

    container.innerHTML = "";

    getElement("groceryCount").textContent =
        items.length + (items.length === 1 ? " item" : " items");

    if (items.length === 0) {
        container.innerHTML = `
            <p class="empty-message">
                Your list is empty. Add an item or add a recipe to your meal plan.
            </p>
        `;
        return;
    }

    items.forEach(function (ingredient) {
        const isDone = completedGroceryItems.includes(ingredient);
        const isManual = manualGroceryItems.includes(ingredient);

        const item = document.createElement("div");
        item.className = "grocery-item grocery-row" + (isDone ? " completed" : "");

        item.innerHTML = `
            <label>
                <input
                    type="checkbox"
                    data-grocery-check="${ingredient}"
                    ${isDone ? "checked" : ""}
                >
                <span>${capitalize(ingredient)}</span>
            </label>
            ${isManual ? `
                <button
                    class="remove-grocery-item"
                    type="button"
                    data-remove-grocery="${ingredient}"
                    aria-label="Remove ${ingredient}"
                >×</button>
            ` : '<span class="grocery-auto-label">Planned</span>'}
        `;

        container.appendChild(item);
    });
}


// Add a grocery item manually.
function addGroceryItem(event) {
    event.preventDefault();

    const input = getElement("groceryInput");
    const ingredient = input.value.trim().toLowerCase();

    if (!ingredient) return;

    if (!getGroceryItems().includes(ingredient)) {
        manualGroceryItems.push(ingredient);
    }

    completedGroceryItems = completedGroceryItems.filter(function (item) {
        return item !== ingredient;
    });

    input.value = "";
    renderGroceryList();
    showToast(capitalize(ingredient) + " added to your grocery list.");
}


// Mark an item complete or incomplete.
function toggleGroceryItem(ingredient, isChecked) {
    if (isChecked && !completedGroceryItems.includes(ingredient)) {
        completedGroceryItems.push(ingredient);
    }

    if (!isChecked) {
        completedGroceryItems = completedGroceryItems.filter(function (item) {
            return item !== ingredient;
        });
    }

    renderGroceryList();
}


// Remove a manually added item.
function removeGroceryItem(ingredient) {
    manualGroceryItems = manualGroceryItems.filter(function (item) {
        return item !== ingredient;
    });

    completedGroceryItems = completedGroceryItems.filter(function (item) {
        return item !== ingredient;
    });

    renderGroceryList();
}


// Remove checked items from the list.
function clearCompletedGroceryItems() {
    const completed = [...completedGroceryItems];

    manualGroceryItems = manualGroceryItems.filter(function (item) {
        return !completed.includes(item);
    });

    completedGroceryItems = [];
    renderGroceryList();
    showToast("Completed grocery items cleared.");
}


// Copy only the items that are not checked off.
async function copyGroceryList() {
    const groceryText = getGroceryItems().filter(function (ingredient) {
        return !completedGroceryItems.includes(ingredient);
    });

    if (groceryText.length === 0) {
        showToast("Your grocery list is empty!");
        return;
    }

    try {
        await navigator.clipboard.writeText(
            groceryText.map(capitalize).join("\n")
        );
        showToast("Grocery list copied!");
    } catch (error) {
        showToast("Copy unavailable. Please use localhost.");
    }
}


// ================================================
// 13. CONNECT HTML BUTTONS
// ================================================


// Add ingredient.

getElement("addIngredient").addEventListener(
    "click",
    addIngredient
);


// Press Enter to add an ingredient.

getElement("ingredientInput").addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            addIngredient();
        }

    }
);


// Clear pantry.

getElement("clearPantry").addEventListener(
    "click",
    clearPantry
);


// Find recipes.

getElement("findRecipes").addEventListener(
    "click",
    function () {

        renderRecipes();

        getElement("discover").scrollIntoView({
            behavior: "smooth"
        });

    }
);


// Search recipes.

getElement("recipeSearch").addEventListener(
    "input",
    renderRecipes
);


// Category filters.

setupCategoryFilters();


// Clear meal planner.

getElement("clearPlan").addEventListener(
    "click",
    clearMealPlan
);


// Update calorie target.

getElement("calorieGoal").addEventListener(
    "input",
    updateMealPlan
);


// Add meal through planner slots.

document.querySelectorAll(".slot-button").forEach(
    function (button) {

        button.addEventListener("click", function () {

            selectedSlot = button.dataset.slot;

            currentCategory = selectedSlot;

            // Highlight the appropriate recipe filter.

            document.querySelectorAll(".filter").forEach(
                function (filter) {

                    filter.classList.toggle(
                        "active",
                        filter.dataset.category === currentCategory
                    );

                }
            );

            renderRecipes();

            // Meal-slot shortcuts open the Recipe Planner view before scrolling to recipes.
            if (window.recipeNestNavigate) {
                window.recipeNestNavigate("recipe", false);
            }
            window.setTimeout(function () {
                getElement("discover").scrollIntoView({ behavior: "smooth" });
            }, 50);

            showToast(
                "Choose a recipe for " + selectedSlot
            );

        });

    }
);


// Add a grocery item from the input.
getElement("groceryForm").addEventListener("submit", addGroceryItem);

// Grocery list checkboxes.
getElement("groceryList").addEventListener("change", function (event) {
    const checkbox = event.target.closest("[data-grocery-check]");
    if (!checkbox) return;

    toggleGroceryItem(
        checkbox.dataset.groceryCheck,
        checkbox.checked
    );
});

// Remove manually added grocery items.
getElement("groceryList").addEventListener("click", function (event) {
    const button = event.target.closest("[data-remove-grocery]");
    if (!button) return;

    removeGroceryItem(button.dataset.removeGrocery);
});

// Clear checked grocery items.
getElement("clearCompletedGroceries").addEventListener(
    "click",
    clearCompletedGroceryItems
);


// Copy grocery list.

getElement("copyGrocery").addEventListener(
    "click",
    copyGroceryList
);


// ================================================
// 14. INITIALIZE THE WEBSITE
// ================================================

// These functions run when the page loads.

renderPantry();

renderRecipes();

updateMealPlan();
