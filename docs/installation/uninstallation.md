# Uninstallation

AIStack is typically installed using containerization, 
so uninstallation mainly involves removing the container and any associated data volumes.

For example, if AIStack is running in a Docker container named `aistack`, run:

```bash
docker rm -f aistack

```

To optionally remove associated data volumes, use:

```bash
docker volume rm <data_volume_name>

```
