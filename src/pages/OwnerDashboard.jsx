import { Plus, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';

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
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function OwnerDashboard() {
  const [inventory, setInventory] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [pendingPayout, setPendingPayout] = useState(0);

  useEffect(() => {

    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const [invRes, actRes] = await Promise.all([
        api.product.getMyProducts(),
        api.order.getOwnerActivities()
      ]);
      setInventory(invRes.data?.products || invRes.products || []);
      setActivities(actRes.data?.activities || actRes.activities || []);
      setPendingPayout(actRes.data?.pendingPayout || actRes.pendingPayout || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalEarnings = inventory.reduce((sum, item) => sum + (item.totalEarnings || 0), 0);
  const totalRentals = inventory.reduce((sum, item) => sum + (item.totalRentals || 0), 0);
  const totalItems = inventory.length;

  const handleAddItem = async (newItem) => {
    try {
      const productPayload = {
        name: newItem.name,
        category: newItem.category,
        description: newItem.description,
        originalPrice: Number(newItem.originalPrice),
        rentalPrice: Number(newItem.rentalPrice),
        stockQuantity: 1,
        images: [{ url: newItem.image, isPrimary: true }]
      };
      await api.product.create(productPayload);
      toast.success('Product listed successfully!');
      fetchInventory();
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload product. Please try again.');
    }
  };

  const handleViewQR = (item) => {
    setSelectedItem(item);
    setShowQRModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    // Custom toast confirm instead of window.confirm()
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Delete this product?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await api.product.delete(itemId);
                  setInventory(prev => prev.filter(item => item.id !== itemId));
                  toast.success('Product removed.');
                } catch (err) {
                  console.error(err);
                  toast.error('Failed to delete product.');
                }
              }}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg"
            >Delete</button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-lg"
            >Cancel</button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
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
          <RecentActivity activities={activities} />
          <PayoutInfo totalEarnings={totalEarnings} pendingPayout={pendingPayout} />
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
