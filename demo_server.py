#!/usr/bin/env python3
"""
AIStack Demo Server v2.2.2
Serves the AIStack web UI with authentication for demo/testing purposes.
"""
import os
import sys
import time
import json
import hashlib

# FastAPI and dependencies
from fastapi import FastAPI, Request, Response, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse, FileResponse
import uvicorn
import jwt

# Configuration
ADMIN_USER = "admin"
ADMIN_PASS = "AIStack@2024"
SECRET_KEY = "aistack-demo-secret-key-2024"
COOKIE_NAME = "aistack_session"
PORT = 8080

# Resolve paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.path.join(BASE_DIR, 'aistack', 'ui')

app = FastAPI(title="AIStack", version="2.2.2", docs_url="/api/docs")


# ===================== AUTH ENDPOINTS =====================

@app.post("/login")
async def login(request: Request):
    """Handle login - supports both form and JSON."""
    content_type = request.headers.get("content-type", "")
    
    if "application/json" in content_type:
        body = await request.json()
        username = body.get("username", "")
        password = body.get("password", "")
    else:
        form = await request.form()
        username = form.get("username", "")
        password = form.get("password", "")
    
    if username == ADMIN_USER and password == ADMIN_PASS:
        token = jwt.encode(
            {"sub": username, "exp": int(time.time()) + 86400, "is_admin": True, "role": "admin"},
            SECRET_KEY, algorithm="HS256"
        )
        response = JSONResponse(content=None, status_code=200)
        response.set_cookie(
            key=COOKIE_NAME, value=token,
            httponly=True, max_age=86400, samesite="lax"
        )
        return response
    return JSONResponse({"error": "Invalid username or password"}, status_code=401)


@app.post("/logout")
async def logout():
    response = JSONResponse(content=None, status_code=200)
    response.delete_cookie(key=COOKIE_NAME)
    return response


def get_current_user(request: Request):
    """Extract user from token."""
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if token:
        try:
            return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except:
            pass
    return None


# ===================== API ENDPOINTS =====================

@app.get("/api/v1/users/me")
async def users_me(request: Request):
    user = get_current_user(request)
    if user:
        return {
            "id": "1",
            "name": user["sub"],
            "full_name": "Administrator",
            "is_admin": True,
            "role": "admin",
            "username": user["sub"],
            "require_password_change": False,
        }
    return JSONResponse({"error": "Unauthorized"}, status_code=401)


@app.get("/api/v1/version")
async def version():
    return {"version": "v2.2.2", "git_commit": "HEAD"}


@app.get("/api/v1/auth/config")
async def auth_config():
    return {
        "require_auth": True,
        "saml_enabled": False,
        "oidc_enabled": False,
        "cas_enabled": False,
    }


@app.get("/api/v1/models")
async def list_models(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


@app.get("/api/v1/workers")
async def list_workers(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


@app.get("/api/v1/gpu-devices")
@app.get("/api/v1/gpus")
async def list_gpus(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


@app.get("/api/v1/model-instances")
async def list_model_instances(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


@app.get("/api/v1/api-keys")
async def list_api_keys(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


@app.get("/api/v1/users")
async def list_users(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return {"items": [
        {"id": "1", "name": "admin", "full_name": "Administrator", "is_admin": True, "role": "admin"}
    ], "pagination": {"total": 1, "page": 1, "perPage": 10}}


@app.get("/api/v1/system/info")
async def system_info(request: Request):
    return {
        "version": "v2.2.2",
        "gpu_devices_total": 0,
        "worker_count": 0,
        "model_count": 0,
    }


@app.get("/api/v1/worker-resource-usage")
async def worker_resources(request: Request):
    return {"items": []}


@app.get("/api/v1/model-usages")
async def model_usages(request: Request):
    return {"items": []}


@app.get("/api/v1/clusters")
async def list_clusters(request: Request):
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


# Catch-all for any other API routes
@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def api_catchall(request: Request, path: str):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


# ===================== STATIC FILE SERVING =====================

# Mount static directories from the UI
if os.path.exists(os.path.join(UI_DIR, "js")):
    app.mount("/js", StaticFiles(directory=os.path.join(UI_DIR, "js")), name="js")
if os.path.exists(os.path.join(UI_DIR, "css")):
    app.mount("/css", StaticFiles(directory=os.path.join(UI_DIR, "css")), name="css")
if os.path.exists(os.path.join(UI_DIR, "static")):
    app.mount("/static", StaticFiles(directory=os.path.join(UI_DIR, "static")), name="static")


# Serve specific UI files
@app.get("/favicon.ico")
async def favicon():
    path = os.path.join(UI_DIR, "favicon.ico")
    if os.path.exists(path):
        return FileResponse(path)
    return Response(status_code=404)


@app.get("/favicon.png")
async def favicon_png():
    path = os.path.join(UI_DIR, "favicon.png")
    if os.path.exists(path):
        return FileResponse(path)
    return Response(status_code=404)


# SPA fallback - serve index.html for all non-API, non-static routes
@app.get("/{full_path:path}")
async def serve_spa(request: Request, full_path: str):
    # Try to serve static file from UI dir
    file_path = os.path.join(UI_DIR, full_path)
    if full_path and os.path.isfile(file_path):
        return FileResponse(file_path)
    # Otherwise serve index.html (SPA routing)
    index_path = os.path.join(UI_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return HTMLResponse("<h1>AIStack</h1><p>UI not found</p>", status_code=404)


if __name__ == "__main__":
    print("=" * 60)
    print("  AIStack Demo Server v2.2.2")
    print("=" * 60)
    print()
    print("  Admin Credentials:")
    print("    Username: admin")
    print("    Password: AIStack@2024")
    print()
    print(f"  Server starting on port {PORT}...")
    print("=" * 60)
    
    uvicorn.run(app, host="0.0.0.0", port=PORT, log_level="info")
