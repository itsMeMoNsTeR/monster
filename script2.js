// script2.js
const heroSearch = document.getElementById('heroSearch');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

// Search Configuration
const wasteGuide = {
    // Green Bin Items
    'glass': 'Green/green.html',
    'paper': 'Green/green.html',
    'cardboards': 'Green/green.html',
    'newspapers': 'Green/green.html',
    'magazines': 'Green/green.html',
    
    // Blue Bin Items
    'bottles': 'Blue/blue.html',
    'cans': 'Blue/blue.html',
    'plastic bottles': 'Blue/blue.html',
    'aluminum cans': 'Blue/blue.html',
    'beverage containers': 'Blue/blue.html',
    'tins' : 'Blue/blue.html',
    
    // Black Bin Items
    'styrofoam': 'Black/black.html',
    'diapers': 'Black/black.html',
    'food wrappers': 'Black/black.html',
    'broken glass': 'Black/black.html',
    'plastic bags': 'Black/black.html'
};

const suggestions = {
    'glass': 'Green Bin',
    'paper': 'Green Bin',
    'plastic bottles': 'Blue Bin',
    'aluminum cans': 'Blue Bin',
    'styrofoam': 'Black Bin',
    'diapers': 'Black Bin',
    'food wrappers': 'Black Bin'
};

// State Management
let redirectTimeout = null;

// Debounce Function (300ms)
function debounce(func) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), 300);
    };
}

// Search Functionality
const performSearch = debounce(() => {
    const searchTerm = heroSearch.value.trim().toLowerCase();
    const resultContainer = document.createElement('div');
    
    // Clear previous operations
    if (redirectTimeout) {
        clearTimeout(redirectTimeout);
        resultContainer.remove();
    }

    if (wasteGuide[searchTerm]) {
        showRedirectFeedback(searchTerm, resultContainer);
        handleRedirect(searchTerm);
    } else {
        filterSections(searchTerm);
    }
});

function showRedirectFeedback(searchTerm, container) {
    container.innerHTML = `
        <div class="search-result">
            <p>Taking you to ${searchTerm} disposal guide...</p>
            <div class="loading-spinner"></div>
        </div>
    `;
    document.body.appendChild(container);
}

function handleRedirect(searchTerm) {
    sessionStorage.setItem('searchRedirect', 'true');
    redirectTimeout = setTimeout(() => {
        window.location.href = wasteGuide[searchTerm];
    }, 1500);
}

function filterSections(searchTerm) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = section.textContent.toLowerCase().includes(searchTerm) 
            ? 'block' 
            : 'none';
    });
}

// Suggestions Functionality
function showSuggestions() {
    const searchTerm = heroSearch.value.toLowerCase();
    const suggestionBox = document.querySelector('.search-suggestions');
    suggestionBox.innerHTML = '';

    Object.entries(suggestions).forEach(([item, bin]) => {
        if(item.includes(searchTerm)) {
            const button = document.createElement('button');
            button.className = 'suggestion';
            button.innerHTML = `${item} <span>(${bin})</span>`;
            button.onclick = () => {
                heroSearch.value = item;
                performSearch();
            };
            suggestionBox.appendChild(button);
        }
    });
}

// Event Handlers
heroSearch.addEventListener('input', () => {
    showSuggestions();
    performSearch();
});

heroSearch.addEventListener('focus', () => {
    document.querySelector('.search-wrapper').style.transform = 'scale(1.02)';
});

heroSearch.addEventListener('blur', () => {
    document.querySelector('.search-wrapper').style.transform = 'scale(1)';
});

document.querySelector('.search-button').addEventListener('click', performSearch);

// Mobile Menu Handling
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Keyboard Shortcut (Ctrl/Cmd + K)
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        heroSearch.focus();
    }
});

// Page Return Handling
window.addEventListener('load', () => {
    if(sessionStorage.getItem('searchRedirect')) {
        sessionStorage.removeItem('searchRedirect');
        heroSearch.value = '';
        document.querySelectorAll('section').forEach(s => s.style.display = 'block');
    }
});

// Add click handlers to keyword buttons
document.querySelectorAll('.keyword').forEach(button => {
    button.addEventListener('click', (e) => {
        heroSearch.value = e.target.textContent;
        performSearch();
    });
});
