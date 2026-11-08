from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_returns_ok() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_unknown_path_returns_404() -> None:
    response = client.get("/not-a-route")

    assert response.status_code == 404


def test_cors_allows_angular_origin() -> None:
    response = client.options(
        "/health",
        headers={
            "Origin": "http://127.0.0.1:4200",
            "Access-Control-Request-Method": "GET",
        },
    )

    assert response.status_code in (200, 204)
    assert response.headers.get("access-control-allow-origin") == "http://127.0.0.1:4200"
