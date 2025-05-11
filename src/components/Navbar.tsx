
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserStore } from '@/stores/userStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useUserStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">Rent-a-Companion</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className={`hover:text-primary transition-colors ${location.pathname === '/browse' ? 'text-primary font-medium' : ''}`}>
            Browse
          </Link>
          {user?.role === 'companion' && (
            <Link to="/bookings" className={`hover:text-primary transition-colors ${location.pathname === '/bookings' ? 'text-primary font-medium' : ''}`}>
              My Bookings
            </Link>
          )}
          <Link to="/messages" className={`hover:text-primary transition-colors ${location.pathname === '/messages' ? 'text-primary font-medium' : ''}`}>
            Messages
          </Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || ''} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 hover:text-primary"
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white border-t">
          <div className="flex flex-col space-y-3">
            <Link to="/browse" className="py-2 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Browse
            </Link>
            {user?.role === 'companion' && (
              <Link to="/bookings" className="py-2 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                My Bookings
              </Link>
            )}
            <Link to="/messages" className="py-2 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Messages
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="py-2 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button className="py-2 text-left text-red-500 hover:text-red-700" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="py-2 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
