'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// fetch(endpoint)
//     .then(function(blob) {
//         return blob.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     });

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => {
        cities.push(...data);
    });

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, citiesArray) {
    if (!(citiesArray instanceof Array)) {
        console.log('this is not an array');
        return;
    }

    return citiesArray.filter(item => {
        const regex = new RegExp(wordToMatch, 'gi'); // gi = global and case insensitive
        return item.city.match(regex) || item.state.match(regex);
    });
}

function displayMatches() {
    var resultHtml;
    const value = this.value;

    if (!value) {
        resultHtml = `<li>Filter for a city</li>
                <li>or a state</li>`;
    } else {

        const matchArray = findMatches(value, cities);

        resultHtml = matchArray.map(item => {
            const regex = new RegExp(value, "gi");

            const cityName = item.city.replace(regex,
                `<span class="hl">${item.city.match(regex)}</span>`);

            const stateName = item.state.replace(regex,
                `<span class="hl">${item.state.match(regex)}</span>`);

            return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(item.population)}</span>
        </li>`
        }).join('');
    }

    document.querySelector('.suggestions').innerHTML = resultHtml;
}

const search = document.querySelector('.search');

search.addEventListener('change', displayMatches);
search.addEventListener('keyup', displayMatches);
