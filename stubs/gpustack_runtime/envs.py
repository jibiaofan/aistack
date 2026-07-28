"""Stub for gpustack_runtime.envs"""
def to_bool(val):
    if isinstance(val, bool):
        return val
    if isinstance(val, str):
        return val.lower() in ('true', '1', 'yes')
    return bool(val)

def get_runtime_env(key, default=None):
    import os
    return os.environ.get(key, default)
