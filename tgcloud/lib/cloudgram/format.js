const ESCAPE_MAP = {
	'&': '&amp',
	'<': '&lt',
	'>': '&gt',
	'"': '&quot'
}

function escapeText(value) {
	return String(value ?? '').replace(/[&<>]/g, char => ESCAPE_MAP[char])
}

function escapeAttr(value) {
	return String(value ?? '').replace(/[&<>"]/g, char => ESCAPE_MAP[char])
}

function Node(tagName, extra = {}, ...content) {
	return { tagName, content, extra }
}

function isNode(node) {
	return node != null && typeof node === 'object' && typeof node.tagName === 'string'
}

function joinSmart(parts) {
	const filtered = parts.filter(p => p !== '')
	let out = ''
	
	for (let i = 0; i < filtered.length; i++) {
		if (i > 0) {
			const prev = filtered[i - 1]
			const curr = filtered[i]
			if (!/\s$/.test(prev) && !/^\s/.test(curr)) out += ' '
		}

		out += filtered[i]
	}

	return out
}

export function render(node) {
	if (node == null || node === false) return ''
	if (Array.isArray(node)) return joinSmart(node.map(render))
	if (typeof node === 'string') return escapeText(node)
	if (typeof node === 'number') return String(node)
	if (!isNode(node)) throw new TypeError(`render: ${typeof node}`)

	const content = joinSmart(node.content.map(render))

	switch (node.tagName) {
		case '':
			return content
		case 'a':
			let hrefAttr = escapeAttr(node.extra?.href ?? '')
			return `<a href="${hrefAttr}">${content}</a>`
		case 'br':
			return '\n'.repeat(node.extra?.size ?? 1)
		default:
			return `<${node.tagName}>${content}</${node.tagName}>`
	}
}

export const a	= (extra, ...content)	=> Node('a', extra, ...content)
export const b	= (...content)			=> Node('b', {}, ...content)
export const br = (size = 1)			=> Node('br', { size })
export const c	= (...content)			=> Node('code', {}, ...content)
export const h 	= (text)				=> p(b(text), br(2))
export const i	= (...content)			=> Node('i', {}, ...content)
export const p	= (...content)			=> Node('', {}, ...content)