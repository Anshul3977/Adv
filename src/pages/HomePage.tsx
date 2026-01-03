import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterControls from '../components/FilterControls';
import ProductCard from '../components/ProductCard';
import {
  searchProducts,
  getProductsByCategory,
  searchByBarcode,
  Product,
} from '../services/api';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const fetchProducts = useCallback(
    async (pageNum: number, isNewSearch: boolean = false) => {
      try {
        setLoading(true);
        setError('');

        let response;
        if (searchTerm) {
          response = await searchProducts(searchTerm, pageNum);
        } else if (selectedCategory) {
          response = await getProductsByCategory(selectedCategory, pageNum);
        } else {
          response = await searchProducts('', pageNum);
        }

        if (response.products && response.products.length > 0) {
          setProducts((prev) =>
            isNewSearch ? response.products : [...prev, ...response.products]
          );
          setHasMore(response.products.length === 24);
        } else {
          if (isNewSearch) {
            setProducts([]);
          }
          setHasMore(false);
        }
      } catch (err) {
        setError(
          'Failed to fetch products. The server might be temporarily unavailable. Please try again later.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, selectedCategory]
  );

  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    fetchProducts(1, true);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSelectedCategory('');
  };

  const handleBarcodeSearch = async (barcode: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await searchByBarcode(barcode);
      if (response.status === 1 && response.product) {
        navigate(`/product/${barcode}`);
      } else {
        setError('Product not found with this barcode.');
      }
    } catch (err) {
      setError('Failed to search by barcode. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage, false);
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return (a.product_name || '').localeCompare(b.product_name || '');
      case 'name-desc':
        return (b.product_name || '').localeCompare(a.product_name || '');
      case 'grade-asc':
        return (a.nutrition_grades || 'z').localeCompare(
          b.nutrition_grades || 'z'
        );
      case 'grade-desc':
        return (b.nutrition_grades || '').localeCompare(
          a.nutrition_grades || ''
        );
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Food Product Explorer
          </h1>
          <p className="text-gray-600 text-lg">
            Discover nutritional information for thousands of food products
          </p>
        </header>

        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            onBarcodeSearch={handleBarcodeSearch}
          />
        </div>

        <div className="mb-6">
          <FilterControls
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            onCategoryChange={handleCategoryChange}
            onSortChange={setSortBy}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {sortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        )}

        {loading && sortedProducts.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {!loading && sortedProducts.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No products found. Try a different search term or category.
            </p>
          </div>
        )}

        {hasMore && sortedProducts.length > 0 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
