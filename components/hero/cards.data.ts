// 5 visible cards distributed around the wordmark (some overlap it — text renders on top).
// 4 off-screen cards revealed by mouse parallax.
// Aspect ratios chosen so heights stay bounded at any viewport ratio up to 21:9.
export const CARDS = [
  { tile: "tile-1", ar: "4/3"  }, // 1  left-center   — bleeds left
  { tile: "tile-2", ar: "16/9" }, // 2  top-right      — bleeds top
  { tile: "tile-3", ar: "16/9" }, // 3  right-peek     — bleeds right
  { tile: "tile-4", ar: "4/3"  }, // 4  bottom-left    — bleeds bottom
  { tile: "tile-5", ar: "4/3"  }, // 5  bottom-right   — bleeds right + bottom
  { tile: "tile-6", ar: "4/3"  }, // 6  far-left       (off-screen)
  { tile: "tile-7", ar: "4/3"  }, // 7  top-center     (off-screen)
  { tile: "tile-8", ar: "4/3"  }, // 8  below          (off-screen)
  { tile: "tile-2", ar: "4/3"  }, // 9  far-right      (off-screen)
];
