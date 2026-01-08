import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex h-fit flex-col items-center justify-center py-20">
      <p className="text-8xl">404</p>
      <h3 className="mb-7 text-2xl font-semibold">Page not found</h3>
      <p className="text-text-muted max-w-[50ch] text-center text-lg">
        {
          "The page you're looking for doesn't exist. Go back, or return to the home page by clicking the button below."
        }
      </p>
      <Link
        href={'/'}
        className="bg-bg-1 inset-ring-bg-2 hover:bg-bg-2 mt-7 cursor-pointer rounded-xl px-4 py-2 inset-ring-1 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;
