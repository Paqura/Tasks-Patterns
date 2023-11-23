const getArrayWithNumbers = (from: number, to: number) =>
    Array.from({ length: to + 1 - from }, (_, i) => i + from)

const maximumNumberOfCells = 7
const maximumNumberOfCellsOnTheSide = (maximumNumberOfCells - 1) / 2

export const getPaginationParams = (page: number, pageCount: number) => {
    let showLeftDots = false
    let showRightDots = false

    let leftNumbers: number[] = []
    let rightNumbers: number[] = []

    if (pageCount > maximumNumberOfCells) {
        const isLeftSideFarAway = page - 1 > maximumNumberOfCellsOnTheSide
        const isRightSideFarAway = pageCount - page > maximumNumberOfCellsOnTheSide

        if (isLeftSideFarAway && isRightSideFarAway) {
            showLeftDots = true
            showRightDots = true

            leftNumbers = [page - 1]
            rightNumbers = [page + 1]
        }

        if (!isLeftSideFarAway && isRightSideFarAway) {
            showRightDots = true

            leftNumbers = getArrayWithNumbers(1, page - 1)

            const extraNumbers = maximumNumberOfCells - leftNumbers.length - 3

            rightNumbers = getArrayWithNumbers(page + 1, page + extraNumbers)
        }

        if (isLeftSideFarAway && !isRightSideFarAway) {
            showLeftDots = true

            rightNumbers = getArrayWithNumbers(page + 1, pageCount)

            const extraNumbers = maximumNumberOfCells - rightNumbers.length - 3

            leftNumbers = getArrayWithNumbers(page - extraNumbers, page - 1)
        }
    } else {
        leftNumbers = getArrayWithNumbers(1, page - 1)
        rightNumbers = getArrayWithNumbers(page + 1, pageCount)
    }

    return { showLeftDots, showRightDots, leftNumbers, rightNumbers }
}
