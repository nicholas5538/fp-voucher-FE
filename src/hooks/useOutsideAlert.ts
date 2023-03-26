import {
  useEffect,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';

function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  setState: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setState(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideAlerter;
