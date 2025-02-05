'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// Replace with your admin email
const ADMIN_EMAIL = 'izmarao99@gmail.com';

type ClerkUser = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: { emailAddress: string }[];
};

const AdminDashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
      router.push('/'); // Redirect non-admin users
    } else {
    }
  }, [user, isLoaded, router]);

  if (!isLoaded || user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    return <p>Loading...</p>; // Show loading state
  }

  

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className='w-fit justify-center m-auto h-fit text-center items-center space-y-2'>
            <h1 className='text-2xl font-semibold'>Welcome to the Admin Dashboard</h1>
            <h2 className='text-xl font-normal'>Products</h2>
          </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboard;