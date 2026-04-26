import { useEffect, useMemo, useState } from 'react';
import { riders } from '../utils/api';
import RiderForm, { type RiderFormValues } from "../components/RiderForm";
import RiderTable from '../components/RiderTable';

export interface Rider {
  rider_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  payment_method: string;
  rating: number;
  status: 'active' | 'deleted';
  createdAt: string;
  updatedAt: string;
}

const defaultFormValues: RiderFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  payment_method: 'Credit Card',
  rating: 0,
  status: 'active',
};

export default function AdminRiders() {
  const [allRiders, setAllRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'deleted'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState<RiderFormValues>(defaultFormValues);
  const [editingRider, setEditingRider] = useState<Rider | null>(null);

  const loadRiders = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await riders.list();
      setAllRiders(response.data.data || []);
    } catch (fetchError) {
      console.error(fetchError);
      setError('Unable to load riders. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRiders();
  }, []);

  const filteredRiders = useMemo(() => {
    return allRiders.filter((rider) => {
      const searchValue = searchTerm.toLowerCase();
      const matchesSearch =
        rider.first_name.toLowerCase().includes(searchValue) ||
        rider.last_name.toLowerCase().includes(searchValue) ||
        rider.email.toLowerCase().includes(searchValue);
      const matchesStatus = filterStatus === 'all' || rider.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [allRiders, filterStatus, searchTerm]);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredRiders.length / itemsPerPage));
  const paginatedRiders = filteredRiders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const activeCount = allRiders.filter((rider) => rider.status === 'active').length;
  const deletedCount = allRiders.filter((rider) => rider.status === 'deleted').length;

  const handleOpenForm = () => {
    setEditingRider(null);
    setFormValues(defaultFormValues);
  };

  const handleCloseForm = () => {
    setEditingRider(null);
    setFormValues(defaultFormValues);
  };

  const handleEdit = (rider: Rider) => {
    setEditingRider(rider);
    setFormValues({
      first_name: rider.first_name,
      last_name: rider.last_name,
      email: rider.email,
      phone_number: rider.phone_number,
      payment_method: rider.payment_method,
      rating: rider.rating,
      status: rider.status,
    });
  };

  const handleSubmit = async (values: RiderFormValues) => {
    setSaving(true);
    setError('');

    try {
      if (editingRider) {
        await riders.update(editingRider.rider_id, values);
      } else {
        await riders.create(values);
      }

      await loadRiders();
      handleCloseForm();
    } catch (submitError) {
      console.error(submitError);
      setError('Unable to save rider. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (rider: Rider) => {
    setSaving(true);
    setError('');

    try {
      await riders.updateStatus(rider.rider_id, {
        status: rider.status === 'active' ? 'deleted' : 'active',
      });
      await loadRiders();
    } catch (statusError) {
      console.error(statusError);
      setError('Unable to update rider status.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Rider Management</h1>
          <p className="mt-2 text-sm text-slate-600">Full CRUD for the Rider table with status updates.</p>
          <p className="mt-2 text-sm text-slate-600">{activeCount} active rider{activeCount !== 1 ? 's' : ''}, {deletedCount} deleted rider{deletedCount !== 1 ? 's' : ''}.</p>
        </div>
        <button
          type="button"
          onClick={handleOpenForm}
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Add Rider
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 shadow-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Riders</h2>
              <p className="text-sm text-slate-500">Manage your rider list and update statuses in one place.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'active', 'deleted'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setFilterStatus(status);
                    setCurrentPage(1);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    filterStatus === status
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status === 'active' ? 'Active' : 'Deleted'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              Showing {paginatedRiders.length} of {filteredRiders.length} riders
            </div>

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name or email"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:max-w-xs"
            />
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200">
            <RiderTable riders={paginatedRiders} loading={loading} onEdit={handleEdit} onToggleStatus={handleToggleStatus} />
          </div>

          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between rounded-b-3xl bg-slate-50 px-5 py-4 text-sm text-slate-600">
              <button
                type="button"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </section>

        <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-slate-900">Rider Form</h2>
            <p className="text-sm text-slate-500">Create a new rider or edit an existing one.</p>
          </div>
          <RiderForm
            initialValues={formValues}
            onCancel={handleCloseForm}
            onSubmit={handleSubmit}
            submitLabel={editingRider ? 'Update Rider' : 'Create Rider'}
            disabled={saving}
          />
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {editingRider ? 'Editing rider record. Save to persist changes.' : 'Add a rider to create a new record in the backend.'}
          </div>
        </aside>
      </div>
    </div>
  );
}
