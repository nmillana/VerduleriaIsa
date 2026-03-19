import argparse
from pathlib import Path

from openpyxl import load_workbook

from verduleria.env import load_env_file
from verduleria.storage import create_database


def extract_catalog(path: str) -> list[dict]:
    workbook = load_workbook(path, data_only=True)
    worksheet = workbook[workbook.sheetnames[0]]
    products = []
    category = "frutas"
    for row in worksheet.iter_rows(values_only=True):
        name = row[0]
        price = row[2]
        if isinstance(name, str) and "Verduras" in name:
            category = "verduras"
            continue
        if isinstance(name, str) and "Frutas" in name:
            category = "frutas"
            continue
        if name == "Item" or price in (None, "Precio Unitario"):
            continue
        if isinstance(name, str) and name.strip():
            try:
                estimated_price = int(price)
            except (TypeError, ValueError):
                continue
            products.append(
                {
                    "category": category,
                    "name": name.strip(),
                    "estimated_price": estimated_price,
                }
            )
    return products


def main() -> None:
    parser = argparse.ArgumentParser(description="Importa catálogo desde un Excel semanal")
    parser.add_argument("excel_path", help="Ruta del archivo .xlsx")
    parser.add_argument(
        "--deactivate-missing",
        action="store_true",
        help="Desactiva productos activos que no aparezcan en el Excel nuevo",
    )
    args = parser.parse_args()

    base_dir = Path(__file__).resolve().parent.parent
    load_env_file(base_dir / ".env")
    catalog = extract_catalog(args.excel_path)
    db = create_database(base_dir)
    db.initialize()
    result = db.sync_catalog(catalog, deactivate_missing=args.deactivate_missing)
    print(
        f"Importación lista. Insertados: {result['inserted']}, "
        f"actualizados: {result['updated']}, desactivados: {result['deactivated']}"
    )


if __name__ == "__main__":
    main()
