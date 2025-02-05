'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { toast } from 'react-hot-toast';

const ADMIN_EMAIL = 'izmarao99@gmail.com';

type Product = {
  _id: string;
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stockQuantity: number;
  createdAt: string;
};

const AdminDashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stockQuantity: '',
    id: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const fetchProducts = async () => {
    try {
      const query = `*[_type == "product"] | order(_createdAt desc) {
        _id, id, name, price, stockQuantity, category, image, description, _createdAt
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    if (isLoaded && user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
      router.push('/');
    } else {
      fetchProducts();
    }
  }, [user, isLoaded, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productInfo = {
      _type: 'product',
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
      stockQuantity: Number(formData.stockQuantity),
      id: Number(formData.id),
    };

    try {
      await client.create(productInfo);
      toast.success('Product added successfully!');
      setFormData({ name: '', description: '', price: '', category: '', image: '', stockQuantity: '', id: '' });
      setImagePreview('');
      await fetchProducts();
    } catch (error) {
      toast.error('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const handleDelete = async (documentId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await client.delete(documentId);
      await fetchProducts();
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Error deleting product');
    }
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
          {/* Add Product Form */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {imagePreview && (
                    <div className="mt-2 relative aspect-square w-32 rounded-lg overflow-hidden border">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
                    <input
                      type="number"
                      name="id"
                      value={formData.id}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400"
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>

          {/* Products Grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Products ({products.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className=" top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <div className="p-4">
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        height={283} width={283}
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-blue-600 font-medium">${product.price.toFixed(2)}</p>
                        <div className='text-sm'>
                        {product.stockQuantity >= 1 ? <p>In Stock ({product.stockQuantity})</p> : <p>Out of Stock</p>}
                      </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{product.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>ID: {product.id}</span>
                        <span>{product.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;