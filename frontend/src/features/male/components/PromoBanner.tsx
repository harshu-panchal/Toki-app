interface PromoBannerProps {
  title: string;
  badge?: string;
  imageUrl?: string;
}

export const PromoBanner = ({
  title,
  badge = 'Limited Offer',
  imageUrl,
}: PromoBannerProps) => {
  const defaultImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6PWE1jNxfyMIbPh97ATlIV1viSolbj-GNFPFOAp7c1CS6Pz8wqZ6ckvNNeXAd49ju6KO4H7lqoxQiDi2zUIhk_WMCmlXQD8OVOAcAN-AOCL0xJSVUEwNjYZzaImsJW7uqdtcpHNV7W6nBkntmAA2gzo5zh0gvjZ-rPCEiu0AIWXm5OkS0crJ9yapByKamsFbLikBskdXgWRZ712FJcX4EVbW6lHSVzuIEKBqh4E4duw8Ir7-PPn8J4WJbv6qSzmEHhUBfW_OQrSc';

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg relative group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
      <img
        className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-700"
        src={imageUrl || defaultImage}
        alt="Promotional banner"
      />
      <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
        <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 uppercase tracking-wider">
          {badge}
        </div>
        <p className="text-white text-xl font-bold leading-tight shadow-sm">{title}</p>
      </div>
    </div>
  );
};

