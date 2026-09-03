const FILTERS = [
  {
    id:
      "completed",

    label:
      "Completed",
  },

  {
    id:
      "in-development",

    label:
      "In Development",
  },

  {
    id:
      "future",

    label:
      "Future",
  },
];


const ShowcaseOverlay = ({
  projects,
  activeIndex,
  activeFilter,
  changeProject,
  onFilterChange,
}) => {
  const total =
    projects.length;

  const active =
    projects[
      activeIndex
    ];


  if (
    !active
  ) {
    return null;
  }


  return (
    <div className="showcase-overlay">

      <div className="showcase-hint">
        Drag or use arrows
      </div>


      <div className="showcase-top-right">

        <div
          className="showcase-filter"
          aria-label="Filter projects"
        >
          {FILTERS.map(
            (filter) => {
              const isSelected =
                activeFilter ===
                filter.id;

              return (
                <button
                  key={
                    filter.id
                  }
                  type="button"
                  className={[
                    "showcase-filter-option",

                    isSelected
                      ? "showcase-filter-option-active"
                      : "",
                  ]
                    .filter(
                      Boolean
                    )
                    .join(
                      " "
                    )}
                  onClick={() =>
                    onFilterChange(
                      filter.id
                    )
                  }
                  aria-pressed={
                    isSelected
                  }
                >
                  {
                    filter.label
                  }
                </button>
              );
            }
          )}
        </div>


        <div className="showcase-counter">
          {String(
            activeIndex + 1
          ).padStart(
            2,
            "0"
          )}

          {" / "}

          {String(
            total
          ).padStart(
            2,
            "0"
          )}
        </div>

      </div>


      <button
        type="button"
        className="
          nav-arrow
          left
        "
        onClick={() =>
          changeProject(
            "prev"
          )
        }
        aria-label="
          Previous project
        "
      >
        ←
      </button>


      <button
        type="button"
        className="
          nav-arrow
          right
        "
        onClick={() =>
          changeProject(
            "next"
          )
        }
        aria-label="
          Next project
        "
      >
        →
      </button>


      <div className="showcase-info">

        <div className="tagline">
          {
            active.tagline
          }
        </div>

        <h3
          style={{
            color:
              active.accent,
          }}
        >
          {
            active.title
          }
        </h3>

      </div>

    </div>
  );
};


export default ShowcaseOverlay;