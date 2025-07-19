# CareerSync 2.0 – AI Career Coach

A full-featured professional web application that provides AI-powered career coaching with resume analysis, job recommendations, mock interviews, and personalized career improvement plans.

## Features

### 🎯 Core Features
- **Resume Upload & Analysis**: PDF upload or text paste with ATS scoring (0-100)
- **AI Job Recommendations**: 3 best matching job roles based on user profile
- **Mock Interview System**: Speech-to-text with emotion analysis using Web Speech API
- **Skills Gap Analysis**: Visual comparison of current vs required skills
- **7-Day Career Plan**: Personalized daily action items for career improvement
- **Interactive Dashboard**: Radar charts, progress bars, and career metrics

### 🎨 Design Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with smooth animations
- **Modern UI/UX**: Clean, professional interface with card-based layout
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Animations**: Smooth transitions and loading states throughout

### 🛠 Technical Features
- **Frontend Only**: Pure HTML, CSS, JavaScript (no backend required)
- **Local Storage**: Persistent data storage between sessions
- **Web Speech API**: Real-time speech recognition and analysis
- **Chart.js Integration**: Beautiful data visualizations
- **Mobile-First**: Responsive design optimized for all devices

## Quick Start

### Option 1: Direct Use
1. Visit the deployed application: [CareerSync 2.0 Live Demo](https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/db30cdd940ef92401179a92009ed315b/210f499a-0bd6-47b5-a3c5-32fb3ba0a8aa/index.html)
2. Click "Get Started" to begin using the application

### Option 2: Local Development

#### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

#### Installation Steps

1. **Download the Application Files**
   ```bash
   # Create project directory
   mkdir careersync-ai-coach
   cd careersync-ai-coach

   # Download the files
   curl -O https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/db30cdd940ef92401179a92009ed315b/210f499a-0bd6-47b5-a3c5-32fb3ba0a8aa/index.html
   curl -O https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/db30cdd940ef92401179a92009ed315b/210f499a-0bd6-47b5-a3c5-32fb3ba0a8aa/style.css
   curl -O https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/db30cdd940ef92401179a92009ed315b/210f499a-0bd6-47b5-a3c5-32fb3ba0a8aa/app.js
   ```

2. **Run with Local Server (Recommended)**

   **Using Python:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js:**
   ```bash
   # Install serve globally
   npm install -g serve

   # Run the server
   serve . -s
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:8000`
   - The application will load with the landing page

## Deployment Options

### GitHub Pages
1. Create a new GitHub repository
2. Upload the three files (index.html, style.css, app.js)
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your app will be available at `https://username.github.io/repository-name`

### Netlify
1. Sign up for [Netlify](https://netlify.com)
2. Drag and drop the three files to the Netlify deploy interface
3. Your app will be automatically deployed with a custom URL

### Vercel
1. Sign up for [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`
3. Run `vercel` in your project directory
4. Follow the prompts to deploy

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init hosting`
3. Copy the files to the public directory
4. Run `firebase deploy`

### Traditional Web Hosting
Upload the three files (index.html, style.css, app.js) to any web hosting provider:
- cPanel/File Manager
- FTP upload
- SSH upload

## File Structure

```
careersync-ai-coach/
├── index.html          # Main application structure
├── style.css           # Complete styling with light/dark themes
├── app.js              # All application logic and features
└── README.md           # This documentation file
```

## Browser Compatibility

### Full Feature Support
- Chrome 80+ (Recommended)
- Firefox 75+
- Safari 14+
- Edge 80+

### Limited Speech Features
- Older browsers may not support Web Speech API
- Application will gracefully degrade with text-only mock interviews

## Usage Guide

### 1. Resume Analysis
- Upload PDF resume or paste text directly
- Receive instant ATS score and improvement tips
- View extracted skills and experience summary

### 2. Job Recommendations
- Get 3 personalized job role suggestions
- View match percentages and salary ranges
- Explore required skills for each role

### 3. Skills Gap Analysis
- Compare your skills against target job requirements
- View visual charts showing skill proficiencies
- Get prioritized list of skills to develop

### 4. Mock Interview Practice
- Choose question categories (Technical/Behavioral)
- Use voice input for realistic practice
- Receive confidence and emotion analysis
- Review performance metrics and feedback

### 5. Career Improvement Plan
- Generate personalized 7-day action plan
- Track daily progress with checkboxes
- Access curated learning resources
- Adapt plan based on your advancement

## Customization

### Modifying Sample Data
Edit the `sampleData` object in `app.js` to customize:
- Job recommendations
- Interview questions
- Skills categories
- Career plan templates

### Styling Customization
Modify CSS custom properties in `style.css`:
```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #06b6d4;
  /* Customize colors, fonts, spacing */
}
```

### Adding Features
The modular architecture allows easy feature additions:
1. Add new sections to `index.html`
2. Create corresponding styles in `style.css`
3. Implement logic in `app.js`

## Troubleshooting

### Speech Recognition Issues
- Ensure microphone permissions are granted
- Use HTTPS for Web Speech API to work properly
- Check browser compatibility for speech features

### Local Storage Limitations
- Maximum ~10MB storage per domain
- Clear browser cache if experiencing issues
- Data persists until manually cleared

### Performance Optimization
- Application is optimized for fast loading
- Images are served as inline SVG where possible
- CSS and JS are minified for production

## Contributing

This is a standalone application perfect for:
- Educational purposes
- Portfolio projects  
- Career coaching businesses
- HR departments
- Job seekers

Feel free to fork, modify, and distribute according to your needs.

## License

Open source - feel free to use, modify, and distribute.

## Support

For issues or questions:
1. Check browser compatibility
2. Ensure microphone permissions
3. Verify HTTPS for speech features
4. Clear browser cache/storage

---

**CareerSync 2.0** - Empowering careers through AI-driven insights and personalized coaching.
