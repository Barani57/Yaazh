/* ============================================================
   YAAZH ORGANIC ELITE WELLNESS — PRODUCTS DATA
   2 Categories: Hair Care · Skin Care
   4 Product Lines: Shampoo · Soaps · Hair Oil · Serum
   USD Pricing · 4:5 Poster Images (1600×2000 px)
   Image path: assets/images/{Category}/{index}/p-{1|2|3}.png
   ============================================================ */

const YAAZH_WA = '97455776070';

/* ── SHAMPOOS — 14 variants ────────────────────────────────── */
const YAAZH_SHAMPOOS = [
  { id:'sh-1',  line:'shampoo', category:'haircare', name:'Hibiscus Shampoo',         qty:'300 ml', price:'$10', folder:'Shampoo', num:1,
    tagline:'Strength & Shine from Hibiscus Botanicals',     benefits:'Reduces hair fall · Adds natural shine · Nourishes scalp' },
  { id:'sh-2',  line:'shampoo', category:'haircare', name:'Aloevera Shampoo',          qty:'300 ml', price:'$10', folder:'Shampoo', num:2,
    tagline:'Soothing Hydration with Pure Aloe Vera',        benefits:'Deep moisture · Soothes scalp · Reduces dandruff' },
  { id:'sh-3',  line:'shampoo', category:'haircare', name:'Amla Shikakai Shampoo',     qty:'300 ml', price:'$10', folder:'Shampoo', num:3,
    tagline:'Ancient Ayurvedic Hair Ritual',                 benefits:'Strengthens roots · Natural cleanser · Scalp health' },
  { id:'sh-4',  line:'shampoo', category:'haircare', name:'Neem Tulsi Shampoo',        qty:'300 ml', price:'$10', folder:'Shampoo', num:4,
    tagline:'Antibacterial Protection for Healthy Hair',     benefits:'Fights dandruff · Antibacterial · Scalp purification' },
  { id:'sh-5',  line:'shampoo', category:'haircare', name:'Silk Protein Shampoo',      qty:'300 ml', price:'$10', folder:'Shampoo', num:5,
    tagline:'Silky Smooth with Hydrolyzed Proteins',         benefits:'Smoothens frizz · Adds silk sheen · Strengthens strands' },
  { id:'sh-6',  line:'shampoo', category:'haircare', name:'Onion Shampoo',             qty:'300 ml', price:'$10', folder:'Shampoo', num:6,
    tagline:'Clinically Proven Hair Fall Control',           benefits:'Reduces hair fall · Promotes regrowth · Strengthens follicles' },
  { id:'sh-7',  line:'shampoo', category:'haircare', name:'Rice Protein Shampoo',      qty:'300 ml', price:'$10', folder:'Shampoo', num:7,
    tagline:'Volume & Vitality from Rice Botanicals',        benefits:'Adds volume · Repairs damage · Boosts elasticity' },
  { id:'sh-8',  line:'shampoo', category:'haircare', name:'Keratin Shampoo',           qty:'300 ml', price:'$10', folder:'Shampoo', num:8,
    tagline:'Salon-Grade Keratin Hair Repair',               benefits:'Repairs breakage · Intense smoothening · Heat protection' },
  { id:'sh-9',  line:'shampoo', category:'haircare', name:'Curry Leaf Shampoo',        qty:'300 ml', price:'$10', folder:'Shampoo', num:9,
    tagline:'Traditional Curry Leaf for Scalp Vitality',     benefits:'Prevents premature greying · Nourishes roots · Scalp stimulation' },
  { id:'sh-10', line:'shampoo', category:'haircare', name:'Herbal Shampoo',            qty:'300 ml', price:'$10', folder:'Shampoo', num:10,
    tagline:'Pure Multi-Herb Botanical Cleanse',             benefits:'Gentle cleanse · Full herbal spectrum · Daily use safe' },
  { id:'sh-11', line:'shampoo', category:'haircare', name:'Red Wine Shampoo',          qty:'300 ml', price:'$10', folder:'Shampoo', num:11,
    tagline:'Antioxidant Luxury from Red Grape Botanicals',  benefits:'Rich antioxidants · Deep conditioning · Luminous colour' },
  { id:'sh-12', line:'shampoo', category:'haircare', name:'Multi Protein Shampoo',     qty:'300 ml', price:'$10', folder:'Shampoo', num:12,
    tagline:'8-Protein Complex for Maximum Strength',        benefits:'Multi-protein repair · Maximum strength · Thickness boost' },
  { id:'sh-13', line:'shampoo', category:'haircare', name:'7 Herbs Shampoo',           qty:'300 ml', price:'$10', folder:'Shampoo', num:13,
    tagline:'Seven Sacred Herbs for Complete Hair Care',     benefits:'7-herb formula · Holistic hair care · Scalp to tip treatment' },
  { id:'sh-14', line:'shampoo', category:'haircare', name:'Avocado Shampoo',           qty:'300 ml', price:'$10', folder:'Shampoo', num:14,
    tagline:'Creamy Avocado Nourishment for Dry Hair',       benefits:'Ultra moisture · Tames frizz · Vitamin E enriched' },
];

