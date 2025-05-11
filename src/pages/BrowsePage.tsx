
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { mockCompanions, Companion } from '@/mocks/companions';

const BrowsePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [locationFilter, setLocationFilter] = useState<string | undefined>(undefined);
  const [interestFilter, setInterestFilter] = useState<string | undefined>(undefined);
  
  // Extract unique locations and interests for filters
  const uniqueLocations = Array.from(new Set(mockCompanions.map(c => c.location)));
  
  const allInterests = mockCompanions.flatMap(c => c.interests);
  const uniqueInterests = Array.from(new Set(allInterests));

  // Filter companions based on search and filters
  const filteredCompanions = mockCompanions.filter(companion => {
    const matchesSearch = 
      searchTerm === '' || 
      companion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companion.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      companion.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPrice = 
      companion.hourlyRate >= priceRange[0] && 
      companion.hourlyRate <= priceRange[1];
    
    const matchesLocation = 
      !locationFilter || 
      companion.location === locationFilter;
    
    const matchesInterest = 
      !interestFilter || 
      companion.interests.includes(interestFilter);
    
    return matchesSearch && matchesPrice && matchesLocation && matchesInterest;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 100]);
    setLocationFilter(undefined);
    setInterestFilter(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Companion</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  type="text"
                  placeholder="Search companions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price Range ($/hour)</label>
                <div className="flex items-center justify-between mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {uniqueLocations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Interests</label>
                <Select value={interestFilter} onValueChange={setInterestFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Interests</SelectItem>
                    {uniqueInterests.map(interest => (
                      <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={resetFilters} 
                className="w-full mt-4"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Companions List */}
        <div className="lg:col-span-3">
          {filteredCompanions.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No companions found</h3>
              <p className="text-gray-500">Try adjusting your filters to find more companions.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanions.map((companion) => (
                <Link 
                  key={companion.id} 
                  to={`/companion/${companion.id}`}
                  className="companion-card"
                >
                  <Card className="h-full hover:shadow-md transition-all">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={companion.avatar}
                          alt={companion.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                          ${companion.hourlyRate}/hr
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{companion.name}, {companion.age}</h3>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm">{companion.rating} ({companion.reviews})</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{companion.location}</p>
                      <p className="text-sm line-clamp-2 mb-3">{companion.bio}</p>
                      <div className="flex flex-wrap gap-1">
                        {companion.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                        {companion.interests.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{companion.interests.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">View Profile</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
