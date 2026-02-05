# Performance Optimization Practices

1 second delay = 7% conversion loss.

---

## Practice #20: Lazy Loading Images

**PROBLÉM:** Slow page load due to images.

**ŘEŠENÍ:** Native lazy loading for off-screen images.

**KÓD:**
```html
<!-- Lazy load (below fold) -->
<img src="product.jpg" loading="lazy" width="800" height="600">

<!-- Eager load (hero) -->
<img src="hero.jpg" loading="eager" fetchpriority="high">
```

**OČEKÁVANÝ DOPAD:** -30-50% initial load time

---

## Practice #21: WebP Format

**PROBLÉM:** Large JPEG/PNG files.

**ŘEŠENÍ:** WebP format (30-50% smaller) with fallback.

**KÓD:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Product" loading="lazy">
</picture>
```

**OČEKÁVANÝ DOPAD:** -30-50% image size, faster load

---

## Summary

**2 Performance Practices:**
1. **Lazy loading** (-30-50% load time)
2. **WebP format** (-30-50% image size)

**Tools:** Chrome DevTools Lighthouse, PageSpeed Insights

**Next:** See practices/accessibility.md
