# MCP Configuration for ng-in-viewport

This project is configured with Model Context Protocol (MCP) servers to enhance the development experience with AI-powered assistance.

## Available MCP Servers

### Angular CLI MCP
- **Command**: `npx -y @angular/cli mcp`
- **Purpose**: Angular development assistance, project management, and code generation
- **Features**: Component generation, service creation, build optimization, Angular-specific guidance

### GitHub MCP
- **Command**: `npx -y @modelcontextprotocol/server-github`
- **Purpose**: Repository management, issues, PRs, and code review
- **Setup**: Requires `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable
- **Features**: Issue management, PR operations, repository insights, workflow management

### Playwright MCP
- **Command**: `npx -y @modelcontextprotocol/server-playwright`
- **Purpose**: Browser automation, E2E testing, and web page interaction
- **Features**: Test automation, browser debugging, screenshot capture, page interaction

### File System MCP
- **Command**: `npx -y @modelcontextprotocol/server-filesystem`
- **Purpose**: File system operations for project files
- **Features**: File reading/writing, directory traversal, file operations

### Git MCP
- **Command**: `npx -y @modelcontextprotocol/server-git`
- **Purpose**: Git version control operations
- **Features**: Commit history, branch management, diff analysis, merge operations

### TypeScript MCP
- **Command**: `npx -y @modelcontextprotocol/server-typescript`
- **Purpose**: TypeScript language server for code analysis
- **Features**: Type checking, code completion, refactoring assistance

### Brave Search MCP
- **Command**: `npx -y @modelcontextprotocol/server-brave-search`
- **Purpose**: Web search for documentation and troubleshooting
- **Setup**: Requires `BRAVE_API_KEY` environment variable (optional)
- **Features**: Documentation search, error resolution, best practices lookup

## Configuration Files

### `.mcprc.json`
Main MCP configuration file with detailed server definitions and settings.

### `mcp.json`
Alternative configuration format for Claude Desktop and other MCP clients.

### `.vscode/settings.json`
VS Code workspace settings that reference the MCP configuration.

## Setup Instructions

### 1. Environment Variables (Optional)
For enhanced functionality, set up these environment variables:

```bash
# GitHub access (required for GitHub MCP)
export GITHUB_PERSONAL_ACCESS_TOKEN="your_github_token_here"

# Brave Search API (optional for web search)
export BRAVE_API_KEY="your_brave_api_key_here"
```

### 2. Claude Desktop Integration
If using Claude Desktop, copy the contents of `mcp.json` to your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

### 3. VS Code Integration
The `.vscode/settings.json` file is already configured to use the MCP setup. Install the recommended extensions for the best experience.

## Usage Examples

### Angular Development
```
@angular-cli Generate a new component called viewport-status
@angular-cli Add Angular Material to the project
@angular-cli Build the library for production
```

### GitHub Operations
```
@github Create a new issue for feature request
@github List recent pull requests
@github Check workflow status
```

### Playwright Testing
```
@playwright Take a screenshot of the demo page
@playwright Run E2E tests for viewport detection
@playwright Debug failing test scenarios
```

### File Operations
```
@filesystem Show the project structure
@filesystem Read the main library entry point
@filesystem Create a new test file
```

## Benefits

1. **Contextual Assistance**: AI understands the Angular ecosystem and project structure
2. **Automated Operations**: Streamlined GitHub, Git, and file system operations
3. **Testing Support**: Enhanced E2E testing and debugging capabilities
4. **Code Quality**: TypeScript analysis and Angular best practices
5. **Documentation**: Easy access to relevant documentation and examples

## Troubleshooting

### MCP Server Not Found
Ensure the MCP server packages are available. Run:
```bash
npx -y @angular/cli mcp --help
npx -y @modelcontextprotocol/server-github --help
```

### Permission Issues
Check file permissions and ensure the working directory is accessible.

### GitHub Integration
Verify the GitHub token has appropriate permissions:
- Repository access
- Issues read/write
- Pull requests read/write
- Actions read (for workflow status)

### Performance
MCP servers run on-demand. Initial startup may take a few seconds as packages are downloaded and initialized.