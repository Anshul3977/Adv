import { Filter, ArrowUpDown } from 'lucide-react';
import { categories } from '../services/api';

interface FilterControlsProps {
  selectedCategory: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
}

export default function FilterControls({
  selectedCategory,
  sortBy,
  onCategoryChange,
  onSortChange,
}: FilterControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
      <div className="flex items-center gap-2 flex-1">
        <Filter className="w-5 h-5 text-gray-600" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 flex-1">
        <ArrowUpDown className="w-5 h-5 text-gray-600" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">No Sorting</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="grade-asc">Nutrition Grade (Best First)</option>
          <option value="grade-desc">Nutrition Grade (Worst First)</option>
        </select>
      </div>
    </div>
  );
}
