# WanderLux Travel Agency Website

## Project Overview

WanderLux Travel Agency website is a fully responsive, interactive travel planning platform. The website showcases various travel services, includes a trip cost calculator, appointment booking system, and contact forms.

## Features

✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Interactive Trip Calculator** - Allows users to calculate trip costs based on destination, travelers, days, and travel style
✅ **Appointment Booking** - Users can request consultations with travel experts
✅ **Contact Forms** - Multiple forms with validation for different contact needs
✅ **Scroll Animations** - Smooth fade-in animations as users scroll through page
✅ **Accessibility Features** - Alt text, proper labels, color contrast, accessible forms
✅ **SEO Optimized** - Meta tags, descriptive titles, semantic HTML5 structure
✅ **Professional Design** - Modern, clean, travel-themed aesthetic

## Project Structure

```
wanderlux/
├── index.html              # Home page
├── services.html           # Services and destinations
├── calculator.html         # Trip cost calculator
├── appointment.html        # Appointment request form
├── about.html              # About the agency
├── contact.html            # Contact information and form
├── css/
│   └── style.css          # All styling (responsive, animations)
├── js/
│   └── script.js          # Calculator logic, form validation, animations
├── images/                # Image assets folder
├── README.md              # This file
├── PROJECT_PLAN.md        # Project planning document
├── REPORT.docx            # Project documentation report
└── SUBMISSION_CHECKLIST.md # Pre-submission checklist
```

## How to Use Locally

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (optional, if you want to modify code)

### Running Locally

1. **Download/Clone the Project**
   - Save all files to a folder on your computer

2. **Open in Browser**
   - Double-click `index.html` to open it in your default browser
   - OR right-click `index.html` → "Open with" → Choose your browser

3. **Test Functionality**
   - Navigate through all pages using the navigation bar
   - Test the trip cost calculator on the Calculator page
   - Fill out and submit the appointment and contact forms
   - Try on different screen sizes to test responsiveness

4. **Modify (Optional)**
   - Edit HTML files to change content
   - Edit `css/style.css` to modify styling
   - Edit `js/script.js` to modify functionality

## Hosting Instructions

### Option 1: GitHub Pages (Recommended)

GitHub Pages allows free hosting directly from a GitHub repository.

#### Steps:

