import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbol } from '../../../shared/components/MaterialSymbol';
import type { InterestsData } from '../types/auth.types';

const INTEREST_OPTIONS = [
  'Fitness', 'Travel', 'Music', 'Reading', 'Food', 'Dating', 'Movies', 'Pets',
  'Sports', 'Art', 'Photography', 'Gaming', 'Cooking', 'Dancing', 'Yoga', 'Technology',
  'Fashion', 'Nature', 'Adventure', 'Comedy', 'Writing', 'Shopping', 'Beach', 'Mountains'
];

export const InterestsPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<InterestsData>({
    interests: [],
    bio: '',
    photos: [],
  });
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof InterestsData, string>>>({});

  useEffect(() => {
    // Check if previous steps completed
    const signupData = sessionStorage.getItem('onboarding_signup');
    const basicProfileData = sessionStorage.getItem('onboarding_basic_profile');
    const preferencesData = sessionStorage.getItem('onboarding_preferences');
    if (!signupData || !basicProfileData || !preferencesData) {
      navigate('/signup');
    }
  }, [navigate]);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => {
      const isSelected = prev.interests.includes(interest);
      return {
        ...prev,
        interests: isSelected
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.photos.length > 6) {
      alert('Maximum 6 photos allowed');
      return;
    }

    const newPhotos = [...formData.photos, ...files];
    setFormData((prev) => ({ ...prev, photos: newPhotos }));

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => {
      const newPhotos = prev.photos.filter((_, i) => i !== index);
      return { ...prev, photos: newPhotos };
    });
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InterestsData, string>> = {};

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    if (formData.photos.length === 0) {
      newErrors.photos = 'Please upload at least one photo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Get all onboarding data
      const signupData = JSON.parse(sessionStorage.getItem('onboarding_signup') || '{}');
      const basicProfileData = JSON.parse(sessionStorage.getItem('onboarding_basic_profile') || '{}');
      const preferencesData = JSON.parse(sessionStorage.getItem('onboarding_preferences') || '{}');

      // Complete onboarding data
      const onboardingData = {
        signup: signupData,
        basicProfile: basicProfileData,
        preferences: preferencesData,
        interests: formData,
      };

      // Store complete data (in real app, this would be sent to backend)
      console.log('Onboarding complete:', onboardingData);

      // Clear session storage
      sessionStorage.removeItem('onboarding_signup');
      sessionStorage.removeItem('onboarding_basic_profile');
      sessionStorage.removeItem('onboarding_preferences');

      // Redirect based on gender
      if (basicProfileData.gender === 'male') {
        navigate('/male/dashboard');
      } else if (basicProfileData.gender === 'female') {
        navigate('/female/dashboard');
      } else {
        navigate('/male/dashboard'); // Default fallback
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step 4 of 4</span>
            <span className="text-sm text-gray-500">Interests & Photos</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Complete Your Profile</h2>
          <p className="text-gray-600">Add your interests and photos to get started</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Interests (Select at least one)
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.interests.includes(interest)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-pink-100'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {errors.interests && (
                <p className="mt-2 text-sm text-red-500">{errors.interests}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                About Me (Optional)
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Tell us about yourself..."
                maxLength={500}
              />
              <p className="mt-1 text-xs text-gray-500">{formData.bio.length}/500</p>
            </div>

            {/* Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Photos (Minimum 1, Maximum 6)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img src={preview} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <MaterialSymbol name="close" size={16} />
                    </button>
                  </div>
                ))}
                {photoPreviews.length < 6 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-pink-500 transition-colors"
                  >
                    <MaterialSymbol name="add" size={32} className="text-gray-400" />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="hidden"
              />
              {errors.photos && (
                <p className="mt-1 text-sm text-red-500">{errors.photos}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Finish Setup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

