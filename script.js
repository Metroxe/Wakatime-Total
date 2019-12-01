function onChange(event) {
	const reader  = new FileReader();
	reader.onload = onReaderLoad;
	reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event) {
	const obj = JSON.parse(event.target.result);
	const map = createMap(obj);
	render(map);
}

function render(map) {
	const totals = document.getElementById("totals");
	Object.keys(map)
		.map(k => [k, (map[k] / 60 / 60).toFixed(2)])
		.sort((a, b) =>b[1] - a[1])
		.forEach(([name, time]) => {
			totals.innerHTML += `<b>${name}: </b>${time} hours<br/>`
		});
}

function createMap(obj) {
	const map = {total: 0};
	obj.days.forEach(day => {
		day.projects.forEach(project => {
			if (!map[project.name]) {
				map[project.name] = 0;
			}
			map[project.name] += project.grand_total.total_seconds;
			map.total += project.grand_total.total_seconds;
		});
	});
	return map;
}


document.getElementById("file").addEventListener("change", onChange);
