import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Premium Petrol Radar',
    short_name: 'PetrolRadar',
    description: 'Find High-Octane Premium Fuel in India',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617', // slate-950
    theme_color: '#4f46e5', // indigo-600
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon', // Next.js dynamic icon.tsx route generates a PNG
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
