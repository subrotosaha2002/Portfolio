import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ShowcaseScene from "./ShowcaseScene";
import ShowcaseOverlay from "./ShowcaseOverlay";

import {
  projects,
} from "../../data/projects";

import "./showcase.css";


const AUTO_ROTATE_DELAY =
  2000;

const TRANSITION_DURATION =
  900;


const FeaturedShowcase = () => {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    activeFilter,
    setActiveFilter,
  ] = useState(null);


  const isInteractingRef =
    useRef(false);

  const isCardHoveredRef =
    useRef(false);

  const isTransitioningRef =
    useRef(false);

  const autoRotateTimeoutRef =
    useRef(null);

  const transitionTimeoutRef =
    useRef(null);

  const changeProjectRef =
    useRef(null);


  /* =========================================================
     FILTERED PROJECTS
  ========================================================= */

  const filteredProjects =
    useMemo(() => {
      if (
        !activeFilter
      ) {
        return projects;
      }

      return projects.filter(
        (project) =>
          project.status ===
          activeFilter
      );
    }, [
      activeFilter,
    ]);


  /* =========================================================
     KEEP ACTIVE INDEX VALID
  ========================================================= */

  useEffect(() => {
    setActiveIndex(0);
  }, [
    activeFilter,
  ]);


  /* =========================================================
     CLEAR AUTO ROTATION
  ========================================================= */

  const clearAutoRotation =
    useCallback(() => {
      if (
        autoRotateTimeoutRef.current
      ) {
        clearTimeout(
          autoRotateTimeoutRef.current
        );

        autoRotateTimeoutRef.current =
          null;
      }
    }, []);


  /* =========================================================
     SCHEDULE AUTO ROTATION
  ========================================================= */

  const scheduleAutoRotation =
    useCallback(() => {
      clearAutoRotation();

      if (
        filteredProjects.length <=
        1
      ) {
        return;
      }

      autoRotateTimeoutRef.current =
        setTimeout(() => {
          const shouldPause =
            isInteractingRef.current ||
            isCardHoveredRef.current ||
            isTransitioningRef.current;

          if (
            !shouldPause
          ) {
            changeProjectRef.current?.(
              "next"
            );
          }
        }, AUTO_ROTATE_DELAY);
    }, [
      clearAutoRotation,
      filteredProjects.length,
    ]);


  /* =========================================================
     PROJECT NAVIGATION
  ========================================================= */

  const changeProject =
    useCallback(
      (direction) => {
        if (
          isTransitioningRef.current ||
          filteredProjects.length <=
            1
        ) {
          return;
        }

        clearAutoRotation();

        isTransitioningRef.current =
          true;

        setActiveIndex(
          (currentIndex) => {
            if (
              direction ===
              "next"
            ) {
              return (
                currentIndex +
                1
              ) %
                filteredProjects.length;
            }

            return (
              currentIndex -
              1 +
              filteredProjects.length
            ) %
              filteredProjects.length;
          }
        );

        if (
          transitionTimeoutRef.current
        ) {
          clearTimeout(
            transitionTimeoutRef.current
          );
        }

        transitionTimeoutRef.current =
          setTimeout(() => {
            isTransitioningRef.current =
              false;

            if (
              !isInteractingRef.current &&
              !isCardHoveredRef.current
            ) {
              scheduleAutoRotation();
            }
          }, TRANSITION_DURATION);
      },
      [
        clearAutoRotation,
        filteredProjects.length,
        scheduleAutoRotation,
      ]
    );


  /* =========================================================
     STORE LATEST NAVIGATION FUNCTION
  ========================================================= */

  useEffect(() => {
    changeProjectRef.current =
      changeProject;
  }, [
    changeProject,
  ]);


  /* =========================================================
     AUTO ROTATION
  ========================================================= */

  useEffect(() => {
    scheduleAutoRotation();

    return () => {
      clearAutoRotation();
    };
  }, [
    scheduleAutoRotation,
    clearAutoRotation,
  ]);


  /* =========================================================
     FILTER HANDLER
  ========================================================= */

  const handleFilterChange =
    (filterId) => {
      clearAutoRotation();

      setActiveFilter(
        (currentFilter) => {
          if (
            currentFilter ===
            filterId
          ) {
            return null;
          }

          return filterId;
        }
      );
    };


  /* =========================================================
     KEYBOARD NAVIGATION
  ========================================================= */

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          "ArrowLeft"
        ) {
          event.preventDefault();

          changeProject(
            "prev"
          );
        }

        if (
          event.key ===
          "ArrowRight"
        ) {
          event.preventDefault();

          changeProject(
            "next"
          );
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    changeProject,
  ]);


  /* =========================================================
     INTERACTION HANDLERS
  ========================================================= */

  const handleInteractionStart =
    () => {
      clearAutoRotation();

      isInteractingRef.current =
        true;
    };


  const handleInteractionEnd =
    () => {
      isInteractingRef.current =
        false;

      if (
        !isCardHoveredRef.current &&
        !isTransitioningRef.current
      ) {
        scheduleAutoRotation();
      }
    };


  const handleCardHoverStart =
    () => {
      clearAutoRotation();

      isCardHoveredRef.current =
        true;
    };


  const handleCardHoverEnd =
    () => {
      isCardHoveredRef.current =
        false;

      if (
        !isInteractingRef.current &&
        !isTransitioningRef.current
      ) {
        scheduleAutoRotation();
      }
    };


  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      clearAutoRotation();

      if (
        transitionTimeoutRef.current
      ) {
        clearTimeout(
          transitionTimeoutRef.current
        );
      }
    };
  }, [
    clearAutoRotation,
  ]);


  if (
    filteredProjects.length === 0
  ) {
    return null;
  }


  return (
    <section
      id="work"
      className="showcase"
    >
      <ShowcaseScene
        projects={
          filteredProjects
        }
        activeIndex={
          activeIndex
        }
        changeProject={
          changeProject
        }
        onInteractionStart={
          handleInteractionStart
        }
        onInteractionEnd={
          handleInteractionEnd
        }
        onCardHoverStart={
          handleCardHoverStart
        }
        onCardHoverEnd={
          handleCardHoverEnd
        }
      />

      <ShowcaseOverlay
        projects={
          filteredProjects
        }
        activeIndex={
          activeIndex
        }
        activeFilter={
          activeFilter
        }
        changeProject={
          changeProject
        }
        onFilterChange={
          handleFilterChange
        }
      />
    </section>
  );
};


export default FeaturedShowcase;