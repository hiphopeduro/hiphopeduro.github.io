import {fetchSheet} from "./sdk.js"

export default class SheetPage extends HTMLElement {
	/* https://docs.google.com/spreadsheets/d/1SPHghYOD0zk1NpdRk8gk75ZhHThvE1FjQvH7IXqFLT8/edit?usp=sharing */
	get sheetUrl() {
		return this.getAttribute("sheet-url");
	}
	async fetchSheet() {
		if (this.sheetUrl) {
			this.sheet = await fetchSheet(this.sheetUrl)
		}
	}
	async attributeChangedCallback(name) {
		if (name === "sheet-url") {
			await this.fetchSheet();
			this.render();
		}
	}
	async connectedCallback() {
		this.sheet = null
		this.template = this.querySelector("template")
		await this.fetchSheet();
		this.render();
	}
	render() {
		const $doms = []
		if (!this.sheet) {
			$doms.push(document.createElement("sheet-loading"))
		} else {
			$doms.push(this.createList(this.sheet, this.template))
		}
		this.replaceChildren(...$doms)
	}
	createList(items, $itemTemplate) {
		const $items = items.map((item) => this.createListItem(item, $itemTemplate))
		const $ul = document.createElement("ul")
		$ul.replaceChildren(...$items)
		return $ul
	}
	createListItem(item, $itemTemplate) {
		const $li = document.createElement("li")
		const $item = $itemTemplate.content.cloneNode(true)
		$item.children[0].setAttribute("item", JSON.stringify(item))
		$li.append($item)
		return $li
	}
}
