// @ts-nocheck
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbol } from '../../../shared/components/MaterialSymbol';
import type { SignupData } from '../types/auth.types';

export const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupData>(() => {
    const saved = sessionStorage.getItem('onboarding_signup');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      fullName: '',
      phone: '',
    };
  });
  const [errors, setErrors] = useState<Partial<SignupData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SignupData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Store signup data temporarily (will be stored in onboarding flow)
      sessionStorage.setItem('onboarding_signup', JSON.stringify(formData));
      navigate('/onboarding/basic-profile');
    }
  };

  const handleChange = (field: keyof SignupData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            MatchMint
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-gray-600">Start your journey to find meaningful connections</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <div className="flex">
                <div className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg flex items-center">
                  <span className="text-gray-700 font-medium">+91</span>
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className={`flex-1 px-4 py-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="9876543210"
                  maxLength={10}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Continue
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-pink-600 font-semibold hover:text-pink-700"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

