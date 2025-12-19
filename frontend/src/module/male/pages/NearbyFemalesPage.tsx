import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../components/BottomNavigation';
import { useMaleNavigation } from '../hooks/useMaleNavigation';
import type { NearbyFemale, FilterType } from '../types/male.types';

// Mock data - replace with actual API calls
const recommendedProfiles: NearbyFemale[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 23,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNnKyZLNWCV7B-XwKgjd9-bbG9ZSq583oYGij7uKTYk2Ah_9nkpqgsGSDu-FUgux5QDiLCTw_y9JxTBhkZjWAOOReMhlK98A_84vIsKaxQ0IUzZqkJ7-wnAv67HRuUVltC2QQzOfbTk1-OdjqC7SWT4iG-MXs81ePZK3x1mYOHabRqp4eH7yIfiX3tH-YMXSs1uWS41vrxzPC8_MJHasLGiUWINfHYQ7KF2jfo0n_Yo6qBJKr_qMrOBUdimUVVJdY46GD7L0v-oL4',
    distance: '1.2 km',
    isOnline: true,
    occupation: 'Student',
    chatCost: 20,
  },
  {
    id: '2',
    name: 'Jessica',
    age: 25,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHxrviFMtsvG_Idvc-7NLJcibIA3HzpSimrSGtu5nkdVXQ0lR_v5vA3Ze5PcHiEZqXs444SJmue_gn-BAJpC_N4OBtiZ76IDvr9bLR_SxT5dQNp7j5WAWAzR9Cc6wdHAOpqLvxURxJbRcG1oN1Y1usF6uro9rSV6FLFxuNnpI_KIDdXzO8GH9BtmEm-Da4mrHV39aDrH-gGMTms5x6GJrf9pvOpfKnux5C1cD8_KgfRomNHp0HOgf-8TefyOTLXglCq3P1RsbOOf8',
    distance: '3.5 km',
    isOnline: false,
    occupation: 'Designer',
    chatCost: 20,
  },
  {
    id: '3',
    name: 'Emily',
    age: 21,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMwDNlS8xIMG2GPDOruau0I96EJW8UAfXypa6c3-bkakWGNwuNHv4bT_JxAS2tQQbwxDbRjkJCejmcZYfsqqtKJ-7OeHLwq5E9n5xOPyVwVLwv6bLTSaWBddBnCfSb85sZZW5ciF9ASv_TmzTFU3HcRlJPBSmBmvslJ_3dhEuuYLb5gfEYKw8ahTEUs9Nr49VBtnu-s1Y--7W9Kv1e7XebTvnXhrZ42e1cYEMDxGbgmAHw0fTnNAuBciEyspzTK1qCjMHkoxWkXPw',
    distance: '500 m',
    isOnline: true,
    bio: 'New here 👋',
    chatCost: 20,
  },
  {
    id: '4',
    name: 'Chloe',
    age: 24,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2mvDb9KljJsn2Es0tMin1X8x7oWZzzM3oSqicuGZv59l_xX94LRX0yvfZVhu_71b1kQMWDjj1vAMUId07GeEgPrRa5dVad2KZVCEmT750i0TFrgMCxSmG1irjUPlGTnq4UJQfCwJ2e33JcF1mxTovGHbxGYH9pMtpzypp4kcuNNapws-eKB5NidDoGSmpYJO3-tQ9hO0iTXnTq-GCL0qvtkWkQgkJAPwl7fwYiCH_RoXSRDVToXhkpx8YMuZo6YVcUzl7EKDGW0M',
    distance: '5 km',
    isOnline: false,
    occupation: 'Model',
    chatCost: 20,
  },
  {
    id: '5',
    name: 'Ava',
    age: 22,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJS0wNq7_DHk8VHFnFL9uBHN9_dgt046SyWzs9k_WQecLMOjUgs0OxGn5yAVpXGJ0trtwW2MkIXPiZcD3T9KtBy7uFn1ckM1xSYEg-85-HFtjhrUO3mJVkgOToIIDYn9TJ4gn9OBB1qSAqgVwuZeKvAcTXV-CIAm5MAIGjhy2TlmeWLnc-ew1SijQ6xHe5uTolQwSSJ0NoJDt6IsYsLQpvfql_VV4DiR0WsPreKJS-mkw9Z2-VygM5pbGasq81ij_Otu1K-sFC33E',
    distance: '8 km',
    isOnline: true,
    bio: 'Looking for friends',
    chatCost: 20,
  },
  {
    id: '6',
    name: 'Mia',
    age: 20,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpxGBSL7DN3RZTDICRQvq0bH7dVoCLYq63lu3YCKiKDUE8PJLHpY_WX1U274YFz9O6Duw9sn7jGmiuIJMUK3F_c8li9Fo4dXiPW3-p6iGcIrw3O6qX79XjjjJvj6PQ1Y8294LjVroByfHmKpyhfpskyXTL1Rk_ivSgEuwxMWxy2jRwsyairF-hkeYGQmdclif4z8Jzbgp7V8jRZYnrWGWdGXnxQWkJPf2DXWpR1XeD5jWTLGeydgJcOpqlfrdQch5-ee8S5FsLkZE',
    distance: '12 km',
    isOnline: false,
    occupation: 'Traveler',
    chatCost: 20,
  },
  {
    id: '7',
    name: 'Ananya',
    age: 23,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '6.2 km',
    isOnline: true,
    bio: 'Foodie & runner',
    chatCost: 20,
  },
  {
    id: '8',
    name: 'Shreya',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '7.5 km',
    isOnline: true,
    occupation: 'Engineer',
    chatCost: 20,
  },
];

