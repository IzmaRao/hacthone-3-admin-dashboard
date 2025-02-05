'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Search, Filter, Download, MoreVertical, Edit, Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ADMIN_EMAIL = 'izmarao99@gmail.com';

type Customer = {
  _id: string;
  customerId: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  address: string;
  city: string;
  zipCode: number;
  phone: string;
  email: string;
  additionalInformation?: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchCustomers = async () => {
    try {
      const query = `*[_type == "customers"]{
        _id,
        customerId,
        firstName,
        lastName,
        email,
        phone,
        additionalInformation,
        city,
        address,
        zipCode,
        companyName,
        createdAt
      } | order(${sortBy === 'newest' ? 'createdAt desc' : 'createdAt asc'})`;
      
      const data = await client.fetch(query);
      setCustomers(data);
    } catch (error) {
      toast.error('Failed to fetch customers');
    }
  };

  useEffect(() => {
    if (isLoaded && user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
      router.push('/');
    } else {
      fetchCustomers();
    }
  }, [user, isLoaded, router, sortBy]);

  const filteredCustomers = customers.filter(customer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (customer.firstName.toLowerCase().includes(searchLower) ||
      customer.lastName.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower) ||
      customer.phone.includes(searchTerm) ||
      customer.customerId.toString().includes(searchTerm)) &&
      (filterCity === 'all' || customer.city === filterCity)
    );
  });

  const handleDelete = async (customerId: string) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;
    
    try {
      await client.delete(customerId);
      await fetchCustomers();
      toast.success('Customer deleted successfully!');
    } catch (error) {
      toast.error('Error deleting customer');
    }
  };

  const exportCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'City', 'Address', 'Join Date'],
      ...filteredCustomers.map(c => [
        c.customerId,
        `${c.firstName} ${c.lastName}`,
        c.email,
        c.phone,
        c.city,
        c.address,
        new Date(c.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
  };

  if (!isLoaded || user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <div className="ml-3"><SidebarTrigger /></div>

        <main className="p-6 lg:ml-10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Management</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <select
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                >
                  <option value="all">All Cities</option>
                  {Array.from(new Set(customers.map(c => c.city))).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>

                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCustomers.map((customer) => (
              <div 
                key={customer._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative p-6"
              >
                <div className="relative top-0 right-3 flex gap-2">
                  <button
                    onClick={() => router.push(`/edit-customer/${customer._id}`)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">#{customer.customerId}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {customer.city}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      {customer.firstName} {customer.lastName}
                    </h3>
                    {customer.companyName && (
                      <p className="text-sm text-gray-500">{customer.companyName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <div className="flex flex-col">
                        <a href={`mailto:${customer.email}`} className="text-blue-600 hover:underline">
                          {customer.email}
                        </a>
                        <a href={`tel:${customer.phone}`} className="text-gray-800">
                          {customer.phone}
                        </a>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-800">
                        {customer.address}, {customer.zipCode}
                      </p>
                    </div>

                    {customer.additionalInformation && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-sm text-gray-600 line-clamp-2 hover:line-clamp-none">
                          {customer.additionalInformation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No customers found matching your criteria
            </div>
          )}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;