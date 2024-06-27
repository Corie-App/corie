(function () {
	function getScriptId() {
		const scriptTag = document.currentScript;
		const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
		return urlParams.get('s');
	}

	function matchDomain(scriptId, hostname) {
		const apiUrl = `/api/products/domain?scriptId=${scriptId}`;
		const data = fetch(apiUrl, { headers: { hostname: window.location.hostname } })
			.then((response) => {
				if (!response.ok) {
					throw new Error('Unauthorized domain or other error');
				}
				return response.json();
			})
			.catch((error) => {
				console.error('Error matching domain:', error);
			});
	}

	function fetchAnnouncements(scriptId) {
		const apiUrl = `/api/announcements/${scriptId}`;
		console.log({ hostname: window.location.hostname });
		fetch(apiUrl, { headers: { hostname: window.location.hostname } })
			.then((response) => {
				if (!response.ok) {
					throw new Error('Unauthorized domain or other error');
				}
				return response.json();
			})
			.then((data) => {
				displayAnnouncements(data);
			})
			.catch((error) => {
				console.error('Error fetching announcements:', error);
			});
	}

	function displayAnnouncements(data) {
		data.forEach((announcement) => {
			const container = document.createElement('div');
			container.className = 'corie-announcement';
			container.innerHTML = `<h2>${announcement.title}</h2><p>${announcement.content}</p>`;
			document.body.appendChild(container);
		});
	}

	const scriptId = getScriptId();
	if (scriptId) {
		const domainMatched = matchDomain(scriptId);
		if (!domainMatched.found) console.error('Domain not matched');
		else fetchAnnouncements(scriptId);
	} else console.error('Incorrect value provided to Corie');
})();
