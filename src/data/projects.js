export const projects = [
  {
    id: 1,
    title: "StudioOS",
    accent: "#534AB7",
    highlight: "#854F0B",

    tagline:
      "AI-Powered Creative Operating System",

    visualType:
      "dashboard",

    status:
      "in-development",

    description:
      "An AI-powered creative operating system that brings research, scripting, assets, generation, animation, rendering, and quality control into one intelligent workflow.",
  },

  {
    id: 2,
    title: "AI Render Engine",
    accent: "#185FA5",
    highlight: "#0F6E56",

    tagline:
      "2D → 3D Generative Pipeline",

    visualType:
      "pipeline",

    status:
      "future",

    description:
      "A future AI-powered pipeline designed to transform 2D concepts and visual inputs into intelligent 3D assets and render-ready experiences.",
  },

  {
    id: 3,
    title: "AI Website Builder",
    accent: "#534AB7",
    highlight: "#185FA5",

    tagline:
      "AI-Assembled Web Experiences",

    visualType:
      "ui-builder",

    status:
      "future",

    description:
      "A future AI platform focused on transforming ideas and requirements into custom websites, interfaces, and interactive digital experiences.",
  },

  {
    id: 4,
    title: "Arcline Interiors",
    accent: "#0F6E56",
    highlight: "#854F0B",

    tagline:
      "Interior Design & Digital Experience",

    visualType:
      "architecture",

    status:
      "completed",

    description:
      "A completed digital experience for an interior design brand, featuring a modern portfolio, project showcase, responsive layouts, and client-focused functionality.",

    link:
      "https://arcline-interiors-demo.vercel.app/",
  },

  {
    id: 5,
    title: "Gesture Controlled Mouse",
    accent: "#185FA5",
    highlight: "#534AB7",

    tagline:
      "Computer Vision Interaction",

    visualType:
      "gesture-mouse",

    status:
      "completed",

    description:
      "A completed computer vision project that uses hand gestures to control mouse movement and interactions through real-time hand tracking.",

    link:
      "https://github.com/subrotosaha2002/Gesture-Controlled-Mouse",
  },
];


export const getAdjacentIndex = (
  activeIndex,
  direction,
  total
) => {
  if (
    total <= 0
  ) {
    return 0;
  }

  if (
    direction === "next"
  ) {
    return (
      activeIndex + 1
    ) % total;
  }

  return (
    activeIndex -
    1 +
    total
  ) % total;
};