This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 3D Drone Model

This project features an interactive 3D drone with scroll-based camera animations. As you scroll down, the camera smoothly moves toward and inside the drone.

### Adding Your Own Drone Model

To replace the placeholder with your own drone 3D model:

1. Get a drone model in GLTF or GLB format from:
   - [Sketchfab](https://sketchfab.com) - Search for "drone" and download free models
   - [Poly Pizza](https://poly.pizza) - Free 3D models
   - [CGTrader](https://www.cgtrader.com) - Free and paid models

2. Place your model file in `public/models/drone.gltf` (or `drone.glb`)

3. If using GLB format, update `components/DroneModel.tsx` line 10:
   ```tsx
   drone = useGLTF('/models/drone.glb');
   ```

The site will automatically load your custom model. If no model is found, it displays a fallback geometric drone.

# fc-documentation
