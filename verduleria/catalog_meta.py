from __future__ import annotations

from verduleria.catalog_seed import CATALOG_SEED

DELIVERY_FEE = 5000

CATEGORY_CHOICES = [
    ('frutas', 'Frutas'),
    ('verduras', 'Verduras'),
    ('hierbas y complementos', 'Hierbas y Complementos'),
    ('legumbres y otros', 'Legumbres y otros'),
]

CATEGORY_LABELS = dict(CATEGORY_CHOICES)
CATEGORY_ORDER = {key: index for index, (key, _) in enumerate(CATEGORY_CHOICES)}
CATEGORY_BY_NAME = {' '.join(item['name'].split()): item['category'] for item in CATALOG_SEED}


def normalize_name(value: str) -> str:
    return ' '.join((value or '').split())


def category_label(value: str) -> str:
    normalized = (value or '').strip().lower()
    return CATEGORY_LABELS.get(normalized, (value or '').title())


def category_sort_key(value: str) -> tuple[int, str]:
    normalized = (value or '').strip().lower()
    return CATEGORY_ORDER.get(normalized, len(CATEGORY_ORDER)), normalized


def display_category_for(name: str, fallback: str) -> str:
    normalized_name = normalize_name(name)
    normalized_fallback = (fallback or '').strip().lower() or 'verduras'
    return CATEGORY_BY_NAME.get(normalized_name, normalized_fallback)
