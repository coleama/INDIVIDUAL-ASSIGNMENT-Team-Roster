/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getParties } from '../api/partyData';
import { useAuth } from '../utils/context/authContext';
import PartyCard from '../components/cards/partyCard';

export default function PartiesOnDom() {
  const [parties, setParties] = useState([]);
  const { user } = useAuth();

  const getAllParties = () => {
    getParties(user.uid).then(setParties);
  };

  useEffect(() => {
    getAllParties();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {parties.map((party) => (
            <PartyCard key={party.firebaseKey} partyObj={party} onUpdate={getAllParties} />
          ))}
        </div>

      </div>
    </>
  );
}
