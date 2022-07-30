import React from "react";
import { Container } from "./container";
import styled from "styled-components";

export const ContainerWithBackgroundImage = (props) => {
  return (
    <Container {...props}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3) ), url('${props.backgroundimage?.src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        }}>
      {props.children}
    </Container>
  )
}
