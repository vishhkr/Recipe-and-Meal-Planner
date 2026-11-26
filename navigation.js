/*
 * RECIPENEST — IN-PAGE NAVIGATION
 * ------------------------------------------------------------
 * Switches between the Home, Recipe, Meal and Profile views
 * without reloading the website. Also controls the mobile menu
 * and links that scroll to sections on the homepage.
 */

/*
============================================================
RECIPENEST - IN-PAGE NAVIGATION
The four app views use the original sections and keep their IDs,
so the recipe and nutrition scripts continue to work as before.
============================================================
*/
(function () {
    const pageViews = document.querySelectorAll("[data-page-view]");
    const sidebar = document.getElementById("mainSidebar");
    const toggleButton = document.getElementById("sidebarToggle");
    const overlay = document.getElementById("sidebarOverlay");
    const sidebarLinks = document.querySelectorAll(".sidebar-link[data-sidebar-target]");
    const profilePanel = document.getElementById("profilePanel");
    const profileMenu = document.getElementById("profileMenu");
    const profileButton = document.querySelector(".profile-button");

    // Close the mobile sidebar after a destination has been selected.
    function closeSidebar() {
        if (!sidebar || !toggleButton || !overlay) return;
        sidebar.classList.remove("is-open");
        overlay.hidden = true;
        document.body.classList.remove("sidebar-open");
        toggleButton.setAttribute("aria-expanded", "false");
    }

    function openSidebar() {
        if (!sidebar || !toggleButton || !overlay) return;
        sidebar.classList.add("is-open");
        overlay.hidden = false;
        document.body.classList.add("sidebar-open");
        toggleButton.setAttribute("aria-expanded", "true");
    }

    // Show one page-like view and hide the other views.
    function navigateTo(viewName, shouldScrollTop) {
        const validViews = ["home", "recipe", "meal", "profile"];
        const nextView = validViews.includes(viewName) ? viewName : "home";

        pageViews.forEach(function (view) {
            const isCurrent = view.dataset.pageView === nextView;
            view.hidden = !isCurrent;
            view.setAttribute("aria-hidden", String(!isCurrent));
        });

        document.body.dataset.activeView = nextView;
        sidebarLinks.forEach(function (link) {
            const selected = link.dataset.sidebarTarget === nextView;
            link.classList.toggle("is-active", selected);
            if (selected) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        // The profile panel is ordinary page content now, not a full-screen popup.
        if (nextView === "profile") {
            profilePanel.hidden = false;
            document.dispatchEvent(new CustomEvent("recipenest-profile-opened"));
        }

        closeSidebar();
        if (shouldScrollTop !== false) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    // Other scripts can use this small function when they need to switch views.
    window.recipeNestNavigate = navigateTo;

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            if (sidebar.classList.contains("is-open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }
    if (overlay) overlay.addEventListener("click", closeSidebar);

    // Route links and buttons without reloading the page.
    document.addEventListener("click", function (event) {
        const viewLink = event.target.closest("[data-app-view]");
        if (viewLink && !viewLink.classList.contains("profile-button")) {
            event.preventDefault();
            navigateTo(viewLink.dataset.appView);
            if (viewLink.dataset.appView === "profile" && profileMenu) {
                profileMenu.hidden = true;
            }
            return;
        }

        // About, Benefits and Services always live on the homepage.
        const homeAnchor = event.target.closest("[data-home-anchor]");
        if (homeAnchor) {
            event.preventDefault();
            const targetId = homeAnchor.getAttribute("href").slice(1);
            navigateTo("home", false);
            window.setTimeout(function () {
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 40);
            return;
        }

        // The navbar profile icon opens its existing small menu.
        // The menu's Profile / Recipe / Meal links are handled above.
        if (viewLink && viewLink.classList.contains("profile-button")) {
            return;
        }

        // Compatibility for old internal links that may still point to a section ID.
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor) {
            return;
        }
        const destination = anchor.getAttribute("href");
        if (destination === "#home" || destination === "#") {
            event.preventDefault();
            navigateTo("home");
        } else if (["#pantry", "#discover", "#groceries", "#recipe-view"].includes(destination)) {
            event.preventDefault();
            navigateTo("recipe");
        } else if (["#planner", "#meal-dashboard", "#meal-view"].includes(destination)) {
            event.preventDefault();
            navigateTo("meal");
        } else if (["#profilePanel", "#profile-view"].includes(destination)) {
            event.preventDefault();
            navigateTo("profile");
        } else if (["#about", "#benefits", "#services", "#different", "#daily-planning-info", "#smart-shopping-info"].includes(destination)) {
            event.preventDefault();
            const targetId = destination.slice(1);
            navigateTo("home", false);
            window.setTimeout(function () {
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 40);
        }
    });

    // Clicking the profile panel's close button returns to the home page.
    document.getElementById("closeProfile").addEventListener("click", function () {
        navigateTo("home");
    });

    // Escape closes the mobile menu and any open profile dropdown.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();
            if (profileMenu) {
                profileMenu.hidden = true;
            }

            if (profileButton) {
                profileButton.setAttribute("aria-expanded", "false");
            }
        }
    });

    // The homepage is always the first view when the site opens.
    navigateTo("home", false);
})();
