class GiftRecommendationApp {
    constructor() {
        this.form = document.getElementById('giftForm');
        this.loadingSection = document.getElementById('loadingSection');
        this.resultsSection = document.getElementById('resultsSection');
        this.giftsContainer = document.getElementById('giftsContainer');
        this.resultsCount = document.getElementById('resultsCount');
        this.newSearchBtn = document.getElementById('newSearchBtn');
        this.clearFormBtn = document.getElementById('clearForm');
        
        // New elements
        this.productGrid = document.getElementById('productGrid');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.priceFilter = document.getElementById('priceFilter');
        this.sortFilter = document.getElementById('sortFilter');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.globalSearch = document.getElementById('globalSearch');
        
        // Navigation buttons
        this.recommendBtn = document.getElementById('recommendBtn');
        this.browseBtn = document.getElementById('browseBtn');
        this.heroRecommendBtn = document.getElementById('heroRecommendBtn');
        this.heroBrowseBtn = document.getElementById('heroBrowseBtn');
        
        // Category cards
        this.categoryCards = document.querySelectorAll('.category-card');
        
        // State
        this.currentProducts = [];
        this.filteredProducts = [];
        this.currentPage = 1;
        this.productsPerPage = 12;
        
        this.initializeEventListeners();
        this.loadAllProducts();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.newSearchBtn.addEventListener('click', () => this.resetForm());
        this.clearFormBtn.addEventListener('click', () => this.clearForm());
        
        // Navigation buttons
        this.recommendBtn.addEventListener('click', () => this.showRecommendationForm());
        this.browseBtn.addEventListener('click', () => this.showProductGrid());
        this.heroRecommendBtn.addEventListener('click', () => this.showRecommendationForm());
        this.heroBrowseBtn.addEventListener('click', () => this.showProductGrid());
        
        // Category cards
        this.categoryCards.forEach(card => {
            card.addEventListener('click', (e) => this.filterByCategory(e));
        });
        
        // Filters
        this.categoryFilter.addEventListener('change', () => this.applyFilters());
        this.priceFilter.addEventListener('change', () => this.applyFilters());
        this.sortFilter.addEventListener('change', () => this.applyFilters());
        
        // Load more
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreProducts());
        
        // Global search
        this.globalSearch.addEventListener('input', (e) => this.handleGlobalSearch(e));
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const budget = formData.get('budget');
        const occasion = formData.get('occasion');
        const recipientType = formData.get('recipientType');
        const ageRange = formData.get('ageRange');
        const likes = formData.get('likes');
        const dislikes = formData.get('dislikes');

        // Validate required fields
        if (!budget || budget < 10) {
            this.showError('Please enter a valid budget (minimum $10)');
            return;
        }

        // Show loading state
        this.showLoading();

