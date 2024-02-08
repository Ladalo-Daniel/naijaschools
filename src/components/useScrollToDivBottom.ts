import { useRef } from 'react';

const useScrollToBottomDiv = () => {
  const divRef = useRef<HTMLDivElement | null>(null)

    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }

  return divRef
}

export default useScrollToBottomDiv
