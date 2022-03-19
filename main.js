import './style.css';
import "wicg-inert";
import { v4 as uuidv4 } from 'uuid';
import { openModal } from './src/modal';
import fetchWeather from './src/weather';
import sitesDB from './src/sites';

const searchSiteButton = document.querySelector('.btn-search-site');
const searchSiteInput = document.querySelector('#search-site-input');
const sitesWrapper = document.querySelector('.sites-wrapper');
const modal = document.querySelector('.modal');
const btnsOpenModal = document.querySelector('.btn-open-modal');
const addSiteForm = document.querySelector('#addsite-form');
const siteName = document.querySelector('#name');
const siteAddress = document.querySelector('#address');
const siteShortcutKey = document.querySelector('#shortcut');
const successAlert = document.querySelector('.alert-success');
const errorAlert = document.querySelector('.alert-error');

let sites = [];


// Validate Form
function validate(urlValue) {
  const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
  const regex = new RegExp(expression);

  if (!urlValue.match(regex)) {
    errorAlert.classList.add('error-alert-visible');
    return false;
  }
  // Valid
  errorAlert.classList.remove('error-alert-visible');
  return true;
}



// Build sites
function createSiteUI() {
  // remove all site elements
  sitesWrapper.textContent = '';
  // build sites
  sites.forEach((site) => {
    const { name, address, key, hues, id } = site;

    //item
    const item = document.createElement('li');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.addEventListener('click', () => {
      item.remove();
      deleteSite(id);
    });

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('iconify');
    closeIcon.setAttribute('data-icon', 'bi:x');
    closeIcon.title = 'delete entry';


    //link
    const link = document.createElement('a');
    link.classList.add('site');
    link.setAttribute('href', `${address}`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', "noopener noreferrer");
    link.style.setProperty('--site-background-color', `linear-gradient(
      135deg,
      hsla(${hues[0]}, 40%, 50%, 1),
      hsla(${hues[1]}, 40%, 50%, 1)
    )`);

    const siteKey = document.createElement('span');
    siteKey.classList.add('site-key');
    siteKey.textContent = key;
    siteKey.style.background = `linear-gradient(
      135deg,
      hsla(${hues[0]}, 40%, 50%, 1),
      hsla(${hues[1]}, 40%, 50%, 1)
    )`;

    const siteName = document.createElement('span');
    siteName.classList.add('site-name');

    siteName.textContent = name;

    //append to site container
    deleteBtn.append(closeIcon);
    link.append(siteKey, siteName);
    item.append(link, deleteBtn);
    sitesWrapper.append(item);
  });
}



// Fetch the sites from local storage
function getStorage() {
  // get sites from localStorage if available
  if (localStorage.getItem('sites')) {
    sites = JSON.parse(localStorage.getItem('sites'));
  } else {
    // Create sites array in localStorage
    sites = sitesDB;
    localStorage.setItem('sites', JSON.stringify(sites));
  }
  createSiteUI();
}


function deleteSite(id) {
  // loop through the sites array
  sites.forEach((site, i) => {
    if (site.id === id) {
      sites.splice(i, 1);
    }
  });
  // update sites array in localStorage, re-populate DOM
  localStorage.setItem('sites', JSON.stringify(sites));
  getStorage();
}


function addSite(e) {
  e.preventDefault();
  const nameValue = siteName.value;
  let shortcutValue = siteShortcutKey.value;

  let urlValue = siteAddress.value;
  // Add 'https://' if not there
  if (!urlValue.includes('https://') && !urlValue.includes('http://')) {
    urlValue = `https://${urlValue}`;
  }

  // Validate
  if (!validate(urlValue)) {
    return false;
  }

  // Set site object, add to array
  const site = {
    id: uuidv4(),
    name: nameValue,
    address: urlValue,
    key: shortcutValue,
    hues: ['0', '220']
  };

  sites.push(site);

  // Set sites in localStorage, fetch, reset input fields
  localStorage.setItem('sites', JSON.stringify(sites));
  getStorage();

  addSiteForm.reset();
  siteName.focus();

  modal.querySelector('#name').focus();
  successAlert.classList.add('success-alert-visible');
  setTimeout(() => successAlert.classList.remove('success-alert-visible'), 3000);
}


function submitSiteSearch(e) {
  e.preventDefault();

  const input = searchSiteInput.value;
  const querySearchDelimiter = "'";
  const googleSearch = 'https://www.google.com/search?&q=';
  const ddgSearch = 'https://duckduckgo.com/?q=';

  if (input.startsWith('*')) {
    const query = input.slice(1, input.length);
    window.open(googleSearch + query, '_blank', 'noopener noreferrer');

  } else if (input.startsWith('-')) {
    const query = input.slice(1, input.length);
    window.open(ddgSearch + query, '_blank', 'noopener noreferrer');

  } else {
    sites.forEach(site => {
      const { address, key, search } = site;
      if (input === key) {
        window.open(address, '_blank', 'noopener noreferrer');

      } else if (input.startsWith(key + querySearchDelimiter) && site.search !== undefined) {
        const query = input.slice(2, input.length);
        window.open(search + query, '_blank', 'noopener noreferrer');

      }
    });
  }

  searchSiteInput.value = '';
  searchSiteInput.focus();
}

function submitSiteSearchOnEnter(e) {
  if (e.keyCode === 13) {
    searchSiteButton.click();
  }
}


// event Listeners
searchSiteInput.addEventListener('keyup', submitSiteSearchOnEnter);
searchSiteButton.addEventListener('click', submitSiteSearch);
btnsOpenModal.addEventListener('click', openModal);
addSiteForm.addEventListener('submit', addSite);


// load the weather and localStorage on start
fetchWeather();
getStorage();


