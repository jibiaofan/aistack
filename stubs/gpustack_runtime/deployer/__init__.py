"""Stub for gpustack_runtime.deployer"""
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any
from enum import Enum

class WorkloadStatus(str, Enum):
    RUNNING = "running"
    STOPPED = "stopped"
    ERROR = "error"
    PENDING = "pending"

@dataclass
class ContainerResources:
    cpu: Optional[str] = None
    memory: Optional[str] = None
    gpu: Optional[int] = None

@dataclass
class ContainerMount:
    source: str = ""
    target: str = ""
    read_only: bool = False

@dataclass
class ContainerPort:
    container_port: int = 0
    host_port: int = 0
    protocol: str = "tcp"

@dataclass
class WorkloadPlan:
    name: str = ""
    image: str = ""
    command: Optional[List[str]] = None
    env: Optional[Dict[str, str]] = None
    resources: Optional[ContainerResources] = None
    mounts: Optional[List[ContainerMount]] = None
    ports: Optional[List[ContainerPort]] = None

class DockerDeployer:
    def __init__(self, *args, **kwargs):
        pass
    async def deploy(self, *args, **kwargs):
        pass
    async def undeploy(self, *args, **kwargs):
        pass
    async def status(self, *args, **kwargs):
        return WorkloadStatus.STOPPED
