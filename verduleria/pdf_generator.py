"""
Generador de PDFs para pedidos y facturas.
Usa reportlab para crear PDFs en memoria.
"""

from datetime import datetime
from io import BytesIO
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

from verduleria.catalog_meta import DELIVERY_FEE


def generate_order_pdf(order: dict, logo_path: str | None = None) -> bytes:
    """
    Generar PDF de un pedido individual.

    Args:
        order: Dict con datos del pedido (id, client_name, items, totals, etc.)
        logo_path: Ruta al logo (opcional)

    Returns:
        Bytes del PDF
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        topMargin=0.5 * cm,
        bottomMargin=0.5 * cm,
        leftMargin=0.75 * cm,
        rightMargin=0.75 * cm,
    )

    story = []
    styles = getSampleStyleSheet()

    # Título
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        textColor=colors.black,
        spaceAfter=6,
        alignment=TA_CENTER,
    )
    story.append(Paragraph(f"PEDIDO #{order['id']}", title_style))
    story.append(Spacer(1, 6))

    # Datos del cliente
    client_data = f"""
    <b>Cliente:</b> {order.get('client_name', 'N/A')}<br/>
    <b>Email:</b> {order.get('client_email', 'N/A')}<br/>
    <b>Teléfono:</b> {order.get('client_phone', 'N/A')}<br/>
    <b>Dirección:</b> {order.get('client_address', 'N/A')}<br/>
    <b>Fecha:</b> {order.get('created_at', 'N/A')}
    """
    client_style = ParagraphStyle(
        'ClientInfo',
        parent=styles['Normal'],
        fontSize=8,
        leading=10,
    )
    story.append(Paragraph(client_data, client_style))
    story.append(Spacer(1, 8))

    # Tabla de items
    table_data = [
        ['Producto', 'Cant.', 'P.Est.', 'S.Est.', 'P.Real', 'S.Real']
    ]

    for item in order.get('items', []):
        product_name = item.get('product_name', '?')[:15]  # Truncar nombre largo
        quantity = float(item.get('quantity', 0))
        est_price = int(item.get('estimated_price', 0))
        est_total = int(item.get('estimated_total', 0))
        act_price = item.get('actual_price')
        act_total = item.get('actual_total')

        # Formatear moneda
        est_price_str = f"${est_price:,}"
        est_total_str = f"${est_total:,}"
        act_price_str = f"${act_price:,}" if act_price else "-"
        act_total_str = f"${act_total:,}" if act_total else "-"

        table_data.append([
            product_name,
            f"{quantity:.2f}".rstrip('0').rstrip('.'),
            est_price_str,
            est_total_str,
            act_price_str,
            act_total_str,
        ])

    # Crear tabla con estilos
    table = Table(table_data, colWidths=[2.5*cm, 1*cm, 1.3*cm, 1.3*cm, 1.3*cm, 1.3*cm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 4),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('FONTSIZE', (0, 1), (-1, -1), 7),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.lightgrey]),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),  # Alinear nombres a izquierda
        ('ALIGN', (1, 0), (-1, -1), 'RIGHT'),  # Alinear números a derecha
    ]))

    story.append(table)
    story.append(Spacer(1, 8))

    # Totales
    totals_style = ParagraphStyle(
        'Totals',
        parent=styles['Normal'],
        fontSize=9,
        alignment=TA_RIGHT,
    )

    subtotal_est = int(order.get('subtotal_estimated', 0))
    subtotal_act = order.get('subtotal_actual')
    display_subtotal = subtotal_act if subtotal_act is not None else subtotal_est

    totals_text = f"""
    <b>Subtotal Estimado:</b> ${subtotal_est:,}<br/>
    <b>Subtotal Real:</b> ${display_subtotal:,}<br/>
    <b>Despacho:</b> ${DELIVERY_FEE:,}<br/>
    <b>TOTAL:</b> ${display_subtotal + DELIVERY_FEE:,}
    """
    story.append(Paragraph(totals_text, totals_style))
    story.append(Spacer(1, 8))

    # Link a la app
    link_style = ParagraphStyle(
        'Link',
        parent=styles['Normal'],
        fontSize=7,
        textColor=colors.blue,
        alignment=TA_CENTER,
    )
    app_url = f"https://verduleriaisa.onrender.com/cliente/pedido/{order['id']}"
    story.append(Paragraph(
        f"<b>Ver detalles en la app:</b><br/>{app_url}",
        link_style
    ))

    # Generar PDF
    doc.build(story)
    return buffer.getvalue()


def generate_monthly_invoice_pdf(orders: list[dict], billing_type: str) -> bytes:
    """
    Generar PDF de factura mensual consolidada.

    Args:
        orders: Lista de órdenes del mes
        billing_type: 'semanal' o 'mensual'

    Returns:
        Bytes del PDF
    """
    if not orders:
        return b""

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        topMargin=0.5 * cm,
        bottomMargin=0.5 * cm,
        leftMargin=0.75 * cm,
        rightMargin=0.75 * cm,
    )

    story = []
    styles = getSampleStyleSheet()

    # Encabezado
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=14,
        textColor=colors.black,
        spaceAfter=6,
        alignment=TA_CENTER,
    )

    # Obtener mes/año del primer pedido
    first_order_date = datetime.fromisoformat(orders[0]['created_at'])
    month_year = first_order_date.strftime("%B %Y")

    story.append(Paragraph(f"FACTURA MENSUAL - {month_year.upper()}", title_style))
    story.append(Spacer(1, 6))

    # Datos del cliente (del primer pedido)
    client_name = orders[0].get('client_name', 'N/A')
    client_email = orders[0].get('client_email', 'N/A')
    client_phone = orders[0].get('client_phone', 'N/A')

    client_info = f"""
    <b>Cliente:</b> {client_name}<br/>
    <b>Email:</b> {client_email}<br/>
    <b>Teléfono:</b> {client_phone}<br/>
    <b>Tipo de Pago:</b> {billing_type.upper()}
    """
    client_style = ParagraphStyle(
        'ClientInfo',
        parent=styles['Normal'],
        fontSize=8,
        leading=10,
    )
    story.append(Paragraph(client_info, client_style))
    story.append(Spacer(1, 8))

    # Tabla de pedidos
    table_data = [
        ['Fecha', 'Productos', 'Subt. Est.', 'Subt. Real', 'Total']
    ]

    total_mes = 0
    for order in orders:
        order_date = datetime.fromisoformat(order['created_at']).strftime("%d-%m-%Y")

        # Listar productos del pedido
        products_str = ", ".join([
            f"{item['product_name']}"
            for item in order.get('items', [])
        ])
        if len(products_str) > 30:
            products_str = products_str[:27] + "..."

        subtotal_est = int(order.get('subtotal_estimated', 0))
        subtotal_act = order.get('subtotal_actual')
        display_subtotal = subtotal_act if subtotal_act is not None else subtotal_est
        order_total = display_subtotal + DELIVERY_FEE

        total_mes += order_total

        table_data.append([
            order_date,
            products_str,
            f"${subtotal_est:,}",
            f"${display_subtotal:,}",
            f"${order_total:,}",
        ])

    # Agregar total
    table_data.append([
        '',
        '<b>TOTAL DEL MES</b>',
        '',
        '',
        f'<b>${total_mes:,}</b>',
    ])

    # Crear tabla
    table = Table(table_data, colWidths=[1.5*cm, 4*cm, 1.5*cm, 1.5*cm, 1.5*cm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 7),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 4),
        ('BACKGROUND', (0, -1), (-1, -1), colors.lightgrey),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('FONTSIZE', (0, 1), (-1, -1), 7),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),  # Productos a izquierda
        ('ALIGN', (2, 0), (-1, -1), 'RIGHT'),  # Números a derecha
    ]))

    story.append(table)
    story.append(Spacer(1, 10))

    # Link a la app
    link_style = ParagraphStyle(
        'Link',
        parent=styles['Normal'],
        fontSize=7,
        textColor=colors.blue,
        alignment=TA_CENTER,
    )
    app_url = "https://verduleriaisa.onrender.com/cliente/dashboard"
    story.append(Paragraph(
        f"<b>Ver detalles en la app:</b><br/>{app_url}",
        link_style
    ))

    # Generar PDF
    doc.build(story)
    return buffer.getvalue()
