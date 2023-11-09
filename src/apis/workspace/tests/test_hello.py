"""Hello unit test module."""

from src_api_workspace_workspace.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello workspace"
