"""Stub for gpustack_runtime.deployer.__utils__"""
def compare_versions(v1, v2):
    from packaging.version import Version
    try:
        return (Version(v1) > Version(v2)) - (Version(v1) < Version(v2))
    except Exception:
        return 0
