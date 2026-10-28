function Node() {}

// Primitives
export const b  = (...content) => Node('b', content)    // bold:          <b>
export const i  = (...content) => Node('i', content)    // italic:        <i>
export const c  = (...content) => Node('code', content) // code:          <code> 
export const u  = (...content) => Node('u', content)    // underline:     <u>
export const s  = (...content) => Node('s', content)    // strike:        <s>
export const a  = (...content) => Node('a', content)    // link:             <a>
export const sp = (...content) => Node('tg-spoiler', content) // spoiler message