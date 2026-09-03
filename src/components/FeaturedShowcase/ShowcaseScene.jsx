import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  useThree,
} from "@react-three/fiber";

import {
  PerspectiveCamera,
} from "@react-three/drei";

import PerspectiveGrid from "./PerspectiveGrid";
import ProjectGroup from "./ProjectGroup";


const DRAG_DISTANCE =
  240;


const ShowcaseContent = ({
  projects,
  activeIndex,
  changeProject,
  onInteractionStart,
  onInteractionEnd,
  onCardHoverStart,
  onCardHoverEnd,
}) => {
  const {
    camera,
  } = useThree();


  const dragStartRef =
    useRef(null);

  const isDraggingRef =
    useRef(false);


  const [
    dragOffset,
    setDragOffset,
  ] = useState(0);


  useEffect(() => {
    camera.position.set(
      0,
      1.1,
      4.4
    );

    camera.lookAt(
      0,
      0,
      0
    );
  }, [
    camera,
  ]);


  const handlePointerDown =
    (event) => {
      dragStartRef.current =
        event.clientX;

      isDraggingRef.current =
        true;

      onInteractionStart();
    };


  const handlePointerMove =
    (event) => {
      if (
        !isDraggingRef.current ||
        dragStartRef.current === null
      ) {
        return;
      }

      const distance =
        event.clientX -
        dragStartRef.current;

      const normalized =
        Math.max(
          -1,
          Math.min(
            1,
            distance /
              DRAG_DISTANCE
          )
        );

      setDragOffset(
        normalized
      );
    };


  const finishDrag =
    (event) => {
      if (
        dragStartRef.current === null
      ) {
        return;
      }

      const distance =
        event.clientX -
        dragStartRef.current;

      const threshold =
        70;

      isDraggingRef.current =
        false;

      dragStartRef.current =
        null;

      if (
        Math.abs(
          distance
        ) >= threshold
      ) {
        if (
          distance > 0
        ) {
          changeProject(
            "prev"
          );
        } else {
          changeProject(
            "next"
          );
        }
      }

      setDragOffset(
        0
      );

      onInteractionEnd();
    };


  const cancelDrag =
    () => {
      isDraggingRef.current =
        false;

      dragStartRef.current =
        null;

      setDragOffset(
        0
      );

      onInteractionEnd();
    };


  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={50}
        position={[
          0,
          1.1,
          4.4,
        ]}
      />

      <ambientLight
        intensity={0.6}
      />

      <PerspectiveGrid />

      {projects.map(
        (
          project,
          index
        ) => (
          <ProjectGroup
            key={
              project.id
            }
            project={
              project
            }
            index={
              index
            }
            total={
              projects.length
            }
            activeIndex={
              activeIndex
            }
            dragOffset={
              dragOffset
            }
            onCardHoverStart={
              index === activeIndex
                ? onCardHoverStart
                : undefined
            }
            onCardHoverEnd={
              index === activeIndex
                ? onCardHoverEnd
                : undefined
            }
          />
        )
      )}

      <mesh
        position={[
          0,
          0,
          -2,
        ]}
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          finishDrag
        }
        onPointerCancel={
          cancelDrag
        }
        onPointerOut={
          cancelDrag
        }
      >
        <planeGeometry
          args={[
            20,
            12,
          ]}
        />

        <meshBasicMaterial
          transparent
          opacity={0}
        />
      </mesh>
    </>
  );
};


const ShowcaseScene = ({
  projects,
  activeIndex,
  changeProject,
  onInteractionStart,
  onInteractionEnd,
  onCardHoverStart,
  onCardHoverEnd,
}) => {
  return (
    <Canvas
      className="showcase-canvas"
      gl={{
        antialias: true,
        alpha: false,
      }}
      onCreated={({
        gl,
      }) => {
        gl.setClearColor(
          "#0a0b0f"
        );
      }}
    >
      <ShowcaseContent
        projects={
          projects
        }
        activeIndex={
          activeIndex
        }
        changeProject={
          changeProject
        }
        onInteractionStart={
          onInteractionStart
        }
        onInteractionEnd={
          onInteractionEnd
        }
        onCardHoverStart={
          onCardHoverStart
        }
        onCardHoverEnd={
          onCardHoverEnd
        }
      />
    </Canvas>
  );
};


export default ShowcaseScene;