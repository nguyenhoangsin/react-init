import { useEffect } from 'react';

const useBeforeUnload = (message: string) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (message) {
        e.preventDefault();
        (e as any).returnValue = message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [message]);
};

export default useBeforeUnload;

// Use hook custom `useBeforeUnload` in func component
// const [isFormDirty, setIsFormDirty] = useState(false);
// useBeforeUnload(isFormDirty ? 'Message' : '');
