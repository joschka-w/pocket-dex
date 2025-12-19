// TODO - Add privacy notice
// "To enable features like liking decks without requiring logins, the app uses temporary
// browser session storage. No personal data is collected or stored permanently."

export function getSessionId() {
  const sessionId = sessionStorage.getItem('sessionId') || crypto.randomUUID();

  sessionStorage.setItem('sessionId', sessionId);

  return sessionId;
}
