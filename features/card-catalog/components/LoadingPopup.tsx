import Loader from '@/shared/components/Loader';
import { cn } from '@/shared/utils/cn';

interface Props {
  className?: string;
}

function LoadingPopup({ className }: Props) {
  return (
    <div
      id="loader"
      className={cn(
        'z-10 flex flex-col items-center gap-2 rounded-lg bg-black/50 px-8 py-4 text-xl font-medium shadow-md shadow-black/30 backdrop-blur-xs',
        className,
      )}
    >
      Updating...
      <Loader />
    </div>
  );
}

export default LoadingPopup;
