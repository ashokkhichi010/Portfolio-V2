import React, { useRef, useEffect, useState, useMemo } from 'react'
import Section from '../../components/Section'
import './styles.css'

// ─── Data ────────────────────────────────────────────────────────────────────

const SKILLS = [
  { name: 'HTML5', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', bg: 'hsla(15, 75%, 25%, 0.47)', duration: '6 Years', experience: 'HTML5, Semantic UI, Accessibility' },
  { name: 'CSS3', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', bg: 'hsla(205, 75%, 25%, 0.47)', duration: '6 Years', experience: 'CSS3, Flexbox, Grid, Animations' },
  { name: 'JavaScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', bg: 'hsla(53, 75%, 20%, 0.47)', duration: '4 Years', experience: 'ES6+, DOM Manipulation, Async/Await' },
  { name: 'TypeScript', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', bg: 'hsla(211, 60%, 30%, 0.47)', duration: '3 Years', experience: 'Strong typing, Interfaces, Generics' },
  { name: 'React', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', bg: 'hsla(193, 70%, 25%, 0.47)', duration: '4 Years', experience: 'Hooks, Context, Redux, SPA' },
  { name: 'Next.js', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', bg: 'hsla(0, 0%, 20%, 0.47)', duration: '2 Years', experience: 'SSR, SSG, API Routes' },
  { name: 'Tailwind', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', bg: 'hsla(177, 60%, 25%, 0.47)', duration: '3 Years', experience: 'Utility-first styling, Custom themes' },
  { name: 'Redux', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', bg: 'hsla(263, 50%, 30%, 0.47)', duration: '3 Years', experience: 'State management, Redux Toolkit' },
  { name: 'Sass', category: 'Frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', bg: 'hsla(330, 50%, 30%, 0.47)', duration: '4 Years', experience: 'Mixins, Variables, Nesting' },
  { name: 'Node.js', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', bg: 'hsla(120, 50%, 25%, 0.47)', duration: '4 Years', experience: 'REST APIs, Streams, File System' },
  { name: 'Express', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', bg: 'hsla(0, 0%, 15%, 0.47)', duration: '4 Years', experience: 'Middleware, Routing, Error handling' },
  { name: 'Python', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', bg: 'hsla(207, 60%, 30%, 0.47)', duration: '3 Years', experience: 'Scripts, Data processing, Django' },
  { name: 'Firebase', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', bg: 'hsla(45, 80%, 25%, 0.47)', duration: '2 Years', experience: 'Auth, Firestore, Cloud Functions' },
  { name: 'GraphQL', category: 'Backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', bg: 'hsla(320, 80%, 25%, 0.47)', duration: '1 Year', experience: 'Queries, Mutations, Resolvers' },
  { name: 'MongoDB', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', bg: 'hsla(120, 45%, 25%, 0.47)', duration: '3 Years', experience: 'NoSQL, Aggregations, Mongoose' },
  { name: 'PostgreSQL', category: 'Database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', bg: 'hsla(207, 50%, 30%, 0.47)', duration: '2 Years', experience: 'Relational DB, Joins, Indexing' },
  { name: 'Docker', category: 'DevOps', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', bg: 'hsla(206, 75%, 30%, 0.47)', duration: '2 Years', experience: 'Containerization, Docker Compose' },
  { name: 'Git', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', bg: 'hsla(10, 80%, 30%, 0.47)', duration: '5 Years', experience: 'Version control, Branching, Merging' },
  { name: 'Vite', category: 'Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg', bg: 'hsla(237, 80%, 40%, 0.47)', duration: '2 Years', experience: 'Fast builds, Dev server, Plugins' },
  { name: 'Three.js', category: 'Animation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg', bg: 'hsla(0, 0%, 10%, 0.47)', duration: '1 Year', experience: '3D scenes, Materials, Lighting' },
  { name: 'GSAP', category: 'Animation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', bg: 'hsla(79, 80%, 20%, 0.47)', duration: '2 Years', experience: 'Timelines, ScrollTrigger, Physics' },
  { name: 'Figma', category: 'Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', bg: 'hsla(14, 80%, 30%, 0.47)', duration: '3 Years', experience: 'UI/UX Mockups, Prototyping, Tokens' },
].map((skill, index) => ({ ...skill, index }))

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

function HexCard({ skill, hexW, hexH, animDelay, onHover, onClick }) {
  const titleSize = Math.max(10, Math.round(hexW * 0.113))
  const subSize = Math.max(8, Math.round(hexW * 0.073))
  const captionPb = Math.round(hexH * 0.185)

  // Use the background color explicitly defined in the SKILLS data
  const bgColor = skill.bg

  return (
    <div
      className="hex-item"
      style={{ width: hexW, height: hexH, animationDelay: `${animDelay}s` }}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} — ${skill.category}`}
      onMouseEnter={() => onHover(skill)}
      onFocus={() => onHover(skill)}
      onClick={() => onClick(skill)}
    >
      {/* Keyboard-nav focus ring rendered behind the hex shape */}
      <div className="hex-focus-ring" aria-hidden="true" />

      {/* Clipped hexagonal body */}
      <div className="hex-shape" style={{ backgroundColor: bgColor }}>

        {/* Tech icon — desaturated at rest, full colour on hover */}
        <div className="hex-icon">
          <img src={skill.icon} alt={skill.name} loading="lazy" decoding="async" />
        </div>

        {/* Radial dark vignette */}
        {/* <div className="hex-vignette" aria-hidden="true" /> */}

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
  
  const [activeSkill, setActiveSkill] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
      <div className="flex flex-col lg:flex-row w-full relative min-h-[500px]">
        
        {/* Left Side: Hex Grid */}
        <div
          ref={containerRef}
          className="w-full lg:w-[65%] shrink-0"
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
                  onHover={(s) => setActiveSkill(s)}
                  onClick={(s) => { setActiveSkill(s); setIsDrawerOpen(true); }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Right Side Panel (Desktop only) */}
        <div className="hidden lg:flex w-full lg:w-[35%] flex-col justify-center items-start skills-side-panel pl-12 pr-6">
          <div className="panel-content-wrap">
            {activeSkill ? (
              <div key={activeSkill.name} className="code-description fade-in">
                <p className="code-title" style={{ color: activeSkill.bg.replace('0.47', '1') }}>
                  {activeSkill.name.toUpperCase()}
                </p>
                <div className="desc-block">
                  <p className="desc-label">Duration:</p>
                  <p className="desc-value">{activeSkill.duration}</p>
                </div>
                <div className="desc-block">
                  <p className="desc-label">Experience:</p>
                  <p className="desc-value">{activeSkill.experience}</p>
                </div>
                <div className="code-icon" style={{ filter: 'grayscale(0) brightness(1.5)' }}>
                  <img src={activeSkill.icon} alt={activeSkill.name} />
                </div>
              </div>
            ) : (
              <div className="code-description placeholder fade-in">
                <p className="code-title text-gray-500">HOVER A SKILL</p>
                <p className="text-gray-400 mt-2">Explore my technical experience.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Drawer (Mobile only) */}
        <div className={`skills-mobile-drawer lg:hidden ${isDrawerOpen ? 'open' : ''}`}>
          <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="drawer-content">
            <div className="drawer-handle" onClick={() => setIsDrawerOpen(false)}></div>
            {activeSkill && (
              <div className="code-description">
                <div className="flex justify-between items-start mb-6">
                  <p className="code-title m-0" style={{ color: activeSkill.bg.replace('0.47', '1') }}>
                    {activeSkill.name.toUpperCase()}
                  </p>
                  <div className="code-icon-mobile">
                    <img src={activeSkill.icon} alt={activeSkill.name} className="w-12 h-12 object-contain" />
                  </div>
                </div>
                <div className="desc-block">
                  <p className="desc-label">Duration:</p>
                  <p className="desc-value">{activeSkill.duration}</p>
                </div>
                <div className="desc-block">
                  <p className="desc-label">Experience:</p>
                  <p className="desc-value">{activeSkill.experience}</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </Section>
  )
}