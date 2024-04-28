import "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"

export default class EducatorsMap extends HTMLElement {
	initialPosition = [45.808243219358175, 24.82232565124348]

	get data() {
		return JSON.parse(this.getAttribute("data"))
	}

	async connectedCallback() {
		this.renderInitialDom()
		this.initMap();
		const items = this.data.filter(item => !!item.position)
		if (items) {
			this.initMarkers(items, this.map)
		}
	}
	renderInitialDom() {
		const mapContainer = document.createElement('div')
		mapContainer.setAttribute("id", "map-root")
		this.replaceChildren(mapContainer)
	}

	initMap() {
		this.map = L.map("map-root").setView(this.initialPosition, 5);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(this.map);
	}

	initMarkers(items, map) {
		return items.map(item => {
			const [lat,lon] = item.position.split(",")
			console.log(lat.trim(), lon.trim(), map)
			L.marker([lat, lon]).addTo(map)
			 .bindPopup(item.name)
		})
	}
}
