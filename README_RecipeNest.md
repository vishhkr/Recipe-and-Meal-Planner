# RecipeNest

RecipeNest is a food and nutrition planning website that brings recipe discovery, meal planning, grocery organization, and everyday nutrition tools together in one place.

The project is built with HTML, CSS, and vanilla JavaScript. It is designed to be easy to understand, edit, and extend in Visual Studio Code.

## Features

### Homepage
- Introductory hero section and RecipeNest information.
- About, benefits, and services sections.
- Daily Planning and Smart Shopping information sections.
- Navigation to the main tools.

### Navigation
- Upper navigation for Home, About, Benefits, and Services.
- Sidebar shortcuts for Recipe Planner, Meal Planner, and Login / Profile.
- In-page navigation so users can move between areas without opening a separate website.
- Responsive navigation for smaller screens.

### Recipe Planner
- Recipe discovery and random suggestions.
- Search by recipe details and ingredients.
- Recipe browsing and category/cuisine filters, where available.
- Recipe detail views with ingredients and cooking steps.
- Add recipes to meal categories.
- Identify missing ingredients and add them to the grocery list.

### Meal Planner and Nutrition
- Daily calorie goal and progress.
- Breakfast, lunch, dinner, and snack planning.
- Estimated macronutrient tracking.
- Diet preference selection and recipe suggestions.
- BMI and TDEE estimation tools.
- Water intake tracking.
- Meal replacement suggestions and progress milestones, where implemented.

### Grocery List
- Add missing ingredients from planned recipes.
- Mark items as purchased.
- Keep grocery items available while navigating around the site.

### Profile and Preferences
- Front-end login/sign-up demonstration.
- Profile and planner information.
- Header colour palette selection.
- Saved preferences using browser local storage.

## Technology

- **HTML5** for page structure.
- **CSS3** for layout, responsive styling, colours, and visual effects.
- **Vanilla JavaScript** for navigation, recipe interactions, calculations, and saved browser data.
- **localStorage** for selected preferences and supported planner data.

No front-end framework is required.

## Getting Started

### Requirements
- A modern web browser.
- Visual Studio Code (recommended).
- The Live Server extension for Visual Studio Code (recommended).

### Run the website

1. Download and extract the RecipeNest project folder.
2. Open the extracted folder in Visual Studio Code.
3. Keep the HTML, CSS, and JavaScript files in their original relative locations.
4. Open `index.html`.
5. Right-click the file and choose **Open with Live Server**. If Live Server is not installed, install it from the VS Code Extensions panel.
6. The website should open in your default browser.

You can also open `index.html` directly in a browser, although Live Server is recommended while developing.

## Project Structure

The exact filenames may vary depending on the version of the project. A typical structure is:

```text
RecipeNest/
├── index.html          # Main page and in-page application sections
├── styles.css          # Shared layout and visual styling
├── app.js              # Navigation and interactive features
├── recipes.js          # Recipe data, if stored separately
└── README.md           # Project documentation
```

If your downloaded project uses different filenames or additional CSS/JavaScript files, keep those files and their folder structure unchanged. The HTML file must be able to find its linked stylesheets, scripts, and image assets.

## Using RecipeNest

1. Start on the Home page to learn about the platform.
2. Use the sidebar to open **Recipe Planner**, **Meal Planner**, or **Login / Profile**.
3. In Recipe Planner, browse or search for recipes.
4. Add recipes to the appropriate meal category when you want to plan them.
5. Check the grocery list for ingredients that are missing from your pantry.
6. Open Meal Planner to review meal selections and available nutrition tools.
7. Use the header palette selector to change the navigation colour. The selected palette is saved in the browser when local storage is enabled.

## Data and Privacy Notes

- The project uses browser `localStorage` for supported preferences and planner data. This data is stored in the browser on the device being used; it is not automatically synced between devices.
- Clearing browser site data, using a different browser, or opening the site in a different browser profile may remove or hide locally saved information.
- The login/sign-up interface is a **front-end demonstration only**. It is not real account authentication.
- Do not enter real passwords or sensitive personal information. A production login system requires a secure backend, password hashing, session management, and appropriate security controls.
- Recipe calories and nutrition values should be treated as estimates unless they are linked to verified nutritional data.
- Diet labels and ingredient matching are informational and should not be treated as a guarantee that a recipe is safe for allergies, intolerances, or medical dietary requirements. Always check ingredient labels and preparation methods.

## Development Notes

- Prefer small, clearly named JavaScript functions.
- Keep presentation and layout in CSS wherever practical.
- Add new recipe data using the same data structure as the existing recipe entries.
- When changing HTML IDs, update any JavaScript selectors that refer to those IDs.
- When changing file names or folders, update the corresponding `<link>` and `<script>` paths in the HTML.
- Test navigation, recipe search, adding/removing meals, grocery updates, palette persistence, and responsive layouts after making changes.

## Troubleshooting

**The page opens without styling**
- Check that the CSS file path in the HTML is correct.
- Confirm that the CSS file has not been moved or renamed.

**Buttons or navigation do not work**
- Check that the JavaScript files load without errors.
- Open the browser developer tools and inspect the Console for errors.
- Confirm that the HTML element IDs used by JavaScript still exist and are unique.

**Recipe cards do not appear**
- Check that the recipe data file is loaded before the code that renders recipes.
- Confirm that the recipe data uses the expected field names and valid JavaScript syntax.

**Saved information is missing**
- Check that browser storage is enabled.
- Use the same browser and browser profile used previously.
- Avoid clearing site data if you want to keep locally saved information.

## Future Improvements

Possible next steps include:
- Verified nutrition data and clearer serving-size calculations.
- A weekly meal-plan generator.
- Recipe favourites and recently viewed recipes.
- Ingredient substitutions.
- Grocery cost estimates and budget tracking.
- Exportable or printable meal plans and grocery lists.
- Secure backend authentication and optional cloud sync.

## Project Status

RecipeNest is a front-end website project intended for learning, demonstration, and further development. Review and test each feature in the actual project version before presenting it as production-ready.
