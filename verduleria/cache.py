"""
Caché en memoria para datos que cambian poco.
TTL (Time To Live) configurable para cada tipo de dato.
"""

import time
from typing import Dict, Any, Optional


class MemoryCache:
    """Caché simple en memoria con soporte para TTL."""

    def __init__(self):
        self._cache: Dict[str, Any] = {}
        self._timestamps: Dict[str, float] = {}
        self._ttls: Dict[str, int] = {}  # TTL en segundos

    def set(self, key: str, value: Any, ttl_seconds: int = 3600):
        """Guardar valor en caché con TTL (default 1 hora)."""
        self._cache[key] = value
        self._timestamps[key] = time.time()
        self._ttls[key] = ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        """Obtener valor del caché si existe y no ha expirado."""
        if key not in self._cache:
            return None

        # Verificar si ha expirado
        age = time.time() - self._timestamps[key]
        ttl = self._ttls.get(key, 3600)

        if age > ttl:
            # Expiró, limpiar
            self.delete(key)
            return None

        return self._cache[key]

    def delete(self, key: str):
        """Eliminar valor del caché."""
        self._cache.pop(key, None)
        self._timestamps.pop(key, None)
        self._ttls.pop(key, None)

    def clear(self):
        """Limpiar todo el caché."""
        self._cache.clear()
        self._timestamps.clear()
        self._ttls.clear()

    def exists(self, key: str) -> bool:
        """Verificar si una clave existe y no ha expirado."""
        return self.get(key) is not None


# Instancia global de caché
_cache_instance = MemoryCache()


def get_grouped_products(db_callback, ttl_seconds: int = 3600) -> Dict[str, Any]:
    """
    Obtener productos agrupados por categoría.
    Usa caché en memoria con TTL de 1 hora por defecto.

    Args:
        db_callback: Función que retorna los productos si no están en caché
        ttl_seconds: Time To Live en segundos

    Returns:
        Dict con productos agrupados por categoría
    """
    cache_key = "grouped_products"

    # Intentar obtener del caché
    cached = _cache_instance.get(cache_key)
    if cached is not None:
        return cached

    # No está en caché, obtener de la BD
    products = db_callback()

    # Guardar en caché
    _cache_instance.set(cache_key, products, ttl_seconds)

    return products


def invalidate_products_cache():
    """Invalidar caché de productos (llamar cuando se actualiza un producto)."""
    _cache_instance.delete("grouped_products")


def get_cache():
    """Obtener instancia global de caché."""
    return _cache_instance
