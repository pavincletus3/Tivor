// 5 visible cards distributed around the wordmark (some overlap it — text renders on top).
// 4 off-screen cards revealed by mouse parallax.
// Aspect ratios chosen so heights stay bounded at any viewport ratio up to 21:9.
export const CARDS = [
  { tile: "tile-1", ar: "4/3",  img: "/logos/manuf-ai.png"                            }, // 1  left-center   — bleeds left
  { tile: "tile-2", ar: "16/9", img: "/services/Strategic AI System Design.jpeg"      }, // 2  top-right      — bleeds top
  { tile: "tile-3", ar: "16/9", img: "/services/Manufacturing Intelligence Systems.jpeg" }, // 3  right-peek     — bleeds right
  { tile: "tile-4", ar: "4/3",  img: "/logos/procure-ai.png"                          }, // 4  bottom-left    — bleeds bottom
  { tile: "tile-5", ar: "4/3",  img: "/services/Procurement Intelligence Systems.jpeg" }, // 5  bottom-right   — bleeds right + bottom
  { tile: "tile-6", ar: "4/3",  img: "/products/jobready.jpeg"                        }, // 6  far-left       (off-screen)
  { tile: "tile-7", ar: "4/3",  img: "/services/Worksimulation.jpeg"                  }, // 7  top-center     (off-screen)
  { tile: "tile-8", ar: "4/3",  img: "/logos/observex.jpg"                            }, // 8  below          (off-screen)
  { tile: "tile-2", ar: "4/3",  img: "/products/intercom.jpeg"                        }, // 9  far-right      (off-screen)
];
