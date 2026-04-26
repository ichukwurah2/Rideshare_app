import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export interface RiderFormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  payment_method: string;
  rating: number;
  status: 'active' | 'deleted';
}

interface RiderFormProps {
  initialValues: RiderFormValues;
  onCancel: () => void;
  onSubmit: (values: RiderFormValues) => void;
  submitLabel: string;
  disabled?: boolean;
}

export default function RiderForm({
  initialValues,
  onCancel,
  onSubmit,
  submitLabel,
  disabled = false,
}: RiderFormProps) {
  const [values, setValues] = useState<RiderFormValues>(initialValues);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{submitLabel}</h2>
        <p className="text-sm text-gray-500">Add or edit rider details and save changes.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label className="block text-sm font-medium text-gray-700">
          First name
          <input
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Last name
          <input
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Email address
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Phone number
          <input
            name="phone_number"
            value={values.phone_number}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Payment method
          <select
            name="payment_method"
            value={values.payment_method}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Apple Pay">Apple Pay</option>
            <option value="Google Pay">Google Pay</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Rating
          <input
            type="number"
            name="rating"
            min={0}
            max={5}
            step={0.1}
            value={values.rating}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Status
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
        </label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
