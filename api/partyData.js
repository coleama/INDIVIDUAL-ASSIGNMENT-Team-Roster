import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL parties
const getParties = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/parties.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// FIXME: CREATE party
const createParty = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/parties.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const setcode = { firebaseKey: data.name };
      fetch(`${endpoint}/parties/${setcode.firebaseKey}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(setcode),
      }).then(resolve);
    })
    .catch(reject);
});

// FIXME: GET SINGLE party
const getSingleParty = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/parties/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// done: DELETE party
const deleteSingleParty = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/parties/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// done: UPDATE party
const updateParty = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/parties/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

// TODO: GET A SINGLE Party members
const getPartyMembers = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/members.json?orderBy="party_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// get author favorite party
const getFavParty = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const byFavorite = Object.values(data).filter((item) => item.favorite);
      resolve(byFavorite);
    })
    .catch(reject);
});

export {
  getFavParty,
  getParties,
  createParty,
  getSingleParty,
  deleteSingleParty,
  updateParty,
  getPartyMembers,
};
