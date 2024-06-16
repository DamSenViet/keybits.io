import { forwardRef } from 'react'

export interface GraphSectionProps {}

const GraphSection = forwardRef<HTMLDivElement, GraphSectionProps>(
  function (_props, ref) {
    return (
      // rulers...
      <div ref={ref} className="h-full">
        {/* do the pattern here */}
        <svg width={'100%'} height={'100%'}>
          <defs>
            <pattern id="grid_unit_lines" width={0.2} height={0.2}>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                className="stroke-muted-foreground/15"
              />
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                className="stroke-muted-foreground/15"
              ></line>
            </pattern>
            {/* aggregte both grid lines into one pattern */}
            <pattern
              id="grid"
              patternUnits="userSpaceOnUse"
              // TODO CALCULATED
              width={100}
              height={100}
              // patternTransform={}
            >
              <rect
                fill="url(#grid_unit_lines)"
                width={100}
                height={100}
                x={0}
                y={0}
              />
            </pattern>
          </defs>
          <rect fill="url(#grid)" width="100%" height="100%" x="0" y="0" />
        </svg>
        <div>
          {/* top left corner block */}
          <div></div>
          {/* top ruler */}
          <div></div>
          <div>
            {/* left ruler */}
            <div></div>
            <div>{/* Content */}</div>
          </div>
        </div>
      </div>
    )
  }
)

export default GraphSection
