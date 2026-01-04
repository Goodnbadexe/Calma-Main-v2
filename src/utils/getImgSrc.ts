export type ImgLike = string | { src: string } | any
export const getImgSrc = (img: ImgLike, fallback = '/logo.png') =>
  typeof img === 'string' ? img : (img?.src ?? fallback)
