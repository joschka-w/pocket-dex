'use client';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function Error({ error }: Props) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;
