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

---

## 📚 Flight Controller Documentation

This repository includes **comprehensive technical documentation** for the ELCO F7 Ultimate flight controller in the `/docs` folder.

### Documentation Structure

```
docs/
├── README.md                      # Main documentation index
├── hardware-specifications.md     # Complete hardware specs
├── system-architecture.md         # System design & block diagrams  
├── pinout-reference.md           # Detailed pinout guide
├── wiring-guide.md               # Wiring examples & integration
├── firmware-setup.md             # Betaflight/INAV/ArduPilot setup
├── first-time-setup.md           # Calibration & first flight
├── ground-station.md             # Mission planning (GPS/autonomous)
├── troubleshooting.md            # FAQ & problem solving
├── safety-regulatory.md          # Safety warnings & compliance
└── appendix.md                   # Glossary, BOM, references
```

### Quick Links

- **[Start Here: Documentation Index](docs/README.md)**
- [Hardware Specifications](docs/hardware-specifications.md)
- [Wiring Guide](docs/wiring-guide.md)
- [Firmware Setup](docs/firmware-setup.md)
- [Troubleshooting](docs/troubleshooting.md)

### Documentation Features

✅ **Complete Coverage:**
- Title, versioning, and revision history
- Hardware specifications (mechanical & electrical)
- Annotated pinouts and connectivity diagrams
- Wiring examples with reference tables
- Firmware setup (Betaflight, INAV, ArduPilot, PX4)
- Sensor calibration procedures
- Ground station & mission planning
- Comprehensive troubleshooting & FAQ
- Safety warnings and regulatory compliance
- Appendix with glossary and references

✅ **Best Practices:**
- Structured headings and clear instructions
- Step-by-step setup workflows
- Hardware compatibility references
- Placeholders for images/diagrams
- Tables, examples, and callouts
- Following PX4/ArduPilot documentation standards

### For Contributors

Found an error or want to improve the documentation?
1. Fork this repository
2. Make your changes in the `/docs` folder
3. Submit a pull request

---

# fc-documentation
