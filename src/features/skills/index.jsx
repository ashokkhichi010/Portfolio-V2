import React, { useRef, useEffect, useState, useMemo } from 'react'
import Section from '../../components/Section'
import './styles.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: 'HTML5', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Redux', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
  { name: 'Sass', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Node.js', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Python', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Firebase', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'GraphQL', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'MongoDB', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', category: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Vite', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' },
  { name: 'Three.js', category: 'Animation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg' },
  { name: 'GSAP', category: 'Animation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Figma', category: 'Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
]

// ─── Constants ───────────────────────────────────────────────────────────────

/**
 * The ideal hex width we aim for. The actual width is computed by dividing
 * the container evenly across the calculated column count, so the grid
 * always fills 100% of available space with no edge gaps.
 */
const TARGET_HEX_W = 128 // px
const GAP = 12  // px — space between adjacent hexes

// ─── Layout calculator ───────────────────────────────────────────────────────

/**
 * Given the container's pixel width, return every layout value needed to
 * render the hex grid so it spans exactly that width.
 *
 * Even rows: `cols`     hexes — exactly fill containerWidth.
 * Odd  rows: `cols - 1` hexes — shifted right by (hexW/2 + gap/2).
 *
 * Odd-row fit proof:
 *   oddWidth = offset + (cols-1)*hexW + (cols-2)*gap
 *            = hexW/2 + gap/2 + (cols-1)*hexW + (cols-2)*gap
 *            = (cols - 0.5)*hexW + (cols - 1.5)*gap
 *   evenWidth = cols*hexW + (cols-1)*gap  →  hexW = (containerWidth - (cols-1)*gap) / cols
 *   Substituting: oddWidth = containerWidth − hexW/2 − gap/2  <  containerWidth ✓
 */
function computeLayout(containerWidth) {
  const g = GAP

  // Nearest sensible column count for the target hex width (clamped 2–10)
  const cols = Math.min(10, Math.max(2, Math.round(containerWidth / (TARGET_HEX_W + g))))

  // Exact hex width so `cols` hexes + gaps fill the container precisely
  const hexW = Math.floor((containerWidth - (cols - 1) * g) / cols)

  // Height of a pointy-top hexagon: h = w * 2 / √3
  const hexH = Math.round(hexW * 2 / Math.sqrt(3))

  // Vertical row overlap — standard honeycomb formula:
  //   ADV_Y  = hexH × 0.75 + g × (√3/2)
  //   overlap = hexH − ADV_Y = hexH × 0.25 − g × 0.866
  const overlap = Math.max(0, Math.round(hexH * 0.25 - g * 0.866))

  return { cols, hexW, hexH, gap: g, overlap }
}

// ─── Hook: measure container via ResizeObserver ───────────────────────────────

function useContainerWidth(ref) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Seed with the current size immediately
    setWidth(Math.floor(el.getBoundingClientRect().width))

    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return width
}

// ─── HexCard ─────────────────────────────────────────────────────────────────

function HexCard({ skill, hexW, hexH, animDelay }) {
  const titleSize = Math.max(10, Math.round(hexW * 0.113))
  const subSize = Math.max(8, Math.round(hexW * 0.073))
  const captionPb = Math.round(hexH * 0.185)

  return (
    <div
      className="hex-item"
      style={{ width: hexW, height: hexH, animationDelay: `${animDelay}s` }}
      tabIndex={0}
      role="listitem"
      aria-label={`${skill.name} — ${skill.category}`}
    >
      {/* Keyboard-nav focus ring rendered behind the hex shape */}
      <div className="hex-focus-ring" aria-hidden="true" />

      {/* Clipped hexagonal body */}
      <div className="hex-shape">

        {/* Tech icon — desaturated at rest, full colour on hover */}
        <div className="hex-icon">
          <img src={skill.icon} alt={skill.name} loading="lazy" decoding="async" />
        </div>

        {/* Radial dark vignette */}
        <div className="hex-vignette" aria-hidden="true" />

        {/* Name + category label, revealed on hover */}
        <div className="hex-caption" style={{ padding: `0 8px ${captionPb}px` }}>
          <h3 style={{ fontSize: titleSize }}>{skill.name}</h3>
          <p style={{ fontSize: subSize }}>{skill.category}</p>
        </div>

      </div>
    </div>
  )
}

// ─── SkillsSection ────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const containerRef = useRef(null)
  const containerWidth = useContainerWidth(containerRef)

  // Recompute on every container resize
  const layout = useMemo(
    () => (containerWidth > 0 ? computeLayout(containerWidth) : null),
    [containerWidth]
  )

  /**
   * Slice SKILLS into alternating rows:
   *   even row  → cols     items (fills full width)
   *   odd  row  → cols - 1 items (offset by half a hex; still fully visible)
   */
  const rows = useMemo(() => {
    if (!layout) return []
    const { cols } = layout
    const result = []
    let i = 0, ri = 0

    while (i < SKILLS.length) {
      const count = ri % 2 === 0 ? cols : cols - 1
      if (count <= 0) break
      result.push({
        items: SKILLS.slice(i, i + count),
        isOdd: ri % 2 === 1,
        rowIndex: ri,
      })
      i += count
      ri += 1
    }
    return result
  }, [layout])

  return (
    <Section id="skills" number="02" title="Skills">
      <div
        ref={containerRef}
        className="w-full"
        role="list"
        aria-label="Skills"
      >
        {layout && rows.map(({ items, isOdd, rowIndex }) => (
          <div
            key={rowIndex}
            className="hex-grid-row"
            style={{
              gap: `${layout.gap}px`,
              marginTop: rowIndex === 0 ? 0 : `-${layout.overlap}px`,
              marginLeft: isOdd
                ? `${Math.round(layout.hexW / 2 + layout.gap / 2)}px`
                : 0,
            }}
          >
            {items.map((skill, ci) => (
              <HexCard
                key={skill.name}
                skill={skill}
                hexW={layout.hexW}
                hexH={layout.hexH}
                animDelay={rowIndex * 0.06 + ci * 0.04}
              />
            ))}
          </div>
        ))}
      </div>
    </Section>
  )
}