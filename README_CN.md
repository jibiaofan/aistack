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

## 概述

AIStack 是一个开源的 GPU 集群管理器，用于 AI 模型推理服务和 GPU 实例供应。它配置和编排推理引擎（vLLM、SGLang、TensorRT-LLM 或您自定义的引擎），并支持按需启动可通过 SSH 访问的 GPU 实例。其核心功能包括：

- **多集群 GPU 管理。** 跨多个环境管理 GPU 集群。这包括本地服务器、Kubernetes 集群和云提供商。
- **可插拔推理引擎。** 自动配置高性能推理引擎，如 vLLM、SGLang 和 TensorRT-LLM。您也可以根据需要添加自定义推理引擎。
- **Day 0 模型支持。** AIStack 的可插拔引擎架构使您能够在新模型发布当天即可部署。
- **性能优化配置。** 提供预调优模式，用于低延迟或高吞吐量。AIStack 支持扩展的 KV 缓存系统，如 LMCache 和 HiCache，以减少 TTFT。它还包括对推测性解码方法（如 EAGLE3、MTP 和 N-grams）的内置支持。
- **GPU 实例。** 按需启动可通过 SSH 访问的 GPU 实例，适用于开发、微调和交互式工作负载。
- **企业级运维能力。** 支持自动故障恢复、负载均衡、监控、认证和访问控制。
- **计费与成本管理。** 内置用量计量、按模型/用户的成本分解和费率配置，提供全面的成本可见性。

## 架构

AIStack 使开发团队、IT 组织和服务提供商能够大规模地提供模型即服务（Model-as-a-Service）。它支持用于 LLM、语音、图像和视频模型的行业标准 API。该平台内置用户认证和访问控制、GPU 性能和利用率的实时监控，以及令牌使用量和 API 请求率的详细计量。

下图展示了单个 AIStack 服务器如何管理跨本地和云环境的多个 GPU 集群。AIStack 调度器分配 GPU 以最大化资源利用率，并选择合适的推理引擎以实现最佳性能。管理员还可以通过集成的 Grafana 和 Prometheus 仪表板全面了解系统运行状况和指标。

```
┌─────────────────────────────────────────────────────────────┐
│                      AIStack Server                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │  调度器   │  │  监控    │  │  认证    │  │  计费管理   │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
   ┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐
   │  本地集群    │ │ Kubernetes │ │   云集群    │
   │ ┌────┐┌────┐│ │ ┌────┐    │ │ ┌────┐     │
   │ │GPU1││GPU2││ │ │GPU3│    │ │ │GPU4│     │
   │ └────┘└────┘│ │ └────┘    │ │ └────┘     │
   └─────────────┘ └───────────┘ └────────────┘
```

## 优化的推理性能

AIStack 的自动化引擎选择和参数优化可开箱即用地提供强大的推理性能。系统支持：

- 为每个模型自动选择最佳推理引擎
- 针对吞吐量和延迟的优化参数调整
- 使用 LMCache/HiCache 的 KV 缓存卸载以减少 TTFT
- 推测性解码（EAGLE3、MTP、N-grams）加速生成

## 支持的加速器

AIStack 支持多种 AI 推理加速器：

- **NVIDIA GPU**
- **AMD GPU**
- **Ascend NPU（华为昇腾）**
- **Hygon DCU（海光）**
- **MThreads GPU（摩尔线程）**
- **Iluvatar GPU（天数智芯）**
- **MetaX GPU（沐曦）**
- **Cambricon MLU（寒武纪）**
- **T-Head PPU（平头哥）**

## 快速入门

### 前提条件

