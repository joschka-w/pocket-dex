import Loader from '@/components/common/Loader';
import { cn } from '@/lib/utils/cn';

interface Props {
  className?: string;
}

function LoadingPopup({ className }: Props) {
  return (
    <div
      id="loader"
      className={cn(
        'flex flex-col py-4 px-8 items-center gap-2 text-xl font-medium rounded-lg z-10 bg-black/50 shadow-md shadow-black/30 backdrop-blur-xs',
        className
      )}
    >
      Updating...
      <Loader />
    </div>
  );
}

export default LoadingPopup;
