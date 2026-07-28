"""Stub for gpustack_runtime.detector"""
from enum import Enum
from typing import List, Dict, Any, Optional


class ManufacturerEnum(str, Enum):
    NVIDIA = "NVIDIA"
    AMD = "AMD"
    INTEL = "Intel"
    APPLE = "Apple"
    HUAWEI = "Huawei"
    MTHREADS = "Moore Threads"
    ILUVATAR = "Iluvatar"
    UNKNOWN = "Unknown"


class GPUDeviceInfo:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)


class DeviceInfo:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)


def manufacturer_to_backend(manufacturer: ManufacturerEnum) -> str:
    mapping = {
        ManufacturerEnum.NVIDIA: "llama-box",
        ManufacturerEnum.AMD: "llama-box",
        ManufacturerEnum.INTEL: "llama-box",
        ManufacturerEnum.APPLE: "llama-box",
        ManufacturerEnum.HUAWEI: "ascend-mindie",
        ManufacturerEnum.MTHREADS: "llama-box",
        ManufacturerEnum.ILUVATAR: "llama-box",
        ManufacturerEnum.UNKNOWN: "llama-box",
    }
    return mapping.get(manufacturer, "llama-box")


def available_manufacturers() -> List[str]:
    return [m.value for m in ManufacturerEnum]


def available_backends() -> List[str]:
    return ["llama-box", "vllm", "vox-box", "ascend-mindie"]


def detect_devices() -> List[DeviceInfo]:
    return []
