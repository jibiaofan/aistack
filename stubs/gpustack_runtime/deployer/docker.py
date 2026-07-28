"""Stub for gpustack_runtime.deployer.docker"""
from dataclasses import dataclass, field
from typing import Optional, List, Dict

@dataclass
class DockerWorkloadPlan:
    name: str = ""
    image: str = ""
    command: Optional[List[str]] = None
    env: Optional[Dict[str, str]] = None
    network_mode: Optional[str] = None
    privileged: bool = False
    shm_size: Optional[str] = None
