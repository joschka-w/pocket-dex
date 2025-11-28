import { NAV_LINKS } from '@/lib/constants/navigation';
import NavLink from './NavLink';

function Navbar() {
  return (
    <nav className="flex gap-10">
      {NAV_LINKS.map(({ name, slug }) => (
        <NavLink key={slug} slug={slug}>
          {name}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
