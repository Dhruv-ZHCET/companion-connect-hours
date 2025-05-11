
export interface Companion {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  reviews: number;
  avatar: string;
  interests: string[];
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  languages: string[];
}

export const mockCompanions: Companion[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    age: 28,
    location: 'New York, NY',
    bio: 'Friendly and outgoing art enthusiast. I love exploring galleries, trying new restaurants, and having meaningful conversations. I can be a great plus-one for any social event or just provide companionship for a day in the city.',
    hourlyRate: 35,
    rating: 4.8,
    reviews: 42,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    interests: ['Art', 'Dining', 'Hiking', 'Photography'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    languages: ['English', 'French'],
  },
  {
    id: '2',
    name: 'David Chen',
    age: 32,
    location: 'San Francisco, CA',
    bio: 'Tech professional by day, adventure seeker by night. I'm passionate about outdoor activities, board games, and trying out local breweries. I'm a good listener and always bring positive energy.',
    hourlyRate: 40,
    rating: 4.9,
    reviews: 37,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    interests: ['Hiking', 'Board Games', 'Technology', 'Craft Beer'],
    availability: {
      monday: false,
      tuesday: false,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    languages: ['English', 'Mandarin'],
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    age: 26,
    location: 'Miami, FL',
    bio: 'Dance instructor with a passion for music and culture. I love showing people around the city, going to concerts, and enjoying the beach. I can teach you some salsa moves too!',
    hourlyRate: 30,
    rating: 4.7,
    reviews: 29,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    interests: ['Dancing', 'Music', 'Beach', 'Cooking'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: true,
    },
    languages: ['English', 'Spanish'],
  },
  {
    id: '4',
    name: 'James Wilson',
    age: 35,
    location: 'Chicago, IL',
    bio: 'Former tour guide with extensive knowledge of architecture and city history. I enjoy deep conversations about books, films, and philosophy. Great company for museums, jazz clubs, or just a walk by the lake.',
    hourlyRate: 45,
    rating: 4.9,
    reviews: 56,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    interests: ['Architecture', 'Jazz', 'Literature', 'Philosophy'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    languages: ['English', 'Italian'],
  },
  {
    id: '5',
    name: 'Aisha Patel',
    age: 29,
    location: 'Boston, MA',
    bio: 'Medical student with a love for fitness and wellness. I'm energetic and enjoy running, yoga, and trying healthy restaurants. I'm also a movie buff and enjoy discussing film theory.',
    hourlyRate: 35,
    rating: 4.6,
    reviews: 18,
    avatar: 'https://randomuser.me/api/portraits/women/37.jpg',
    interests: ['Fitness', 'Movies', 'Health Food', 'Yoga'],
    availability: {
      monday: false,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: false,
      saturday: true,
      sunday: true,
    },
    languages: ['English', 'Hindi'],
  },
  {
    id: '6',
    name: 'Michael Thompson',
    age: 41,
    location: 'Seattle, WA',
    bio: 'Musician and coffee enthusiast. I know all the best cafés in town and love discussing music theory, vinyl collections, and the local band scene. I'm also an avid hiker and know the best trails.',
    hourlyRate: 38,
    rating: 4.7,
    reviews: 31,
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    interests: ['Music', 'Coffee', 'Hiking', 'Photography'],
    availability: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: true,
      sunday: false,
    },
    languages: ['English'],
  },
  {
    id: '7',
    name: 'Olivia Kim',
    age: 27,
    location: 'Los Angeles, CA',
    bio: 'Fashion stylist and art director. I love attending gallery openings, fashion events, and finding hidden gems in the city. I'm knowledgeable about photography and can help you take great Instagram photos!',
    hourlyRate: 50,
    rating: 4.8,
    reviews: 45,
    avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
    interests: ['Fashion', 'Photography', 'Art', 'Social Media'],
    availability: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    languages: ['English', 'Korean'],
  },
  {
    id: '8',
    name: 'Robert Davis',
    age: 38,
    location: 'Austin, TX',
    bio: 'Music producer and barbecue aficionado. I know all the best live music venues and food trucks in town. Great companion for concerts, food tours, or just hanging out and talking about vinyl records.',
    hourlyRate: 35,
    rating: 4.9,
    reviews: 27,
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    interests: ['Live Music', 'Food', 'Vinyl Records', 'Festivals'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: false,
      friday: true,
      saturday: true,
      sunday: true,
    },
    languages: ['English', 'Spanish'],
  },
];
