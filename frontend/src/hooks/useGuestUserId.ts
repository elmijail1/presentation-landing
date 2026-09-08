import {
  getGuestUserIdLocalStorage,
  setGuestUserIdLocalStorage,
} from "../scripts/guestUser";
import { useCallback, useState } from "react";

export function useGuestUserId() {
  const [guestUserIdState, setGuestUserIdState] = useState<string | null>(() =>
    getGuestUserIdLocalStorage(),
  );
  const setGuestUserIdStateAndStorage = useCallback((id: string) => {
    setGuestUserIdLocalStorage(id);
    setGuestUserIdState(id);
  }, []);
  return [guestUserIdState, setGuestUserIdStateAndStorage] as const;
}
