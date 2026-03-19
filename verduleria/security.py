import base64
import hashlib
import hmac
import json
import secrets
import time


PBKDF2_ITERATIONS = 240000


def hash_password(password: str, salt_hex: str | None = None) -> tuple[str, str]:
    if not salt_hex:
        salt_hex = secrets.token_hex(16)
    salt = bytes.fromhex(salt_hex)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS)
    return salt_hex, digest.hex()


def verify_password(password: str, salt_hex: str, expected_hash: str) -> bool:
    _, computed = hash_password(password, salt_hex)
    return hmac.compare_digest(computed, expected_hash)


def make_session_token(secret_key: str, role: str, user_id: int, ttl_seconds: int = 604800) -> str:
    payload = {
        "role": role,
        "user_id": user_id,
        "exp": int(time.time()) + ttl_seconds,
    }
    encoded_payload = _encode_payload(payload)
    signature = _sign(secret_key, encoded_payload)
    return f"{encoded_payload}.{signature}"


def read_session_token(secret_key: str, token: str | None) -> dict | None:
    if not token or "." not in token:
        return None
    encoded_payload, signature = token.rsplit(".", 1)
    if not hmac.compare_digest(_sign(secret_key, encoded_payload), signature):
        return None
    payload = _decode_payload(encoded_payload)
    if not payload or payload.get("exp", 0) < int(time.time()):
        return None
    return payload


def _encode_payload(payload: dict) -> str:
    raw = json.dumps(payload, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("ascii").rstrip("=")


def _decode_payload(encoded_payload: str) -> dict | None:
    padding = "=" * (-len(encoded_payload) % 4)
    try:
        raw = base64.urlsafe_b64decode(encoded_payload + padding)
        return json.loads(raw.decode("utf-8"))
    except (ValueError, json.JSONDecodeError):
        return None


def _sign(secret_key: str, encoded_payload: str) -> str:
    return hmac.new(
        secret_key.encode("utf-8"),
        encoded_payload.encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
