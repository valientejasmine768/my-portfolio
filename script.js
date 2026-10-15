// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
});

// Close mobile menu after clicking a link
document.querySelectorAll("#nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
    });
});

// Dark mode
const themeToggle = document.getElementById("theme-toggle");

if (localStorage.getItem("portfolio-theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );
});

// Load projects from JSON
async function loadProjects() {
    const container = document.getElementById("projects-container");

    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Could not load project data.");
        }

        const projects = await response.json();

        if (!Array.isArray(projects) || projects.length === 0) {
            container.textContent = "No projects have been added yet.";
            return;
        }

        container.innerHTML = "";

        projects.forEach(function (project) {
            const card = document.createElement("article");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = project.title;

            const description = document.createElement("p");
            description.textContent = project.description;

            const tag = document.createElement("span");
            tag.className = "project-tag";
            tag.textContent = project.technology;

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(tag);

            if (project.link && project.link !== "#") {
                const links = document.createElement("div");
                links.className = "project-links";

                const link = document.createElement("a");
                link.href = project.link;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = "View Project ↗";

                links.appendChild(link);
                card.appendChild(links);
            }

            container.appendChild(card);
        });
    } catch (error) {
        container.textContent =
            "Projects could not be loaded. Please open this website using Live Server.";
    }
}

// Load public GitHub repositories
async function loadGitHubProjects() {
    const container = document.getElementById("github-projects");
    const username = "valientejasmine768";

    try {
        const response = await fetch(
            https://api.github.com/users/${username}/repos?sort=updated&per_page=6
        );

        if (response.status === 404) {
            throw new Error("GitHub username was not found.");
        }

        if (response.status === 403) {
            throw new Error("GitHub API rate limit reached. Please try again later.");
        }

        if (!response.ok) {
            throw new Error("Unable to load GitHub repositories.");
        }

        const repositories = await response.json();

        if (repositories.length === 0) {
            container.textContent =
                "No public repositories found. Add public projects to your GitHub account.";
            return;
        }

        container.innerHTML = "";

        repositories.forEach(function (repo) {
            const card = document.createElement("article");
            card.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = repo.name;

            const description = document.createElement("p");
            description.textContent =
                repo.description || "No description provided.";

            const language = document.createElement("span");
            language.className = "project-tag";
            language.textContent = repo.language || "Other";

            const links = document.createElement("div");
            links.className = "project-links";

            const link = document.createElement("a");
            link.href = repo.html_url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "View on GitHub ↗";

            links.appendChild(link);
            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(language);
            card.appendChild(links);

            container.appendChild(card);
        });
    } catch (error) {
        container.textContent = error.message;
    }
}

// Contact form validation
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
    }

    formStatus.textContent =
        "Your form is valid! This demo does not send messages yet.";

    contactForm.reset();
});

// Back to top button
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    backToTop.classList.toggle("show", window.scrollY > 300);
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Start loading
loadProjects();
loadGitHubProjects();
