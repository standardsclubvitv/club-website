# BIS Standards Club Website 🎓

> Official website of BIS Standards Club at VIT Vellore - Promoting quality standards and excellence since 2023

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.standardsvit.live%2F)](https://www.standardsvit.live/)
[![Performance](https://img.shields.io/badge/Performance-Optimized-brightgreen)]()
[![Mobile](https://img.shields.io/badge/Mobile-Responsive-blue)]()
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple)]()

## ✨ Features

### 🎨 Modern & Aesthetic UI
- Clean, contemporary design following latest web design trends
- Smooth animations and transitions
- Beautiful gradient color schemes
- Professional card-based layouts
- Interactive hover effects

### ⚡ Performance Optimized
- **Lazy loading** for all images
- **Service Worker** for offline support and caching
- **Optimized JavaScript** with debouncing and throttling
- **Adaptive particle effects** based on device capabilities
- **Hardware acceleration** for smooth animations
- **Minimal repaints** and reflows

### 📱 Fully Responsive
- **Mobile-first** approach
- **iPhone-optimized** (all models including iPhone SE, 12, 13, 14 Pro Max)
- **Dynamic viewport heights** for mobile browsers
- **Touch-optimized** interactions
- **Notch support** for iPhone X and newer
- **Landscape mode** support

### 🎯 SEO & Accessibility
- **Semantic HTML5** structure
- **Comprehensive meta tags** (Open Graph, Twitter Cards)
- **Structured data** (JSON-LD)
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **High contrast mode** support
- **Reduced motion** support

### 💪 Progressive Web App (PWA)
- **Installable** on mobile and desktop
- **Offline functionality** with service worker
- **Fast loading** with aggressive caching
- **App shortcuts** for quick navigation
- **Web app manifest** configured

## 📂 Project Structure

```
club-website/
├── index.html              # Splash/Welcome page
├── page.html               # Main website content
├── index.css               # Optimized styles
├── index.js                # Core JavaScript functionality
├── data.js                 # Website content data
├── pageRenderer.js         # Dynamic page rendering
├── sw.js                   # Service worker for PWA
├── manifest.json           # Web app manifest
├── CNAME                   # Custom domain configuration
├── sitemap.xml            # SEO sitemap
├── IMAGE_OPTIMIZATION_GUIDE.md  # Image optimization guide
├── README.md              # This file
└── profile/               # Team photos and assets
    ├── team member photos (.jpg, .JPG)
    ├── event photos (.jpg, .png)
    └── BIS images (.jpg)
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/standardsclubvitv/club-website.git
cd club-website
```

### 2. Open in Browser
Simply open `index.html` in your browser to see the splash page, or `page.html` for the main site.

### 3. Local Development Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 🔧 Configuration

### Update Content

Edit `data.js` to update:
- Club information
- Team members
- Events
- Contact details
- Social media links

Example:
```javascript
const CLUB_DATA = {
    config: {
        siteName: "BIS Standards Club VITV",
        contact: {
            email: "your-email@example.com"
        }
    },
    team: [
        {
            name: "Your Name",
            position: "Your Position",
            image: "./profile/your-photo.jpg",
            bio: "Your bio here",
            linkedin: "your-linkedin-url"
        }
    ]
};
```

### Customize Styles

Edit `index.css` to customize:
- Color scheme (`:root` CSS variables)
- Spacing and layout
- Animations
- Responsive breakpoints

Key CSS variables:
```css
:root {
    --primary-blue: #0066cc;
    --accent-cyan: #00d9ff;
    --dark-bg: #0d0d0d;
    /* ... more variables */
}
```

### Add New Images

1. Place images in the `profile/` directory
2. Optimize images using the [Image Optimization Guide](IMAGE_OPTIMIZATION_GUIDE.md)
3. Update references in `data.js`

## 🎯 Performance Optimization

### Current Optimizations:
- ✅ Lazy loading images
- ✅ Service worker caching
- ✅ Optimized JavaScript execution
- ✅ Reduced particle count on mobile
- ✅ Hardware acceleration
- ✅ Debounced scroll handlers
- ✅ Efficient DOM manipulation

### Further Optimization:
1. **Compress Images**: See [IMAGE_OPTIMIZATION_GUIDE.md](IMAGE_OPTIMIZATION_GUIDE.md)
2. **Use CDN**: Consider Cloudflare or similar
3. **Enable Gzip**: Configure server compression
4. **Minify Assets**: Use build tools for production

### Performance Targets:
- 🎯 Google PageSpeed Score: 90+ (mobile), 95+ (desktop)
- 🎯 Load Time: < 2 seconds
- 🎯 First Contentful Paint: < 1.5 seconds
- 🎯 Largest Contentful Paint: < 2.5 seconds

## 📱 Browser Support

### ✅ Fully Supported:
- Chrome/Edge (90+)
- Firefox (88+)
- Safari (14+)
- Safari iOS (14+)
- Chrome Android (90+)

### ⚠️ Partial Support:
- IE 11 (basic functionality, no advanced features)
- Older mobile browsers (may lack some animations)

## 🔍 Testing

### Manual Testing Checklist:
- [ ] Test on iPhone (Safari)
- [ ] Test on Android (Chrome)
- [ ] Test on Desktop (Chrome, Firefox, Safari)
- [ ] Test in landscape and portrait modes
- [ ] Test with slow 3G network throttling
- [ ] Test offline functionality (PWA)
- [ ] Test with screen reader (accessibility)
- [ ] Test keyboard navigation

### Automated Testing Tools:
1. **Lighthouse** (Chrome DevTools)
   ```bash
   lighthouse https://www.standardsvit.live/ --view
   ```

2. **PageSpeed Insights**
   Visit: https://pagespeed.web.dev/

3. **WebPageTest**
   Visit: https://www.webpagetest.org/

## 🐛 Troubleshooting

### Images Not Loading?
- Check file paths in `data.js`
- Verify image files exist in `profile/` directory
- Check browser console for errors

### Service Worker Issues?
- Clear browser cache and re-register
- Check DevTools > Application > Service Workers
- Ensure HTTPS or localhost for testing

### Performance Issues?
- Optimize images (see guide)
- Reduce particle count in `index.js`
- Disable animations on low-end devices

### Mobile Menu Not Working?
- Check JavaScript console for errors
- Ensure scripts are loaded with `defer`
- Test mobile menu button click event

## 📚 Documentation

- [Image Optimization Guide](IMAGE_OPTIMIZATION_GUIDE.md)
- [CSS Documentation](index.css) - Inline comments
- [JavaScript Documentation](index.js) - Inline comments

## 🤝 Contributing

### Adding Team Members:
1. Add photo to `profile/` directory
2. Update `data.js` with member details
3. Optimize image (< 50KB recommended)
4. Test responsiveness

### Adding Events:
1. Add event image to `profile/` directory
2. Update `data.js` events array
3. Optimize image (< 150KB recommended)

### Reporting Issues:
Create an issue with:
- Browser and version
- Device (if mobile)
- Steps to reproduce
- Screenshots if applicable

## 📄 License

© 2025 BIS Standards Club, VIT Vellore. All Rights Reserved.

## 👥 Team

**Technical Head**: Pranav Rayban  
**Website Developers**: BIS Standards Club Technical Team

## 🔗 Links

- **Website**: [www.standardsvit.live](https://www.standardsvit.live/)
- **Instagram**: [@standardsclubvit](https://www.instagram.com/standardsclubvit/)
- **LinkedIn**: [BIS Standards Club VIT](https://www.linkedin.com/in/standards-club-vit-b512a829a)
- **YouTube**: [Indian Standard](https://www.youtube.com/@IndianStandard)

## 📞 Contact

**Email**: standardsclub@vit.ac.in  
**Location**: VIT Vellore, Tamil Nadu, India

---

**Made with ❤️ by BIS Standards Club Technical Team**

*Last Updated: November 2025*
