import Hero from '@/components/Hero';
import SpecsTable from '@/components/SpecsTable';
import PinoutDiagram from '@/components/PinoutDiagram';
import WiringGuide from '@/components/WiringGuide';
import Sidebar from '@/components/Sidebar';
import FirmwareGuide from '@/components/FirmwareGuide';
import FAQ from '@/components/FAQ';
import ThreeScene from '@/components/ThreeScene';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ThreeScene />
      <div className="relative z-10">
        <Hero />
        <div className="container" style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
          <Sidebar />
          <div style={{ flex: 1, paddingLeft: '250px' }}> {/* Offset for Sidebar */}
            <SpecsTable />
            <PinoutDiagram />
            <WiringGuide />
            <FirmwareGuide />
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  );
}