1. 一个至少配备一块 NVIDIA GPU 的节点。对于其他类型的 GPU，请在 AIStack UI 中添加 worker 时查看指南。
2. 确保 worker 节点上已安装 NVIDIA 驱动程序、[Docker](https://docs.docker.com/engine/install/) 和 [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)。
3. （可选）一个用于托管 AIStack server 的 CPU 节点。AIStack server 不需要 GPU，可以在仅有 CPU 的机器上运行。必须安装 [Docker](https://docs.docker.com/engine/install/)。同时支持 Docker Desktop（适用于 Windows 和 macOS）。如果没有专用的 CPU 节点，可以将 AIStack server 安装在 GPU worker 节点所在的同一台机器上。
4. AIStack worker 节点仅支持 Linux。如果你使用 Windows，可考虑使用 WSL2 并避免使用 Docker Desktop。macOS 不支持作为 AIStack worker 节点。

### 安装 AIStack

运行以下命令，使用 Docker 安装并启动 AIStack server：

```bash
sudo docker run -d --name aistack \
    --restart unless-stopped \
    -p 80:80 \
    --volume aistack-data:/var/lib/aistack \
    jibiaofan/aistack
```

检查 AIStack 启动日志：

```bash
sudo docker logs -f aistack
```

AIStack 启动后，运行以下命令获取默认管理员密码：

```bash
sudo docker exec aistack cat /var/lib/aistack/initial_admin_password
```

打开浏览器，访问 `http://你的主机IP` 以进入 AIStack UI。使用默认用户名 `admin` 和上面获取的密码登录。

### 设置 GPU 集群

1. 在 AIStack UI 中，导航到 `集群` 页面。
2. 点击 `添加集群` 按钮。
3. 选择 `Docker` 作为集群提供商。
4. 填写新集群的 `名称` 和 `描述` 字段，然后点击 `保存` 按钮。
5. 按照界面指南配置新的 worker 节点。你需要在 worker 节点上运行一个 Docker 命令以将其连接到 AIStack server：
    ```bash
    sudo docker run -d --name aistack-worker \
          --restart=unless-stopped \
          --privileged \
          --network=host \
          --volume /var/run/docker.sock:/var/run/docker.sock \
          --volume aistack-data:/var/lib/aistack \
          --runtime nvidia \
          jibiaofan/aistack \
          --server-url http://你的_aistack_server_url \
          --token 你的_worker_token \
          --advertise-address 192.168.1.2
    ```
6. 在 worker 节点上执行该命令以连接到 AIStack server。
7. worker 节点成功连接后，它将出现在 AIStack UI 的 `Workers` 页面中。

### 部署模型

1. 在 AIStack 用户界面中导航到 `Catalog` 页面。
2. 从可用模型列表中选择一个模型（例如 `Qwen3.5-0.8B`）。
3. 部署兼容性检查通过后，点击 `Save` 按钮部署模型。
4. AIStack 将开始下载模型文件并部署模型。当部署状态显示为 `Running` 时，表示模型已成功部署。
5. 点击导航菜单中的 `Playground - Chat`，检查右上角 `Model` 下拉菜单中是否选中了目标模型。现在您可以在 UI playground 中与模型聊天了。

### 通过 API 使用模型

1. 导航到 `Access Control` > `API Keys` 页面，然后点击 `New API Key` 按钮。
2. 填写 `Name` 并点击 `Save` 按钮。
3. 复制生成的 API 密钥并将其保存在安全的地方。请注意，该密钥仅在创建时可见一次。
4. 您现在可以使用该 API 密钥访问 AIStack 提供的 OpenAI 兼容 API 端点。例如，使用 curl 如下所示：

```bash
# 将 `your_api_key` 和 `your_aistack_server_url`
# 替换为您实际的 API 密钥和 AIStack 服务器 URL。
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

## 核心功能

| 功能 | 描述 |
|------|------|
| 多集群 GPU 管理 | 跨本地、Kubernetes 和云环境管理 GPU 集群 |
| 可插拔推理引擎 | 支持 vLLM、SGLang、TensorRT-LLM 和自定义引擎 |
| 模型目录 | 从精选模型目录一键部署 |
| GPU 实例 | 可通过 SSH 访问的 GPU 实例，适用于开发、微调和交互式工作负载 |
| OpenAI 兼容 API | 支持 LLM、语音、图像和视频模型的行业标准 API |
| 计费与成本管理 | 用量计量、按模型/用户成本分解、费率配置 |
| 多租户访问控制 | 用户认证、基于角色的访问控制和组织管理 |
| 实时监控 | GPU 性能、利用率指标、Grafana/Prometheus 集成 |
| 自动故障恢复 | 自动恢复和负载均衡以实现高可用性 |
| 性能优化 | 预调模式、KV 缓存系统、推测性解码 |

## 计费与成本管理

AIStack 内置计费与成本管理系统，提供：

- **成本概览**：一目了然查看总费用、Token 使用量和 API 请求指标
- **按模型成本分解**：查看每个模型的详细费率和消费占比
- **按用户成本分解**：将成本归因到个人用户和团队
- **每日成本趋势**：可视化支出模式变化
- **费率配置**：配置输入/输出 Token 费率、图像生成费率、音频费率、Embedding 费率和 Rerank 费率
- **周期对比**：比较当前周期与上一周期的成本

从侧边栏访问计费仪表板：**用量与计费 > 计费**

## 构建

1. 安装 [Docker](https://docs.docker.com/engine/install/)。
2. 运行 `make package`。

## 贡献

如果您有兴趣为 AIStack 做贡献，请阅读[贡献指南](./docs/contributing.md)。

## 许可证

版权所有 (c) 2024-2026 AIStack 作者

根据 Apache License, Version 2.0（"许可证"）授权；
除非符合许可证，否则您不得使用此文件。
您可以在 [LICENSE](./LICENSE) 文件中获取许可证副本。

除非适用法律要求或书面同意，根据许可证分发的软件按"原样"分发，无任何明示或暗示的担保或条件。
请参阅许可证中规定的特定语言管理权限及许可证下的限制。