        try {
            const preferences = {
                likes: likes ? likes.split(',').map(item => item.trim()).filter(item => item) : [],
                dislikes: dislikes ? dislikes.split(',').map(item => item.trim()).filter(item => item) : [],
                ageRange: ageRange
            };

            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    budget: parseFloat(budget),
                    preferences,
                    occasion,
                    recipientType
                })
            });

            const data = await response.json();

            if (data.success) {
                this.displayResults(data.recommendations);
            } else {
                this.showError(data.error || 'Failed to get recommendations');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showError('Failed to connect to the server. Please try again.');
        }
    }

    showLoading() {
        this.form.style.display = 'none';
        this.resultsSection.classList.add('hidden');
        this.loadingSection.classList.remove('hidden');
    }

    displayResults(recommendations) {
        this.loadingSection.classList.add('hidden');
        this.resultsSection.classList.remove('hidden');

        if (recommendations.length === 0) {
            this.giftsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; color: #cbd5e0; margin-bottom: 1rem;"></i>
                    <h3>No gifts found</h3>
                    <p>Try adjusting your budget or preferences to find more options.</p>
                </div>
            `;
            this.resultsCount.textContent = 'No recommendations found';
            return;
        }

        this.resultsCount.textContent = `Found ${recommendations.length} perfect gift${recommendations.length !== 1 ? 's' : ''}`;
        
        this.giftsContainer.innerHTML = recommendations.map(gift => this.createGiftCard(gift)).join('');
    }

    createGiftCard(gift) {
        const tags = gift.tags.map(tag => `<span class="gift-tag">${tag}</span>`).join('');
        const occasions = gift.occasion.join(', ');
        
        return `
            <div class="gift-card">
                <div class="gift-header">
                    <div>
                        <div class="gift-name">${gift.name}</div>
                        <div class="gift-category">${gift.category}</div>
                    </div>
                    <div class="gift-price">$${gift.price.toFixed(2)}</div>
                </div>
                <div class="gift-description">${gift.description}</div>
                <div class="gift-tags">${tags}</div>
                <div class="gift-occasion">Perfect for: ${occasions}</div>
            </div>
        `;
    }

    showError(message) {
        this.loadingSection.classList.add('hidden');
        this.resultsSection.classList.remove('hidden');
        
        this.giftsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e53e3e; margin-bottom: 1rem;"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn" style="
                    background: #e53e3e;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">Try Again</button>
            </div>
        `;
        this.resultsCount.textContent = 'Error occurred';
    }

    resetForm() {
        this.form.reset();
        this.form.style.display = 'block';
        this.resultsSection.classList.add('hidden');
        this.loadingSection.classList.add('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    clearForm() {
        this.form.reset();
        // Focus on budget input
        document.getElementById('budget').focus();
    }

    handleNavigation(e) {
        e.preventDefault();
        const target = e.target.getAttribute('href').substring(1);
        
        // Update active nav link
        this.navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        
        // Show/hide sections
        Object.values(this.sections).forEach(section => {
            section.classList.add('hidden');
        });
        
        if (this.sections[target]) {
            this.sections[target].classList.remove('hidden');
        }
        
        // Scroll to section
        this.sections[target].scrollIntoView({ behavior: 'smooth' });
    }

    handlePreset(e) {
        const preset = e.currentTarget.getAttribute('data-preset');
        const presets = {
            'birthday-male': {
                budget: 100,
                occasion: 'birthday',
                recipientType: 'male',
                likes: 'tech, sports, gadgets',
                dislikes: '',
                ageRange: '26-35'
            },
            'birthday-female': {
                budget: 100,
                occasion: 'birthday',
                recipientType: 'female',
                likes: 'beauty, fashion, jewelry',
                dislikes: '',
                ageRange: '26-35'
            },
            'holiday-family': {
                budget: 50,
                occasion: 'holiday',
                recipientType: 'general',
                likes: 'home, family, cozy',
                dislikes: '',
                ageRange: '36-55'
            },
            'tech-lover': {
                budget: 200,
                occasion: 'general',
                recipientType: 'general',
                likes: 'tech, gadgets, electronics, innovation',
                dislikes: 'old-fashioned',
                ageRange: '18-45'
            },
            'fitness-buff': {
                budget: 100,
                occasion: 'general',
                recipientType: 'general',
                likes: 'fitness, sports, health, wellness',
                dislikes: 'sedentary',
                ageRange: '20-50'
            },
            'book-worm': {
                budget: 30,
                occasion: 'general',
                recipientType: 'general',
                likes: 'books, reading, literature, learning',
                dislikes: 'noise',
                ageRange: '25-65'
            }
        };
        
        const presetData = presets[preset];
        if (presetData) {
            // Fill form with preset data
            document.getElementById('budget').value = presetData.budget;
            document.getElementById('occasion').value = presetData.occasion;
            document.getElementById('recipientType').value = presetData.recipientType;
            document.getElementById('likes').value = presetData.likes;
            document.getElementById('dislikes').value = presetData.dislikes;
            document.getElementById('ageRange').value = presetData.ageRange;
            
            // Navigate to search section
            this.navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('a[href="#search"]').classList.add('active');
            
            Object.values(this.sections).forEach(section => {
                section.classList.add('hidden');
            });
            this.sections.search.classList.remove('hidden');
            
            // Scroll to form
            this.sections.search.scrollIntoView({ behavior: 'smooth' });
        }
    }

    async loadBrowseResults() {
        try {
            const response = await fetch('/api/gifts');
            const data = await response.json();
            
            if (data.success) {
                let gifts = data.gifts;
                
                // Apply filters
                const category = this.categoryFilter.value;
                const priceRange = this.priceFilter.value;
                
                if (category) {
                    gifts = gifts.filter(gift => gift.category === category);
                }
                
                if (priceRange) {
                    const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
                    gifts = gifts.filter(gift => gift.price >= min && gift.price <= max);
                }
                
                this.displayBrowseResults(gifts);
            }
        } catch (error) {
            console.error('Error loading browse results:', error);
            this.browseResults.innerHTML = '<p>Error loading gifts. Please try again.</p>';
        }
    }

    async loadAllProducts() {
        try {
            const response = await fetch('/api/gifts');
            const data = await response.json();
            
            if (data.success) {
                this.currentProducts = data.gifts;
                this.filteredProducts = [...this.currentProducts];
                this.displayProducts();
            }
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    displayProducts() {
        const startIndex = 0;
        const endIndex = this.currentPage * this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(0, endIndex);
        
        this.productGrid.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');
        
        // Show/hide load more button
        this.loadMoreBtn.style.display = endIndex >= this.filteredProducts.length ? 'none' : 'block';
    }

    createProductCard(product) {
        const tags = product.tags.slice(0, 3).map(tag => `<span class="product-tag">${tag}</span>`).join('');
        
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <div class="product-badge">${product.category}</div>
                    <i class="fas fa-gift"></i>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <div class="product-name">${product.name}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-tags">${tags}</div>
                    <div class="product-footer">
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                            <i class="fas fa-plus"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    showRecommendationForm() {
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    }

    showProductGrid() {
        document.querySelector('.featured-products').scrollIntoView({ behavior: 'smooth' });
    }

    filterByCategory(e) {
        const category = e.currentTarget.getAttribute('data-category');
        this.categoryFilter.value = category;
        this.applyFilters();
        this.showProductGrid();
    }

    applyFilters() {
        let filtered = [...this.currentProducts];
        
        // Category filter
        const category = this.categoryFilter.value;
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }
        
        // Price filter
        const priceRange = this.priceFilter.value;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => p === '+' ? Infinity : parseInt(p));
            filtered = filtered.filter(product => product.price >= min && product.price <= max);
        }
        
        // Sort
        const sortBy = this.sortFilter.value;
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Keep original order for relevance
                break;
        }
        
        this.filteredProducts = filtered;
        this.currentPage = 1;
        this.displayProducts();
    }

    loadMoreProducts() {
        this.currentPage++;
        this.displayProducts();
    }

    handleGlobalSearch(e) {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            this.filteredProducts = [...this.currentProducts];
        } else {
            this.filteredProducts = this.currentProducts.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.tags.some(tag => tag.toLowerCase().includes(query)) ||
                product.category.toLowerCase().includes(query)
            );
        }
        this.currentPage = 1;
        this.displayProducts();
    }

    addToCart(productId) {
        // This would integrate with a shopping cart system
        console.log('Added to cart:', productId);
        // Show a toast notification or update cart UI
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new GiftRecommendationApp();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for better UX
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
        
        .no-results, .error-message {
            text-align: center;
            padding: 3rem 1rem;
            color: #718096;
        }
        
        .no-results h3, .error-message h3 {
            color: #4a5568;
            margin-bottom: 0.5rem;
        }
        
        .retry-btn:hover {
            background: #c53030 !important;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
});
