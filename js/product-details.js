document.addEventListener('DOMContentLoaded', () => {
  const products = {
    "m-sand": {
      title: "M-Sand (Manufactured Sand)",
      images: ["images/optimized/m-sand-800.jpg"],
      alt: "M Sand",
      price: "Contact for best rate",
      desc: "High-quality manufactured sand for plastering and concreting with consistent grain size.",
      features: [
        "✔ Perfect for plastering and rendering",
        "✔ Ideal for concrete mixing",
        "✔ Uniform particle size",
        "✔ Low dust content"
      ],
      highlights: ["Strong bond", "Low dust", "Fast delivery"],
      stock: "In Stock",
      faqs: [
        { q: "What is M-Sand?", a: "M-Sand (Manufactured Sand) is crushed aggregate produced from hard granite stone. It's a better alternative to river sand for construction." },
        { q: "How much M-Sand for 1000 sqft?", a: "For 1000 sqft construction, you'll need approximately 40-45 tons of M-Sand depending on the thickness." },
        { q: "Is M-Sand better than river sand?", a: "Yes, M-Sand has better quality, uniform grading, no silt/clay content, and is eco-friendly." }
      ],
      specifications: {
        "Type": "Manufactured Sand (Crushed Granite)",
        "Particle Size": "0-4.75 mm",
        "Moisture Content": "< 5%",
        "Usage": "Concrete, Plastering, Blockwork"
      }
    },
    "p-sand": {
      title: "P Sand (Plaster Sand)",
      images: ["images/optimized/p-sand-800.jpg"],
      alt: "P Sand",
      price: "Contact for best rate",
      desc: "Smooth plastering sand with excellent adhesion and finish.",
      features: ["✔ Smooth finish", "✔ Excellent adhesion", "✔ Ready for wall plastering"],
      highlights: ["Smooth finish", "Great adhesion", "Clean sand"],
      stock: "In Stock"
    },
    "jalli": {
      title: "Jalli (Aggregate)",
      images: ["images/optimized/jalli-800.jpg"],
      alt: "Jalli",
      price: "Contact for best rate",
      desc: "Quality gravel for concrete and filling with strong load-bearing capacity.",
      features: ["✔ Load-bearing", "✔ Various sizes", "✔ Good compaction"],
      highlights: ["Strong base", "Good compaction"],
      stock: "Limited Stock"
    },
    "cement": {
      title: "Cement",
      images: ["images/optimized/cement-800.jpg"],
      alt: "Cement",
      price: "Contact for best rate",
      desc: "Premium cement from trusted brands for all projects.",
      features: ["✔ Grade 43 & 53", "✔ Authentic brands", "✔ Fresh stock"],
      highlights: ["Fresh stock", "Trusted brands"],
      stock: "In Stock"
    },
    "hollow-block": {
      title: "Hollow Blocks",
      images: ["images/optimized/hollow-block-800.jpg"],
      alt: "Hollow Blocks",
      price: "Contact for best rate",
      desc: "Factory-made hollow blocks with consistent dimensions and strength.",
      features: ["✔ Uniform size", "✔ Lightweight", "✔ Fast construction"],
      highlights: ["Uniform size", "Fast build"],
      stock: "In Stock",
      faqs: [
        { q: "What sizes are available?", a: "We stock 4-inch, 6-inch, and 8-inch hollow blocks. Custom sizes available on order." },
        { q: "How many blocks per sqft?", a: "Approximately 6-7 blocks per square foot for standard 6-inch blocks." }
      ],
      specifications: {
        "Size": "400mm x 200mm x 200mm",
        "Compressive Strength": "3.5 N/mm²",
        "Weight": "14-16 kg per block",
        "Material": "Concrete (cement, sand, aggregate)"
      }
    }
  };

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id || !products[id]) {
    document.querySelector('main').innerHTML = `
      <div style="max-width:700px;margin:60px auto;text-align:center;padding:0 20px;">
        <p style="font-weight:700;font-size:18px;">Product not found</p>
        <p style="margin-top:16px;"><a href="products.html">← Back to products</a></p>
      </div>
    `;
    return;
  }

  const p = products[id];
  document.title = `${p.title} | Adhi Traders`;
  const breadcrumbEl = document.getElementById('breadcrumb-product');
  if (breadcrumbEl) breadcrumbEl.textContent = p.title;

  // Hero
  const mainImg = (p.images && p.images[0]) || p.img;
  const heroImg = document.getElementById('hero-image');
  heroImg.src = mainImg;
  heroImg.alt = p.alt || p.title;
  document.getElementById('hero-title').textContent = p.title;
  document.getElementById('hero-desc').textContent = p.desc;
  document.getElementById('hero-price').textContent = p.price;

  // Stock status
  const stockEl = document.getElementById('product-stock');
  if (stockEl) {
    stockEl.textContent = p.stock || 'In Stock';
    stockEl.classList.add(p.stock && /in/i.test(p.stock) ? 'in' : 'out');
  }

  // WhatsApp CTA
  const waText = encodeURIComponent(`Hi Adhi Traders, I need ${p.title} price. Location: Erode`);
  document.getElementById('whatsapp-cta').href = `https://wa.me/919080666386?text=${waText}`;

  // Gallery
  const gallery = document.getElementById('image-gallery');
  if (gallery && p.images && p.images.length) {
    p.images.forEach((img, idx) => {
      const thumb = document.createElement('img');
      thumb.src = img;
      thumb.alt = `${p.title} ${idx + 1}`;
      thumb.className = idx === 0 ? 'gallery-thumb active' : 'gallery-thumb';
      thumb.onclick = () => {
        heroImg.src = img;
        document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      };
      gallery.appendChild(thumb);
    });
  }

  // Social Share
  const shareWhatsApp = document.getElementById('share-whatsapp');
  const shareFacebook = document.getElementById('share-facebook');
  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Check out ${p.title} from Adhi Traders Erode`);
  
  if (shareWhatsApp) {
    shareWhatsApp.href = `https://wa.me/?text=${shareText}%20${pageUrl}`;
  }
  if (shareFacebook) {
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  }

  // Highlights
  const highlightsSection = document.getElementById('highlights-section');
  const highlightsBadges = document.getElementById('highlights-badges');
  const highlightsCta = document.getElementById('highlights-cta');
  if (highlightsBadges && p.highlights && p.highlights.length) {
    p.highlights.forEach(h => {
      const pill = document.createElement('span');
      pill.className = 'highlight-pill';
      pill.textContent = h;
      highlightsBadges.appendChild(pill);
    });
    if (highlightsCta) {
      const waText2 = encodeURIComponent(`Hi Adhi Traders, I need best price for ${p.title}. Location: Erode`);
      highlightsCta.href = `https://wa.me/919080666386?text=${waText2}`;
    }
    highlightsSection.style.display = 'flex';
  }

  // Bundles removed

  // Features
  const featuresSection = document.getElementById('features-section');
  const featuresList = document.getElementById('features-list');
  if (featuresList && p.features && p.features.length) {
    p.features.forEach(f => {
      const div = document.createElement('div');
      div.className = 'feature-item';
      div.textContent = f;
      featuresList.appendChild(div);
    });
    featuresSection.style.display = 'block';
  }

  // Specs, delivery, and reviews removed

  // Image Lightbox functionality
  const mainImage = document.querySelector('.main-image-container img');
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  if (mainImage && lightbox) {
    // Open lightbox on main image click
    mainImage.parentElement.addEventListener('click', function() {
      lightbox.style.display = 'flex';
      lightboxImg.src = mainImage.src;
      lightboxCaption.textContent = p.title;
      document.body.style.overflow = 'hidden';
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });
    
    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
    
    // Make gallery thumbnails also open lightbox
    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
    galleryThumbs.forEach(thumb => {
      thumb.addEventListener('dblclick', function() {
        lightbox.style.display = 'flex';
        lightboxImg.src = thumb.src;
        lightboxCaption.textContent = p.title;
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // Specifications Table
  if (p.specifications) {
    const specsSection = document.getElementById('specs-section');
    const specsTable = document.getElementById('specs-table');
    if (specsTable) {
      for (const [key, value] of Object.entries(p.specifications)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${key}</td><td>${value}</td>`;
        specsTable.appendChild(tr);
      }
      specsSection.style.display = 'block';
    }
  }

  // FAQs
  if (p.faqs && p.faqs.length > 0) {
    const faqSection = document.getElementById('faq-section');
    const faqList = document.getElementById('faq-list');
    if (faqList) {
      p.faqs.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
          <div class="faq-question">
            <span>${faq.q}</span>
            <span class="faq-toggle">+</span>
          </div>
          <div class="faq-answer">${faq.a}</div>
        `;
        
        const question = faqItem.querySelector('.faq-question');
        question.addEventListener('click', () => {
          const wasActive = faqItem.classList.contains('active');
          document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
          if (!wasActive) faqItem.classList.add('active');
        });
        
        faqList.appendChild(faqItem);
      });
      faqSection.style.display = 'block';
    }
  }

  // Quantity Calculator
  const calcEstimate = document.getElementById('calc-estimate');
  const calcResult = document.getElementById('calc-result');
  const calcOutput = document.getElementById('calc-output');
  const calcInquire = document.getElementById('calc-inquire');
  
  if (calcEstimate) {
    calcEstimate.addEventListener('click', () => {
      const type = document.getElementById('calc-type').value;
      const area = parseFloat(document.getElementById('calc-area').value);
      
      if (!type || !area || area <= 0) {
        alert('Please select construction type and enter valid area');
        return;
      }
      
      let estimate = '';
      const productId = id;
      
      // Calculation logic based on product and type
      if (productId === 'm-sand') {
        if (type === 'foundation') estimate = `Approximately ${Math.ceil(area * 0.045)} tons of M-Sand required`;
        else if (type === 'wall') estimate = `Approximately ${Math.ceil(area * 0.03)} tons of M-Sand required`;
        else if (type === 'plastering') estimate = `Approximately ${Math.ceil(area * 0.015)} tons of M-Sand required`;
        else estimate = `Approximately ${Math.ceil(area * 0.025)} tons of M-Sand required`;
      } else if (productId === 'p-sand') {
        estimate = `Approximately ${Math.ceil(area * 0.01)} tons of P-Sand required for ${area} sqft plastering`;
      } else if (productId === 'cement') {
        if (type === 'foundation') estimate = `Approximately ${Math.ceil(area * 0.04)} bags (50kg each) required`;
        else if (type === 'wall') estimate = `Approximately ${Math.ceil(area * 0.045)} bags required`;
        else if (type === 'plastering') estimate = `Approximately ${Math.ceil(area * 0.008)} bags required`;
        else estimate = `Approximately ${Math.ceil(area * 0.03)} bags required`;
      } else if (productId === 'jalli') {
        if (type === 'foundation') estimate = `Approximately ${Math.ceil(area * 0.05)} tons of Jalli (40mm) required`;
        else estimate = `Approximately ${Math.ceil(area * 0.03)} tons of Jalli (20mm) required`;
      } else if (productId === 'hollow-block') {
        estimate = `Approximately ${Math.ceil(area * 6.5)} hollow blocks required for ${area} sqft wall`;
      }
      
      calcOutput.textContent = estimate;
      calcResult.style.display = 'block';
    });
    
    calcInquire.addEventListener('click', () => {
      const estimate = calcOutput.textContent;
      const msg = `Hi, I need a quote for:\n${p.title}\n\nEstimated Requirement:\n${estimate}\n\nPlease provide exact pricing.`;
      window.open(`https://wa.me/919080666386?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }

  // Quick Inquiry Form Handler
  const inquiryForm = document.getElementById('inquiry-form');
  const inquirySuccess = document.getElementById('inquiry-success');
  
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('inquiry-name').value;
      const phone = document.getElementById('inquiry-phone').value;
      const quantity = document.getElementById('inquiry-quantity').value;
      const purpose = document.getElementById('inquiry-purpose').value;
      const message = document.getElementById('inquiry-message').value;
      
      // Build WhatsApp message
      let whatsappMsg = `Hi, I'm interested in *${p.title}*\n\n`;
      whatsappMsg += `Name: ${name}\n`;
      whatsappMsg += `Phone: ${phone}\n`;
      if (quantity) whatsappMsg += `Quantity: ${quantity}\n`;
      if (purpose) whatsappMsg += `Purpose: ${purpose}\n`;
      if (message) whatsappMsg += `\nMessage: ${message}`;
      whatsappMsg += `\n\nPrice: ${p.price}`;
      
      const whatsappUrl = `https://wa.me/919080666386?text=${encodeURIComponent(whatsappMsg)}`;
      
      // Show success message
      inquiryForm.style.display = 'none';
      inquirySuccess.style.display = 'block';
      
      // Open WhatsApp after brief delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        inquiryForm.reset();
        inquiryForm.style.display = 'block';
        inquirySuccess.style.display = 'none';
      }, 3000);
    });
  }

  // Related products
  const relatedIds = Object.keys(products).filter(key => key !== id).slice(0, 4);
  const relatedSection = document.getElementById('related-section');
  const relatedList = document.getElementById('related-list');
  if (relatedList && relatedIds.length) {
    relatedIds.forEach(relId => {
      const rp = products[relId];
      const a = document.createElement('a');
      a.href = `product.html?id=${relId}`;
      a.className = 'related-item-link';
      a.innerHTML = `
        <div class="related-item">
          <img src="${(rp.images && rp.images[0]) || rp.img}" alt="${rp.alt}">
          <p>${rp.title}</p>
        </div>
      `;
      relatedList.appendChild(a);
    });
    relatedSection.style.display = 'block';
  }
});
