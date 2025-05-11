
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/stores/userStore';
import { useToast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUserStore();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - in a real app, this would be an API call
    // For demo purposes, we'll create a mock user
    if (email && password) {
      const mockUser = {
        id: '123456',
        name: 'Demo User',
        email,
        role: Math.random() > 0.5 ? 'renter' : 'companion' as const,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        interests: ['Travel', 'Movies', 'Food'] as string[],
        bio: 'This is a demo user for the Rent-a-Companion app.',
        hourlyRate: 25,
      };

      setUser(mockUser);
      
      toast({
        title: "Login successful!",
        description: "Welcome back to Rent-a-Companion.",
      });
      
      navigate('/browse');
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Log in to your Rent-a-Companion account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-right">
                  <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate('/forgot-password')}>
                    Forgot password?
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account yet?{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/register')}>
                Sign up
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
