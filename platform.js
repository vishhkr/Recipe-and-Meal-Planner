/*
 * RECIPENEST — PLANNER AND RECIPE EXPERIENCE
 * ------------------------------------------------------------
 * Adds richer recipe cards and detail views, multiple meal
 * selections, grocery-list generation, diet suggestions,
 * colour palettes and achievement summaries.
 */

/*
============================================================
RECIPENEST PLATFORM ENHANCEMENTS
Beginner-friendly additions for browsing, meal planning,
recipe details, colour palettes and saved progress.
============================================================
*/
(function () {
    const STORAGE_KEY = "recipenestPlatformData";
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
    let meals = saved.meals || { Breakfast: [], Lunch: [], Dinner: [], Snack: [] };
    let showAll = false;
    let cuisineChoice = "All";
    let suggestionSet = [];

    // Recipe metadata is estimated for a student-project planner.
    // Values are not laboratory nutrition data; check product labels for precision.
    const originByCuisine = {
        Indian: "India", Italian: "Italy", Chinese: "China", Mexican: "Mexico",
        Mediterranean: "Mediterranean region", Japanese: "Japan", Thai: "Thailand",
        Continental: "International", Global: "International"
    };
    const cuisineByName = [
        [/pulao|poha|paneer|paratha|chilla|rajma|chana|masala|lassi|chai|bhurji/i, "Indian"],
        [/pasta|pizza|caprese|risotto|bruschetta/i, "Italian"],
        [/fried rice|stir fry|lettuce wraps|dumpling/i, "Chinese"],
        [/taco|guacamole|quesadilla|burrito|salsa/i, "Mexican"],
        [/greek|hummus|shakshuka|falafel|mediterranean/i, "Mediterranean"],
        [/sushi|teriyaki|matcha|miso|ramen/i, "Japanese"],
        [/thai|tom kha|peanut noodles/i, "Thai"]
    ];
    const specialSteps = {
        "Vegetable Pulao": ["Rinse the basmati rice. Chop the carrot, beans and onion; rinse the peas.", "Soften the onion in a little oil, add whole spices and vegetables, then stir in the rice and water. Cover and cook until the rice is tender.", "Rest covered for five minutes, fluff gently and serve with yogurt or raita."],
        "Chana Masala": ["Finely chop the onion, tomato and ginger. Drain and rinse the cooked chickpeas.", "Cook the onion until golden, add ginger, tomato and garam masala, then simmer until the tomato softens.", "Stir in chickpeas and a little water. Simmer for 10–12 minutes and finish with coriander and lemon."],
        "Palak Paneer": ["Wash the spinach and blanch it briefly. Cool, then blend to a smooth puree; cube the paneer.", "Cook onion and tomato with spices until soft. Add spinach puree and simmer gently.", "Fold in paneer and a splash of cream. Warm through without boiling and serve."],
        "Rajma Chawal": ["Soak dried kidney beans overnight and cook until soft, or rinse cooked beans. Prepare the rice separately.", "Cook onion, tomato and ginger with spices until thick and fragrant.", "Add kidney beans and cooking liquid; simmer until the gravy thickens. Serve with hot rice."],
        "Margherita Pizza": ["Heat the oven to 230°C. Stretch the pizza dough and spread a thin layer of tomato sauce.", "Add mozzarella and bake until the crust is golden and the cheese bubbles.", "Scatter fresh basil over the pizza, slice and serve warm."],
        "Pasta Primavera": ["Boil pasta in salted water until just tender. Slice the zucchini and bell pepper.", "Sauté the vegetables in olive oil until bright and lightly tender; add tomato and a splash of pasta water.", "Toss in the drained pasta and parmesan. Season and serve immediately."],
        "Caprese Salad": ["Slice ripe tomatoes and mozzarella into even rounds; rinse and dry the basil.", "Arrange tomato and mozzarella on a plate, layering basil leaves between them.", "Drizzle with olive oil, season with pepper and serve fresh."],
        "Vegetable Fried Rice": ["Use chilled cooked rice if possible. Dice the carrot and slice the spring onion.", "Stir-fry the vegetables over high heat, then add rice and soy sauce.", "Toss until hot, finish with spring onion and serve straight away."],
        "Tofu Stir Fry": ["Press the tofu briefly and cut it into cubes. Chop broccoli and bell pepper into bite-size pieces.", "Brown tofu in a hot pan, then stir-fry the vegetables with ginger and garlic.", "Add soy sauce with a splash of water, toss until glossy and serve with rice."],
        "Chicken Lettuce Wraps": ["Separate and wash the lettuce leaves. Finely chop the carrot and garlic.", "Cook minced chicken until fully cooked, then stir in carrot, garlic and soy sauce.", "Spoon the warm filling into lettuce cups and serve immediately."],
        "Black Bean Tacos": ["Rinse the black beans and warm them with cumin and a little water. Chop tomato and avocado.", "Warm the tortillas in a dry pan and fill with seasoned beans.", "Top with tomato, avocado and lime juice; serve while warm."],
        "Guacamole": ["Halve and pit the avocados, then scoop the flesh into a bowl. Finely chop onion and tomato.", "Mash the avocado with lime juice, leaving a little texture, then fold in the vegetables.", "Season to taste and serve promptly with tortillas or vegetables."],
        "Greek Salad": ["Chop cucumber and tomato into bite-size pieces and slice the olives.", "Combine the vegetables with feta in a serving bowl.", "Dress with olive oil and oregano, toss gently and serve."],
        "Hummus Bowl": ["Drain and rinse chickpeas. Blend them with tahini, lemon juice and a little water until creamy.", "Taste and adjust the hummus with lemon and seasoning; chop cucumber for the topping.", "Spoon hummus into a bowl, add cucumber and serve with warm pita."],
        "Shakshuka": ["Slice the onion and bell pepper; chop the tomatoes and prepare the spices.", "Cook onion and pepper until soft, add tomato and paprika, then simmer until thick.", "Make small wells, add the eggs, cover and cook until the whites set. Serve with bread."],
        "Teriyaki Tofu Bowl": ["Cook rice. Pat the tofu dry and cut it into cubes; steam the broccoli until just tender.", "Pan-sear tofu, then add soy sauce, honey and a little water. Simmer until lightly glazed.", "Serve tofu and broccoli over rice, spooning the glaze over the bowl."],
        "Vegetable Sushi Bowl": ["Rinse and cook the rice, then season lightly with rice vinegar if available. Slice cucumber, carrot and avocado.", "Divide the rice between bowls and arrange the vegetables and torn nori on top.", "Finish with sesame seeds or soy sauce and serve."],
        "Thai Peanut Noodles": ["Cook noodles according to the packet. Shred the carrot and prepare lime juice.", "Mix peanut butter, soy sauce, lime and warm water into a smooth sauce.", "Toss noodles with the sauce and carrot; garnish with herbs or crushed peanuts."],
        "Tom Kha Style Soup": ["Slice the mushrooms and ginger. Warm the vegetable stock with ginger to infuse it.", "Add coconut milk and mushrooms; simmer gently until the mushrooms are tender.", "Season with lime juice and serve warm. Avoid a hard boil after adding coconut milk."],
        "Berry Overnight Oats": ["Combine oats, milk, yogurt and chia seeds in a lidded jar.", "Stir well, fold in half the berries and refrigerate for at least four hours or overnight.", "Top with the remaining berries and serve chilled." ]
    };

    // RECIPE ENRICHMENT
    // Fill in optional cuisine, timing, diet and estimated nutrition fields.
    function enrichRecipes() {
        RECIPES.forEach(function (recipe) {
            if (!recipe.cuisine) {
                const found = cuisineByName.find(function (rule) { return rule[0].test(recipe.name); });
                recipe.cuisine = found ? found[1] : (recipe.category === "Drinks" ? "Global" : "Continental");
            }
            recipe.origin = originByCuisine[recipe.cuisine] || "International";
            recipe.prepMinutes = Math.max(3, Math.round(recipe.minutes * 0.35));
            recipe.cookMinutes = Math.max(0, recipe.minutes - recipe.prepMinutes);
            recipe.servings = 2;
            recipe.diet = recipe.ingredients.some(function (item) { return /chicken|fish|egg|prawn|shrimp|meat|tuna/i.test(item); }) ? "Non-vegetarian" : "Vegetarian";
            // Simple proportional estimates based on calories; clearly labelled estimates.
            recipe.protein = Math.round(recipe.calories * (recipe.diet === "Non-vegetarian" ? 0.035 : 0.025) / 4);
            recipe.carbs = Math.round(recipe.calories * 0.50 / 4);
            recipe.fat = Math.max(1, Math.round(recipe.calories * 0.30 / 9));
            recipe.instructions = specialSteps[recipe.name] || buildSteps(recipe);
        });
    }

    function buildSteps(recipe) {
        const first = recipe.ingredients.slice(0, 3).join(", ");
        const last = recipe.ingredients.slice(3).join(", ");
        if (recipe.category === "Drinks") return [
            "Wash, peel or measure the ingredients: " + first + ".",
            "Blend, stir or steep the ingredients with the liquid and flavourings until combined.",
            "Taste, adjust sweetness if needed, pour into a glass and serve fresh or chilled."
        ];
        if (/salad|chaat|bowl|sandwich/i.test(recipe.name)) return [
            "Wash and prepare the ingredients: " + first + ". Cut everything into even bite-size pieces.",
            "Combine the prepared ingredients" + (last ? " with " + last : "") + "; add the dressing or seasoning and mix gently.",
            "Taste and adjust seasoning, then plate and serve fresh."
        ];
        return [
            "Prepare the ingredients: wash and chop " + first + (last ? "; measure " + last : "") + ".",
            "Heat a pan or pot, add a little oil or water, then cook the ingredients with the recipe's seasonings until tender and cooked through.",
            "Taste, adjust seasoning, garnish if desired and serve warm."
        ];
    }

    // Save the platform planner data in this browser.
    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ meals: meals, palette: currentPalette }));
        if (typeof refreshAchievements === "function") refreshAchievements();
    }


    function esc(value) { return String(value).replace(/[&<>"']/g, function (char) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]; }); }
    function categoryLabel(category) { return category === "Snack" ? "Snacks" : category; }
    function defaultMeal(recipe) { return ["Breakfast", "Lunch", "Dinner"].includes(recipe.category) ? recipe.category : "Snack"; }
    function shuffle(items) {
        const copy = items.slice();
        for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
        return copy;
    }
    function pickSuggestions() { suggestionSet = shuffle(RECIPES).slice(0, 5); }
    function recipeImage(recipe) {
        const images = {
            Breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
            Lunch: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            Dinner: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
            Snack: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
            Drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80"
        };
        return images[recipe.category] || images.Snack;
    }

    function cardMarkup(recipe) {
        const available = pantry || [];
        const missing = recipe.ingredients.filter(function (item) { return !available.includes(item.toLowerCase()); });
        return `<article class="recipe-card enhanced-recipe-card">
            <img class="recipe-image" src="${recipeImage(recipe)}" alt="${esc(recipe.name)}" loading="lazy">
            <div class="recipe-card-content">
                <div class="recipe-detail-meta">${esc(recipe.cuisine)} · ${esc(categoryLabel(recipe.category))} · Prep ${recipe.prepMinutes} min · ${recipe.minutes} min total</div>
                <h3>${esc(recipe.name)}</h3><p class="recipe-description">${esc(recipe.description)}</p>
                <div class="card-facts"><span>📍 ${esc(recipe.origin)}</span><span>🔥 ${recipe.calories} kcal</span><span>🥬 ${esc(recipe.diet)}</span></div>
                <p class="card-ingredients"><b>Ingredients:</b> ${recipe.ingredients.slice(0, 4).map(esc).join(", ")}${recipe.ingredients.length > 4 ? "…" : ""}</p>
                <div class="recipe-actions"><button type="button" class="view-recipe" data-view-recipe="${recipe.id}">View Recipe</button><button type="button" class="add-plan" data-add-recipe="${recipe.id}">Add Recipe</button></div>
            </div></article>`;
    }

    // Keep the original pantry matching and filters, but make Show All independent.
    renderRecipes = function () {
        const grid = document.getElementById("recipeGrid");
        if (!grid) return;
        const search = document.getElementById("recipeSearch").value.trim().toLowerCase();
        let list = showAll ? RECIPES.slice() : (search || pantry.length ? RECIPES.slice() : suggestionSet.slice());
        list = list.filter(function (recipe) {
            const text = [recipe.name, recipe.description, recipe.ingredients.join(" "), recipe.cuisine, recipe.category, recipe.diet].join(" ").toLowerCase();
            const categoryOk = currentCategory === "All" || recipe.category === currentCategory || (currentCategory === "Snack" && recipe.category === "Snack");
            const cuisineOk = cuisineChoice === "All" || recipe.cuisine === cuisineChoice;
            const searchOk = !search || text.includes(search);
            const pantryOk = !showAll && !search && pantry.length ? recipe.ingredients.some(function (i) { return pantry.includes(i.toLowerCase()); }) : true;
            return categoryOk && cuisineOk && searchOk && pantryOk;
        });
        if (pantry.length && !search && !showAll) list.sort(function (a, b) { return calculateMatch(b).percentage - calculateMatch(a).percentage; });
        if (search) {
            const terms = search.split(/[ ,]+/).filter(Boolean);
            list.sort(function (a, b) {
                const score = function (recipe) { return terms.reduce(function (sum, term) { return sum + (recipe.ingredients.some(function (item) { return item.toLowerCase().includes(term); }) ? 2 : 0) + ([recipe.name, recipe.cuisine, recipe.category].join(" ").toLowerCase().includes(term) ? 1 : 0); }, 0); };
                return score(b) - score(a);
            });
        }
        document.getElementById("recipeCount").textContent = list.length + (showAll ? " recipes in collection" : search ? " search results" : " suggestions");
        grid.innerHTML = list.length ? list.map(cardMarkup).join("") : '<p class="empty-message">No recipes match those filters. Try another category or cuisine.</p>';
    };

    // RECIPE DETAILS
    // Build the detail panel for the selected recipe.
    function showRecipeDetails(recipe) {
        let modal = document.getElementById("recipeDetailModal");
        if (!modal) {
            modal = document.createElement("div"); modal.id = "recipeDetailModal"; modal.className = "recipe-modal";
            modal.innerHTML = '<div class="recipe-modal-panel" role="dialog" aria-modal="true" aria-labelledby="detailTitle"><button class="modal-close" type="button" aria-label="Close">×</button><div id="recipeDetailBody"></div></div>';
            document.body.appendChild(modal);
            modal.querySelector(".modal-close").addEventListener("click", function () { modal.hidden = true; });
            modal.addEventListener("click", function (event) { if (event.target === modal) modal.hidden = true; });
        }
        document.getElementById("recipeDetailBody").innerHTML = `<img class="detail-photo" src="${recipeImage(recipe)}" alt="${esc(recipe.name)}"><span class="eyebrow">${esc(recipe.cuisine)} · ${esc(categoryLabel(recipe.category))} · ${esc(recipe.origin)}</span><h2 id="detailTitle">${esc(recipe.name)}</h2><p>${esc(recipe.description)}</p><div class="detail-stats"><span>Prep ${recipe.prepMinutes} min</span><span>Cook ${recipe.cookMinutes} min</span><span>${recipe.servings} servings</span><span>${recipe.calories} kcal / serving</span></div><h3>Ingredients</h3><ul>${recipe.ingredients.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("")}</ul><h3>How to make it</h3><ol>${recipe.instructions.map(function (step) { return "<li>" + esc(step) + "</li>"; }).join("")}</ol><button type="button" class="primary-button" id="detailAddRecipe">Add to meal plan</button>`;
        modal.hidden = false;
        document.getElementById("detailAddRecipe").addEventListener("click", function () { addToMealPlan(recipe); modal.hidden = true; });
    }

    // Multiple recipes are stored in each meal category.
    addToMealPlan = function (recipe) {
        const slot = selectedSlot || defaultMeal(recipe);
        if (!meals[slot]) { showToast("Choose a meal category first."); return; }
        const existing = meals[slot].find(function (item) { return item.id === recipe.id; });
        if (existing) { showToast("That recipe is already in " + slot + "."); return; }
        meals[slot].push(recipe);
        mealPlan[slot] = meals[slot][0] || null;
        selectedSlot = null;
        updateMealPlan(); renderGroceryList(); save();
        showToast(recipe.name + " added to " + slot + ".");
    };

    updateMealPlan = function () {
        let total = 0, carbs = 0, protein = 0, fat = 0;
        mealTypes.forEach(function (slot) {
            const items = meals[slot] || [];
            const key = slot.toLowerCase();
            document.getElementById(key + "Name").textContent = items.length ? items.map(function (r) { return r.name; }).join(", ") : "No meal selected";
            document.getElementById(key + "Calories").textContent = items.length ? items.reduce(function (sum, r) { return sum + r.calories; }, 0) + " kcal" : "—";
            total += items.reduce(function (sum, r) { return sum + r.calories; }, 0);
            items.forEach(function (r) { carbs += r.carbs; protein += r.protein; fat += r.fat; });
            let list = document.getElementById("multi-" + key);
            if (!list) { list = document.createElement("div"); list.id = "multi-" + key; list.className = "planned-recipe-list"; document.querySelector('[data-slot="' + slot + '"]').parentElement.appendChild(list); }
            list.innerHTML = items.map(function (r) { return `<div class="planned-recipe-row"><span>${esc(r.name)}</span><span><button type="button" data-replace-meal="${slot}:${r.id}">Replace</button> <button type="button" data-remove-meal="${slot}:${r.id}" aria-label="Remove ${esc(r.name)}">Remove</button></span></div>`; }).join("");
        });
        const goalInput = document.getElementById("calorieGoal");
        const goal = Math.max(500, Number(goalInput.value) || 2000);
        document.getElementById("totalCalories").textContent = total.toLocaleString();
        document.getElementById("goalText").textContent = goal.toLocaleString();
        document.getElementById("progressFill").style.width = Math.min(100, total / goal * 100) + "%";
        document.getElementById("calorieMessage").textContent = total >= goal ? "Your planned meals have reached your calorie target." : (goal - total).toLocaleString() + " kcal remaining to your target.";
        document.getElementById("dashCalories").textContent = total.toLocaleString();
        document.getElementById("dashCalorieBar").style.width = Math.min(100, total / goal * 100) + "%";
        document.getElementById("dashCalorieText").textContent = total >= goal ? "Your planned meals have reached your calorie target." : (goal - total).toLocaleString() + " kcal remaining to your goal.";
        const macro = document.getElementById("macroSummary");
        if (macro) macro.innerHTML = `<span>Carbs <b>${carbs} g</b></span><span>Protein <b>${protein} g</b></span><span>Fat <b>${fat} g</b></span>`;
        save();
    };

    // Grocery ingredients are combined across every planned recipe without duplicates.
    getGroceryItems = function () {
        const all = [];
        mealTypes.forEach(function (slot) { (meals[slot] || []).forEach(function (recipe) { recipe.ingredients.forEach(function (ingredient) { const item = ingredient.toLowerCase(); if (!pantry.includes(item) && !all.includes(item)) all.push(item); }); }); });
        (manualGroceryItems || []).forEach(function (item) { if (!all.includes(item)) all.push(item); });
        return all;
    };
    renderGroceryList = function () {
        const container = document.getElementById("groceryList");
        const items = getGroceryItems();
        document.getElementById("groceryCount").textContent = items.length + (items.length === 1 ? " item" : " items");
        if (!items.length) { container.innerHTML = '<p class="empty-message">Your list is empty. Add a recipe or a grocery item.</p>'; return; }
        container.innerHTML = items.map(function (ingredient) {
            const sources = [];
            mealTypes.forEach(function (slot) { (meals[slot] || []).forEach(function (recipe) { if (recipe.ingredients.map(function (x) { return x.toLowerCase(); }).includes(ingredient)) sources.push(recipe.name); }); });
            const done = completedGroceryItems.includes(ingredient);
            const manual = manualGroceryItems.includes(ingredient);
            return `<div class="grocery-item grocery-row ${done ? "completed" : ""}"><label><input type="checkbox" data-grocery-check="${esc(ingredient)}" ${done ? "checked" : ""}><span>${esc(capitalize(ingredient))}</span></label><small>${sources.length ? "For: " + esc(sources.join(", ")) : "Added manually"}</small>${manual ? `<button type="button" class="remove-grocery-item" data-remove-grocery="${esc(ingredient)}">×</button>` : ""}</div>`;
        }).join("");
    };

    // Event delegation for recipe cards and meal removal.
    document.getElementById("recipeGrid").addEventListener("click", function (event) {
        const view = event.target.closest("[data-view-recipe]");
        const add = event.target.closest("[data-add-recipe]");
        if (view) { const recipe = RECIPES.find(function (r) { return r.id === Number(view.dataset.viewRecipe); }); if (recipe) showRecipeDetails(recipe); }
        if (add) { const recipe = RECIPES.find(function (r) { return r.id === Number(add.dataset.addRecipe); }); if (recipe) addToMealPlan(recipe); }
    });
    document.querySelector(".meal-slots").addEventListener("click", function (event) {
        const replace = event.target.closest("[data-replace-meal]");
        if (replace) {
            const parts = replace.dataset.replaceMeal.split(":");
            const oldRecipe = meals[parts[0]].find(function (r) { return r.id === Number(parts[1]); });
            const alternatives = RECIPES.filter(function (r) { return r.category === parts[0] && r.id !== oldRecipe.id; }).sort(function (a, b) { return Math.abs(a.calories - oldRecipe.calories) - Math.abs(b.calories - oldRecipe.calories); }).slice(0, 5);
            if (!alternatives.length) { showToast("No alternatives are available in this category."); return; }
            const choice = prompt("Choose a replacement by number:\n" + alternatives.map(function (r, i) { return (i + 1) + ". " + r.name + " (" + r.calories + " kcal)"; }).join("\n"));
            const selected = alternatives[Number(choice) - 1];
            if (selected) { meals[parts[0]] = meals[parts[0]].map(function (r) { return r.id === oldRecipe.id ? selected : r; }); mealPlan[parts[0]] = meals[parts[0]][0] || null; updateMealPlan(); renderGroceryList(); save(); showToast("Meal replaced with " + selected.name + "."); }
            return;
        }
        const remove = event.target.closest("[data-remove-meal]");
        if (!remove) return;
        const parts = remove.dataset.removeMeal.split(":");
        meals[parts[0]] = meals[parts[0]].filter(function (r) { return r.id !== Number(parts[1]); });
        mealPlan[parts[0]] = meals[parts[0]][0] || null;
        updateMealPlan(); renderGroceryList(); save(); showToast("Recipe removed from your plan.");
    });

    // Show three randomly selected, higher-calorie recipe ideas for the chosen diet.
    // Suitability is estimated from listed ingredients, so users should still check labels.
    // DIET FILTERING
    // Apply ingredient-based matching rules for the selected preference.
    function fitsDietPreference(recipe, preference) {
        const ingredients = recipe.ingredients.join(" ").toLowerCase();
        const has = function (pattern) { return pattern.test(ingredients); };
        const meat = has(/chicken|beef|pork|lamb|mutton|bacon|ham|turkey|meat/);
        const seafood = has(/fish|salmon|tuna|prawn|shrimp|crab|anchovy|seafood/);
        const dairy = has(/milk|cheese|paneer|yogurt|yoghurt|curd|butter|cream|ghee|whey/);
        const egg = has(/\beggs?\b/);
        const gluten = has(/wheat|flour|bread|pasta|noodles|barley|rye|breadcrumbs|soy sauce/);
        const animal = meat || seafood || dairy || egg || has(/honey/);
        const roots = has(/potato|onion|garlic|carrot|beetroot|radish|ginger|turmeric root/);
        const starches = has(/rice|oats|bread|flour|pasta|noodles|potato|sugar|honey|banana|corn|poha/);
        if (preference === "Vegetarian") return !meat && !seafood;
        if (preference === "Vegan") return !animal;
        if (preference === "Keto") return !starches && !has(/sugar|honey|syrup|rice|wheat|flour|potato|corn|oats/);
        if (preference === "Mediterranean") return has(/olive|tomato|cucumber|chickpea|lentil|fish|salmon|whole grain|spinach|feta|lemon|beans/);
        if (preference === "High Protein") return recipe.protein >= 18 || has(/paneer|tofu|lentil|chickpea|beans|egg|chicken|fish|yogurt|peanut/);
        if (preference === "Jain") return !meat && !seafood && !egg && !roots;
        if (preference === "Pescatarian") return !meat;
        if (preference === "Gluten Free") return !gluten;
        if (preference === "Dairy Free") return !dairy;
        return true;
    }

    function renderDietSuggestions() {
        const container = document.getElementById("dietSuggestionList");
        const preference = document.getElementById("dietPreference").value;
        if (!container) return;
        const suitable = RECIPES.filter(function (recipe) {
            return recipe.category !== "Drinks" && fitsDietPreference(recipe, preference);
        }).sort(function (a, b) { return b.calories - a.calories; });
        // Pick randomly from the 12 highest-calorie matches to keep suggestions varied.
        const highCalorieChoices = suitable.slice(0, Math.min(12, suitable.length));
        const picks = shuffle(highCalorieChoices).slice(0, 3);
        if (!picks.length) {
            container.innerHTML = '<p class="dash-note">No close matches were found. Try another preference or review the recipe ingredients.</p>';
            return;
        }
        container.innerHTML = picks.map(function (recipe) {
            return `<article class="diet-suggestion-card"><div><strong>${esc(recipe.name)}</strong><small>${esc(recipe.cuisine)} · ${recipe.calories} kcal · ${recipe.protein}g estimated protein</small></div><button type="button" data-add-diet-suggestion="${recipe.id}">Add</button></article>`;
        }).join("");
    }

    document.getElementById("dietPreference").addEventListener("change", renderDietSuggestions);
    document.getElementById("dietSuggestionList").addEventListener("click", function (event) {
        const button = event.target.closest("[data-add-diet-suggestion]");
        if (!button) return;
        const recipe = RECIPES.find(function (item) { return item.id === Number(button.dataset.addDietSuggestion); });
        if (recipe) addToMealPlan(recipe);
    });

    // Show All Recipes and category/cuisine filters work independently of saved meals.
    const showAllInput = document.getElementById("showAllRecipes");
    showAllInput.addEventListener("change", function () { showAll = this.checked; renderRecipes(); });
    document.getElementById("discoverMore").addEventListener("click", function () { pickSuggestions(); showAll = false; showAllInput.checked = false; renderRecipes(); });
    document.getElementById("cuisineFilter").addEventListener("change", function () { cuisineChoice = this.value; renderRecipes(); });
    document.querySelectorAll(".filter").forEach(function (button) { button.addEventListener("click", function () { currentCategory = button.dataset.category; document.querySelectorAll(".filter").forEach(function (b) { b.classList.toggle("active", b === button); }); renderRecipes(); }); });
    document.getElementById("recipeSearch").addEventListener("input", renderRecipes);
    document.getElementById("groceryList").addEventListener("change", function () { setTimeout(refreshAchievements, 0); });
    document.getElementById("groceryList").addEventListener("click", function () { setTimeout(refreshAchievements, 0); });

    // Replace a planned recipe with a similar recipe from the same category.
    document.querySelector(".meal-slots").addEventListener("click", function (event) {
        const button = event.target.closest(".slot-button");
        if (button) {
            selectedSlot = button.dataset.slot;
            currentCategory = selectedSlot;
            showAll = true;
            showAllInput.checked = true;
            document.querySelectorAll(".filter").forEach(function (b) { b.classList.toggle("active", b.dataset.category === currentCategory); });
            renderRecipes();
            // The recipe grid is in another page-like view, so show it before scrolling.
            if (window.recipeNestNavigate) window.recipeNestNavigate("recipe", false);
            window.setTimeout(function () { document.getElementById("discover").scrollIntoView({ behavior: "smooth" }); }, 50);
            showToast("Choose a recipe for " + selectedSlot + ".");
        }
    });
    document.getElementById("clearPlan").addEventListener("click", function () {
        if (!confirm("Clear all selected recipes from your meal plan? Your pantry, profile and theme will stay saved.")) return;
        mealTypes.forEach(function (slot) { meals[slot] = []; mealPlan[slot] = null; });
        updateMealPlan(); renderGroceryList(); save(); showToast("Meal plan cleared.");
    });

    // Six independent header accent palettes.
    const palettes = { sage: ["#e7eee5", "#456b50"], terra: ["#f3e4dc", "#a65f43"], ocean: ["#e2edf2", "#3d7188"], lavender: ["#eee8f5", "#76628f"], olive: ["#e9ecd9", "#68723d"], rose: ["#f3e5e7", "#a65f70"] };
    let currentPalette = saved.palette || localStorage.getItem("recipenestPalette") || "sage";
    // COLOUR PALETTES
    // Apply a named palette and remember the selection in browser storage.
    function applyPalette(name) {
        const palette = palettes[name] || palettes.sage;
        // One saved background colour is shared by the navbar and sidebar.
        document.documentElement.style.setProperty("--navigation-bg", palette[0]);
        document.documentElement.style.setProperty("--header-accent", palette[1]);
        document.querySelectorAll(".palette-swatch").forEach(function (button) {
            const selected = button.dataset.palette === name;
            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
        currentPalette = name; localStorage.setItem("recipenestPalette", name); save();
    }
    document.querySelectorAll(".palette-swatch").forEach(function (button) { button.addEventListener("click", function () { applyPalette(button.dataset.palette); }); });

    // Profile summary shows non-sensitive planner information.
    function updateProfileSummary() {
        const target = document.getElementById("profileStats");
        const count = mealTypes.reduce(function (sum, slot) { return sum + meals[slot].length; }, 0);
        const total = mealTypes.reduce(function (sum, slot) { return sum + meals[slot].reduce(function (n, r) { return n + r.calories; }, 0); }, 0);
        const goal = Number(document.getElementById("calorieGoal").value) || 2000;
        const waterNow = document.getElementById("waterCount").textContent;
        const waterTarget = document.getElementById("waterGoal").value || 8;
        const dietChoice = document.getElementById("dietPreference").value;
        target.textContent = count + " planned recipes · " + total + " / " + goal + " kcal · " + Math.max(0, goal - total) + " kcal remaining · Diet: " + dietChoice + " · Water: " + waterNow + "/" + waterTarget + " glasses · " + getGroceryItems().length + " grocery items";
    }
    document.querySelector('[data-profile-action="profile"]').addEventListener("click", updateProfileSummary);
    document.addEventListener("recipenest-profile-opened", updateProfileSummary);

    // Sign-up confirmation is checked locally; passwords are never saved.
    const authForm = document.getElementById("demoAuthForm");
    const confirmWrap = document.getElementById("confirmPasswordWrap");
    document.getElementById("authModeToggle").addEventListener("click", function () {
        confirmWrap.hidden = !confirmWrap.hidden;
        document.getElementById("forgotPassword").hidden = !confirmWrap.hidden;
    });
    authForm.addEventListener("submit", function (event) {
        if (!confirmWrap.hidden && document.getElementById("authPassword").value !== document.getElementById("authConfirm").value) {
            event.preventDefault(); event.stopImmediatePropagation(); showToast("Your passwords do not match.");
        }
    }, true);
    document.getElementById("forgotPassword").addEventListener("click", function () { showToast("This demo does not use real accounts. Password recovery needs a secure backend."); });

    // Achievement messages are based on saved activity, not decorative button clicks.
    // ACHIEVEMENTS
    // Refresh the progress messages shown in the dashboard.
    function refreshAchievements() {
        const planned = mealTypes.reduce(function (sum, slot) { return sum + meals[slot].length; }, 0);
        const groceries = getGroceryItems();
        const purchased = groceries.filter(function (item) { return completedGroceryItems.includes(item); }).length;
        const badges = [
            [planned > 0, "🍽️", "First recipe planned"],
            [planned > 0, "🗓️", "First meal planned"],
            [Number(document.getElementById("totalCalories").textContent.replace(/,/g, "")) >= Number(document.getElementById("calorieGoal").value), "🎯", "Calorie goal reached"],
            [Number(document.getElementById("waterCount").textContent) >= Number(document.getElementById("waterGoal").value || 8), "💧", "Hydration goal reached"],
            [showAll, "🧭", "Recipe explorer"],
            [groceries.length > 0, "🛒", "Grocery list started"],
            [groceries.length > 0 && purchased === groceries.length, "✅", "Grocery list completed"],
            [planned >= 7, "🌿", "Weekly planner milestone"]
        ];
        const list = document.getElementById("achievementList");
        if (list) list.innerHTML = badges.map(function (b) { return `<span class="achievement-pill ${b[0] ? "unlocked" : "locked"}">${b[0] ? b[1] : "🔒"} ${b[2]} · ${b[0] ? "Unlocked" : "Locked"}</span>`; }).join("");
    }

    // Save multi-meal selections independently from the original single-slot demo data.
    enrichRecipes();
    mealTypes.forEach(function (slot) { if (!Array.isArray(meals[slot])) meals[slot] = []; mealPlan[slot] = meals[slot][0] || null; });
    pickSuggestions();
    applyPalette(currentPalette);
    document.addEventListener("recipenest-reset-approved", function () {
        mealTypes.forEach(function (slot) { meals[slot] = []; mealPlan[slot] = null; });
        localStorage.removeItem(STORAGE_KEY); updateMealPlan(); renderGroceryList();
    });
    renderRecipes(); updateMealPlan(); renderGroceryList(); refreshAchievements(); renderDietSuggestions();
})();
