import { getPartyMembers, getSingleParty, deleteSingleParty } from './partyData';
import { getSingleMember, deleteMember } from './memberData';

const viewMemberDetails = (memFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memFirebaseKey)
    .then((memObject) => {
      getSingleParty(memObject.party_id)
        .then((partyObject) => {
          resolve({ partyObject, ...memObject });
        });
    }).catch((error) => reject(error));
});

const viewPartyDetails = (partyFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleParty(partyFirebaseKey), getPartyMembers(partyFirebaseKey)])
    .then(([partyObject, partyMemberArray]) => {
      resolve({ ...partyObject, members: partyMemberArray });
    }).catch((error) => reject(error));
});

const deletePartyMembers = (partyId) => new Promise((resolve, reject) => {
  getPartyMembers(partyId).then((memberArray) => {
    console.warn(memberArray, 'Parties Member');
    const deletePartyPromises = memberArray.map((member) => deleteMember(member.firebaseKey));

    Promise.all(deletePartyPromises).then(() => {
      deleteSingleParty(partyId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPartyDetails, viewMemberDetails, deletePartyMembers };
