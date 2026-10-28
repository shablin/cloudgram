const ESCAPE_MAP = {
	'&': '&amp;',
	'<': '&alt;',
	'>': '&gt;',
	'"': '&quot;',
}

export function escapeHtml(value) {
	return String(value ?? '').replace(/[&<>"]/g, (char) => ESCAPE_MAP[char])
}

function textNode(value) {
	return { kind: "text", text: String(value ?? '') }
}

function tagNode(tag, children, extra = {}) {
	return { kind: "tag", tag, children: flatten(children), ...extra }
}

function flatten(value) {
	if (value == null) return []
	if (Array.isArray(value)) return value.flatMap(flatten)
	if (isNode(value)) return [value]
	
	return [textNode(value)]
}

function isNode(value) {
	return value != null &&
	       typeof value == 'object' &&
	       typeof value.kind == 'string'
}


export const bold = (...children) => tagNode('b', children)
export const italic = (...children) => tagNode('i', children)
export const underline = (...children) => tagNode('u', children)
export const strike = (...children) => tagNode('s', children)
export const code = (...children) => tagNode('code', children)
export const spoiler = (...children) => tagNode('tg-spoiler', children)

export function link(label, url) {
	if (typeof url != 'string' || url.length == 0) {
		throw new TypeError("format_link: url must be a non-empty string")
	}
	
	let re = /^([a-z][a-z0-9+.-]*):/i
	const scheme = url.match(re)?.[1]?.toLowerCase()
	
	if (scheme && !['http', 'https', 'tg', 'mailto'].includes(scheme)) {
		throw new TypeError(`format_link: unsupported URL scheme: ${scheme}`)
	}
	
	return tagNode('a', [label], { url })
}

export function join(...parts) {
	return { kind: 'join', children: flatten(parts) }
}

export function lines(...parts) {
	return join(parts.flatMap((p, i) => (i === 0 ? [p] : ['\n\n', p])))
}

function renderNode(node, out) {
	switch(node.kind) {
		case 'tag': {
			out.push(' <', node.tag)
			if (node.url) out.push(' href="', escapeHtml(node.url), '"')
			out.push('>')
			for (const child of node.children) renderNode(child, out)
			out.push(' </', node.tag, '>')
			
			return
		}
		case 'raw':
			out.push(String(node.text ?? ''))
			return
		case 'join':
			for (const child of node.children) renderNode(child, out)
			return
		case 'text':
			out.push(escapeHtml(node.text))
			return
		default:
			throw new TypeError(`format: unknown node with kind: ${node.kind}`)
	}
}

export function render(node) {
	const out = []
	for (const child of flatten(node)) renderNode(child, out)
	return { text: out.join(''), parse_mode: 'HTML' }
}

export function raw(html) {
	return { kind: 'raw', text: String(html ?? '') }
}
