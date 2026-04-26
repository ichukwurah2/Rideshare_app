import { useState } from 'react';

interface DriverProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleLicensePlate: string;
  vehicleColor: string;
  insuranceProvider: string;
  insuranceExpiry: string;
  bankAccount: string;
  bankName: string;
  isAvailable: boolean;
}

interface Errors {
  [key: string]: string;
}

export default function DriverProfile() {
  const [profile, setProfile] = useState<DriverProfileData>({
    firstName: 'James',
    lastName: 'Miller',
    email: 'james.miller@email.com',
    phone: '(555) 987-6543',
    licenseNumber: 'DL-987654321',
    licenseExpiry: '06/2026',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic',
    vehicleYear: '2022',
    vehicleLicensePlate: 'ABC-1234',
    vehicleColor: 'Blue',
    insuranceProvider: 'State Farm',
    insuranceExpiry: '03/2027',
    bankAccount: '•••• 5678',
    bankName: 'Chase Bank',
    isAvailable: true,
  });

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<DriverProfileData>(profile);
  const [errors, setErrors] = useState<Errors>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Stats
  const stats = {
    totalRides: 142,
    avgRating: 4.85,
    totalEarned: 3245.8,
    memberSince: 'Jun 2024',
  };

  // Validation
  const validateForm = (section: string) => {
    const newErrors: Errors = {};

    if (section === 'personal') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    }

    if (section === 'license') {
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!formData.licenseExpiry.trim()) newErrors.licenseExpiry = 'Expiry date is required';
    }

    if (section === 'vehicle') {
      if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Make is required';
      if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Model is required';
      if (!formData.vehicleYear.trim()) newErrors.vehicleYear = 'Year is required';
      if (!formData.vehicleLicensePlate.trim()) newErrors.vehicleLicensePlate = 'License plate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Save changes
  const handleSave = (section: string) => {
    if (validateForm(section)) {
      setProfile(formData);
      setEditingSection(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData(profile);
    setEditingSection(null);
    setErrors({});
  };

  // Toggle availability
  const toggleAvailability = () => {
    setProfile((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Driver Profile</h1>
          <p className="text-gray-600">Manage your driver information and availability.</p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">
              <span className="font-bold">✓ Success!</span> Your profile has been updated.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">Driver • Since {stats.memberSince}</p>
              </div>

              <div className="space-y-3 bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">🚕 Total Rides</span>
                  <span className="font-bold text-gray-900">{stats.totalRides}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">⭐ Avg Rating</span>
                  <span className="font-bold text-gray-900">{stats.avgRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">💰 Total Earned</span>
                  <span className="font-bold text-gray-900">${stats.totalEarned.toFixed(2)}</span>
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-3">Availability</p>
                <button
                  onClick={toggleAvailability}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    profile.isAvailable
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-400 hover:bg-gray-500 text-white'
                  }`}
                >
                  {profile.isAvailable ? '🟢 Available' : '🔴 Unavailable'}
                </button>
              </div>

              <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-semibold py-3 px-4 rounded-lg transition-colors">
                ⚙️ Deactivate Account
              </button>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                {editingSection !== 'personal' ? (
                  <button
                    onClick={() => {
                      setEditingSection('personal');
                      setFormData(profile);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <span className="text-sm text-blue-600 font-semibold">Editing...</span>
                )}
              </div>

              <div className="p-8">
                {editingSection === 'personal' ? (
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => handleSave('personal')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        ✓ Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">First Name</p>
                        <p className="font-semibold text-gray-900">{profile.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Name</p>
                        <p className="font-semibold text-gray-900">{profile.lastName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{profile.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* License Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-8 py-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">License Information</h3>
                {editingSection !== 'license' ? (
                  <button
                    onClick={() => {
                      setEditingSection('license');
                      setFormData(profile);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <span className="text-sm text-blue-600 font-semibold">Editing...</span>
                )}
              </div>

              <div className="p-8">
                {editingSection === 'license' ? (
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="licenseExpiry"
                          placeholder="MM/YYYY"
                          value={formData.licenseExpiry}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.licenseExpiry ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.licenseExpiry && <p className="text-red-500 text-sm mt-1">{errors.licenseExpiry}</p>}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => handleSave('license')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        ✓ Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">License Number</p>
                      <p className="font-semibold text-gray-900">{profile.licenseNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expiry Date</p>
                      <p className="font-semibold text-gray-900">{profile.licenseExpiry}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-8 py-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Vehicle Information</h3>
                {editingSection !== 'vehicle' ? (
                  <button
                    onClick={() => {
                      setEditingSection('vehicle');
                      setFormData(profile);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    ✏️ Edit
                  </button>
                ) : (
                  <span className="text-sm text-blue-600 font-semibold">Editing...</span>
                )}
              </div>

              <div className="p-8">
                {editingSection === 'vehicle' ? (
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Make</label>
                        <input
                          type="text"
                          name="vehicleMake"
                          value={formData.vehicleMake}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.vehicleMake ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.vehicleMake && <p className="text-red-500 text-sm mt-1">{errors.vehicleMake}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
                        <input
                          type="text"
                          name="vehicleModel"
                          value={formData.vehicleModel}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.vehicleModel && <p className="text-red-500 text-sm mt-1">{errors.vehicleModel}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                        <input
                          type="text"
                          name="vehicleYear"
                          value={formData.vehicleYear}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.vehicleYear ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.vehicleYear && <p className="text-red-500 text-sm mt-1">{errors.vehicleYear}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                        <input
                          type="text"
                          name="vehicleColor"
                          value={formData.vehicleColor}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">License Plate</label>
                        <input
                          type="text"
                          name="vehicleLicensePlate"
                          value={formData.vehicleLicensePlate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.vehicleLicensePlate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.vehicleLicensePlate && <p className="text-red-500 text-sm mt-1">{errors.vehicleLicensePlate}</p>}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => handleSave('vehicle')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        ✓ Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Make</p>
                        <p className="font-semibold text-gray-900">{profile.vehicleMake}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Model</p>
                        <p className="font-semibold text-gray-900">{profile.vehicleModel}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Year</p>
                        <p className="font-semibold text-gray-900">{profile.vehicleYear}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Color</p>
                        <p className="font-semibold text-gray-900">{profile.vehicleColor}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">License Plate</p>
                      <p className="font-semibold text-gray-900">{profile.vehicleLicensePlate}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bank Information */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-8 py-6">
                <h3 className="text-lg font-bold text-gray-900">Bank Information</h3>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-300 mb-2">Account</p>
                  <p className="text-lg font-bold">{profile.bankAccount}</p>
                  <p className="text-sm text-gray-300 mt-2">{profile.bankName}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors">
                    + Add Bank Account
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors">
                    ✏️ Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
