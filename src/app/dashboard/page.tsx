"use client"
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession hook
import PantryDashboard from "@/components/Pantry/Dashboard";
import ManagerDashboardPage from '@/components/Dashboard';
import DeliveryDashboard from '@/components/Delivery/DeliveryDashboard';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, status } = useSession(); // Access session data and loading status
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check if session exists and handle redirection once it's resolved
  useEffect(() => {
    if (status === "loading") return; // Skip during loading

    if (!session && !isRedirecting) {
      setIsRedirecting(true);
      router.push('/'); // Redirect to login
    }
  }, [session, status, router, isRedirecting]);

  // Handle rendering based on role when session is available
  if (status === "loading" || isRedirecting) {
    return <div>Loading...</div>; // Display loading while session is loading or redirecting
  }

  // Render dashboards based on user role
  return (
    <div>
      {session?.user?.role === "manager" && <ManagerDashboardPage />}
      {session?.user?.role === "pantry" && <PantryDashboard />}
      {session?.user?.role === "delivery" && <DeliveryDashboard />}
      {/* You can add other conditions based on roles if needed */}
    </div>
  );
};

export default Page;
