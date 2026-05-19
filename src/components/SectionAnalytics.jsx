import { useSectionAnalytics } from '../hooks/useSectionAnalytics'

const SectionAnalytics = ({ sectionId, sectionTitle }) => {
  useSectionAnalytics(sectionId, sectionTitle)
  return null
}

export default SectionAnalytics
