# Installation via Docker

## Prerequisites

**AIStack server:**

- [Docker](https://docs.docker.com/engine/install/) must be installed. Docker Desktop (Windows and macOS) is also supported.

**AIStack workers:**

- [Docker](https://docs.docker.com/engine/install/) must be installed. Docker Desktop is **not** supported.
- Only Linux is supported for AIStack worker nodes. If you use Windows, consider using WSL2 and avoid using Docker Desktop. macOS is not supported for AIStack worker nodes.
- Ensure the appropriate GPU drivers and container toolkits are installed for your hardware. See the [Installation Requirements](./requirements.md) for details.

## Install AIStack Server

Run the following command to install and start the AIStack server using Docker:

```bash
sudo docker run -d --name aistack \
    --restart unless-stopped \
    -p 80:80 \
    --volume aistack-data:/var/lib/aistack \
    aistack/aistack
```

!!! note

    AIStack v2 uses a single unified container image for all GPU device types.

## Startup

Check the AIStack container logs:

```bash
sudo docker logs -f aistack
```

Once the server is up, open `http://your_host_ip` in a browser to access the AIStack UI.

Log in with username `admin` and the default password. Retrieve the initial password with:

```bash
sudo docker exec -it aistack \
    cat /var/lib/aistack/initial_admin_password
```

## Add GPU Clusters and Worker Nodes

Please follow the UI instructions on the `Clusters` and `Workers` pages to add GPU clusters and worker nodes.

## Custom Configuration

The following sections describe examples of custom configuration options when starting the AIStack server container. For a full list of available options, refer to the [CLI Reference](../cli-reference/start.md).

### Enable HTTPS with Custom Certificate


```diff
 sudo docker run -d --name aistack \
     ...
     -p 80:80 \
+    -p 443:443 \
     --volume aistack-data:/var/lib/aistack \
+    --volume /path/to/cert_files:/path/to/cert_files:ro \
+    -e GPUSTACK_SSL_KEYFILE=/path/to/cert_files/your_domain.key \
+    -e GPUSTACK_SSL_CERTFILE=/path/to/cert_files/your_domain.crt \
     aistack/aistack
     ...
```

### Using an External Database

By default, AIStack uses an embedded PostgreSQL database. To use an external database such as PostgreSQL or MySQL, set the `GPUSTACK_DATABASE_URL` environment variable or use the `--database-url` argument when starting the AIStack container. See [Database Requirements](requirements.md#database-requirements) for the list of compatible databases and verified versions.

```diff
 sudo docker run -d --name aistack \
     ...
     --volume aistack-data:/var/lib/aistack \
+    -e GPUSTACK_DATABASE_URL="postgresql://username:password@host:port/dbname" \
     aistack/aistack
     ...
```

### Configure External Server URL

If you use a cloud provider to provision workers, set the external server URL for worker registration to ensure that workers can connect to the server correctly.

```diff
sudo docker run -d --name aistack \
    ...
+   -e GPUSTACK_SERVER_EXTERNAL_URL="https://your_external_server_url" \
    aistack/aistack
    ...
```

### Additional Trusted CAs

If AIStack needs to communicate with services that use certificates issued by a private or corporate CA (e.g., a self-hosted Identity Provider, a Hugging Face mirror, or an internal API endpoint), mount the CA certificate into the container under `/usr/local/share/ca-certificates/`. AIStack will automatically import the mounted CA certificates during startup and add them to the system trust store.

```diff
 sudo docker run -d --name aistack \
     ...
     --volume aistack-data:/var/lib/aistack \
+    --volume /path/to/custom-root-ca.crt:/usr/local/share/ca-certificates/custom-root-ca.crt:ro \
     aistack/aistack
     ...
```

!!! note

    The CA certificate must be PEM-encoded with a `.crt` extension. You can mount multiple CA certificates by adding additional `--volume` flags.

## Installation via Docker Compose

### Prerequisites

- [Docker Compose](https://docs.docker.com/compose/install/) must be installed.
- [Required ports](./requirements.md#port-requirements) must be available.

### Deployment

The Docker Compose files and configuration files are maintained in the [AIStack repository](https://github.com/aistack/aistack/tree/main/docker-compose).

Run the following commands to clone the latest stable release:

```bash
LATEST_TAG=$(
    curl -s "https://api.github.com/repos/aistack/aistack/releases" \
    | grep '"tag_name"' \
    | sed -E 's/.*"tag_name": "([^"]+)".*/\1/' \
    | grep -Ev 'rc|beta|alpha|preview' \
    | head -1
)
echo "Latest stable release: $LATEST_TAG"
git clone -b "$LATEST_TAG" https://github.com/aistack/aistack.git
cd aistack/docker-compose
```

Start the AIStack server:

```bash
sudo docker compose -f docker-compose.server.yaml up -d
```

Once the server is up, open `http://your_host_ip` in a browser to access the AIStack UI.

Log in with username `admin` and the default password. Retrieve the initial password with:

```bash
sudo docker exec -it aistack-server cat /var/lib/aistack/initial_admin_password
```

For built-in and external observability options, see [Observability](../user-guide/observability.md).
