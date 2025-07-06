const fs = require("fs")

function convertToModuleExport(fn) {
    const fnStr = fn.toString().trim();

    // Detect async
    const isAsync = fnStr.startsWith('async') || fnStr.includes('async (');

    // Match function parameters
    const paramMatch = fnStr.match(/\(([^)]*)\)/);
    const params = paramMatch ? paramMatch[1].trim() : '';

    // Match function body
    const bodyMatch = fnStr.match(/{([\s\S]*)}$/);
    const body = bodyMatch ? bodyMatch[1].trim() : '';

    const asyncKeyword = isAsync ? 'async ' : '';

    // Reconstruct
    return `module.exports = ${asyncKeyword}function(${params}) {\n${body}\n}`;
}

const getFilePreamble = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    const preambleLines = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (
            trimmed.startsWith('//') ||                        // comment
            trimmed.startsWith('/*') || trimmed.startsWith('*') || // block comment
            trimmed.startsWith("'use strict'") ||              // strict
            /^\s*(const|let|var)\s+\w+\s*=.*require/.test(line) // require()
        ) {
            preambleLines.push(line);
        } else if (trimmed.startsWith('module.exports')) {
            break;
        } else if (trimmed === '') {
            preambleLines.push(line);
        } else {
            break;
        }
    }

    return preambleLines.join('\n');
};

const helperCLI = {
    convertToModuleExport, getFilePreamble
}

module.exports = helperCLI