/* ── SOAPS — 10 variants ───────────────────────────────────── */
const YAAZH_SOAPS = [
  { id:'sp-1',  line:'soap', category:'skincare', name:'Nalangu Maavu Soap – Women',       qty:'120 g', price:'$5', folder:'Soaps', num:1,
    tagline:'Traditional Brightening Formula for Women',    benefits:'Brightens skin · Gentle exfoliation · Age-old recipe' },
  { id:'sp-2',  line:'soap', category:'skincare', name:'Nalangu Maavu Soap – Men',         qty:'120 g', price:'$5', folder:'Soaps', num:2,
    tagline:'Deep Cleanse & Refresh for Men',               benefits:'Deep cleanse · Controls oil · Refreshing botanicals' },
  { id:'sp-3',  line:'soap', category:'skincare', name:'Avaram Poo Soap',                  qty:'120 g', price:'$5', folder:'Soaps', num:3,
    tagline:'Golden Senna Auriculata Brightening Soap',     benefits:'Evens skin tone · Reduces dark spots · Antioxidant rich' },
  { id:'sp-4',  line:'soap', category:'skincare', name:'Beetroot Soap',                    qty:'120 g', price:'$5', folder:'Soaps', num:4,
    tagline:'Radiance Boosting Beetroot Formula',           benefits:'Natural glow · Rich in iron · Brightens complexion' },
  { id:'sp-5',  line:'soap', category:'skincare', name:'Nalangu Maavu with Goat Milk',     qty:'120 g', price:'$5', folder:'Soaps', num:5,
    tagline:'Traditional Recipe Enhanced with Goat Milk',   benefits:'Ultra soft skin · Brightening · Milk protein nourishment' },
  { id:'sp-6',  line:'soap', category:'skincare', name:'Goat Milk Soap',                   qty:'120 g', price:'$5', folder:'Soaps', num:6,
    tagline:'Pure Goat Milk for Silky Nourished Skin',      benefits:'Deep nourishment · Anti-ageing lactic acid · Sensitive skin safe' },
  { id:'sp-7',  line:'soap', category:'skincare', name:'Manjistha Soap',                   qty:'120 g', price:'$5', folder:'Soaps', num:7,
    tagline:'Rubia Cordifolia for Skin Clarity',            benefits:'Clears acne scars · Reduces pigmentation · Skin renewal' },
  { id:'sp-8',  line:'soap', category:'skincare', name:'Manjistha with Goat Milk',         qty:'120 g', price:'$6', folder:'Soaps', num:8,
    tagline:'Clarity + Milk Proteins for Ultimate Glow',    benefits:'Double brightening · Fade dark spots · Protein repair' },
  { id:'sp-9',  line:'soap', category:'skincare', name:'Saffron Goat Milk Soap',           qty:'120 g', price:'$6', folder:'Soaps', num:9,
    tagline:'Liquid Gold Saffron for Luminous Skin',        benefits:'Brightens complexion · Luxury saffron · Youthful radiance' },
  { id:'sp-10', line:'soap', category:'skincare', name:'Shea Butter Soap',                 qty:'120 g', price:'$6', folder:'Soaps', num:10,
    tagline:'Rich African Shea Butter Moisturising Bar',    benefits:'Intense moisture · Anti-ageing shea · Silky smooth finish' },
];

