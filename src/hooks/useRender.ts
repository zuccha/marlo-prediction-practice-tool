import { useCallback, useState } from "react";

const useRender = (): (() => void) => {
  const [, setRenderCount] = useState(0);
  return useCallback(() => setRenderCount((c) => c + 1), []);
};

export default useRender;
