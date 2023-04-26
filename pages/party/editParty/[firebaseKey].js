/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleParty } from '../../../api/partyData';
import PartyForm from '../../../components/forms/partyForm';

export default function EditParty() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleParty(firebaseKey).then(setEditItem);
  }, []);
  return (<PartyForm obj={editItem} />);
}
