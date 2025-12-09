import { MaterialSymbol } from '../types/material-symbol';

interface NearbyUser {
  id: string;
  avatar: string;
  name: string;
}

interface DiscoverNearbyCardProps {
  nearbyUsers: NearbyUser[];
  onExploreClick?: () => void;
}

export const DiscoverNearbyCard = ({ nearbyUsers, onExploreClick }: DiscoverNearbyCardProps) => {
  const displayedUsers = nearbyUsers.slice(0, 2);
  const remainingCount = nearbyUsers.length > 2 ? nearbyUsers.length - 2 : 0;

  return (
    <div className="p-4 mt-2">
      <div className="relative overflow-hidden rounded-xl bg-slate-900 shadow-md">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-60"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHuQ9thR_Q8bw5KyAKuHdBgTxbMQzbTaF9wxH_jdhvxRsseop7AcwAnK-nQYZsye0tERXB0Y0xnV3Hng--TGDar-5kWubelbU-uA6UT36YC2BZuytzzu8YJumnkKpvGxNJfykWfKsESfiA0gHWOYwWy5BmDnVxuUdi65_3Ue4DcdE4xCS6zpEQUJGpOQJl8w-3KNNf7wtaraImiLSW3sD3P7HWIjkKRrwtG6cKn-DFYG50e31fzGKD0ra-Ol3b0Zx6nqPtjHM-HlU")`
          }}
          aria-label="Blurred background image of a city map"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative flex items-center justify-between gap-4 p-5">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold text-white leading-tight">Discover Nearby</p>
              <p className="text-slate-300 text-sm font-normal leading-normal">
                Find people within 5km
              </p>
            </div>
            <button
              onClick={onExploreClick}
              className="flex w-fit items-center justify-center gap-2 rounded-full bg-primary py-2 pl-4 pr-3 text-sm font-bold text-slate-900 transition-all hover:bg-yellow-400 hover:shadow-lg active:scale-95 duration-200"
            >
              Explore
              <MaterialSymbol name="arrow_forward" size={18} />
            </button>
          </div>

          {/* Circular Avatars Stack */}
          <div className="flex flex-1 items-center justify-end -space-x-3 mr-2">
            {displayedUsers.map((user) => (
              <div
                key={user.id}
                className="h-10 w-10 rounded-full border-2 border-slate-900 bg-cover bg-center"
                style={{ backgroundImage: `url("${user.avatar}")` }}
                aria-label={`Portrait of ${user.name}`}
              />
            ))}
            {remainingCount > 0 && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-900 bg-slate-800 text-[10px] font-bold text-white">
                +{remainingCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

