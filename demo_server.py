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
PORT = int(os.environ.get("PORT", "3000"))

# Resolve paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UI_DIR = os.path.join(BASE_DIR, 'aistack', 'ui')

app = FastAPI(title="AIStack", version="2.2.2", docs_url="/api/docs")


# ===================== AUTH ENDPOINTS =====================

async def _do_login(request: Request):
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


@app.post("/login")
async def login(request: Request):
    return await _do_login(request)


@app.post("/auth/login")
async def auth_login(request: Request):
    return await _do_login(request)


async def _do_logout():
    response = JSONResponse(content=None, status_code=200)
    response.delete_cookie(key=COOKIE_NAME)
    return response


@app.post("/logout")
async def logout():
    return await _do_logout()


@app.post("/auth/logout")
async def auth_logout():
    return await _do_logout()


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
@app.get("/auth/config")
async def auth_config():
    return {
        "require_auth": True,
        "saml_enabled": False,
        "oidc_enabled": False,
        "cas_enabled": False,
        "external_auth": None,
        "version": "v2.2.2",
    }


@app.post("/auth/update-password")
async def auth_update_password(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return JSONResponse(content=None, status_code=200)


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


# ===================== BILLING API =====================

# Simulated billing data store (represents real system metrics)
import random
from datetime import datetime, timedelta

def generate_billing_data():
    """Generate realistic billing data based on system usage."""
    now = datetime.now()
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0)
    
    models = [
        {"id": "m1", "name": "Qwen2.5-72B-Instruct", "inputRate": 1.20, "outputRate": 1.80},
        {"id": "m2", "name": "DeepSeek-V3", "inputRate": 1.00, "outputRate": 1.50},
        {"id": "m3", "name": "Llama-3.1-70B", "inputRate": 1.00, "outputRate": 1.50},
        {"id": "m4", "name": "FLUX.1-schnell", "inputRate": 0.00, "outputRate": 0.00},
    ]
    
    tenants = [
        {"id": "t1", "name": "admin", "budget": 2000, "alertPct": 80},
        {"id": "t2", "name": "api-service", "budget": 1500, "alertPct": 70},
        {"id": "t3", "name": "dev-team", "budget": 800, "alertPct": 90},
    ]
    
    # Generate daily data for current month
    days_elapsed = (now - start_of_month).days + 1
    daily = []
    for i in range(min(days_elapsed, 31)):
        d = start_of_month + timedelta(days=i)
        daily.append({
            "date": d.strftime("%Y-%m-%d"),
            "cost": round(random.uniform(30, 55), 2),
            "tokens": random.randint(20000000, 45000000),
            "requests": random.randint(400, 800)
        })
    
    total_cost = sum(d["cost"] for d in daily)
    total_tokens = sum(d["tokens"] for d in daily)
    total_requests = sum(d["requests"] for d in daily)
    
    # Model breakdown
    model_usage = []
    remaining_cost = total_cost
    for i, m in enumerate(models):
        if i == len(models) - 1:
            cost = round(remaining_cost, 2)
        else:
            cost = round(total_cost * [0.45, 0.28, 0.15, 0.12][i], 2)
            remaining_cost -= cost
        inTok = random.randint(80000000, 350000000) if m["inputRate"] > 0 else 0
        outTok = random.randint(30000000, 120000000) if m["outputRate"] > 0 else 0
        reqs = random.randint(1000, 7000)
        model_usage.append({
            "modelId": m["id"], "name": m["name"],
            "tokens": inTok + outTok,
            "inputTokens": inTok, "outputTokens": outTok,
            "requests": reqs, "cost": cost,
            "inputRate": m["inputRate"], "outputRate": m["outputRate"]
        })
    
    # Tenant breakdown
    tenant_usage = []
    remaining = total_cost
    for i, t in enumerate(tenants):
        if i == len(tenants) - 1:
            cost = round(remaining, 2)
        else:
            cost = round(total_cost * [0.55, 0.30, 0.15][i], 2)
            remaining -= cost
        tenant_usage.append({
            "id": t["id"], "tenantId": t["id"], "name": t["name"],
            "cost": cost, "tokens": random.randint(100000000, 600000000),
            "requests": random.randint(2000, 10000),
            "budget": t["budget"], "alertPct": t["alertPct"],
            "status": "warning" if cost/t["budget"] > 0.7 else "active"
        })
    
    # Historical billing periods
    history = []
    for m in range(6):
        period_start = (now.replace(day=1) - timedelta(days=30*m)).replace(day=1)
        period_end = (period_start + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        history.append({
            "id": f"inv-{6-m:03d}",
            "period": f"{period_start.strftime('%Y-%m-%d')} ~ {period_end.strftime('%Y-%m-%d')}",
            "amount": round(random.uniform(900, 1500), 2),
            "tokens": random.randint(500000000, 1200000000),
            "status": "paid" if m > 0 else "pending",
            "createdAt": period_end.strftime("%Y-%m-%d")
        })
    
    return {
        "period": {"start": start_of_month.strftime("%Y-%m-%d"), "end": now.strftime("%Y-%m-%d")},
        "summary": {
            "total_cost": round(total_cost, 2),
            "totalCost": round(total_cost, 2),
            "total_tokens": total_tokens,
            "totalTokens": total_tokens,
            "total_requests": total_requests,
            "totalRequests": total_requests,
            "active_models": len(models),
            "activeModels": len(models),
            "avgDaily": round(total_cost / max(days_elapsed, 1), 2)
        },
        "daily": daily,
        "models": model_usage,
        "tenants": tenant_usage,
        "history": history,
        "rates": {
            "Qwen2.5-72B-Instruct": {"input": 1.20, "output": 1.80},
            "DeepSeek-V3": {"input": 1.00, "output": 1.50},
            "Llama-3.1-70B": {"input": 1.00, "output": 1.50},
            "FLUX.1-schnell": {"input": 0.00, "output": 0.04}
        }
    }


@app.get("/v2/billing/overview")
@app.get("/api/v1/billing/overview")
async def billing_overview(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return generate_billing_data()


@app.get("/v2/billing/export")
@app.get("/api/v1/billing/export")
async def billing_export(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    # Return a simple text-based "PDF" representation
    data = generate_billing_data()
    content = f"""AIStack Billing Statement
Period: {data['period']['start']} ~ {data['period']['end']}
Total Cost: ${data['summary']['totalCost']:.2f}
Total Tokens: {data['summary']['totalTokens']:,}
Total Requests: {data['summary']['totalRequests']:,}
Active Models: {data['summary']['activeModels']}
"""
    from fastapi.responses import PlainTextResponse
    return PlainTextResponse(content, media_type="text/plain",
        headers={"Content-Disposition": "attachment; filename=billing-statement.txt"})


@app.post("/v2/billing/rates")
@app.post("/api/v1/billing/rates")
async def save_billing_rates(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    body = await request.json()
    return {"success": True, "rates": body}


@app.post("/v2/billing/budget")
@app.post("/api/v1/billing/budget")
async def save_budget(request: Request):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    body = await request.json()
    return {"success": True, "budget": body}


# v2 API routes (newer UI version)
@app.api_route("/v2/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def v2_catchall(request: Request, path: str):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    if path == "users/me":
        return {"id": "1", "name": "admin", "full_name": "Administrator", "is_admin": True, "role": "admin", "username": "admin", "require_password_change": False}
    if path == "usage/meta":
        return {"models": [], "organizations": []}
    if "usage" in path or "breakdown" in path:
        return {"items": [], "total": {"tokens": 0, "requests": 0}}
    return {"items": [], "pagination": {"total": 0, "page": 1, "perPage": 10}}


# v1 API routes (version endpoint without /api prefix)
@app.get("/version")
async def version_short():
    return {"version": "v2.2.2", "git_commit": "HEAD"}


@app.api_route("/v1/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def v1_catchall(request: Request, path: str):
    user = get_current_user(request)
    if not user:
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
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
