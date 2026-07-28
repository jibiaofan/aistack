"""Stub for gpustack_runner.runner"""

class BackendVersionedRunner:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
    
    name: str = ""
    version: str = ""
    
class ServiceVersionedRunner:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
    
    name: str = ""
    version: str = ""
