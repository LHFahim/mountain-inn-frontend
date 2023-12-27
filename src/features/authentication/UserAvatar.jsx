import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

import React from "react";

const UserAvatar = () => {
  const { user } = useUser();
  const { firstName, lastName, avatarURL } = user;
  return (
    <StyledUserAvatar>
      <Avatar
        src={avatarURL || "default-user.jpg"}
        alt={`Avatar of ${firstName}`}
      />
      <span>
        {firstName} {lastName}
      </span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