const nearbyProfiles: NearbyFemale[] = [
  {
    id: 'n1',
    name: 'Emily',
    age: 21,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '500 m',
    isOnline: true,
    bio: 'New here 👋',
    chatCost: 20,
  },
  {
    id: 'n2',
    name: 'Priya',
    age: 20,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '1.2 km',
    isOnline: true,
    occupation: 'Student',
    chatCost: 20,
  },
  {
    id: 'n3',
    name: 'Chloe',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '2.5 km',
    isOnline: false,
    occupation: 'Model',
    chatCost: 20,
  },
  {
    id: 'n4',
    name: 'Isha',
    age: 22,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '3.1 km',
    isOnline: true,
    bio: 'Coffee lover ☕',
    chatCost: 20,
  },
  {
    id: 'n5',
    name: 'Riya',
    age: 23,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '4 km',
    isOnline: false,
    occupation: 'Photographer',
    chatCost: 20,
  },
  {
    id: 'n6',
    name: 'Sana',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '4.8 km',
    isOnline: true,
    occupation: 'Content Creator',
    chatCost: 20,
  },
  {
    id: 'n7',
    name: 'Diya',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '5.1 km',
    isOnline: false,
    bio: 'Yoga & books',
    chatCost: 20,
  },
  {
    id: 'n8',
    name: 'Zara',
    age: 22,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '5.9 km',
    isOnline: true,
    occupation: 'Student',
    chatCost: 20,
  },
];

const newProfiles: NearbyFemale[] = [
  {
    id: 'new1',
    name: 'Meera',
    age: 22,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '3 km',
    isOnline: true,
    bio: 'Just joined! ✨',
    chatCost: 20,
  },
  {
    id: 'new2',
    name: 'Aisha',
    age: 23,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '4 km',
    isOnline: false,
    occupation: 'Artist',
    chatCost: 20,
  },
  {
    id: 'new3',
    name: 'Jia',
    age: 21,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '2.2 km',
    isOnline: true,
    bio: 'Explorer | Reader',
    chatCost: 20,
  },
  {
    id: 'new4',
    name: 'Mitali',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '3.8 km',
    isOnline: true,
    occupation: 'Designer',
    chatCost: 20,
  },
  {
    id: 'new5',
    name: 'Tara',
    age: 22,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '2.9 km',
    isOnline: false,
    bio: 'Coffee + art',
    chatCost: 20,
  },
  {
    id: 'new6',
    name: 'Kritika',
    age: 23,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '3.3 km',
    isOnline: true,
    occupation: 'Analyst',
    chatCost: 20,
  },
];

