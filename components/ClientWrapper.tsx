'use client';

import { useState } from 'react';
import Navbar from '@/components/nav/Navbar';
import LoginModal from '@/components/auth/LoginModal';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />
      {children}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
