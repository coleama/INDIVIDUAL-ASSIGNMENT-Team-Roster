import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { createMember, updateMember } from '../../api/memberData';
import { getParties } from '../../api/partyData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  image: '',
  description: '',
  status: false,
  char_name: '',
  class: '',
  level: '',
  strength: '',
  dexterity: '',
  constitution: '',
  intelligence: '',
  charisma: '',
  wisdom: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [party, setParty] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getParties(user.uid).then(setParty);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push(`/members/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Adventurer</h2>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCharName">
          <Form.Label>Character Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Character Name"
            name="char_name"
            value={formInput.char_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridClass">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Class"
            name="class"
            value={formInput.class}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridLevel">
        <Form.Label>Level</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Level"
          name="level"
          value={formInput.level}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter a Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridStr">
          <Form.Label>Strength</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Strength"
            name="strength"
            value={formInput.strength}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDex">
          <Form.Label>Dexterity</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Dexterity"
            name="dexterity"
            value={formInput.dexterity}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCharisma">
          <Form.Label>Charisma</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Charisma"
            name="charisma"
            value={formInput.charisma}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridInt">
          <Form.Label>Intelligence</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Intelligence"
            name="intelligence"
            value={formInput.intelligence}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridWis">
          <Form.Label>Wisdom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Wisdom"
            name="wisdom"
            value={formInput.wisdom}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCon">
          <Form.Label>Constitution</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Constitution"
            name="constitution"
            value={formInput.constitution}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridLevel">
        <Form.Select
          aria-label="Party"
          name="party_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.party_id} // FIXME: modify code to remove error
          required
        >
          <option value="">Select a Party to Join</option>
          {
            party.map((parties) => (
              <option
                key={parties.firebaseKey}
                value={parties.firebaseKey}
              >
                {parties.party_name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="status"
        name="status"
        label="Alive?"
        checked={formInput.status}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            status: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Adventurer</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.bool,
    char_name: PropTypes.string,
    class: PropTypes.string,
    level: PropTypes.string,
    strength: PropTypes.string,
    dexterity: PropTypes.string,
    constitution: PropTypes.string,
    intelligence: PropTypes.string,
    charisma: PropTypes.string,
    wisdom: PropTypes.string,
    party_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
