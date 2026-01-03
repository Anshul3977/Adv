import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Package,
  Loader2,
  AlertCircle,
  Award,
  Tag,
} from 'lucide-react';
import { getProductDetail, Product } from '../services/api';

const getNutritionGradeColor = (grade?: string) => {
  if (!grade) return 'bg-gray-400';
  const gradeUpper = grade.toUpperCase();
  switch (gradeUpper) {
    case 'A':
      return 'bg-green-500';
    case 'B':
      return 'bg-lime-500';
    case 'C':
      return 'bg-yellow-500';
    case 'D':
      return 'bg-orange-500';
    case 'E':
      return 'bg-red-500';
    default:
      return 'bg-gray-400';
  }
};

export default function ProductDetailPage() {
  const { barcode } = useParams<{ barcode: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!barcode) return;

      try {
        setLoading(true);
        setError('');
        const response = await getProductDetail(barcode);
        if (response.status === 1 && response.product) {
          setProduct(response.product);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Failed to fetch product details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </button>
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error || 'Product not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="max-w-full max-h-96 object-contain"
                />
              ) : (
                <Package className="w-32 h-32 text-gray-300" />
              )}
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {product.product_name || 'Unknown Product'}
                  </h1>
                  {product.brands && (
                    <p className="text-lg text-gray-600">{product.brands}</p>
                  )}
                </div>
                {product.nutrition_grades && (
                  <div
                    className={`${getNutritionGradeColor(
                      product.nutrition_grades
                    )} text-white font-bold w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {product.nutrition_grades.toUpperCase()}
                  </div>
                )}
              </div>

              {product.categories && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-700">Categories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.split(',').slice(0, 5).map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {cat.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.labels_tags && product.labels_tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-700">Labels</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.labels_tags.slice(0, 5).map((label, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {label.replace('en:', '').replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Barcode</p>
                <p className="font-mono text-lg">{product.code}</p>
              </div>
            </div>
          </div>

          {product.ingredients_text && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ingredients
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.ingredients_text}
              </p>
            </div>
          )}

          {product.nutriments && (
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Nutritional Values (per 100g)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.nutriments['energy-kcal_100g'] !== undefined && (
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Energy</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {product.nutriments['energy-kcal_100g']}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        kcal
                      </span>
                    </p>
                  </div>
                )}
                {product.nutriments.fat_100g !== undefined && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Fat</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {product.nutriments.fat_100g}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        g
                      </span>
                    </p>
                  </div>
                )}
                {product.nutriments.carbohydrates_100g !== undefined && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Carbohydrates</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {product.nutriments.carbohydrates_100g}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        g
                      </span>
                    </p>
                  </div>
                )}
                {product.nutriments.sugars_100g !== undefined && (
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Sugars</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {product.nutriments.sugars_100g}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        g
                      </span>
                    </p>
                  </div>
                )}
                {product.nutriments.proteins_100g !== undefined && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Proteins</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {product.nutriments.proteins_100g}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        g
                      </span>
                    </p>
                  </div>
                )}
                {product.nutriments.salt_100g !== undefined && (
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Salt</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {product.nutriments.salt_100g}
                      <span className="text-sm font-normal text-gray-600 ml-1">
                        g
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
