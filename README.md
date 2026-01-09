# Food Product Explorer

A responsive web application for exploring nutritional information about food products using the OpenFoodFacts API. Users can search, filter, sort, and view detailed information for thousands of food products.

---

## Features

### Core Functionality

* **Product Search**: Search food products by name using the OpenFoodFacts database
* **Barcode Search**: Find products directly using barcode (EAN/UPC)
* **Category Filtering**: Filter products by commonly used food categories
* **Sorting Options**:

  * Product name (A–Z, Z–A)
  * Nutrition grade (best to worst, worst to best)
* **Pagination**: Load more products using a page-based “Load More” mechanism
* **Product Details Page**: View detailed nutritional and ingredient information

---

## Product Information Displayed

Each product may include:

* Product image
* Product name and brand
* Category
* Nutrition grade (A–E)
* Ingredients list (if available)
* Nutritional values per 100g (energy, fat, carbohydrates, proteins, sugars, salt)
* Health labels (vegan, gluten-free, etc., if available)

---

## User Experience

* Fully responsive design (mobile, tablet, desktop)
* Clean and intuitive UI
* Color-coded nutrition grades
* Loading indicators and error handling
* Smooth navigation between pages

---

## Tech Stack

* **Frontend**: React 18 with TypeScript
* **Styling**: Tailwind CSS
* **Routing**: React Router DOM
* **Build Tool**: Vite
* **Icons**: Lucide React
* **API**: OpenFoodFacts REST API

---

## Project Structure

```
src/
├── components/
│   ├── FilterControls.tsx      # Category and sorting controls
│   ├── ProductCard.tsx         # Product listing card
│   └── SearchBar.tsx           # Search by name and barcode
├── pages/
│   ├── HomePage.tsx            # Product listing and filters
│   └── ProductDetailPage.tsx   # Product details view
├── services/
│   └── api.ts                  # OpenFoodFacts API integration
├── App.tsx                     # App routing
├── index.css                   # Global styles
└── main.tsx                    # Application entry point
```

---

## Getting Started

### Prerequisites

* Node.js 16+
* npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd food-product-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Build & Quality Checks

### Production Build

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

---

## Usage Guide

### Search by Name

* Enter a product name in the search bar
* Browse results using the “Load More” button

### Search by Barcode

* Switch to the barcode search tab
* Enter a valid barcode
* You will be redirected to the product detail page if found

### Filter and Sort

* Filter products using the category dropdown
* Sort results by name or nutrition grade

### Product Details

* Click on any product card to view full details
* Navigate back to the product list using the back button

---

## API Integration

The application uses the following OpenFoodFacts endpoints:

* **Search by name**
  `https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&json=true`

* **Search by barcode / Product details**
  `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`

* **Products by category**
  `https://world.openfoodfacts.org/category/{category}.json`

---

## Pagination

* Page-based pagination with a **Load More** button
* 24 products fetched per request
* Prevents unnecessary data loading for better performance

---

## Error Handling

The application handles:

* API/network failures
* Invalid or missing barcodes
* Empty search results
* Missing product data

User-friendly messages are shown in each case.

---

## Time Taken

Approximately **3–4 hours** to complete the assignment.

---

## Notes

* This project was built **purely for evaluation purposes**.
* No proprietary or restricted names are used in the repository or codebase.
* All data is provided by the public OpenFoodFacts API.
* API availability depends on OpenFoodFacts server uptime.

---

## Data Attribution

All product data is sourced from **OpenFoodFacts**
[https://world.openfoodfacts.org/](https://world.openfoodfacts.org/)

---

### ✅ Submission Status

This repository follows all assignment instructions and is ready for evaluation.
