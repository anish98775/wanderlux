# WanderLux Travel Agency Website

## Project Overview

WanderLux is a static travel agency website built with HTML, CSS, and JavaScript. It is designed to showcase travel services, highlight featured destinations, and provide tools for users to estimate trip costs and request consultations.

## Key Features

- Responsive layout for desktop, tablet, and mobile screens
- Hero slider with travel destination images and navigation controls
- Featured destinations section with image cards
- Popular travel package cards with clean spacing and modern styling
- Interactive trip cost calculator with destination, traveler count, duration, travel style, and seasonal adjustment
- Appointment request form and contact form with client-side validation
- Smooth scroll-triggered animations for page sections
- Professional visual design with premium spacing and button styling

## Project Structure

```
wanderlux/
├── index.html           # Home page with hero slider and featured sections
├── services.html        # Details about services and travel offerings
├── calculator.html      # Trip cost calculator page
├── appointment.html     # Appointment booking form page
├── about.html           # About the travel agency page
├── contact.html         # Contact page with contact form and details
├── css/
│   └── style.css        # Main stylesheet for layout, styling, and responsiveness
├── js/
│   └── script.js        # JavaScript for slider, calculator, animations, and form validation
├── images/              # Image assets folder
└── README.md            # Project overview and usage instructions
```

## How to Use Locally

1. Open `index.html` in a web browser.
2. Navigate through the pages using the site menu.
3. Use the Calculator page to estimate trip costs.
4. Use the Appointment or Contact pages to test the forms.

## Notes

- The project is a front-end website and does not include a backend server.
- Form submission behavior is handled with JavaScript validation and UI feedback.
- The slider and animations are implemented with vanilla JavaScript and CSS.

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
