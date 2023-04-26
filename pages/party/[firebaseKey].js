/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewPartyDetails } from '../../api/mergedData';
import MemberCard from '../../components/cards/memberCard';
import { getPartyMembers } from '../../api/partyData';

export default function ViewParty() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [partyDetails, setPartyDetails] = useState([]);
  const [partyMember, setPartyMembers] = useState([]);

  useEffect(() => {
    viewPartyDetails(firebaseKey).then(setPartyDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getPartyMembers(firebaseKey).then(setPartyMembers);
  }, []);

  return (
    <>
      <div className="text-white ms-5 details">
        <h5>
          Party Name: {partyDetails.party_name}
        </h5>
        <p>Members Of: {partyDetails.party_name}</p>
      </div>
      <div className="d-flex flex-wrap">
        {partyMember.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getPartyMembers} />
        ))}
      </div>
    </>
  );
}
