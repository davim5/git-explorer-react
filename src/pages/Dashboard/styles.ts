import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  /* Dimentions */
  margin-top: 40px;
  max-width: 700px;
  /* Positioning */
  display: flex;

  input {
    /* Fill width */
    flex: 1;

    /* Dimentions */
    height: 70px;
    padding: 0 24px;

    /* Style */
    border: 2px solid #fff;
    border-right: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;

    transition: border-color 0.1s;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53303;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    /* Dimentions */
    width: 210px;
    height: 70px;

    /* Style */
    background: #04d361;
    border: 0;
    border-radius: 0 5px 5px 0;

    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53303;
  margin-top: 8px;
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block; /*o 'a' vem com display inline */
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  div {
    flex: 1;
    margin: 0 16px;

    strong {
      font-size: 20px;
      color: #3d3d4d;
    }

    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }

  svg {
    /* Takes all left space avaiable */
    margin-left: auto;
    color: #cbcbd6;
  }
`;
