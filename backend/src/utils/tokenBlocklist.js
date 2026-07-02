/**
 * In-memory blocklist of logged-out JWTs. Because the tokens are stateless,
 * an explicit logout can't "delete" a token — instead we remember it until its
 * natural expiry and reject it in the meantime. This is what lets a logout on
 * one origin (landing) also end the session on the other (dashboard app):
 * both validate against the same backend, which now refuses the token.
 *
 * Single backend instance (ecosystem.config uses instances: 1), so a module-level
 * Map is sufficient. Entries self-expire, so memory stays bounded by logout volume.
 */
const blocked = new Map(); // token -> expiryMs

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000; // matches JWT expiresIn '7d'

function add(token, expiryMs) {
  blocked.set(token, expiryMs || Date.now() + DEFAULT_TTL_MS);
}

function has(token) {
  const expiry = blocked.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    blocked.delete(token); // prune: it would fail the exp check anyway
    return false;
  }
  return true;
}

module.exports = { add, has };
