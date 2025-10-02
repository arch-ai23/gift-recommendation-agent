# GiftGenie - AI-Powered Gift Recommendation Agent

A modern web application that uses AI to recommend the perfect gifts based on budget, preferences, and recipient information.

## Features

- 🎯 **Smart Recommendations**: AI-powered algorithm that matches gifts to preferences
- 💰 **Budget-Aware**: Filters gifts within your specified budget range
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations
- ⚡ **Real-time**: Instant recommendations as you type
- 🎁 **Comprehensive Database**: 15+ gift categories with detailed information
- 📱 **Mobile-Friendly**: Works perfectly on all devices

## How It Works

1. **Input Parameters**: Enter budget, occasion, recipient type, and preferences
2. **AI Analysis**: Our algorithm scores gifts based on your criteria
3. **Smart Matching**: Considers likes, dislikes, age range, and occasion
4. **Perfect Results**: Get top 6 recommendations ranked by relevance

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gift-recommendation-agent
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

5. Open your browser and visit `http://localhost:3000`

### Development Mode

For development with hot reloading:

```bash
npm run dev
```

## API Endpoints

### POST /api/recommend
Get gift recommendations based on criteria.

**Request Body:**
```json
{
  "budget": 100,
  "preferences": {
    "likes": ["tech", "music"],
    "dislikes": ["expensive"],
    "ageRange": "25-35"
  },
  "occasion": "birthday",
  "recipientType": "male"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [...],
  "totalFound": 6
}
```

### GET /api/gifts
Get all available gifts in the database.

## Gift Categories

- **Electronics**: Tech gadgets, smart devices
- **Books**: Novels, cookbooks, educational
- **Fashion**: Accessories, clothing items
- **Home**: Decor, appliances, smart home
- **Fitness**: Sports equipment, wellness items
- **Hobbies**: Art supplies, games, crafts
- **Beauty**: Skincare, grooming products

## Algorithm Features

- **Preference Scoring**: Matches likes/dislikes with gift tags
- **Budget Optimization**: Considers price-to-budget ratio
- **Occasion Matching**: Prioritizes gifts suitable for the occasion
- **Age-Appropriate**: Considers age range for better targeting
- **Gender Preferences**: Matches recipient type when specified

## Customization

### Adding New Gifts
Edit `src/recommendationEngine.js` and add new gift objects to the `initializeGiftDatabase()` method.

### Modifying Scoring
Adjust the scoring algorithm in the `getRecommendations()` method to change how gifts are ranked.

### UI Customization
Modify `src/styles.css` to change colors, fonts, and layout.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build Tool**: Webpack
- **Styling**: Custom CSS with modern features
- **Icons**: Font Awesome

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please open an issue on GitHub.
