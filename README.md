<br>

<p align="center">
    <img alt="AIStack" src="./aistack/ui/static/aistack-logo.170e4fba.png" width="300px"/>
</p>
<br>

<p align="center">
    <a href="https://github.com/jibiaofan/aistack" target="_blank">
        <img alt="GitHub" src="https://img.shields.io/badge/GitHub-AIStack-blue?logo=github&logoColor=white"></a>
    <a href="./LICENSE" target="_blank">
        <img alt="License" src="https://img.shields.io/github/license/jibiaofan/aistack?logo=github&logoColor=white&label=License&color=blue"></a>
    <a href="https://discord.gg/aistack" target="_blank">
        <img alt="Discord" src="https://img.shields.io/badge/Discord-AIStack-blue?logo=discord&logoColor=white"></a>
</p>
<br>

<p align="center">
  <a href="./README.md">English</a> |
  <a href="./README_CN.md">简体中文</a>
</p>

<br>

## Overview

AIStack is an open-source GPU cluster manager for AI model inference serving and GPU instance provisioning. It configures and orchestrates inference engines (vLLM, SGLang, TensorRT-LLM, or your custom engines) and supports launching SSH-accessible GPU instances on demand. Core features include:

- **Multi-cluster GPU management.** Manage GPU clusters across multiple environments, including on-premises servers, Kubernetes clusters, and cloud providers.
- **Pluggable inference engines.** Auto-configure high-performance inference engines like vLLM, SGLang, and TensorRT-LLM. You can also add custom inference engines as needed.
- **Day 0 model support.** AIStack's pluggable engine architecture enables you to deploy new models on the day they are released.
- **Performance-optimized configuration.** Pre-tuned modes for low latency or high throughput. AIStack supports extended KV cache systems like LMCache and HiCache to reduce TTFT. It also includes built-in support for speculative decoding methods such as EAGLE3, MTP, and N-grams.
- **GPU instances.** Launch SSH-accessible GPU instances on demand for development, fine-tuning, and interactive workloads.
- **Enterprise-grade operations.** Supports auto-failover, load balancing, monitoring, authentication, and access control.
- **Billing & cost management.** Built-in usage metering, cost breakdown by model/user, and rate configuration for comprehensive cost visibility.

## Architecture

AIStack enables development teams, IT organizations, and service providers to deliver Model-as-a-Service at scale. It supports industry-standard APIs for LLM, speech, image, and video models. The platform includes built-in user authentication and access control, real-time monitoring of GPU performance and utilization, and detailed metering of token usage and API request rates.

The diagram below shows how a single AIStack server manages multiple GPU clusters across on-premises and cloud environments. The AIStack scheduler allocates GPUs to maximize resource utilization and selects appropriate inference engines for optimal performance. Administrators can also gain comprehensive visibility into system health and metrics through integrated Grafana and Prometheus dashboards.

```
┌─────────────────────────────────────────────────────────────┐
│                      AIStack Server                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │Scheduler │  │ Monitor  │  │   Auth   │  │  Billing   │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
   ┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐
   │  On-Prem    │ │ Kubernetes │ │    Cloud    │
   │  Cluster    │ │  Cluster   │ │  Cluster   │
   │ ┌────┐┌────┐│ │ ┌────┐    │ │ ┌────┐     │
   │ │GPU1││GPU2││ │ │GPU3│    │ │ │GPU4│     │
   │ └────┘└────┘│ │ └────┘    │ │ └────┘     │
   └─────────────┘ └───────────┘ └────────────┘
```

## Optimized Inference Performance

AIStack's automated engine selection and parameter optimization delivers powerful inference performance out of the box. The system supports:

- Automatic selection of the best inference engine for each model
- Optimized parameter tuning for throughput and latency
- KV cache offloading with LMCache/HiCache for reduced TTFT
- Speculative decoding (EAGLE3, MTP, N-grams) for faster generation

## Supported Accelerators

AIStack supports a wide range of AI inference accelerators:

- **NVIDIA GPU**
- **AMD GPU**
- **Ascend NPU**
- **Hygon DCU**
- **MThreads GPU**
- **Iluvatar GPU**
- **MetaX GPU**
- **Cambricon MLU**
- **T-Head PPU**

## Quick Start

### Prerequisites

