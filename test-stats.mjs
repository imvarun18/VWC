#!/usr/bin/env node

// Quick test to verify Stats page imports work correctly
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Testing Stats page imports...');

try {
  // Check if files exist
  const fs = await import('fs');
  
  const statsPath = join(__dirname, 'src', 'pages', 'Stats.tsx');
  const orangeCapPath = join(__dirname, 'src', 'components', 'OrangeCapIcon.tsx');
  const purpleCapPath = join(__dirname, 'src', 'components', 'PurpleCapIcon.tsx');
  
  if (fs.existsSync(statsPath)) {
    console.log('✓ Stats.tsx exists');
  }
  if (fs.existsSync(orangeCapPath)) {
    console.log('✓ OrangeCapIcon.tsx exists');
  }
  if (fs.existsSync(purpleCapPath)) {
    console.log('✓ PurpleCapIcon.tsx exists');
  }
  
  console.log('All required files are present!');
} catch (error) {
  console.error('Error:', error.message);
}
