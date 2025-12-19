// @ts-nocheck
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MaterialSymbol } from '../../../shared/components/MaterialSymbol';
import { FemaleBottomNavigation } from '../components/FemaleBottomNavigation';
import { FemaleTopNavbar } from '../components/FemaleTopNavbar';
import { FemaleSidebar } from '../components/FemaleSidebar';
import { useFemaleNavigation } from '../hooks/useFemaleNavigation';
import { getGiftTheme } from '../utils/giftThemes';
import type { Gift } from '../types/female.types';

interface LocationState {
  selectedGifts?: Gift[];
  totalValue?: number;
}

export const GiftTradeFlowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen, setIsSidebarOpen, navigationItems, handleNavigationClick } = useFemaleNavigation();
  const state = location.state as LocationState | null;

  const [step, setStep] = useState<'summary' | 'payment' | 'success'>('summary');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'upi'>('bank');
  
  // Bank details
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
  });
  
  // UPI details
  const [upiId, setUpiId] = useState('');
  
  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedGifts = state?.selectedGifts || [];
  const totalValue = state?.totalValue || 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If no gifts selected, redirect back
    if (!state?.selectedGifts || selectedGifts.length === 0) {
      navigate('/female/trade-gifts');
    }
  }, [state, selectedGifts.length, navigate]);

  const validateBankDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!bankDetails.accountHolderName.trim()) {
      newErrors.accountHolderName = 'Account holder name is required';
    }
    
    if (!bankDetails.accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    } else if (!/^\d{9,18}$/.test(bankDetails.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 9-18 digits';
    }
    
    if (!bankDetails.ifscCode.trim()) {
      newErrors.ifscCode = 'IFSC code is required';
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(bankDetails.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Invalid IFSC code format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpiDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!/^[\w.-]+@[\w]+$/.test(upiId.trim())) {
      newErrors.upiId = 'Invalid UPI ID format (e.g., name@paytm)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'summary') {
      setStep('payment');
    } else if (step === 'payment') {
      const isValid = paymentMethod === 'bank' ? validateBankDetails() : validateUpiDetails();
      if (isValid) {
        // TODO: API call to process trade
        console.log('Processing trade:', {
          gifts: selectedGifts.map(g => g.id),
          totalValue,
          paymentMethod,
          bankDetails: paymentMethod === 'bank' ? bankDetails : undefined,
          upiId: paymentMethod === 'upi' ? upiId : undefined,
        });
        
        // Simulate API call
        setTimeout(() => {
          setStep('success');
        }, 1500);
      }
    }
  };

  const handleBack = () => {
    if (step === 'payment') {
      setStep('summary');
    } else {
      navigate('/female/trade-gifts');
    }
  };

  const handleSuccessClose = () => {
    navigate('/female/trade-gifts');
  };

  if (selectedGifts.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-20">
      {/* Top Navbar */}
      <FemaleTopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Sidebar */}
      <FemaleSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />

      {/* Header */}
      <div className="sticky top-[57px] z-10 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={handleBack}
            className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#342d18] transition-colors"
          >
            <MaterialSymbol name="arrow_back" size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            {step === 'summary' && 'Trade Gifts'}
            {step === 'payment' && 'Payment Details'}
            {step === 'success' && 'Trade Successful'}
          </h1>
          {step !== 'success' && (
            <button
              onClick={() => navigate('/female/trade-gifts')}
              className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#342d18] transition-colors"
              aria-label="Close"
            >
              <MaterialSymbol name="close" size={24} />
            </button>
          )}
        </div>
        
        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-2 px-4 pb-4">
            <div className={`flex items-center gap-2 ${step === 'summary' ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`size-8 rounded-full flex items-center justify-center ${
                step === 'summary' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                <MaterialSymbol name="shopping_bag" size={18} />
              </div>
              <span className="text-xs font-medium">Summary</span>
            </div>
            <div className="h-px w-8 bg-gray-300 dark:bg-gray-600" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`size-8 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                <MaterialSymbol name="payment" size={18} />
              </div>
              <span className="text-xs font-medium">Payment</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">
        {step === 'summary' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Selected Gifts */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Selected Gifts ({selectedGifts.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedGifts.map((gift) => {
                  const theme = getGiftTheme(gift);
                  return (
                    <div
                      key={gift.id}
                      className="flex items-center gap-3 p-4 bg-white dark:bg-[#342d18] rounded-xl border border-gray-200 dark:border-gray-700"
                    >
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${theme.secondary} shrink-0`}>
                        <MaterialSymbol
                          name={gift.icon as any}
                          size={32}
                          className="text-white"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {gift.name}
                          </h4>
                          {gift.quantity && gift.quantity > 1 && (
                            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-bold">
                              ×{gift.quantity}
                            </span>
                          )}
                        </div>
                        {gift.senderName && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            From {gift.senderName}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-center gap-1">
                          <MaterialSymbol name="monetization_on" size={16} className="text-green-600 dark:text-green-400" />
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            ₹{gift.tradeValue}
                            {gift.quantity && gift.quantity > 1 && ` × ${gift.quantity}`}
                          </span>
                        </div>
                        {gift.quantity && gift.quantity > 1 && (
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                            = ₹{gift.tradeValue * gift.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Value */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Trade Value
                </span>
                <div className="flex items-center gap-2">
                  <MaterialSymbol name="monetization_on" size={24} className="text-green-600 dark:text-green-400" />
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ₹{totalValue}
                  </span>
                </div>
              </div>
              {selectedGifts.some(g => g.quantity && g.quantity > 1) && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {selectedGifts.reduce((sum, g) => sum + (g.quantity || 1), 0)} gift(s) total
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                This amount will be added to your earnings balance after processing
              </p>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Payment Method Selection */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Select Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#342d18] hover:border-primary/50'
                  }`}
                >
                  <MaterialSymbol
                    name="account_balance"
                    size={40}
                    className={paymentMethod === 'bank' ? 'text-primary' : 'text-gray-400'}
                  />
                  <p className={`text-base font-semibold mt-3 ${
                    paymentMethod === 'bank' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    Bank Transfer
                  </p>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#342d18] hover:border-primary/50'
                  }`}
                >
                  <MaterialSymbol
                    name="qr_code"
                    size={40}
                    className={paymentMethod === 'upi' ? 'text-primary' : 'text-gray-400'}
                  />
                  <p className={`text-base font-semibold mt-3 ${
                    paymentMethod === 'upi' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    UPI
                  </p>
                </button>
              </div>
            </div>

            {/* Bank Details Form */}
            {paymentMethod === 'bank' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Bank Account Details
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountHolderName}
                    onChange={(e) => {
                      setBankDetails({ ...bankDetails, accountHolderName: e.target.value });
                      setErrors({ ...errors, accountHolderName: '' });
                    }}
                    className="w-full px-4 py-3 bg-white dark:bg-[#342d18] border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter account holder name"
                  />
                  {errors.accountHolderName && (
                    <p className="mt-1 text-sm text-red-600">{errors.accountHolderName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={bankDetails.accountNumber}
                    onChange={(e) => {
                      setBankDetails({ ...bankDetails, accountNumber: e.target.value.replace(/\D/g, '') });
                      setErrors({ ...errors, accountNumber: '' });
                    }}
                    className="w-full px-4 py-3 bg-white dark:bg-[#342d18] border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter account number"
                    maxLength={18}
                  />
                  {errors.accountNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={bankDetails.ifscCode}
                    onChange={(e) => {
                      setBankDetails({ ...bankDetails, ifscCode: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '') });
                      setErrors({ ...errors, ifscCode: '' });
                    }}
                    className="w-full px-4 py-3 bg-white dark:bg-[#342d18] border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="ABCD0123456"
                    maxLength={11}
                  />
                  {errors.ifscCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
                  )}
                </div>
              </div>
            )}

            {/* UPI Details Form */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  UPI Details
                </h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      setErrors({ ...errors, upiId: '' });
                    }}
                    className="w-full px-4 py-3 bg-white dark:bg-[#342d18] border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="name@paytm / name@phonepe"
                  />
                  {errors.upiId && (
                    <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Format: name@paytm, name@phonepe, name@ybl, etc.
                  </p>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="p-6 bg-gray-50 dark:bg-[#342d18] rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  Amount to Receive
                </span>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹{totalValue}
                </span>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="max-w-md mx-auto flex flex-col items-center justify-center py-12">
            <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
              <MaterialSymbol name="check_circle" size={64} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Trade Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
              Your {selectedGifts.length} gift(s) have been traded for
            </p>
            <div className="flex items-center gap-2 mb-6">
              <MaterialSymbol name="monetization_on" size={32} className="text-green-600 dark:text-green-400" />
              <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                ₹{totalValue}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              The amount will be added to your earnings balance within 24-48 hours
            </p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {step !== 'success' && (
        <div className="sticky bottom-20 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-2xl mx-auto flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 py-4 bg-gray-100 dark:bg-[#342d18] text-gray-700 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-[#4b202e] transition-colors"
            >
              {step === 'summary' ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={handleNext}
              className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg active:scale-95"
            >
              {step === 'summary' ? 'Continue' : 'Submit Request'}
            </button>
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="sticky bottom-20 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleSuccessClose}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg active:scale-95"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <FemaleBottomNavigation items={navigationItems} onItemClick={handleNavigationClick} />
    </div>
  );
};

