export default class Educators extends HTMLElement {
	get data() {
		return JSON.parse(this.getAttribute("data"))
	}
	async connectedCallback() {
		this.render();
	}
	render() {
		this.replaceChildren(this.createList(this.data))
	}
	createList(items) {
		const $items = items.map((item) => this.createListItem(item))
		const $ul = document.createElement("ul")
		$ul.replaceChildren(...$items)
		return $ul
	}
	createListItem(item) {
		const $li = document.createElement("li")
		const $item = document.createElement("component-educator")
		$item.setAttribute("data", JSON.stringify(item))
		$li.append($item)
		return $li
	}
}
