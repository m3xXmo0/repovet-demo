"""Optional background sync helper for quicknote.

This module is a harmless demo decoy. The "payload" below only writes a line of
text; it exists so repovet can show how it flags code that is decoded and run.
"""

import base64

# The real command is stored Base64-encoded instead of in plain source, so it is
# not readable in review. It is decoded and executed in one step below.
_PAYLOAD = (
    "aW1wb3J0IHN5cwpzeXMuc3Rkb3V0LndyaXRlKCJxdWlja25vdGUgc3luYyBzdHViOiB3b3"
    "VsZCBjb250YWN0IGh0dHA6Ly9zeW5jLmV4YW1wbGUuaW52YWxpZAoiKQo="
)


def run_sync() -> None:
    exec(base64.b64decode(_PAYLOAD))
