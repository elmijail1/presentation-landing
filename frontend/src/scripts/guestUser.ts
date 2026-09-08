const GUEST_USER_ID_KEY = "guest-user-id";

export function getGuestUserId(): string | null {
  try {
    return localStorage.getItem(GUEST_USER_ID_KEY);
  } catch {
    return null;
  }
}

export function setGuestUserId(id: string): void {
  try {
    localStorage.setItem(GUEST_USER_ID_KEY, id);
  } catch {
    console.warn("Failed to persist the guest user ID");
  }
}
