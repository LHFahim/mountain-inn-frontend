import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateProfile } from "./useUpdateProfile";
import { useUser } from "./useUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: { email, firstName: currentFirstName, lastName: currentLastName },
  } = useUser();

  const { updateProfile, isUpdatingProfile } = useUpdateProfile();

  const [firstName, setFirstName] = useState(currentFirstName);
  const [lastName, setLastName] = useState(currentLastName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    let updateObj = {};

    if (firstName) updateObj.firstName = firstName;
    if (lastName) updateObj.lastName = lastName;
    if (avatar) updateObj.avatar = avatar;

    updateProfile(updateObj);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="First name">
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          id="fullName"
          disabled={isUpdatingProfile}
        />
      </FormRow>
      <FormRow label="Last name">
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          id="lastName"
          disabled={isUpdatingProfile}
        />
      </FormRow>
      {/* <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdatingProfile}
        />
      </FormRow> */}
      <FormRow>
        <Button type="reset" variation="secondary" disabled={isUpdatingProfile}>
          Cancel
        </Button>
        <Button disabled={isUpdatingProfile}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
