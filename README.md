# 🎁 GiftGenie - AI-Powered Gift Recommendation Website

A modern, responsive web application that uses AI to recommend the perfect gifts based on budget, preferences, and recipient information. Built with a beautiful Uncommon Goods-inspired design.

![GiftGenie Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Live Demo

**Visit the live website:** [https://your-username.github.io/gift-recommendation-agent](https://your-username.github.io/gift-recommendation-agent)

## ✨ Features

- 🎯 **Smart AI Recommendations**: Advanced algorithm that matches gifts to preferences
- 💰 **Budget-Aware Filtering**: Find gifts within your specified budget range
- 🎨 **Modern E-commerce UI**: Beautiful, responsive design inspired by Uncommon Goods
- ⚡ **Real-time Search**: Instant product filtering and search
- 🛍️ **Product Browsing**: Browse 15+ categories with advanced filtering
- 📱 **Mobile-First Design**: Perfect experience on all devices
- 🔍 **Global Search**: Search across products, categories, and descriptions
- 🏷️ **Smart Categorization**: Electronics, Fashion, Home, Fitness, Books, and more

## 🚀 Quick Start

### Option 1: Use the Live Website
Simply visit the live demo link above - no installation required!

### Option 2: Run Locally

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/gift-recommendation-agent.git
cd gift-recommendation-agent
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build the application:**
```bash
npm run build
```

4. **Start the server:**
```bash
npm start
```

5. **Open your browser:**
Visit `http://localhost:3000`

## 🎨 Design Features

### Modern E-commerce Interface
- **Hero Section**: Compelling headline with call-to-action buttons
- **Category Navigation**: Visual category cards with hover effects
- **Product Grid**: Professional product cards with pricing and descriptions
- **Advanced Filtering**: Filter by category, price range, and sorting options
- **Global Search**: Real-time search across all products

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Friendly**: Perfect layout for tablets
- **Desktop Enhanced**: Rich experience on larger screens

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with modern features (Flexbox, Grid, Animations)
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)
- **Build Tool**: Webpack
- **Deployment**: GitHub Pages
- **Version Control**: Git

## 📁 Project Structure

```
gift-recommendation-agent/
├── public/                 # Static files for GitHub Pages
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── app.js            # JavaScript application
├── src/                   # Source files
│   ├── index.html         # Development HTML
│   ├── styles.css         # Development CSS
│   ├── app.js            # Development JavaScript
│   └── recommendationEngine.js  # AI algorithm
├── .github/workflows/     # GitHub Actions
├── package.json          # Dependencies
└── README.md            # This file
```

## 🎯 How It Works

### 1. Product Discovery
- Browse products by category
- Use advanced filters (price, category, sorting)
- Search globally across all products

### 2. AI Recommendations (Coming Soon)
- Enter budget and preferences
- AI analyzes your criteria
- Get personalized gift suggestions

### 3. Smart Filtering
- **Category Filter**: Electronics, Fashion, Home, Fitness, Books, Hobbies, Beauty
- **Price Ranges**: Under $50, $50-$100, $100-$200, $200+
- **Sorting**: Relevance, Price (Low to High), Price (High to Low), Name A-Z

## 🎁 Product Categories

- **Electronics** 📱 - Tech gadgets, smart devices, accessories
- **Fashion** 👕 - Clothing, accessories, jewelry
- **Home & Decor** 🏠 - Smart home, appliances, decor
- **Fitness** 💪 - Sports equipment, wellness items
- **Books** 📚 - Novels, cookbooks, educational materials
- **Hobbies** 🎨 - Art supplies, games, crafts
- **Beauty** 💄 - Skincare, grooming, personal care

## 🔧 Customization

### Adding New Products
Edit the product data in `public/app.js` to add new gifts:

```javascript
{
    id: 16,
    name: "New Gift Name",
    category: "electronics",
    price: 99.99,
    tags: ["tag1", "tag2", "tag3"],
    description: "Gift description here"
}
```

### Styling Changes
Modify `public/styles.css` to customize:
- Colors and themes
- Layout and spacing
- Animations and effects
- Typography

## 🚀 Deployment

### GitHub Pages (Current)
The website is automatically deployed to GitHub Pages when you push to the main branch.

### Other Hosting Options
- **Netlify**: Drag and drop the `public` folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Deploy static files
- **AWS S3**: Upload static files to S3 bucket

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspired by [Uncommon Goods](https://www.uncommongoods.com)
- Icons by [Font Awesome](https://fontawesome.com)
- Fonts by [Google Fonts](https://fonts.google.com)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/gift-recommendation-agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/gift-recommendation-agent/discussions)

---

**Made with ❤️ for finding the perfect gifts!**
