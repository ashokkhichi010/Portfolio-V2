import React, { useRef, useEffect, useState, useMemo } from 'react'
import Section from '../../components/Section'
import './styles.css'
import skillsData from '../../data/skills.json'
import HexCard from './HexCard'
import SkillsSidePanel from './SkillsSidePanel'
import SkillsMobileDrawer from './SkillsMobileDrawer'
import SectionAnalytics from '../../components/SectionAnalytics'

const localSkillIconModules = import.meta.glob('../../assets/icons/*.{svg,png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
})

const localSkillIconMap = Object.fromEntries(
  Object.entries(localSkillIconModules).map(([path, url]) => {
    const normalizedPath = path.replace('../../', '/src/')
    return [normalizedPath, url]
  })
)

const resolveSkillIcon = (icon) => {
  if (typeof icon !== 'string') return icon
  if (!icon.startsWith('/src/assets/')) return icon
  return localSkillIconMap[icon] || icon
}

const SKILLS = skillsData.map((skill, index) => ({ ...skill, icon: resolveSkillIcon(skill.icon), index }));

// ─── Constants ───────────────────────────────────────────────────────────────

const TARGET_HEX_W = 128 // px
const GAP = 12  // px
const minCols = 4
const maxCols = 10

// ─── Layout calculator ───────────────────────────────────────────────────────

function computeLayout(containerWidth) {
  const g = GAP
  const cols = Math.min(maxCols, Math.max(minCols, Math.round(containerWidth / (TARGET_HEX_W + g))))
  const hexW = Math.floor((containerWidth - (cols - 1) * g) / cols)
  const hexH = Math.round(hexW * 2 / Math.sqrt(3))
  const overlap = Math.max(0, Math.round(hexH * 0.25 - g * 0.866))
  return { cols, hexW, hexH, gap: g, overlap }
}

// ─── Hook: measure container via ResizeObserver ───────────────────────────────

function useContainerWidth(ref) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    setWidth(Math.floor(el.getBoundingClientRect().width))

    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return width
}

// ─── SkillsSection ────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const containerRef = useRef(null)
  const containerWidth = useContainerWidth(containerRef)

  const [activeSkill, setActiveSkill] = useState(SKILLS[0])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const layout = useMemo(
    () => (containerWidth > 0 ? computeLayout(containerWidth) : null),
    [containerWidth]
  )

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
    <>
      <SectionAnalytics sectionId="skills" sectionTitle="Skills" />
      <Section id="skills" number="02" title="Skills">
        <div className="skills-container-layout">

          {/* Left Side: Hex Grid */}
          <div
            ref={containerRef}
            className="skills-grid-wrapper"
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
          <SkillsSidePanel activeSkill={activeSkill} />

          {/* Bottom Drawer (Mobile only) */}
          <SkillsMobileDrawer
            activeSkill={activeSkill}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />

        </div>
      </Section>
    </>
  )
}
