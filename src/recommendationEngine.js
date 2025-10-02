class GiftRecommendationEngine {
  constructor() {
    this.gifts = this.initializeGiftDatabase();
  }

  initializeGiftDatabase() {
    return [
      // Electronics & Tech
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        tags: ["tech", "music", "wireless", "audio"],
        description: "High-quality wireless headphones with noise cancellation",
        ageRange: "16-65",
        gender: "unisex",
        occasion: ["birthday", "holiday", "graduation"]
      },
      {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 199.99,
        tags: ["tech", "fitness", "smart", "health"],
        description: "Fitness tracking smartwatch with heart rate monitor",
        ageRange: "18-65",
        gender: "unisex",
        occasion: ["birthday", "holiday", "anniversary"]
      },
      {
        id: 3,
        name: "Portable Phone Charger",
        category: "electronics",
        price: 29.99,
        tags: ["tech", "portable", "utility", "charging"],
        description: "High-capacity portable charger for smartphones",
        ageRange: "16-65",
        gender: "unisex",
        occasion: ["birthday", "holiday", "graduation"]
      },

      // Books & Education
      {
        id: 4,
        name: "Bestselling Novel",
        category: "books",
        price: 15.99,
        tags: ["reading", "fiction", "entertainment", "literature"],
        description: "Popular fiction novel by acclaimed author",
        ageRange: "18-80",
        gender: "unisex",
        occasion: ["birthday", "holiday", "graduation"]
      },
      {
        id: 5,
        name: "Cookbook Collection",
        category: "books",
        price: 24.99,
        tags: ["cooking", "food", "recipes", "kitchen"],
        description: "Comprehensive cookbook with international recipes",
        ageRange: "20-70",
        gender: "unisex",
        occasion: ["birthday", "holiday", "housewarming"]
      },

      // Fashion & Accessories
      {
        id: 6,
        name: "Designer Scarf",
        category: "fashion",
        price: 89.99,
        tags: ["fashion", "accessories", "luxury", "style"],
        description: "Premium silk scarf with elegant design",
        ageRange: "20-60",
        gender: "female",
        occasion: ["birthday", "holiday", "anniversary"]
      },
      {
        id: 7,
        name: "Leather Wallet",
        category: "fashion",
        price: 59.99,
        tags: ["fashion", "leather", "accessories", "men"],
        description: "Genuine leather wallet with RFID protection",
        ageRange: "18-65",
        gender: "male",
        occasion: ["birthday", "holiday", "graduation"]
      },

      // Home & Decor
      {
        id: 8,
        name: "Smart Home Speaker",
        category: "home",
        price: 99.99,
        tags: ["smart", "home", "music", "voice", "tech"],
        description: "Voice-controlled smart speaker with AI assistant",
        ageRange: "18-65",
        gender: "unisex",
        occasion: ["housewarming", "holiday", "anniversary"]
      },
      {
        id: 9,
        name: "Artisan Coffee Maker",
        category: "home",
        price: 149.99,
        tags: ["coffee", "kitchen", "appliance", "premium"],
        description: "Professional-grade coffee maker for coffee enthusiasts",
        ageRange: "25-70",
        gender: "unisex",
        occasion: ["housewarming", "holiday", "anniversary"]
      },

      // Sports & Fitness
      {
        id: 10,
        name: "Yoga Mat Set",
        category: "fitness",
        price: 39.99,
        tags: ["fitness", "yoga", "exercise", "wellness"],
        description: "Premium yoga mat with carrying strap and blocks",
        ageRange: "16-65",
        gender: "unisex",
        occasion: ["birthday", "holiday", "graduation"]
      },
      {
        id: 11,
        name: "Fitness Tracker",
        category: "fitness",
        price: 79.99,
        tags: ["fitness", "health", "tracking", "sports"],
        description: "Advanced fitness tracker with GPS and heart rate",
        ageRange: "16-65",
        gender: "unisex",
        occasion: ["birthday", "holiday", "graduation"]
      },

      // Hobbies & Crafts
      {
        id: 12,
        name: "Art Supplies Kit",
        category: "hobbies",
        price: 49.99,
        tags: ["art", "creative", "painting", "crafts"],
        description: "Complete set of professional art supplies",
        ageRange: "12-80",
        gender: "unisex",
        occasion: ["birthday", "holiday", "graduation"]
      },
      {
        id: 13,
        name: "Board Game Collection",
        category: "hobbies",
        price: 34.99,
        tags: ["games", "entertainment", "family", "strategy"],
        description: "Popular strategy board game for 2-4 players",
        ageRange: "12-80",
        gender: "unisex",
        occasion: ["birthday", "holiday", "housewarming"]
      },

      // Beauty & Personal Care
      {
        id: 14,
        name: "Luxury Skincare Set",
        category: "beauty",
        price: 129.99,
        tags: ["beauty", "skincare", "luxury", "self-care"],
        description: "Premium skincare set with anti-aging properties",
        ageRange: "25-65",
        gender: "female",
        occasion: ["birthday", "holiday", "anniversary"]
      },
      {
        id: 15,
        name: "Grooming Kit",
        category: "beauty",
        price: 69.99,
        tags: ["grooming", "men", "beauty", "personal-care"],
        description: "Complete men's grooming kit with premium products",
        ageRange: "18-65",
        gender: "male",
        occasion: ["birthday", "holiday", "graduation"]
      }
    ];
  }

  getRecommendations(criteria) {
    const { budget, preferences, occasion, recipientType } = criteria;
    
    // Filter gifts by budget
    let filteredGifts = this.gifts.filter(gift => gift.price <= budget);
    
    // Score gifts based on preferences
    const scoredGifts = filteredGifts.map(gift => {
      let score = 0;
      
      // Score based on preferences (likes)
      if (preferences.likes) {
        preferences.likes.forEach(like => {
          if (gift.tags.includes(like.toLowerCase())) {
            score += 10;
          }
          if (gift.category === like.toLowerCase()) {
            score += 15;
          }
        });
      }
      
      // Penalize based on dislikes
      if (preferences.dislikes) {
        preferences.dislikes.forEach(dislike => {
          if (gift.tags.includes(dislike.toLowerCase())) {
            score -= 15;
          }
          if (gift.category === dislike.toLowerCase()) {
            score -= 20;
          }
        });
      }
      
      // Score based on occasion
      if (occasion && gift.occasion.includes(occasion)) {
        score += 5;
      }
      
      // Score based on recipient type
      if (recipientType && gift.gender !== 'unisex') {
        if (recipientType === gift.gender) {
          score += 8;
        } else {
          score -= 10;
        }
      }
      
      // Age range scoring (simplified)
      if (preferences.ageRange) {
        const age = parseInt(preferences.ageRange);
        if (age >= 18 && age <= 30) {
          if (gift.tags.includes('tech') || gift.tags.includes('fitness')) {
            score += 5;
          }
        } else if (age >= 31 && age <= 50) {
          if (gift.tags.includes('home') || gift.tags.includes('luxury')) {
            score += 5;
          }
        } else if (age >= 51) {
          if (gift.tags.includes('books') || gift.tags.includes('hobbies')) {
            score += 5;
          }
        }
      }
      
      // Budget efficiency score (closer to budget gets bonus)
      const budgetEfficiency = (gift.price / budget) * 5;
      score += budgetEfficiency;
      
      return { ...gift, score };
    });
    
    // Sort by score (highest first) and return top recommendations
    return scoredGifts
      .filter(gift => gift.score > 0) // Only return gifts with positive scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Return top 6 recommendations
  }

  getAllGifts() {
    return this.gifts;
  }

  getGiftsByCategory(category) {
    return this.gifts.filter(gift => gift.category === category);
  }

  getGiftsByPriceRange(minPrice, maxPrice) {
    return this.gifts.filter(gift => gift.price >= minPrice && gift.price <= maxPrice);
  }
}

module.exports = { GiftRecommendationEngine };
