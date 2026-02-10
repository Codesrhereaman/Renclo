import { X, Download, Printer } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function QRCodeModal({ item, onClose }) {
  const qrRef = useRef(null);

  useEffect(() => {
    // In a real app, you would use a QR code library like qrcode.react
    // For now, we'll use a placeholder
    if (qrRef.current) {
      // Generate QR code here
    }
  }, [item]);

  const handleDownload = () => {
    // Download QR code logic
    alert('QR Code download functionality would be implemented here');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">QR Code - {item.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* QR Code Display */}
          <div className="bg-white border-4 border-purple-600 rounded-lg p-6 mb-6">
            <div ref={qrRef} className="w-64 h-64 mx-auto bg-gray-100 flex items-center justify-center">
              {/* Placeholder QR Code */}
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-2xl">{item.qr}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">Scan for verification</p>
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Item Details</p>
            <p className="font-bold text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-600">QR Code: {item.qr}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDownload}
              className="py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Attach this QR code to your item for easy verification during pickup and return
          </p>
        </div>
      </div>
    </div>
  );
}