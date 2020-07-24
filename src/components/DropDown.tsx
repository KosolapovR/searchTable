import React, {forwardRef} from 'react';
import {User} from "../interfaces/User";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 15px;
  left: 20px;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background: #FFF;
  color: #434343;
  font-weight: 400;
  
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.3);
    box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.2);
    box-shadow: inset 0 0 6px rgba(100, 100, 100, 0.2);
    background-color: #aaa;
  }
  
`;

const UserItem = styled.div`
  padding: 5px 18px;
  cursor:pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover{
  background: #DEDEDE;
  }
  &:first-child{
    border-top-left-radius: 3px;
    border-top-left-radius: 3px;  
  }
  &:last-child{
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const DropDown = forwardRef((props: { users: Array<User> | null }, ref: any) => {
    const {users} = props;
    return (
        <Wrapper ref={ref}>
            {users && users.map(u => <UserItem key={u.id}>{u.username}</UserItem>)}
        </Wrapper>
    );
});

export default DropDown;
