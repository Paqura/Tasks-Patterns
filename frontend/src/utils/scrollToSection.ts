import { NAV_ELEMENT_ID, PAGE_SECTIONS_ANCHORS_ELEMENT_ID, CONTACTS_SECTION_ID } from './constants'

export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (element) {
        const headerHeight = document.getElementById(NAV_ELEMENT_ID)?.offsetHeight || 0
        const barHeight =
            document.getElementById(PAGE_SECTIONS_ANCHORS_ELEMENT_ID)?.offsetHeight || 0

        const elementOffsetTop = element.offsetTop - (headerHeight + barHeight)
        const mainEl = document.querySelector('main')

        mainEl?.scrollTo({
            top: elementOffsetTop,
            behavior: 'smooth',
        })
    }
}

export const scrollToContacts = () => scrollToSection(CONTACTS_SECTION_ID)