1. **Create GitHub Account** (if you don't have one)
   - Go to https://github.com/signup
   - Sign up with email and password

2. **Create New Repository**
   - Click "+" icon → "New repository"
   - Name: `wanderlux` (or your preferred name)
   - Check "Add a README file"
   - Click "Create repository"

3. **Upload Project Files**
   - Click "Add file" → "Upload files"
   - Select all project files (HTML, CSS, JS, images folders)
   - Commit changes

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "GitHub Pages" section
   - Select "main" branch as source
   - Click "Save"
   - Your site will be at: `https://[your-username].github.io/wanderlux`

5. **Verify**
   - Wait a few minutes for GitHub to build the site
   - Visit the provided URL to see your live website

### Option 2: Netlify (Very Easy)

Netlify offers free hosting with automatic deployments.

#### Steps:

1. **Go to Netlify**
   - Visit https://www.netlify.com/
   - Click "Sign up" (use GitHub for easier signup)

2. **Deploy Project**
   - Click "Add new site"
   - Select "Deploy manually"
   - OR connect GitHub repository for automatic deployments

3. **Upload Files**
   - Drag and drop your project folder onto Netlify dashboard
   - Netlify will automatically deploy your site

4. **Get Your URL**
   - Your site will be live at a URL like: `https://[random-name].netlify.app`
   - You can customize the domain in Netlify settings

5. **Verify**
   - Visit your new URL to see the live website

### Option 3: Any Other Free Hosting (Vercel, Firebase, etc.)

Similar processes apply to other hosting platforms:

- **Vercel** (https://vercel.com/) - Great for static sites
- **Firebase Hosting** (https://firebase.google.com/products/hosting) - Google's hosting solution
- **000webhost** (https://www.000webhost.com/) - Free web hosting

Most platforms follow a similar process: upload files or connect GitHub repository, and get a live URL.

## Email Functionality Setup

The contact and appointment forms currently display success messages but don't send actual emails. To enable email functionality before deployment:

### Using EmailJS (Recommended - No Backend Needed)

1. **Sign up at** https://www.emailjs.com/ (free tier available)

2. **Get Your Keys**
   - Public Key (needed for frontend)
   - Service ID
   - Template ID

3. **Update `script.js`**
   - Add EmailJS library in HTML: `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/build/index.min.js"></script>`
   - In `handleFormSubmission()` function, replace console.log with:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY');
   emailjs.send('SERVICE_ID', 'TEMPLATE_ID', Object.fromEntries(formData))
       .then(() => console.log('Email sent successfully'))
       .catch(error => console.error('Error:', error));
   ```

### Using Formspree (Alternative - Very Simple)

1. **Create Account** at https://formspree.io/

2. **Update Form Tag**
   - Change `<form>` to: `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`
   - Replace YOUR_FORM_ID with your actual ID

3. **Remove JavaScript Handling**
   - Forms will submit directly to Formspree

### Using Netlify Forms (If Hosting on Netlify)

1. **Add to Form Tag**
   ```html
   <form name="contact" method="POST" netlify>
       <!-- form fields -->
   </form>
   ```

2. **Add Hidden Field** (if needed for spam protection)
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```

## Images

The `images/` folder is provided for placeholder images. To add real images:

1. Place image files in the `images/` folder
2. Reference in HTML: `<img src="images/bali.jpg" alt="description">`
3. Supported formats: JPG, PNG, WebP, GIF

## Troubleshooting

### Pages Won't Load
- Ensure all files are in correct folders
- Check file paths in HTML are relative paths (e.g., `css/style.css`, not `/css/style.css`)
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

### Styling Looks Wrong
- Check that `css/style.css` is in the `css/` folder
- Ensure CSS link in HTML is correct: `<link rel="stylesheet" href="css/style.css">`
- Check browser console for errors (F12 → Console tab)

### Calculator Not Working
- Check browser console for JavaScript errors
- Ensure `js/script.js` is in the `js/` folder
- Check script link in HTML: `<script src="js/script.js"></script>`

### Forms Not Submitting
- For local testing, forms show success message but don't send email
- Email functionality requires EmailJS or similar service
- On hosting, ensure email service is properly configured

## Browser Compatibility

The website is tested and compatible with:
- Chrome/Chromium (version 90+)
- Firefox (version 88+)
- Safari (version 14+)
- Edge (version 90+)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

## Performance Tips

1. **Compress Images** - Use tools like TinyPNG to reduce image file sizes
2. **Minify CSS/JS** - For production, minify CSS and JavaScript files
3. **Use CDN** - Consider using a CDN for CSS/JS libraries
4. **Lazy Load Images** - Add `loading="lazy"` to image tags

## Accessibility Features

✅ Semantic HTML5 structure
✅ ARIA labels on form fields
✅ Proper heading hierarchy (H1, H2, H3)
✅ Color contrast meets WCAG standards
✅ Keyboard navigation support
✅ Alt text on all images
✅ Form validation with error messages

## SEO Implementation

✅ Meta descriptions on all pages
✅ Descriptive page titles
✅ Semantic HTML structure
✅ Header hierarchy
✅ Alt text on images
✅ Internal linking between pages
✅ Mobile-responsive design

## Security Notes

- Forms don't store data in browser (displays success message only)
- Always sanitize user input on backend if implementing email
- Keep dependencies updated
- Use HTTPS when deployed on production host

## Modification Guide

### Change Logo/Branding
- Find `.logo` in `css/style.css` to modify styling
- Change "WanderLux" text in navigation in each HTML file

### Modify Colors
- Edit CSS variables at top of `style.css`:
  ```css
  :root {
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --accent-color: #e74c3c;
  }
  ```

### Add New Destination/Package
- Add HTML card in appropriate section
- Match existing card structure
- Prices/styles defined in JavaScript

### Add Contact Method
- Add new section in `contact.html`
- Style using existing classes
- Update JavaScript if needed

## Support & Help

For questions about specific technologies:
- **HTML5**: https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS3**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Responsive Design**: https://web.dev/responsive-web-design-basics/
- **Accessibility**: https://www.w3.org/WAI/fundamentals/

## Credits & References

- Built with semantic HTML5, CSS3, and vanilla JavaScript
- No external dependencies required (framework-free)
- Icons: Unicode characters and CSS
- Fonts: System fonts (cross-platform compatible)

## License

This project is created for educational purposes (ICT502 Assignment).

## Deployment Checklist

Before going live:

- [ ] Test all links work
- [ ] Test forms with validation
- [ ] Test calculator functionality
- [ ] Test on mobile devices
- [ ] Check images display correctly
- [ ] Verify animations smooth
- [ ] Test accessibility (keyboard navigation)
- [ ] Check all meta descriptions
- [ ] Set up email forwarding
- [ ] Configure custom domain (if desired)
- [ ] Set up CDN (if needed for performance)
- [ ] Enable HTTPS
- [ ] Set up analytics (Google Analytics)

## File Sizes

Typical file sizes for reference:
- `index.html`: ~5 KB
- `css/style.css`: ~20 KB
- `js/script.js`: ~15 KB
- Total without images: ~40 KB

---

**Last Updated**: May 2, 2026
**Version**: 1.0
**Status**: Ready for Deployment
