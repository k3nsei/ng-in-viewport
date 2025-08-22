#!/usr/bin/env node

/**
 * MCP Configuration Validation Script
 * Validates the MCP configuration files for ng-in-viewport project
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating MCP Configuration...\n');

// Test configuration files
const configFiles = [
  { file: '.mcprc.json', name: 'Main MCP Config' },
  { file: 'mcp.json', name: 'Claude Desktop Config' },
  { file: '.vscode/settings.json', name: 'VS Code Settings' },
];

let allValid = true;

configFiles.forEach(({ file, name }) => {
  try {
    console.log(`📄 Checking ${name} (${file})...`);

    if (!fs.existsSync(file)) {
      console.log(`   ❌ File not found: ${file}`);
      allValid = false;
      return;
    }

    const content = fs.readFileSync(file, 'utf8');
    const config = JSON.parse(content);

    console.log(`   ✅ Valid JSON format`);

    // Validate specific structures
    if (file === '.mcprc.json') {
      const servers = config.servers || {};
      const serverCount = Object.keys(servers).length;
      console.log(`   📊 ${serverCount} MCP servers configured`);

      // Check required servers
      const requiredServers = ['angular-cli', 'github-mcp-server', 'playwright-mcp'];
      requiredServers.forEach((serverName) => {
        if (servers[serverName]) {
          console.log(`   ✅ ${serverName} server configured`);
        } else {
          console.log(`   ❌ ${serverName} server missing`);
          allValid = false;
        }
      });
    }

    if (file === 'mcp.json') {
      const servers = config.mcpServers || {};
      const serverCount = Object.keys(servers).length;
      console.log(`   📊 ${serverCount} MCP servers configured`);
    }

    if (file === '.vscode/settings.json') {
      if (config['mcp.configFile']) {
        console.log(`   ✅ MCP config file reference: ${config['mcp.configFile']}`);
      }
    }

    console.log('');
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    allValid = false;
  }
});

// Check documentation
console.log('📚 Checking documentation...');
if (fs.existsSync('docs/MCP_SETUP.md')) {
  console.log('   ✅ MCP setup documentation found');
} else {
  console.log('   ❌ MCP setup documentation missing');
  allValid = false;
}

// Check README reference
const readmeContent = fs.readFileSync('README.md', 'utf8');
if (readmeContent.includes('MCP Support')) {
  console.log('   ✅ README.md includes MCP reference');
} else {
  console.log('   ❌ README.md missing MCP reference');
  allValid = false;
}

console.log('\n🎯 Validation Summary:');
if (allValid) {
  console.log('✅ All MCP configurations are valid and complete!');
  console.log('\n📖 Next steps:');
  console.log('1. Set up environment variables (GITHUB_PERSONAL_ACCESS_TOKEN, BRAVE_API_KEY)');
  console.log('2. Install recommended VS Code extensions');
  console.log('3. Copy mcp.json content to Claude Desktop config if using Claude');
  console.log('4. Start using MCP servers with AI assistants!');
  process.exit(0);
} else {
  console.log('❌ Some MCP configurations have issues that need to be resolved.');
  process.exit(1);
}
