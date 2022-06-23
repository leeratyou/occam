import React, { PropsWithChildren, useMemo } from 'react'

import css from './list.module.css'

interface Props<T> {
  index: number
  renderItem: any
  item: T
  rowHeight: number
  overscan: number
  listHeight: number
  beforeHeight: number
  scrollPos: number
}

function Element <T>({ renderItem, item, rowHeight, index, overscan, beforeHeight, listHeight, scrollPos }: PropsWithChildren<Props<T>>) {
  
  const topPos = index * rowHeight + beforeHeight
  const isVisible = (topPos + rowHeight * overscan) > scrollPos && (topPos - rowHeight * overscan) < (scrollPos + listHeight)
  
  const elementStyle = useMemo(() => ({ height: rowHeight, top: topPos }), [ rowHeight, topPos ])
  
  if (!isVisible) return null
  
  return (
    <div className={css.element} style={elementStyle}>
      {renderItem(item)}
    </div>
  )
}

export default Element
