import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Announcement from '../components/Announcement'; // Adjust path as needed

(async function () {
	function getScriptId() {
		const scriptTag = document.currentScript;
		const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
		return urlParams.get('s');
	}

	async function matchDomain(scriptId) {
		const apiUrl = `/api/products/domain?scriptId=${scriptId}`;
		return fetch(apiUrl, {
			headers: {
				'X-Referer-Host': window.location.hostname,
				'X-Script-Secret': 'g5uUhoGtwaqG0m8y9wLjmhCPEnx5tOs1JS5CDgU+ifM=',
			},
		})
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

	async function fetchAnnouncements(scriptId) {
		const apiUrl = `/api/announcements?scriptId=${scriptId}`;
		try {
			const res = await fetch(apiUrl, {
				headers: {
					'X-Referer-Host': window.location.hostname,
					'X-Script-Secret': 'g5uUhoGtwaqG0m8y9wLjmhCPEnx5tOs1JS5CDgU+ifM=',
				},
			});
			const data = await res.json();
			console.log({ data });
			displayAnnouncements(data.announcements);
		} catch (error) {
			console.error('Error fetching announcements:', error);
		}
	}

	function displayAnnouncements(data) {
		data.forEach((announcement) => {
			const htmlString = ReactDOMServer.renderToString(
				<Announcement title={announcement.title} description={announcement.description} />
			);
			const container = document.createElement('div');
			container.innerHTML = htmlString;
			document.body.appendChild(container);
		});
	}

	
	const scriptId = getScriptId();
	if (scriptId) {
		const domainMatched = await matchDomain(scriptId);
		if (!domainMatched.found) throw new Error('Domain not matched');
		else fetchAnnouncements(scriptId);
	} else console.error('Incorrect value provided to Corie');
})();
