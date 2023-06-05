import { highlightPreTag, highlightPostTag } from '@/utils/meilisearchApi'

const maxCharNumberOnSides = 100

type TTagCoords = {
    startIndex: number
    endIndex: number
}

const getFirstTag = (str: string, preTag: string, postTag: string): TTagCoords | null => {
    const preTagStartIndex = str.indexOf(preTag)
    const postTagStartIndex = str.indexOf(postTag)

    if (preTagStartIndex === -1 || postTagStartIndex === -1) {
        return null
    }

    return {
        startIndex: preTagStartIndex,
        endIndex: postTagStartIndex + postTag.length,
    }
}

const getAllTags = (str: string, preTag: string, postTag: string): TTagCoords[] => {
    const result: TTagCoords[] = []

    let temp = str

    while (temp.length > 0) {
        const tagCoords = getFirstTag(temp, preTag, postTag)

        if (tagCoords) {
            let prevTagEndIndex = 0

            if (result.length) {
                prevTagEndIndex = result[result.length - 1].endIndex
            }

            result.push({
                startIndex: tagCoords.startIndex + prevTagEndIndex,
                endIndex: tagCoords.endIndex + prevTagEndIndex,
            })

            temp = temp.slice(tagCoords.endIndex)
        } else {
            break
        }
    }

    return result
}

export const normalizeDescription = (str: string) => {
    const allTags = getAllTags(str, highlightPreTag, highlightPostTag)

    if (allTags.length === 0) {
        return str.slice(0, maxCharNumberOnSides * 2) + '...'
    }

    const [firstTag, ...restTags] = allTags

    let startIndexToCut = 0
    let endIndexToCut = str.length

    if (firstTag.startIndex > maxCharNumberOnSides) {
        startIndexToCut = firstTag.startIndex - maxCharNumberOnSides
    }

    if (str.length - firstTag.endIndex > maxCharNumberOnSides) {
        endIndexToCut = firstTag.endIndex + maxCharNumberOnSides

        const tagIntersectingWithCut = restTags.find(
            (tag) => tag.startIndex < endIndexToCut && tag.endIndex > endIndexToCut
        )

        if (tagIntersectingWithCut) {
            endIndexToCut = tagIntersectingWithCut.startIndex
        }
    }

    let result = str.slice(startIndexToCut, endIndexToCut)

    if (startIndexToCut !== 0) {
        result = '...' + result
    }

    if (endIndexToCut !== str.length) {
        result = result + '...'
    }

    return result
}
