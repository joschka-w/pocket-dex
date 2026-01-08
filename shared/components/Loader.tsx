import { cn } from '../utils/cn';

interface Props {
  className?: string;
}
function Loader({ className }: Props) {
  return (
    <div
      className={cn(
        'border-primary aspect-square w-12 animate-[loader-1_800ms_infinite_linear_alternate,loader-2_1600ms_infinite_linear] rounded-full border-8',
        className,
      )}
    />
  );
}

export default Loader;
