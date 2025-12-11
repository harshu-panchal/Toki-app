import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbol } from '../../../shared/components/MaterialSymbol';
import type { PreferencesData } from '../types/auth.types';

export const PreferencesPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PreferencesData>({
    showMe: 'both',
    ageRange: { min: 18, max: 35 },
    distanceRange: 50,
    lifestylePreferences: {},
  });

  useEffect(() => {
    // Check if previous steps completed
    const signupData = sessionStorage.getItem('onboarding_signup');
    const basicProfileData = sessionStorage.getItem('onboarding_basic_profile');
    if (!signupData || !basicProfileData) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store preferences data
    sessionStorage.setItem('onboarding_preferences', JSON.stringify(formData));
    navigate('/onboarding/interests');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step 3 of 4</span>
            <span className="text-sm text-gray-500">Preferences</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">What Are You Looking For?</h2>
          <p className="text-gray-600">Help us find your perfect matches</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Show Me */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Show Me
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['men', 'women', 'both'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, showMe: option }))}
                    className={`py-3 px-4 rounded-lg border font-medium transition-all ${
                      formData.showMe === option
                        ? 'border-pink-500 bg-pink-50 text-pink-600'
                        : 'border-gray-300 text-gray-700 hover:border-pink-300'
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Age Range: {formData.ageRange.min} - {formData.ageRange.max} years
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-12">Min:</span>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={formData.ageRange.min}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ageRange: { ...prev.ageRange, min: parseInt(e.target.value) },
                      }))
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-700 w-12">{formData.ageRange.min}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 w-12">Max:</span>
                  <input
                    type="range"
                    min="18"
                    max="100"
                    value={formData.ageRange.max}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ageRange: { ...prev.ageRange, max: parseInt(e.target.value) },
                      }))
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-700 w-12">{formData.ageRange.max}</span>
                </div>
              </div>
            </div>

            {/* Distance Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Maximum Distance: {formData.distanceRange} km
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={formData.distanceRange}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, distanceRange: parseInt(e.target.value) }))
                }
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

