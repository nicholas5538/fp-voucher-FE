import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  setState: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setState(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref]);
}

export default useOutsideAlerter;
