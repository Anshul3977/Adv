import { Search, Barcode } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onBarcodeSearch: (barcode: string) => void;
}

export default function SearchBar({ onSearch, onBarcodeSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [barcode, setBarcode] = useState('');
  const [activeTab, setActiveTab] = useState<'name' | 'barcode'>('name');

  const handleNameSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleBarcodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode.trim()) {
      onBarcodeSearch(barcode.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('name')}
          className={`flex-1 py-2 px-4 rounded-t-lg font-medium transition-colors ${
            activeTab === 'name'
              ? 'bg-white text-blue-600 border-b-2 border-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Search className="w-4 h-4 inline mr-2" />
          Search by Name
        </button>
        <button
          onClick={() => setActiveTab('barcode')}
          className={`flex-1 py-2 px-4 rounded-t-lg font-medium transition-colors ${
            activeTab === 'barcode'
              ? 'bg-white text-blue-600 border-b-2 border-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Barcode className="w-4 h-4 inline mr-2" />
          Search by Barcode
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        {activeTab === 'name' ? (
          <form onSubmit={handleNameSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for food products..."
              className="flex-1 px-6 py-4 text-lg rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleBarcodeSearch} className="flex">
            <input
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Enter barcode (e.g., 737628064502)..."
              className="flex-1 px-6 py-4 text-lg rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Barcode className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
