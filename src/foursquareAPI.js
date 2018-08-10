export default function getFoursquareData(id, infowindow) {
    const clientID = "GB1QF443M30DNP54WJOV24WP0WHXSSHLJKSWLTT2AEYQCEE1"
    const clientSecret = "FJ5GUUOPWHO5LVM2NL2MYBM40OWSDIPPU4FNWMZULMZU042V"
    const url = `https://api.foursquare.com/v2/venues/${id}?client_id=${clientID}&client_secret=${clientSecret}&v=20180807`

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then((info) => {
            infowindow.setContent(
                `<div class="info-name" tabindex="0">${info.response.venue.name}</div>
				<div class="info-address">${info.response.venue.location.crossStreet}</div>
				<div class="info"><span class="info-phone">Tel.:</span> ${info.response.venue.contact.formattedPhone}</div>
				<div class="info"><span class="info-twitter">twitter:</span> ${info.response.venue.contact.twitter}</div>
         `)
        })
        .catch(() => {
            infowindow.setContent("Not possible to get info from Foursquare!")
        })
}