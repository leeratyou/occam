import React, { PropsWithChildren, useState, useRef, useLayoutEffect, useMemo } from 'react'

import Element from './Element'

import css from './list.module.css'

interface Props<T> {
  data: T[]
  keyExtractor: (item: T) => string
  renderItem: (item: T) => JSX.Element
  rowHeight: number
  overscan?: number
  before?: JSX.Element
  after?: JSX.Element
}

function List <T>({ data, keyExtractor, renderItem, rowHeight, overscan = 1, before, after }: PropsWithChildren<Props<T>>) {
  const [ scrollPos, setScrollPos ] = useState(0)
  
  const [ listHeight, setHeight ] = useState(1)
  const [ beforeHeight, setBeforeHeight ] = useState(0)
  const [ afterHeight, setAfterHeight ] = useState(0)
  
  const listEl = useRef<HTMLDivElement>(null)
  const beforeEl = useRef<HTMLDivElement>(null)
  const afterEl = useRef<HTMLDivElement>(null)
  
  useLayoutEffect(() => {
    if (beforeEl.current) {
      const beforeCurrentHeight = beforeEl.current.getBoundingClientRect().height
      setBeforeHeight(beforeCurrentHeight)
    }
    
    if (afterEl.current) {
      const afterCurrentHeight = afterEl.current.getBoundingClientRect().height
      setAfterHeight(afterCurrentHeight)
    }
    
    const listHeight = listEl.current!.getBoundingClientRect().height
    setHeight(listHeight)
    
    // Additionally, we can also check height of virtual RowElement to avoid 'rowHeight' property
    
  }, [])
  
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    // Also we can use throttling of 'onScroll'
    window.requestIdleCallback(() => {
      setScrollPos(scrollTop)
    })
  }
  
  const listStyle = useMemo(() => ({
    height: data.length * rowHeight + beforeHeight + afterHeight
  }), [ data.length, rowHeight, beforeHeight, afterHeight ])
  
  const afterStyle = useMemo(() => ({
    top: data.length * rowHeight + beforeHeight
  }), [ data.length, rowHeight, beforeHeight ])
  
  
  return (
    <>
      <div className={css.list} ref={listEl} onScroll={onScroll}>
        <div style={listStyle}>
          {before && <div ref={beforeEl}>{before}</div>}
          {data.map((item, index) => (
            <Element<T>
              key={keyExtractor(item)}
              index={index}
              renderItem={renderItem}
              item={item}
              rowHeight={rowHeight}
              overscan={overscan}
              scrollPos={scrollPos}
              beforeHeight={beforeHeight}
              listHeight={listHeight}
            />
          ))}
          {after && <div ref={afterEl} className={css.after} style={afterStyle}>{after}</div>}
        </div>
      </div>
    </>
  )
}

export default List
