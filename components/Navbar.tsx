import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        ELCO <span>AVIONICS</span>
      </div>
      <div className="nav-links">
        <Link href="#fleet">Fleet</Link>
        <Link href="#timeline">Timeline</Link>
        <Link href="#specs">Specs</Link>
        <Link href="#docs">Docs</Link>
      </div>
    </nav>
  );
}
