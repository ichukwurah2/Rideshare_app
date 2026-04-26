import { useState } from 'react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  emergencyContact: string;
  emergencyPhone: string;
  paymentMethod: string;
  paymentLast4: string;
  paymentExpiry: string;
}

interface Errors {
  [key: string]: string;
}

export default function RiderProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street, Springfield, IL 62701',
    dateOfBirth: '1990-05-15',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '(555) 987-6543',
    paymentMethod: 'Visa',
    paymentLast4: '4242',
    paymentExpiry: '12/26',
  });

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileData>(profile);
  const [errors, setErrors] = useState<Errors>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Stats
  const stats = {
    totalRides: 24,
    avgRating: 4.8,
    totalSpent: 186.5,
    memberSince: 'Jan 2025',
  };

  // Validation
  const validateForm = (section: string) => {
    const newErrors: Errors = {};

    if (section === 'personal') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    }

    if (section === 'emergency') {
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact name is required';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences.</p>
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
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-500 text-sm mt-1">Rider Member • Since {stats.memberSince}</p>
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
                  <span className="text-sm text-gray-600">💰 Total Spent</span>
                  <span className="font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                📸 Change Avatar
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

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
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
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="font-semibold text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-semibold text-gray-900">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Home Address</p>
                      <p className="font-semibold text-gray-900">{profile.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-semibold text-gray-900">{profile.dateOfBirth}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-red-100 px-8 py-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Emergency Contact</h3>
                {editingSection !== 'emergency' ? (
                  <button
                    onClick={() => {
                      setEditingSection('emergency');
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
                {editingSection === 'emergency' ? (
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name</label>
                        <input
                          type="text"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.emergencyContact ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                            errors.emergencyPhone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.emergencyPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyPhone}</p>}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => handleSave('emergency')}
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
                      <p className="text-sm text-gray-600">Contact Name</p>
                      <p className="font-semibold text-gray-900">{profile.emergencyContact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone Number</p>
                      <p className="font-semibold text-gray-900">{profile.emergencyPhone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-green-100 px-8 py-6 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  🔗 Manage
                </button>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-2xl font-bold">💳</div>
                    <span className="text-sm text-gray-300">Primary</span>
                  </div>
                  <p className="text-lg font-semibold">{profile.paymentMethod} •••• {profile.paymentLast4}</p>
                  <p className="text-sm text-gray-300 mt-1">Expires {profile.paymentExpiry}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors">
                    + Add Card
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
