import Image from 'next/image';
import Link from 'next/link';
import Navbar from './NavBar';

import logo from '@/assets/logo.svg';

function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center bg-bg-1 shadow-md">
      <div className="flex h-full w-full max-w-mw items-center gap-16">
        <Link href={'/'} className="flex h-full select-none items-center gap-3">
          <div className="relative h-full w-11">
            <Image src={logo} fill alt="Logo" />
          </div>
          <span className="text-lg font-bold">PocketDex</span>
        </Link>

        <Navbar />
      </div>
    </header>
  );
}

export default Header;
