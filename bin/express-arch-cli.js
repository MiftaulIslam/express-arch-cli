#!/usr/bin/env node

import('../dist/index.js').catch((error) => {
  console.error('[express-arch-cli] Failed to start CLI:', error);
  process.exit(1);
});
