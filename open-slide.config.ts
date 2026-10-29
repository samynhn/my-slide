import type { OpenSlideConfig } from '@open-slide/core';

declare const process: { env: Record<string, string | undefined> };

const openSlideConfig: OpenSlideConfig = {
  // GitHub Pages serves this repo under /<repo>/; the deploy workflow sets OPEN_SLIDE_BASE.
  base: process.env.OPEN_SLIDE_BASE ?? '/',
};

export default openSlideConfig;
