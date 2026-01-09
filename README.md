# Food Product Explorer

A modern, responsive web application for exploring nutritional information about food products using the OpenFoodFacts API. Search, filter, and compare thousands of food products with detailed nutritional data, ingredients, and health ratings.

## Features

### Core Functionality
- **Product Search**: Search for food products by name across the entire OpenFoodFacts database
- **Barcode Search**: Quickly find products by scanning or entering their barcode
- **Category Filtering**: Filter products by dynamically fetched categories from OpenFoodFacts API
- **Sort Capabilities**:
  - Sort by product name (A-Z or Z-A)
  - Sort by nutrition grade (best to worst or worst to best)
- **Pagination**: Load more products with infinite scroll functionality
- **Product Details**: View comprehensive nutritional information and ingredients

### Product Information
Each product displays:
- Product image
- Product name and brand
- Category information
- Nutrition Grade (A-E rating system with color coding)
- Ingredients list
- Comprehensive nutritional values (energy, fat, carbohydrates, proteins, sugars, salt)
- Health labels (vegan, gluten-free, etc.)

### User Experience
- Fully responsive design (mobile, tablet, desktop)
- Beautiful gradient UI with smooth animations
- Color-coded nutrition grades for quick visual reference
- Loading states and error handling
- Fast performance with optimized rendering
- Hover effects and smooth transitions

## Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 7.11.0
- **Icons**: Lucide React 0.344.0
- **Build Tool**: Vite 5.4.2
- **API**: OpenFoodFacts REST API

## Project Structure

```
src/
├── components/
│   ├── FilterControls.tsx      # Category & sort controls
│   ├── ProductCard.tsx          # Product display card
│   └── SearchBar.tsx            # Name & barcode search
├── pages/
│   ├── HomePage.tsx             # Main product listing page
│   └── ProductDetailPage.tsx    # Individual product details
├── services/
│   └── api.ts                   # OpenFoodFacts API integration
├── App.tsx                      # Main app with routing
├── index.css                    # Global styles
└── main.tsx                     # Entry point
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

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

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build output will be in the `dist/` directory.

### Type Checking

```bash
npm run typecheck
```

Verify TypeScript types without building.

### Linting

```bash
npm run lint
```

Check code quality with ESLint.

## Usage Guide

### Search by Product Name
1. Click the "Search by Name" tab in the search bar
2. Enter a product name (e.g., "Coca Cola", "Apple", "Bread")
3. Click the search button or press Enter
4. Browse results with pagination

### Search by Barcode
1. Click the "Barcode" tab in the search bar
2. Enter or scan a product barcode (e.g., 737628064502)
3. Click the search button
4. You'll be redirected directly to the product detail page

### Filter by Category
1. Use the category dropdown to select from available categories
2. The product list will automatically update
3. Select "All Categories" to view all products

### Sort Products
1. Use the sort dropdown to arrange products
2. Options include:
   - Name (A-Z or Z-A)
   - Nutrition Grade (best or worst first)

### View Product Details
1. Click any product card to view its detail page
2. See comprehensive nutritional information
3. Review ingredients list
4. Check health labels and certifications
5. Click "Back to Products" to return to the main view

## API Integration

The application uses the OpenFoodFacts REST API:

### Endpoints Used

- **Search by name**: `https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&json=true`
- **Search by barcode**: `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`
- **Category products**: `https://world.openfoodfacts.org/category/{category}.json`
- **Fetch categories**: `https://world.openfoodfacts.org/categories.json`

### Response Format

Products include:
- `code`: Unique barcode identifier
- `product_name`: Name of the product
- `image_url`: Product image URL
- `nutrition_grades`: Nutrition grade (A-E)
- `ingredients_text`: Full ingredients list
- `nutriments`: Nutritional values per 100g
- `labels_tags`: Health labels and certifications
- `categories`: Product categories

## Features Breakdown

### Search & Discovery
- **Name Search**: Full-text search across product database with pagination (24 products per page)
- **Barcode Search**: Direct product lookup using EAN/UPC codes
- **Dynamic Categories**: Categories are fetched from the API to ensure up-to-date classification

### Filtering & Sorting
- Filter products by food category
- Sort by name alphabetically or by nutrition grade
- Combine search with filters for refined results

### Product Details
- Complete nutritional breakdown per 100g serving
- Color-coded nutrition grade visualization
- Ingredient list for allergen checking
- Health labels for dietary preferences (vegan, gluten-free, etc.)
- Brand and category information

### Pagination
- Load more functionality for browsing large result sets
- 24 products per page for optimal performance
- Smooth loading states during data fetching

## Performance Optimizations

- Component-based architecture for code splitting
- Efficient API caching through browser defaults
- Optimized image rendering with lazy loading support
- Responsive design prevents unnecessary re-renders
- Debounced search queries for API efficiency

## Nutrition Grade System

The application uses OpenFoodFacts' Nutri-Score system:

- **A (Green)**: Excellent nutritional quality
- **B (Lime)**: Good nutritional quality
- **C (Yellow)**: Fair nutritional quality
- **D (Orange)**: Poor nutritional quality
- **E (Red)**: Very poor nutritional quality

## Error Handling

The application gracefully handles:
- Network failures with user-friendly error messages
- Missing product data with fallback displays
- API timeouts and rate limiting
- Invalid barcode searches
- Empty search results

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Products not loading
- Check internet connection
- OpenFoodFacts API might be temporarily unavailable (wait a few moments and retry)
- Try a different search term

### Barcode search not working
- Ensure barcode is correctly entered or scanned
- Verify the barcode exists in the database
- Try searching by product name instead

### Poor image quality
- Images are sourced from OpenFoodFacts database
- Not all products have high-quality images available

## Contributing

To contribute improvements:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request with description

## Future Enhancements

Potential features for future versions:
- User favorites/bookmarks
- Nutrition comparison between products
- Dietary restriction filtering (vegan, gluten-free, etc.)
- Price comparison integration
- Nutrition calculator based on portion size
- Dark mode toggle
- Multi-language support
- Local storage for search history
- Advanced nutritional filtering

## API Rate Limiting

OpenFoodFacts API has generous rate limits. If you experience rate limiting:
- Wait a few seconds before making new requests
- Avoid rapid successive searches
- The application includes automatic error handling

## Data Attribution

All product data is sourced from [OpenFoodFacts](https://world.openfoodfacts.org/), a collaborative, free, and open database of food products.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Check the troubleshooting section
- Review OpenFoodFacts API documentation
- Submit an issue with detailed description

## Acknowledgments

- Built with React and Vite for optimal performance
- Styled with Tailwind CSS for rapid development
- Icons from Lucide React
- Data provided by OpenFoodFacts
