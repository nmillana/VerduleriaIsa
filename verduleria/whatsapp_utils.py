"""
Utilidades para generar links de WhatsApp.
No requiere API externa, solo usa links de WhatsApp Web.
"""

from urllib.parse import quote


def generate_whatsapp_link(client_phone: str, order_id: int, pdf_url: str | None = None) -> str:
    """
    Generar un link de WhatsApp Web para enviar detalles de pedido.

    Args:
        client_phone: Número de teléfono en formato internacional (+56912345678)
        order_id: ID del pedido
        pdf_url: URL para descargar PDF (opcional)

    Returns:
        Link WhatsApp: https://wa.me/[NUMERO]?text=[MENSAJE CODIFICADO]

    Ejemplo:
        >>> generate_whatsapp_link("+56912345678", 123, "https://example.com/pdf/123")
        'https://wa.me/56912345678?text=Hola%20...'
    """
    # Limpiar formato del teléfono (remover + si está)
    phone = client_phone.lstrip('+')

    # Crear mensaje
    message = f"Hola! Tu pedido #{order_id} está listo.\n\n"
    message += f"Ver detalles: https://verduleriaisa.onrender.com/cliente/pedido/{order_id}"

    if pdf_url:
        message += f"\n\nDescargar PDF: {pdf_url}"

    # Codificar para URL
    encoded_message = quote(message)

    # Retornar link WhatsApp Web
    return f"https://wa.me/{phone}?text={encoded_message}"


def format_phone_international(phone: str, country_code: str = "56") -> str:
    """
    Formatear un número de teléfono al formato internacional.

    Args:
        phone: Número sin formato (912345678, +56912345678, etc.)
        country_code: Código de país (default "56" para Chile)

    Returns:
        Número en formato internacional (+56912345678)

    Ejemplo:
        >>> format_phone_international("912345678")
        '+56912345678'
        >>> format_phone_international("+56912345678")
        '+56912345678'
    """
    # Limpiar espacios y guiones
    clean_phone = phone.replace(" ", "").replace("-", "").strip()

    # Si ya tiene formato internacional, devolver
    if clean_phone.startswith("+"):
        return clean_phone

    # Si comienza con 9 (mobile Chile), agregar país y 9
    if clean_phone.startswith("9"):
        return f"+{country_code}{clean_phone}"

    # Si no, asumir que falta el prefijo del país
    if not clean_phone.startswith(country_code):
        return f"+{country_code}{clean_phone}"

    return f"+{clean_phone}"


def is_valid_phone(phone: str) -> bool:
    """
    Validar que un número de teléfono tenga formato válido.

    Args:
        phone: Número a validar

    Returns:
        True si parece un número válido
    """
    clean = phone.lstrip('+').replace(" ", "").replace("-", "").strip()

    # Debe tener entre 8 y 15 dígitos
    if not clean.isdigit():
        return False

    if len(clean) < 8 or len(clean) > 15:
        return False

    return True
