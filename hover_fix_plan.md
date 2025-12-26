# Product Card Hover Effect Fix Plan

## Problem Analysis

The "mouse vibrate" issue on product hover is caused by conflicting hover effects:

### Current Issues:

1. **Framer Motion hover effects** (ProductCard.jsx):

   - `scale: 1.02` and `rotateY: 5` running simultaneously
   - Causes mouse position to shift as card expands
   - Creates vibration effect when trying to click buttons

2. **CSS hover effects** (index.css):

   - `.card:hover::before` - shine animation
   - `.card:hover .product-title::after` - underline effect
   - `.card:hover .product-price::before` - dollar sign effect
   - Multiple simultaneous transforms causing conflicts

3. **Button interference:**
   - Hover effects on buttons get disrupted by card hover animations
   - Mouse position changes make clicking difficult

## Solution Plan

### 1. Fix ProductCard Component (ProductCard.jsx)

- **Reduce Framer Motion hover intensity:** Lower scale from 1.02 to 1.005
- **Remove problematic rotateY:** Keep only subtle scale effect
- **Add pointer-events protection:** Ensure buttons remain clickable
- **Optimize transition timing:** Use faster, less jarring transitions

### 2. Update CSS Hover Effects (index.css)

- **Simplify card hover effects:** Remove conflicting animations
- **Add pointer-events: none** for decorative hover effects
- **Protect interactive elements:** Ensure buttons unaffected by card hover
- **Optimize performance:** Reduce animation complexity

### 3. Button Enhancement

- **Ensure button hover states are prioritized** over card hover
- **Add visual feedback** for better user experience
- **Prevent interference** from card-level animations

### 4. Performance Optimization

- **Reduce animation complexity** across all hover effects
- **Use hardware-accelerated transforms** only
- **Optimize transition durations** for smoother experience

## Expected Outcome

- ✅ Smooth hover interactions without vibration
- ✅ Clickable buttons remain easily accessible
- ✅ Visual feedback maintained but less intrusive
- ✅ Improved performance and user experience

## Files to Modify

1. `ShopStore-frontend/src/components/ProductCard.jsx` - Fix Framer Motion
2. `ShopStore-frontend/src/index.css` - Simplify CSS hover effects
3. Test all interactive elements after changes
