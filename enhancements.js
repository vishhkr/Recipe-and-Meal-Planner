/*
 * RECIPENEST — PROFILE AND WELLNESS ENHANCEMENTS
 * ------------------------------------------------------------
 * Handles the demo profile, saved preferences, calorie goals,
 * water tracking and the BMI / TDEE helper calculators.
 * This is a browser-only demonstration, not secure authentication.
 */

/*
============================================================
RECIPENEST PROFILE, PREFERENCES AND WELLNESS TOOLS
Front-end demonstration only. No passwords are stored.
============================================================
*/
(function () {
    const KEY = "recipenestPreferences";
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    let demoUser = JSON.parse(localStorage.getItem("recipenestDemoUser") || sessionStorage.getItem("recipenestDemoUser") || "null");
    let signUpMode = false;
    let water = saved.waterDate === new Date().toISOString().slice(0, 10) ? Number(saved.water || 0) : 0;
    let waterGoal = Number(saved.waterGoal || 8);
    let calorieGoal = Number(saved.calorieGoal || 2000);
    let diet = saved.diet || "Vegetarian";

    // Store supported preferences and wellness counters in localStorage.
    function savePreferences() {
        localStorage.setItem(KEY, JSON.stringify({ pantry: pantry, manualGroceries: manualGroceryItems, completedGroceries: completedGroceryItems, water: water, waterGoal: waterGoal, waterDate: new Date().toISOString().slice(0, 10), calorieGoal: calorieGoal, diet: diet }));
    }
    if (Array.isArray(saved.pantry)) pantry = saved.pantry;
    if (Array.isArray(saved.manualGroceries)) manualGroceryItems = saved.manualGroceries;
    if (Array.isArray(saved.completedGroceries)) completedGroceryItems = saved.completedGroceries;
    renderPantry();

    // Open and close the profile dropdown and profile panel.
    const profileButton = document.querySelector(".profile-button");
    const profileMenu = document.getElementById("profileMenu");
    const profilePanel = document.getElementById("profilePanel");
    function closeMenu() {
        profileMenu.hidden = true;
        profileButton.setAttribute("aria-expanded", "false");
    }

    profileButton.addEventListener("click", function (event) {
        event.preventDefault();
        profileMenu.hidden = !profileMenu.hidden;
        profileButton.setAttribute("aria-expanded", String(!profileMenu.hidden));
    });

    document.addEventListener("click", function (event) {
        const clickedOutsideMenu = !profileMenu.contains(event.target);
        const clickedOutsideButton = !profileButton.contains(event.target);

        if (clickedOutsideMenu && clickedOutsideButton) {
            closeMenu();
        }
    });

    document.querySelector('[data-profile-action="profile"]').addEventListener("click", function () {
        closeMenu();
        profilePanel.hidden = false;
    });

    document.getElementById("closeProfile").addEventListener("click", function () {
        profilePanel.hidden = true;
    });

    // Update the profile panel to reflect the current demo-user state.
    function showUser() {
        const greeting = document.getElementById("profileGreeting");
        const form = document.getElementById("demoAuthForm");
        const modeButton = document.getElementById("authModeToggle");
        greeting.textContent = demoUser ? "Hello, " + (demoUser.name || demoUser.email) : "Welcome to RecipeNest";
        document.getElementById("logoutButton").hidden = !demoUser;
        document.getElementById("authTitle").textContent = demoUser ? "Your profile" : "Welcome to RecipeNest";
        // After a demo sign-in, show the saved profile summary instead of the login form.
        form.hidden = Boolean(demoUser);
        modeButton.hidden = Boolean(demoUser);
    }
    document.getElementById("authModeToggle").addEventListener("click", function () {
        signUpMode = !signUpMode;
        document.getElementById("authName").parentElement.hidden = !signUpMode;
        document.getElementById("authTitle").textContent = signUpMode ? "Create your demo profile" : "Welcome back";
        document.getElementById("authSubmit").textContent = signUpMode ? "Create demo profile" : "Continue";
        this.textContent = signUpMode ? "I already have a profile" : "Create a demo profile instead";
    });
    document.getElementById("demoAuthForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("authEmail").value.trim();
        const name = document.getElementById("authName").value.trim();
        const password = document.getElementById("authPassword").value;
        if (password.length < 6) {
            showToast("Use at least 6 characters for this demo.");
            return;
        }
        demoUser = { name: name, email: email };
        const store = document.getElementById("rememberMe").checked ? localStorage : sessionStorage;
        store.setItem("recipenestDemoUser", JSON.stringify(demoUser));
        if (store === localStorage) {
            sessionStorage.removeItem("recipenestDemoUser");
        } else {
            localStorage.removeItem("recipenestDemoUser");
        }
        document.getElementById("authPassword").value = "";
        document.getElementById("authConfirm").value = "";
        profilePanel.hidden = false;
        showUser();
        showToast("Demo profile ready. This is not secure authentication.");
    });
    document.getElementById("logoutButton").addEventListener("click", function () {
        demoUser = null;
        localStorage.removeItem("recipenestDemoUser");
        sessionStorage.removeItem("recipenestDemoUser");
        showUser();
        closeMenu();
    });
    showUser();

    // RecipeNest now uses the light cream-and-green theme only.
    // Remove any old saved dark-theme preference from earlier versions.
    document.body.classList.remove("dark-theme");
    localStorage.removeItem("recipenestTheme");

    // Calorie goal is shared by the Recipe Planner and nutrition dashboard.
    const goalInput = document.getElementById("dailyGoalNew");
    const plannerGoal = document.getElementById("calorieGoal");
    goalInput.value = plannerGoal.value = calorieGoal;
    function setGoal(value) {
        calorieGoal = Math.max(500, Math.min(6000, Number(value) || 2000));
        goalInput.value = calorieGoal;
        plannerGoal.value = calorieGoal;
        savePreferences();

        if (typeof updateMealPlan === "function") {
            updateMealPlan();
        }
    }
    goalInput.addEventListener("change", function () { setGoal(this.value); });
    plannerGoal.addEventListener("change", function () { setGoal(this.value); });
    plannerGoal.addEventListener("input", function () {
        if (typeof updateMealPlan === "function") {
            updateMealPlan();
        }
    });

    // Water counter uses glasses as a simple habit tracker, not medical advice.
    const waterGoalInput = document.getElementById("waterGoal");
    waterGoalInput.value = waterGoal;
    // Refresh the water count, progress bar and saved daily value.
    function updateWater() {
        document.getElementById("waterCount").textContent = water;
        document.getElementById("waterGoalText").textContent = waterGoal;
        document.getElementById("waterBar").style.width = Math.min(100, water / waterGoal * 100) + "%";
        savePreferences();
    }
    document.getElementById("addWater").addEventListener("click", function () {
        water++;
        updateWater();
    });

    document.getElementById("removeWater").addEventListener("click", function () {
        water = Math.max(0, water - 1);
        updateWater();
    });

    waterGoalInput.addEventListener("change", function () {
        waterGoal = Math.max(1, Math.min(30, Number(this.value) || 8));
        this.value = waterGoal;
        updateWater();
    });

    const resetWater = document.createElement("button");
    resetWater.type = "button";
    resetWater.className = "soft-button";
    resetWater.textContent = "Reset daily water";
    resetWater.addEventListener("click", function () {
        water = 0;
        updateWater();
    });
    document.querySelector(".water-controls").appendChild(resetWater);
    updateWater();

    // Store dietary preference for the user's next visit.
    const dietSelect = document.getElementById("dietPreference");
    dietSelect.value = diet;
    dietSelect.addEventListener("change", function () { diet = this.value; savePreferences(); });

    // BMI = weight in kilograms / height in metres squared.
    document.getElementById("calculateBmi").addEventListener("click", function () {
        const height = Number(document.getElementById("bmiHeight").value) / 100;
        const weight = Number(document.getElementById("bmiWeight").value);
        const output = document.getElementById("bmiResult");
        if (!height || !weight || height < 0.5 || weight < 10) {
            output.textContent = "Please enter a valid height and weight.";
            return;
        }

        const bmi = weight / (height * height);
        let category;

        if (bmi < 18.5) {
            category = "Underweight";
        } else if (bmi < 25) {
            category = "Normal weight";
        } else if (bmi < 30) {
            category = "Overweight";
        } else {
            category = "Obesity range";
        }
        output.textContent = "BMI: " + bmi.toFixed(1) + " · " + category;
    });

    // TDEE estimate: Mifflin-St Jeor BMR multiplied by activity level.
    document.getElementById("calculateTdee").addEventListener("click", function () {
        const age = Number(document.getElementById("tdeeAge").value), height = Number(document.getElementById("tdeeHeight").value), weight = Number(document.getElementById("tdeeWeight").value);
        const sex = document.getElementById("tdeeSex").value, activity = Number(document.getElementById("activityLevel").value);
        const output = document.getElementById("tdeeResult");
        if (!age || !height || !weight || age < 15 || height < 50 || weight < 10) {
            output.textContent = "Please complete all fields with valid values.";
            return;
        }

        let sexAdjustment;
        if (sex === "male") {
            sexAdjustment = 5;
        } else {
            sexAdjustment = -161;
        }

        const bmr = 10 * weight + 6.25 * height - 5 * age + sexAdjustment;
        output.textContent = "Estimated TDEE: " + Math.round(bmr * activity).toLocaleString() + " kcal/day";
    });

    // Persist pantry and manual grocery changes made in the original interface.
    ["pantryItems", "groceryList"].forEach(function (id) { document.getElementById(id).addEventListener("change", savePreferences); document.getElementById(id).addEventListener("click", function () { setTimeout(savePreferences, 0); }); });
    document.getElementById("groceryForm").addEventListener("submit", function () { setTimeout(savePreferences, 0); });
    document.getElementById("addIngredient").addEventListener("click", function () { setTimeout(savePreferences, 0); });
    document.getElementById("clearPantry").addEventListener("click", function () { setTimeout(savePreferences, 0); });
    document.getElementById("resetSavedData").addEventListener("click", function () {
        const userConfirmed = confirm("Reset pantry, grocery list, water, calorie preferences and selected recipes? Your demo profile and theme will remain.");

        if (!userConfirmed) {
            return;
        }
        document.dispatchEvent(new CustomEvent("recipenest-reset-approved"));
        pantry = []; manualGroceryItems = []; completedGroceryItems = []; water = 0; waterGoal = 8; calorieGoal = 2000; diet = "Vegetarian";
        renderPantry(); renderGroceryList(); updateWater(); setGoal(2000); dietSelect.value = diet; savePreferences();
    });
})();
