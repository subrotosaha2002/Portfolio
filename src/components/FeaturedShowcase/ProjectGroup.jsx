import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import ProjectPlaceholder from "./ProjectPlaceholder";
import { projects } from "../../data/projects";

const POS = {
  active: [0, 0.1, 0],

  left: [
    -3.1,
    0.25,
    -1.4,
  ],

  right: [
    3.1,
    0.25,
    -1.4,
  ],

  hiddenLeft: [
    -6.5,
    0.2,
    -3.5,
  ],

  hiddenRight: [
    6.5,
    0.2,
    -3.5,
  ],
};

const ProjectGroup = ({
  project,
  index,
  activeIndex,
  onCardHoverStart,
  onCardHoverEnd,
}) => {
  const groupRef = useRef(null);

  const total = projects.length;

  const isActive =
    index === activeIndex;

  /*
   * There is no left/right neighbour
   * when only one project exists.
   */
  const isLeft =
    total >= 3 &&
    index ===
      (activeIndex - 1 + total) %
        total;

  const isRight =
    index ===
    (activeIndex + 1) %
      total;

  /*
   * With exactly two projects,
   * the non-active project appears
   * on the right side.
   */
  const isSecondProject =
    total === 2 &&
    !isActive;

  const isVisible =
    isActive ||
    isLeft ||
    isRight ||
    isSecondProject;

  let targetPosition =
    POS.hiddenRight;

  let targetScale = 0.35;

  let targetRotationY = -0.28;

  if (isActive) {
    targetPosition =
      POS.active;

    targetScale = 1;

    targetRotationY = 0;
  } else if (isLeft) {
    targetPosition =
      POS.left;

    targetScale = 0.62;

    targetRotationY = 0.18;
  } else if (
    isRight ||
    isSecondProject
  ) {
    targetPosition =
      POS.right;

    targetScale = 0.62;

    targetRotationY = -0.18;
  } else {
    const relativeIndex =
      (index - activeIndex + total) %
      total;

    const goesRight =
      relativeIndex < total / 2;

    targetPosition =
      goesRight
        ? POS.hiddenRight
        : POS.hiddenLeft;

    targetRotationY =
      goesRight
        ? -0.28
        : 0.28;
  }

  useEffect(() => {
    if (!groupRef.current) return;

    const group =
      groupRef.current;

    gsap.killTweensOf(
      group.position
    );

    gsap.killTweensOf(
      group.scale
    );

    gsap.killTweensOf(
      group.rotation
    );

    const timeline =
      gsap.timeline({
        defaults: {
          duration: 0.9,
          ease: "power3.inOut",
          overwrite: "auto",
        },
      });

    timeline.to(
      group.position,
      {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2],
      },
      0
    );

    timeline.to(
      group.scale,
      {
        x: targetScale,
        y: targetScale,
        z: targetScale,
      },
      0
    );

    timeline.to(
      group.rotation,
      {
        y: targetRotationY,
      },
      0
    );

    return () => {
      timeline.kill();
    };
  }, [
    activeIndex,
    targetScale,
    targetRotationY,
    targetPosition,
  ]);

  const initialPositionRef =
    useRef(targetPosition);

  const initialScaleRef =
    useRef(targetScale);

  const initialRotationRef =
    useRef(targetRotationY);

  return (
    <group
      ref={groupRef}
      position={
        initialPositionRef.current
      }
      scale={
        initialScaleRef.current
      }
      rotation={[
        0,
        initialRotationRef.current,
        0,
      ]}
    >
      <ProjectPlaceholder
  project={project}
  visualType={
    project.visualType
  }
  accent={
    project.accent
  }
  highlight={
    project.highlight
  }
  isActive={isActive}
  isVisible={isVisible}
  onCardHoverStart={
    isActive
      ? onCardHoverStart
      : undefined
  }
  onCardHoverEnd={
    isActive
      ? onCardHoverEnd
      : undefined
  }
/>
    </group>
  );
};

export default ProjectGroup;