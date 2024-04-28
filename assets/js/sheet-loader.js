import {fetchSheet} from "./sdk.js"

const serialize = (data) => {
	return data.map(serializeEducator)
}
const serializeEducator = (rawItem = {}) => {
	const {
		["Name"]: name,
		["About"]: about,
		["Project"]: project,
		["Website"]: website,
		["Presa"]: presa,
		["Interviu video"]: interview,
		["Pozitie"]: position,
	} = rawItem
	return { name, about, project, website, presa, interview, position }
}

export default class SheetLoader extends HTMLElement {
	/* https://docs.google.com/spreadsheets/d/1SPHghYOD0zk1NpdRk8gk75ZhHThvE1FjQvH7IXqFLT8/edit?usp=sharing */
	get sheetUrl() {
		return this.getAttribute("sheet-url");
	}
	async fetchSheet() {
		if (this.sheetUrl) {
			const data = await fetchSheet(this.sheetUrl)
			this.data = serialize(data)
		}
	}
	async connectedCallback() {
		this.data = null
		this.template = this.querySelector("template")
		await this.fetchSheet();
		this.render();
	}
	render() {
		if (!this.data) {
			this.replaceChildren(document.createElement("sheet-loading"))
		} else {
			const $children = this.template.content.cloneNode(true)
			$children.children[0].setAttribute("data", JSON.stringify(this.data))
			this.replaceChildren($children)
		}
	}
}
