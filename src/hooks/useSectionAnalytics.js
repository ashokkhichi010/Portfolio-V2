import { useEffect } from 'react'
import { trackAnalyticsEvent } from '../lib/firebase'

export const useSectionAnalytics = (sectionId, sectionTitle) => {
  useEffect(() => {
    if (!sectionId) return undefined

    const sectionElement = document.getElementById(sectionId)
    if (!sectionElement) return undefined

    let hasTracked = false

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasTracked) return

          hasTracked = true
          trackAnalyticsEvent('section_view', {
            section_id: sectionId,
            section_title: sectionTitle || sectionId,
          })
        })
      },
      {
        root: null,
        threshold: 0.45,
      }
    )

    observer.observe(sectionElement)

    return () => observer.disconnect()
  }, [sectionId, sectionTitle])
}
