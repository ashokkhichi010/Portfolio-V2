import { useEffect, useRef } from 'react'
import { trackAnalyticsEvent } from '../lib/firebase'

export const useSectionAnalytics = (activeSection, sectionTitles = {}) => {
  const trackedSectionsRef = useRef(new Set())

  useEffect(() => {
    if (!activeSection) return undefined
    if (trackedSectionsRef.current.has(activeSection)) return undefined

    trackedSectionsRef.current.add(activeSection)
    trackAnalyticsEvent('section_view', {
      section_id: activeSection,
      section_title: sectionTitles[activeSection] || activeSection,
    })

    return undefined
  }, [activeSection, sectionTitles])
}
