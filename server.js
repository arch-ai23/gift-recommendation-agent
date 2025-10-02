const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { GiftRecommendationEngine } = require('./src/recommendationEngine');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Initialize recommendation engine
const recommendationEngine = new GiftRecommendationEngine();

// API Routes
app.post('/api/recommend', (req, res) => {
  try {
    const { budget, preferences, occasion, recipientType } = req.body;
    
    if (!budget || !preferences) {
      return res.status(400).json({ 
        error: 'Budget and preferences are required' 
      });
    }

    const recommendations = recommendationEngine.getRecommendations({
      budget: parseFloat(budget),
      preferences: preferences,
      occasion: occasion || 'general',
      recipientType: recipientType || 'general'
    });

    res.json({
      success: true,
      recommendations: recommendations,
      totalFound: recommendations.length
    });
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations' 
    });
  }
});

app.get('/api/gifts', (req, res) => {
  try {
    const gifts = recommendationEngine.getAllGifts();
    res.json({ success: true, gifts });
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Failed to fetch gifts' });
  }
});

// Serve the main application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎁 Gift Recommendation Agent running on:`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Network: http://192.168.88.12:${PORT}`);
  console.log(`   Share this URL with others on your network!`);
});
