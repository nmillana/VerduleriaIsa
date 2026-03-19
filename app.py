import os
from wsgiref.simple_server import make_server

from verduleria.web import create_application


def main() -> None:
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "8000"))
    app = create_application()
    print(f"Verduleria app disponible en http://{host}:{port}")
    with make_server(host, port, app) as server:
        server.serve_forever()


if __name__ == "__main__":
    main()
