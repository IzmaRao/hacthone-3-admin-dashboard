'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Search, Filter, Download, MoreVertical } from 'lucide-react';

const ADMIN_EMAIL = 'izmarao99@gmail.com';

type Order = {
  orderId: number;
  customerId: number;
  products: Array<{
    id: number;
    quantity: number;
  }>;
  paymentStatus: 'Paid' | 'Pending' | 'Failed'; 
  status: 'Order Created' | 'Shipped' | 'Delivered' | 'Cancelled'; 
  message: string;
}

const AdminDashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const fetchOrders = async () => {
    const query = `*[_type == "orders"]{orderId, customerId, products, paymentStatus, status, message}`;
    const data = await client.fetch(query);
    setOrders(data);
  };

  useEffect(() => {
    if (isLoaded && user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
      router.push('/');
    } else {
      fetchOrders();
    }
  }, [user, isLoaded, router]);

  const filteredOrders = orders.filter(order => {
    // Add null checks and safe conversions
    const orderIdString = order.orderId?.toString() || '';
    const customerIdString = order.customerId?.toString() || '';
    
    const matchesSearch = orderIdString.includes(searchTerm.toString()) ||
      customerIdString.includes(searchTerm.toString());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalOrders: orders.length,
    pending: orders.filter(o => o.status === 'Order Created').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
  };

  if (!isLoaded || user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    return <p className="text-center p-4">Loading...</p>;
  }

  const exportCSV = () => {
    const csvContent = [
      ['orderId', 'customerId', 'products', 'paymentStatus', 'status', 'message'],
      ...filteredOrders.map(c => [
        c.orderId,
        `${c.customerId}`,
        c.products,
        c.paymentStatus,
        c.status,
        c.message
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'order.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
        <div className="ml-3"><SidebarTrigger /></div>
        
        <main className="p-6 md:p-10 ">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Order Created">Order Created</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="all">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm mb-2">Total Orders</h3>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
              <span className="text-green-500 text-sm">+2.5% from last month</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm mb-2">Pending Orders</h3>
              <p className="text-3xl font-bold">{stats.pending}</p>
              <span className="text-yellow-500 text-sm">+5 new this week</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm mb-2">Delivered</h3>
              <p className="text-3xl font-bold">{stats.delivered}</p>
              <span className="text-green-500 text-sm">+15% from last month</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-gray-500 text-sm mb-2">Cancelled</h3>
              <p className="text-3xl font-bold">{stats.cancelled}</p>
              <span className="text-red-500 text-sm">-3% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <button onClick={exportCSV} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4">#{order.orderId}</td>
                      <td className="px-6 py-4">Customer {order.customerId}</td>
                      <td className="px-6 py-4">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex gap-1">
                            <span>Product {product.id}</span>
                            <span className="text-gray-500">(x{product.quantity})</span>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${getPaymentStatusColor(order.paymentStatus)} px-2 py-1 rounded-full text-xs`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${getStatusColor(order.status)} px-2 py-1 rounded-full text-xs`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="h-5 w-5 text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;