/* ── ROOT RENEWAL SOLUTION — 4 sizes ──────────────────────── */
const YAAZH_HAIROIL = [
  { id:'ho-200', line:'hairoil', category:'haircare', name:'Root Renewal Solution', size:'200 ml', price:'$18', folder:'Hair Oil', num:1,
    tagline:'Botanical Root Strengthening Blend', benefits:'Reduces hair fall · Strengthens roots · Deep scalp nourishment · Promotes growth' },
  { id:'ho-250', line:'hairoil', category:'haircare', name:'Root Renewal Solution', size:'250 ml', price:'$22', folder:'Hair Oil', num:2,
    tagline:'Botanical Root Strengthening Blend', benefits:'Reduces hair fall · Strengthens roots · Deep scalp nourishment · Promotes growth' },
  { id:'ho-300', line:'hairoil', category:'haircare', name:'Root Renewal Solution', size:'300 ml', price:'$25', folder:'Hair Oil', num:3,
    tagline:'Botanical Root Strengthening Blend', benefits:'Reduces hair fall · Strengthens roots · Deep scalp nourishment · Promotes growth' },
  { id:'ho-500', line:'hairoil', category:'haircare', name:'Root Renewal Solution', size:'500 ml', price:'$40', folder:'Hair Oil', num:4,
    tagline:'Botanical Root Strengthening Blend', benefits:'Reduces hair fall · Strengthens roots · Deep scalp nourishment · Promotes growth' },
];

/* ── AMUDHAM SERUM — 6 sizes ───────────────────────────────── */
const YAAZH_SERUM = [
  { id:'sr-15',  line:'serum', category:'skincare', name:'Amudham – The Ambrosia Serum', size:'15 ml',  price:'$6',  folder:'Serum', num:1,
    tagline:'Divine Botanical Ambrosia for Radiant Skin', benefits:'Brightens skin · Anti-ageing · 24-hr hydration · Bio-active botanicals' },
  { id:'sr-20',  line:'serum', category:'skincare', name:'Amudham – The Ambrosia Serum', size:'20 ml',  price:'$8',  folder:'Serum', num:2,
    tagline:'Divine Botanical Ambrosia for Radiant Skin', benefits:'Brightens skin · Anti-ageing · 24-hr hydration · Bio-active botanicals' },
  { id:'sr-25',  line:'serum', category:'skincare', name:'Amudham – The Ambrosia Serum', size:'25 ml',  price:'$10', folder:'Serum', num:3,
    tagline:'Divine Botanical Ambrosia for Radiant Skin', benefits:'Brightens skin · Anti-ageing · 24-hr hydration · Bio-active botanicals' },
  { id:'sr-30',  line:'serum', category:'skincare', name:'Amudham – The Ambrosia Serum', size:'30 ml',  price:'$12', folder:'Serum', num:4,
    tagline:'Divine Botanical Ambrosia for Radiant Skin', benefits:'Brightens skin · Anti-ageing · 24-hr hydration · Bio-active botanicals' },
  { id:'sr-50',  line:'serum', category:'skincare', name:'Amudham – The Ambrosia Serum', size:'50 ml',  price:'$20', folder:'Serum', num:5,
    tagline:'Divine Botanical Ambrosia for Radiant Skin', benefits:'Brightens skin · Anti-ageing · 24-hr hydration · Bio-active botanicals' },
  { id:'sr-100', line:'serum', category:'skincare', name:'Amudham – The Ambrosia Serum', size:'100 ml', price:'$35', folder:'Serum', num:6,
    tagline:'Divine Botanical Ambrosia for Radiant Skin', benefits:'Brightens skin · Anti-ageing · 24-hr hydration · Bio-active botanicals' },
];

/* ── HERO CAROUSEL — p-1 images across all product lines ───── */
const YAAZH_HERO_SLIDES = [
  { img:'assets/images/Shampoo/1/p-1.png',    label:'Hibiscus Shampoo' },
  { img:'assets/images/Soaps/9/p-1.png',      label:'Saffron Goat Milk Soap' },
  { img:'assets/images/Hair Oil/1/p-1.png',   label:'Root Renewal Solution' },
  { img:'assets/images/Serum/1/p-1.png',      label:'Amudham Ambrosia Serum' },
  { img:'assets/images/Shampoo/6/p-1.png',    label:'Onion Shampoo' },
  { img:'assets/images/Soaps/3/p-1.png',      label:'Avaram Poo Soap' },
  { img:'assets/images/Shampoo/11/p-1.png',   label:'Red Wine Shampoo' },
  { img:'assets/images/Serum/6/p-1.png',      label:'Amudham – 100ml' },
];

/* ── HELPER — get poster image path ────────────────────────── */
function getImg(product, poster) {
  const p = poster || 'p-1';
  return `assets/images/${product.folder}/${product.num}/${p}.png`;
}

/* ── ALL PRODUCTS FLAT ARRAY (for cart lookup) ──────────────── */
const YAAZH_ALL_PRODUCTS = [
  ...YAAZH_SHAMPOOS,
  ...YAAZH_SOAPS,
  ...YAAZH_HAIROIL,
  ...YAAZH_SERUM
];

function findProduct(id) {
  return YAAZH_ALL_PRODUCTS.find(p => p.id === id) || null;
}
