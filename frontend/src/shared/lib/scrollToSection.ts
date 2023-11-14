import { CONTACTS_SECTION_ID, NAV_ELEMENT_ID, PAGE_SECTIONS_ANCHORS_ELEMENT_ID } from './constants'

const getElementHeightById = (id: string) => document.getElementById(id)?.offsetHeight || 0

export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (!element) return

    const headerHeight = getElementHeightById(NAV_ELEMENT_ID)
    const barHeight = getElementHeightById(PAGE_SECTIONS_ANCHORS_ELEMENT_ID)

    const elementOffsetTop = element.offsetTop - (headerHeight + barHeight)
    const scrollContainer = window

    scrollContainer?.scrollTo({
        top: elementOffsetTop,
        behavior: 'smooth',
    })
}

export const scrollToContacts = () => scrollToSection(CONTACTS_SECTION_ID)
