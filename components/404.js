import React from 'react';
import styled from '@emotion/styled';

const Titulo = styled.h1`
    margin-top: 5rem;
    text-align: center;
`;

const Error404 = () => {
    return (
        <Titulo>No se puede mostrar página</Titulo>
    );
}

export default Error404;