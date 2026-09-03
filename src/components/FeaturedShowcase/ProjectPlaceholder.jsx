import {
  Html,
} from "@react-three/drei";

import {
  FiCheckCircle,
  FiLoader,
  FiClock,
} from "react-icons/fi";


/* =========================================================
   PROJECT VISUALS
========================================================= */

const DashboardPlaceholder = ({
  accent,
  highlight,
}) => (
  <div className="ph ph-dashboard">

    <div
      className="ph-bar"
      style={{
        background:
          accent,
      }}
    />

    <div className="ph-row">

      <div className="ph-card">

        <div
          className="ph-line"
          style={{
            background:
              highlight,

            width:
              "55%",
          }}
        />

        <div
          className="ph-line"
          style={{
            background:
              "#2e2e33",

            width:
              "80%",
          }}
        />

      </div>


      <div className="ph-card ph-card-lg">

        <div
          className="ph-glow"
          style={{
            background:
              `radial-gradient(
                circle at 40% 40%,
                ${accent}55,
                transparent 70%
              )`,
          }}
        />

      </div>

    </div>

  </div>
);


/* =========================================================
   AI RENDER ENGINE
========================================================= */

const PipelinePlaceholder = ({
  accent,
  highlight,
}) => (
  <div className="ph ph-pipeline">

    <div
      className="ph-node"
      style={{
        borderColor:
          `${accent}40`,
      }}
    >
      2D INPUT
    </div>


    <div className="ph-flow">

      <span
        style={{
          background:
            highlight,
        }}
      />

      <em
        style={{
          color:
            highlight,
        }}
      >
        AI
      </em>

      <span
        style={{
          background:
            highlight,
        }}
      />

    </div>


    <div
      className="ph-node"
      style={{
        borderColor:
          `${accent}40`,
      }}
    >
      3D OUTPUT
    </div>

  </div>
);


/* =========================================================
   AI WEBSITE BUILDER
========================================================= */

const UIBuilderPlaceholder = ({
  highlight,
}) => (
  <div className="ph ph-uibuilder">

    <div className="ph-blocks">
      {[1, 2, 3].map(
        (item) => (
          <div
            key={
              item
            }
            className="ph-block"
            style={{
              borderColor:
                item === 2
                  ? highlight
                  : "#2e2e33",
            }}
          />
        )
      )}
    </div>


    <div className="ph-preview">
      GENERATED WEBSITE
    </div>

  </div>
);


/* =========================================================
   ARCLINE INTERIORS
========================================================= */

const ArchitecturePlaceholder = ({
  accent,
  highlight,
}) => (
  <div className="ph ph-arch">

    <div className="ph-pane">
      INTERIOR
    </div>


    <div
      className="
        ph-pane
        ph-pane-img
      "
      style={{
        background:
          `linear-gradient(
            135deg,
            ${accent}33,
            ${highlight}22
          )`,
      }}
    >
      PROJECTS
    </div>

  </div>
);


/* =========================================================
   GESTURE CONTROLLED MOUSE
========================================================= */

const GestureMousePlaceholder = ({
  accent,
  highlight,
}) => (
  <div className="ph ph-gesture">

    <div className="ph-gesture-screen">

      <div
        className="ph-gesture-hand"
        style={{
          color:
            accent,
        }}
      >
        ✋
      </div>


      <div
        className="ph-gesture-pointer"
        style={{
          color:
            highlight,
        }}
      >
        ↗
      </div>


      <div className="ph-gesture-tracking">
        <span />
        <span />
        <span />
        <span />
      </div>

    </div>


    <div className="ph-gesture-footer">
      <span>
        HAND TRACKING
      </span>

      <span>
        LIVE CONTROL
      </span>
    </div>

  </div>
);


/* =========================================================
   STATUS
========================================================= */

const getStatusDetails = (
  status
) => {
  switch (
    status
  ) {
    case "completed":
      return {
        label:
          "Completed",

        Icon:
          FiCheckCircle,
      };

    case "in-development":
      return {
        label:
          "In Development",

        Icon:
          FiLoader,
      };

    case "future":
      return {
        label:
          "Future Project",

        Icon:
          FiClock,
      };

    default:
      return {
        label:
          "Future Project",

        Icon:
          FiClock,
      };
  }
};


/* =========================================================
   PROJECT PLACEHOLDER
========================================================= */

const ProjectPlaceholder = ({
  project,
  visualType,
  accent,
  highlight,
  isActive,
  isVisible,
  onCardHoverStart,
  onCardHoverEnd,
}) => {


  const renderVisual =
    () => {
      switch (
        visualType
      ) {
        case "dashboard":
          return (
            <DashboardPlaceholder
              accent={
                accent
              }
              highlight={
                highlight
              }
            />
          );

        case "pipeline":
          return (
            <PipelinePlaceholder
              accent={
                accent
              }
              highlight={
                highlight
              }
            />
          );

        case "ui-builder":
          return (
            <UIBuilderPlaceholder
              highlight={
                highlight
              }
            />
          );

        case "architecture":
          return (
            <ArchitecturePlaceholder
              accent={
                accent
              }
              highlight={
                highlight
              }
            />
          );

        case "gesture-mouse":
          return (
            <GestureMousePlaceholder
              accent={
                accent
              }
              highlight={
                highlight
              }
            />
          );

        default:
          return null;
      }
    };


  const status =
    project?.status ||
    "future";


  const {
    label:
      statusLabel,

    Icon:
      StatusIcon,
  } = getStatusDetails(
    status
  );


  const isCompleted =
    status ===
    "completed";


  const hasProjectLink =
    isCompleted &&
    Boolean(
      project?.link
    );


  const classNames = [
    "ph-wrap",

    isActive
      ? "ph-wrap-active"
      : "ph-wrap-side",

    !isVisible
      ? "ph-wrap-hidden"
      : "",
  ]
    .filter(
      Boolean
    )
    .join(
      " "
    );


  const handleMouseEnter =
    () => {
      if (
        isActive
      ) {
        onCardHoverStart?.();
      }
    };


  const handleMouseLeave =
    () => {
      if (
        isActive
      ) {
        onCardHoverEnd?.();
      }
    };


  return (
    <Html
      center
      distanceFactor={6}
      zIndexRange={
        isActive
          ? [20, 0]
          : [5, 0]
      }
    >
      <div
        className={
          classNames
        }
        onMouseEnter={
          handleMouseEnter
        }
        onMouseLeave={
          handleMouseLeave
        }
      >

        <div className="project-card-scene">

          <div className="project-card">

            <div className="project-card-inner">


              <div
                className="
                  project-card-face
                  project-card-front
                "
              >
                {
                  renderVisual()
                }
              </div>


              <div
                className="
                  project-card-face
                  project-card-back
                "
              >

                <div className="project-back-content">


                  <div className="project-title-row">

                    <h4>
                      {
                        project?.title ||
                        "Project"
                      }
                    </h4>


                    <span
                      className={`
                        project-status-inline
                        project-status-${status}
                      `}
                    >
                      <StatusIcon />

                      {
                        statusLabel
                      }
                    </span>

                  </div>


                  {project?.description && (
                    <p className="project-description">
                      {
                        project.description
                      }
                    </p>
                  )}


                  {hasProjectLink && (
                    <a
                      href={
                        project.link
                      }
                      className="
                        project-back-button
                      "
                      target="_blank"
                      rel="noreferrer"
                      onClick={(
                        event
                      ) => {
                        event.stopPropagation();
                      }}
                    >
                      View Project
                      {" "}
                      →
                    </a>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </Html>
  );
};


export default ProjectPlaceholder;