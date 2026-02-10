import { Plus, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { initOwnerDashboardAnimations } from '../animations/ownerDashboardAnimations';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import StatsCard from '../components/dashboard/StatsCard';
import InventoryTable from '../components/dashboard/InventoryTable';
import RecentActivity from '../components/dashboard/RecentActivity';
import PayoutInfo from '../components/dashboard/PayoutInfo';
import InventorySearch from '../components/dashboard/InventorySearch';
import UploadItemForm from '../components/owner/UploadItemForm';
import QRCodeModal from '../components/owner/QRCodeModal';
import { BarChart3, Package, DollarSign, TrendingUp } from 'lucide-react';

const OWNER_INVENTORY = [
  { id: 1, name: 'Premium Blazer', category: 'men', price: 2499, rentalPrice: 599, rented: 15, earnings: 8985, qr: 'QR001' },
  { id: 2, name: 'Designer Saree', category: 'women', price: 3499, rentalPrice: 899, rented: 23, earnings: 20677, qr: 'QR002' },
  { id: 3, name: 'Casual Shirt', category: 'men', price: 899, rentalPrice: 249, rented: 8, earnings: 1992, qr: 'QR003' },
];

export default function OwnerDashboard() {
  const [inventory, setInventory] = useState(OWNER_INVENTORY);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    initOwnerDashboardAnimations();
  }, []);

  const totalEarnings = inventory.reduce((sum, item) => sum + item.earnings, 0);
  const totalRentals = inventory.reduce((sum, item) => sum + item.rented, 0);
  const totalItems = inventory.length;

  const handleAddItem = (newItem) => {
    setInventory(prev => [...prev, newItem]);
  };

  const handleViewQR = (item) => {
    setSelectedItem(item);
    setShowQRModal(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(prev => prev.filter(item => item.id !== itemId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Owner Dashboard</h1>
            <p className="text-gray-100">Manage your inventory and track earnings</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatsCard icon={DollarSign} label="Total Earnings" value={`₹${totalEarnings.toLocaleString()}`} color="green" />
          <StatsCard icon={TrendingUp} label="Active Rentals" value={totalRentals} color="blue" />
          <StatsCard icon={Package} label="Listed Items" value={totalItems} color="purple" />
          <StatsCard icon={BarChart3} label="Avg. Rating" value="4.8★" color="yellow" />
        </div>

        {/* Add Item Button */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Inventory</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-pink-600 transition font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>

        {/* Search Bar */}
        <InventorySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} inventory={inventory} />

        {/* Inventory Table */}
        <InventoryTable 
          inventory={inventory} 
          searchQuery={searchQuery}
          onViewQR={handleViewQR}
          onDelete={handleDeleteItem}
        />

        {/* Performance Chart */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <RecentActivity />
          <PayoutInfo totalEarnings={totalEarnings} />
        </div>
      </div>

      <Footer />

      {/* Modals */}
      {showAddModal && (
        <UploadItemForm 
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddItem}
        />
      )}

      {showQRModal && selectedItem && (
        <QRCodeModal 
          item={selectedItem}
          onClose={() => {
            setShowQRModal(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}
