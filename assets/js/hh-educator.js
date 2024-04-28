/* serialzie from google spreadhseet column to nice JSON for nic HTML markup */
const serializeEducator = (rawItem = {}) => {
	/* before serialization */
	const {
		["Name"]: name,
		["About"]: about,
		["Project"]: project,
		["Website"]: website,
		["Presa"]: presa,
		["Interviu video"]: interview,
	} = rawItem

	/* after serialization */
	const item = { name, about, project, website, presa }

	console.info("rawItem/item", rawItem, item)
	return item
}

export default class HHEducator extends HTMLElement {
	get item() {
		return serializeEducator(JSON.parse(this.getAttribute("item")))
	}
	async connectedCallback() {
		this.render(this.item);
	}
	render({name, website, about, project}) {
		const $doms = [
			this.createEducatorName(name, website),
			this.createEducatorAbout(about),
			this.createEducatorProject(project)
		]
		const $article = document.createElement("article")
		$article.append(...$doms.filter(dom => !!dom))
		this.replaceChildren($article)
	}
	createEducatorName(name, website) {
		const $name = document.createElement("h2")
		if (website) {
			const href = new URL(website.startsWith("http") ? website : `https://${website}`)
			const $anchor = document.createElement("a")
			$anchor.setAttribute("href", href)
			$anchor.setAttribute("target", "_blank")
			$anchor.textContent = name
			$name.append($anchor)
		} else {
			$name.textContent = name
		}
		return $name
	}
	createEducatorAbout(about) {
		if (about) {
			const $about = document.createElement("p")
			$about.textContent = about
			return $about
		}
	}
	createEducatorProject(project) {
		if (project) {
			const $project = document.createElement("p")
			$project.textContent = project
			return $project
		}
	}
}
