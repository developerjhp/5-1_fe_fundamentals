export const getFormattedKRPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
}

export const getFormattedKRDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}