const hotProfiles: NearbyFemale[] = [
  {
    id: 'hot1',
    name: 'Nandni',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '1.3 km',
    isOnline: true,
    occupation: 'VIP',
    chatCost: 20,
  },
  {
    id: 'hot2',
    name: 'Nancy',
    age: 21,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '2 km',
    isOnline: true,
    occupation: 'VIP',
    chatCost: 20,
  },
  {
    id: 'hot3',
    name: 'Pooja',
    age: 22,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '2.8 km',
    isOnline: true,
    bio: 'Verified ⭐',
    chatCost: 20,
  },
  {
    id: 'hot4',
    name: 'Anu',
    age: 23,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '3.2 km',
    isOnline: false,
    occupation: 'Model',
    chatCost: 20,
  },
  {
    id: 'hot5',
    name: 'Avni',
    age: 24,
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80',
    distance: '3.9 km',
    isOnline: true,
    occupation: 'VIP',
    chatCost: 20,
  },
  {
    id: 'hot6',
    name: 'Ritu',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    distance: '4.1 km',
    isOnline: true,
    bio: 'Top picks today',
    chatCost: 20,
  },
];

export const NearbyFemalesPage = () => {
  const navigate = useNavigate();
  const { navigationItems, handleNavigationClick } = useMaleNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredProfiles = useMemo(() => {
    switch (activeFilter) {
      case 'nearby':
        return nearbyProfiles;
      case 'new':
        return newProfiles;
      case 'popular':
        return hotProfiles;
      case 'all':
      default:
        return recommendedProfiles;
    }
  }, [activeFilter]);

  const handleChatClick = (profileId: string) => {
    navigate(`/male/chat/${profileId}`);
  };

  const handleProfileClick = (profileId: string) => {
    navigate(`/male/profile/${profileId}`);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-primary selection:text-white flex flex-col">
      {/* Tabs / Filters */}
      <div className="sticky top-0 z-30 bg-gradient-to-r from-pink-50/95 via-rose-50/95 to-pink-50/95 dark:from-[#1a0f14]/95 dark:via-[#2d1a24]/95 dark:to-[#1a0f14]/95 backdrop-blur-md border-b border-pink-200/40 dark:border-pink-900/30 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[13px] font-semibold">
            <button
              className={`pb-1 ${activeFilter === 'all' ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setActiveFilter('all')}
            >
              Recommend
            </button>
            <button
              className={`pb-1 ${activeFilter === 'nearby' ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setActiveFilter('nearby' as FilterType)}
            >
              Nearby
            </button>
            <button
              className={`pb-1 ${activeFilter === 'new' ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setActiveFilter('new')}
            >
              New
            </button>
            <button
              className={`pb-1 ${activeFilter === 'popular' ? 'text-slate-900 dark:text-white border-b-2 border-primary' : 'text-slate-500 dark:text-slate-400'}`}
              onClick={() => setActiveFilter('popular')}
            >
              Hot
            </button>
          </div>
          <div className="w-12" />
        </div>
      </div>

      {/* Main Content: Profile List */}
      <main className="p-3 space-y-2 pb-24">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white dark:bg-[#2d1a24] rounded-2xl shadow-sm border border-pink-100/60 dark:border-pink-900/30 px-3 py-2.5 flex items-center gap-3"
          >
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-12 w-12 rounded-xl object-cover border border-pink-100 dark:border-pink-800"
                onClick={() => handleProfileClick(profile.id)}
              />
              {profile.isOnline && (
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-[#2d1a24]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold truncate">{profile.name}</p>
                {profile.occupation && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300">
                    {profile.occupation}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-300">
                <span>{profile.distance}</span>
                {profile.age && <span>• {profile.age} yrs</span>}
              </div>
              {profile.bio && (
                <p className="text-[11px] text-slate-500 dark:text-slate-300 mt-0.5 line-clamp-1">
                  {profile.bio}
                </p>
              )}
            </div>
            <button
              onClick={() => handleChatClick(profile.id)}
              className="px-3 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-primary to-rose-500 shadow-md active:scale-95 transition-transform"
            >
              Hi
            </button>
          </div>
        ))}

      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavigation items={navigationItems} onItemClick={handleNavigationClick} />
    </div>
  );
};

