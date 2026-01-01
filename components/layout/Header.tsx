import Navbar from './NavBar';
import LogoWithText from '../common/LogoWithText';
import Avatar from '../features/avatar/Avatar';

function Header() {
  return (
    <header className="h-header-height bg-bg-1 sticky top-0 z-50 flex w-full items-center justify-center shadow-md">
      <div className="max-w-mw flex h-full w-full items-center gap-16">
        <LogoWithText isLink />

        <Navbar />

        {/* <LoginLogoutButton className="ml-auto" /> */}
        <Avatar />
      </div>
    </header>
  );
}

export default Header;
