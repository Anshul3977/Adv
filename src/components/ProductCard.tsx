import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Product } from '../services/api';

interface ProductCardProps {
  product: Product;
}

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

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.code}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Package className="w-16 h-16 text-gray-300" />
        )}
        {product.nutrition_grades && (
          <div
            className={`absolute top-2 right-2 ${getNutritionGradeColor(
              product.nutrition_grades
            )} text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg`}
          >
            {product.nutrition_grades.toUpperCase()}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2 min-h-[3.5rem]">
          {product.product_name || 'Unknown Product'}
        </h3>
        {product.brands && (
          <p className="text-sm text-gray-500 mb-2">{product.brands}</p>
        )}
        {product.categories && (
          <p className="text-xs text-blue-600 bg-blue-50 rounded-full px-3 py-1 inline-block mb-2">
            {product.categories.split(',')[0]}
          </p>
        )}
        {product.ingredients_text && (
          <p className="text-xs text-gray-600 line-clamp-2">
            {product.ingredients_text}
          </p>
        )}
      </div>
    </div>
  );
}
