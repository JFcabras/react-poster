import fs from 'fs';
import path from 'path';

const vitePath = path.resolve('node_modules', '.bin', 'vite');

try {
    fs.chmodSync(vitePath, '755'); // Give executable permissions
    console.log('✅ Vite permissions fixed successfully!');
} catch (error) {
    console.error('❌ Failed to fix Vite permissions:', error.message);
}
