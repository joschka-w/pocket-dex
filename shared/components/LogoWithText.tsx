import Image from 'next/image';
import logo from '@/assets/logo.svg';
import Link from 'next/link';

interface Props {
  isLink?: boolean;
}

function LogoWithText({ isLink = false }: Props) {
  const inner = (
    <>
      <div className="relative h-full w-11">
        <Image src={logo} fill alt="Logo" priority />
      </div>
      <span className="text-lg font-bold">PocketDex</span>
    </>
  );

  if (isLink)
    return (
      <Link href={'/'} className="flex h-11 items-center gap-3 select-none">
        {inner}
      </Link>
    );

  return <div className="flex h-11 items-center gap-3 select-none">{inner}</div>;
}

export default LogoWithText;
