import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/logo.svg';
import { Link as TLink, NAV_LINKS, LEGAL_LINKS, OTHER_LINKS } from '@/shared/constants/navigation';
import Seperator from '../ui/Seperator';

function Footer() {
  return (
    <footer className="bg-bg-1 mt-15 w-full">
      <div className="max-w-mw m-auto">
        <div className="flex justify-between py-15">
          <div>
            <Link href={'/'} className="mb-7 flex items-center gap-4 text-3xl font-semibold">
              <Image src={logo} alt="PocketDex Logo" className="w-16" />
              PocketDex
            </Link>

            <p className="text-text-muted max-w-[55ch] text-xs leading-loose text-balance">
              PocketDex is an unofficial fan project and is not endorsed by, affiliated with, or
              sponsored by The Pokémon Company, Nintendo, Game Freak, Creatures Inc., or DeNA Co.,
              Ltd.
            </p>
          </div>

          <div className="grid w-1/2 grid-cols-3 gap-2">
            <LinkList links={NAV_LINKS} title="Navigate" />
            <LinkList links={LEGAL_LINKS} title="Legal" />
            <LinkList links={OTHER_LINKS} title="Links" />
          </div>
        </div>

        <Seperator />

        <p className="text-text-muted py-7 text-center text-xs">
          All Pokémon images, names, characters, and related marks are trademarks and copyright of
          The Pokémon Company, Nintendo, Game Freak, Creatures Inc., and DeNA Co., Ltd.
        </p>
      </div>
    </footer>
  );
}

interface LinkListProps {
  links: TLink[];
  title: string;
  className?: string;
}

function LinkList({ links, title, className }: LinkListProps) {
  return (
    <div className={className}>
      <h5 className="mb-3 font-bold">{title}</h5>

      <ul className="flex flex-col gap-2">
        {links.map(({ name, slug, isExternal }) => (
          <li key={`footer-link-${slug}`}>
            <Link
              href={`${isExternal ? '' : '/'}${slug}`}
              className="text-text-muted hover:text-text text-sm font-medium transition-colors duration-100"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
