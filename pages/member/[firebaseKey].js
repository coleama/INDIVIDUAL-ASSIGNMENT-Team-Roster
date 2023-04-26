/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleMember } from '../../api/memberData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={memberDetails.image} alt={memberDetails.char_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h2>
          Name: {memberDetails.char_name}, Class: {memberDetails.class}, Level: {memberDetails.level}
        </h2>
        <h6>Character Stats: </h6>
        <p>Strength: {memberDetails.strength}</p>
        <p>Dexterity: {memberDetails.dexterity}</p>
        <p>Wisdom: {memberDetails.wisdom}</p>
        <p>Intelligence: {memberDetails.intelligence}</p>
        <p>Charisma: {memberDetails.charisma}</p>
        <p>Constitution: {memberDetails.constitution}</p>
        <p>Strength: {memberDetails.strength}</p>
        <hr />
      </div>
    </div>
  );
}
