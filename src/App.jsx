import React, { useState } from 'react';

const colors = {
  graphite: 'bg-gray-800 text-white',
  sapGreen: 'text-green-600',
  mutedGreen: 'text-green-400',
  desertRose: 'text-rose-300',
  grey: 'text-gray-500',
  hoverGreen: 'hover:text-green-400',
  hoverBackgroundGreen: 'hover:bg-green-700',
};

function LoginButton({ onLogin }) {
  return (
    <button
      onClick={onLogin}
      className={`p-3 rounded-lg ${colors.sapGreen} text-white font-bold animate-pulse transition duration-500 ease-in-out transform hover:scale-105`}
    >
      Log In
    </button>
  );
}

function ItemCard({ name, description, price, size, available, image, onAddToCart }) {
  return (
    <div className={`m-4 p-6 rounded-md ${colors.graphite} transition-transform transform hover:scale-105`}>
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-semibold text-white mt-4">{name}</h2>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
      <p className={`text-lg font-bold ${colors.sapGreen} mt-2`}>${price}</p>
      <p className={`${colors.grey} text-sm mt-1`}>Size: {size}</p>

      {/* Availability Status */}
      <p
        className={`text-sm mt-2 font-semibold ${
          available ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {available ? 'Available' : 'Out of Stock'}
      </p>

      <button
        onClick={onAddToCart}
        className={`mt-4 p-2 w-full rounded-lg ${colors.sapGreen} text-white transition-colors duration-300 hover:${colors.mutedGreen}`}
        disabled={!available} // Disable button if item is out of stock
      >
        Add to Cart
      </button>
    </div>
  );
}

function SizeChart() {
  return (
    <div className="p-4 mt-6 bg-gray-800 text-white rounded-md shadow-md">
      <h2 className="text-xl font-bold">Size Chart</h2>
      <table className="table-auto w-full mt-4 border-separate border-spacing-2 text-gray-300">
        <thead>
          <tr>
            <th className="p-2 border-b border-gray-600">Size</th>
            <th className="p-2 border-b border-gray-600">Chest (inches)</th>
            <th className="p-2 border-b border-gray-600">Waist (inches)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 text-center">S</td>
            <td className="p-2 text-center">34-36</td>
            <td className="p-2 text-center">28-30</td>
          </tr>
          <tr>
            <td className="p-2 text-center">M</td>
            <td className="p-2 text-center">38-40</td>
            <td className="p-2 text-center">32-34</td>
          </tr>
          <tr>
            <td className="p-2 text-center">L</td>
            <td className="p-2 text-center">42-44</td>
            <td className="p-2 text-center">36-38</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    size: '',
    priceRange: [0, 100],
    availability: true,
  });

  const items = [
    { 
      name: 'Vintage Jacket', 
      description: 'Graphite tone, oversized fit.', 
      price: 40, 
      size: 'L', 
      available: true, 
      image: 'https://via.placeholder.com/300x200?text=Vintage+Jacket' 
    },
    { 
      name: 'Sap Green Hoodie', 
      description: 'Comfortable and sustainable.', 
      price: 25, 
      size: 'M', 
      available: true, 
      image: 'https://via.placeholder.com/300x200?text=Sap+Green+Hoodie' 
    },
    { 
      name: 'Desert Rose T-Shirt', 
      description: 'Soft cotton, breathable.', 
      price: 20, 
      size: 'S', 
      available: false, 
      image: 'https://via.placeholder.com/300x200?text=Desert+Rose+T-Shirt' 
    },
    { 
      name: 'Black Leather Jacket', 
      description: 'Stylish and durable.', 
      price: 75, 
      size: 'M', 
      available: true, 
      image: 'https://via.placeholder.com/300x200?text=Black+Leather+Jacket' 
    },
  ];

  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);

  const handleAddToCart = (item) => {
    if (!loggedIn) {
      alert('You must be logged in to add items to the cart.');
      return;
    }
    setCart((prev) => [...prev, item]);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredItems = items.filter((item) => {
    const priceInRange = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
    const sizeMatch = filters.size ? item.size === filters.size : true;
    const availabilityMatch = filters.availability ? item.available : true;
    return priceInRange && sizeMatch && availabilityMatch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    return b.price - a.price;
  });

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white font-sans">
      <header className="flex justify-between items-center p-4 border-b border-gray-700">
        <h1 className="text-4xl font-bold text-white">EVOQUE</h1>
        {loggedIn ? (
          <button onClick={handleLogout} className="p-3 rounded-lg bg-green-700 text-white font-bold hover:bg-green-800 transition duration-200">
            Log Out
          </button>
        ) : (
          <LoginButton onLogin={handleLogin} />
        )}
      </header>

      <main className="flex mt-6">
        {/* Sidebar for filtering */}
        <div className="w-1/4 p-4 bg-gray-800 rounded-md shadow-lg mr-6">
          <h3 className="text-xl font-semibold mb-4">Filter Options</h3>

          {/* Size Filter */}
          <div className="mb-4">
            <h4 className="font-semibold">Size</h4>
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded-md"
            >
              <option value="">All Sizes</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4">
            <h4 className="font-semibold">Price Range</h4>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [0, e.target.value])}
              className="w-full bg-gray-700 rounded-md"
            />
            <p className="text-sm">{`$${filters.priceRange[0]} - $${filters.priceRange[1]}`}</p>
          </div>

          {/* Availability Filter */}
          <div className="mb-4">
            <h4 className="font-semibold">Availability</h4>
            <select
              value={filters.availability}
              onChange={(e) => handleFilterChange('availability', e.target.value === 'true')}
              className="w-full p-2 bg-gray-700 rounded-md"
            >
              <option value={true}>Available</option>
              <option value={false}>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Main Content (Products) */}
        <div className="w-3/4 p-4">
          <h2 className="text-3xl font-semibold mb-6">Morphed my drip, kept planet lit.</h2>

          {/* Sort Button */}
          <div className="flex justify-between mb-6">
            <button
              onClick={handleSortChange}
              className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
            </button>
            <div className="text-lg font-semibold">Cart: {cart.length} items</div>
          </div>

          {/* Item Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((item, index) => (
              <ItemCard key={index} {...item} onAddToCart={() => handleAddToCart(item)} />
            ))}
          </div>

          {/* Size Chart */}
          <SizeChart />
        </div>
      </main>
    </div>
  );
}