1. A node with at least one NVIDIA GPU. For other GPU types, check the guides when adding workers in the AIStack UI.
2. Ensure the worker node has NVIDIA drivers, [Docker](https://docs.docker.com/engine/install/), and [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html) installed.
3. (Optional) A CPU node to host the AIStack server. The AIStack server does not require a GPU and can run on a CPU-only machine. [Docker](https://docs.docker.com/engine/install/) must be installed. Docker Desktop is also supported (for Windows and macOS). If no dedicated CPU node is available, install the AIStack server on the same machine as the GPU worker.
4. AIStack worker nodes only support Linux. For Windows, consider using WSL2 and avoid Docker Desktop. macOS is not supported as an AIStack worker node.

### Install AIStack

Run the following command to install and start the AIStack server with Docker:

```bash
sudo docker run -d --name aistack \
    --restart unless-stopped \
    -p 80:80 \
    --volume aistack-data:/var/lib/aistack \
    jibiaofan/aistack
```

Check AIStack startup logs:

```bash
sudo docker logs -f aistack
```

After AIStack starts, run the following command to get the default admin password:

```bash
sudo docker exec aistack cat /var/lib/aistack/initial_admin_password
```

Open a browser and visit `http://your_host_ip` to access the AIStack UI. Log in with the default username `admin` and the password obtained above.

### Set Up a GPU Cluster

1. In the AIStack UI, navigate to the `Clusters` page.
2. Click the `Add Cluster` button.
3. Select `Docker` as the cluster provider.
4. Fill in the `Name` and `Description` fields for the new cluster, then click `Save`.
5. Follow the on-screen guide to configure a new worker node. You'll need to run a Docker command on the worker node to connect it to the AIStack server:
    ```bash
    sudo docker run -d --name aistack-worker \
          --restart=unless-stopped \
          --privileged \
          --network=host \
          --volume /var/run/docker.sock:/var/run/docker.sock \
          --volume aistack-data:/var/lib/aistack \
          --runtime nvidia \
          jibiaofan/aistack \
          --server-url http://your_aistack_server_url \
          --token your_worker_token \
          --advertise-address 192.168.1.2
    ```
6. Run the command on the worker node to connect to the AIStack server.
7. Once the worker node connects successfully, it will appear on the `Workers` page in the AIStack UI.

### Deploy a Model

1. In the AIStack UI, navigate to the `Catalog` page.
2. Select a model from the available list (e.g., `Qwen3.5-0.8B`).
3. After the deployment compatibility check passes, click `Save` to deploy the model.
4. AIStack will begin downloading model files and deploying the model. When the deployment status shows `Running`, the model is successfully deployed.
5. Click `Playground - Chat` in the navigation menu. Check that the model is selected in the `Model` dropdown in the upper right corner. You can now chat with the model in the UI playground.

### Use Models via API

1. Navigate to `Access Control` > `API Keys` page, then click `New API Key`.
2. Fill in the `Name` and click `Save`.
3. Copy the generated API key and save it in a secure location. Note that the key is only visible once at creation time.
4. You can now use the API key to access AIStack's OpenAI-compatible API endpoints. For example, using curl:

```bash
# Replace `your_api_key` and `your_aistack_server_url`
# with your actual API key and AIStack server URL.
export AISTACK_API_KEY=your_api_key
curl http://your_aistack_server_url/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AISTACK_API_KEY" \
  -d '{
    "model": "qwen3.5-0.8b",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Tell me a joke."
      }
    ],
    "stream": true
  }'
```

## Key Features

| Feature | Description |
|---------|-------------|
| Multi-Cluster GPU Management | Manage GPU clusters across on-prem, Kubernetes, and cloud environments |
| Pluggable Inference Engines | Support for vLLM, SGLang, TensorRT-LLM, and custom engines |
| Model Catalog | One-click deployment from a curated model catalog |
| GPU Instances | SSH-accessible GPU instances for dev, fine-tuning, and interactive workloads |
| OpenAI-Compatible API | Industry-standard API for LLM, speech, image, and video models |
| Billing & Cost Management | Usage metering, cost breakdown by model/user, rate configuration |
| Multi-Tenant Access Control | User authentication, role-based access, and organization management |
| Real-Time Monitoring | GPU performance, utilization metrics, Grafana/Prometheus integration |
| Auto Failover | Automatic recovery and load balancing for high availability |
| Performance Optimization | Pre-tuned modes, KV cache systems, speculative decoding |

## Billing & Cost Management

AIStack includes a built-in billing and cost management system that provides:

- **Cost Overview**: Total cost, token usage, and API request metrics at a glance
- **Cost Breakdown by Model**: See which models drive the most spend with detailed per-model rates
- **Cost Breakdown by User**: Attribute costs to individual users and teams
- **Daily Cost Trends**: Visualize spending patterns over time
- **Rate Configuration**: Configure input/output token rates, image generation rates, audio rates, embedding rates, and rerank rates
- **Period Comparison**: Compare current period costs with previous periods

Access the billing dashboard from the sidebar: **Usage & Billing > Billing**

## Build

1. Install [Docker](https://docs.docker.com/engine/install/).
2. Run `make package`.

## Contributing

If you are interested in contributing to AIStack, please read the [Contributing Guide](./docs/contributing.md).

## License

Copyright (c) 2024-2026 AIStack Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [LICENSE](./LICENSE).

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
