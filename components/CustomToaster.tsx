'use client';

import { resolveValue, Toaster, ToastIcon } from 'react-hot-toast';

function CustomToaster() {
  return (
    <Toaster position="bottom-right" gutter={8} toastOptions={{ duration: 4000 }}>
      {toast => (
        <div className="bg-bg-2 flex gap-3 items-center max-w-sm px-4 py-4 rounded-xl shadow-md shadow-black/25">
          <ToastIcon toast={toast} />
          {resolveValue(toast.message, toast)}
        </div>
      )}
    </Toaster>
  );
}

export default CustomToaster;
