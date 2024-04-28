export default class Educator extends HTMLElement {
	get data() {
		return JSON.parse(this.getAttribute("data"))
	}
	async connectedCallback() {
		this.render(this.data);
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
