import React, {useState} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Router from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 30rem;
`;

const Submit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-image: url('/img/buscar.png');
    background-size: 4rem;
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 2px;
    background-color: #fff;
    border: none;
    text-indent: -11111px;
    &:hover {
        cursor: pointer;
    }
`;

const Buscar = () => {
    const [busqueda, guardarBusqueda] = useState('');

    const buscarProducto = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        Router.push({
            pathname: '/buscar',
            query: {q: busqueda}
        })
    }

    return (
        <form
            css={css`
                position: relative;
            `}
            onSubmit={buscarProducto}
        >
            <InputText
                type='text'
                placeholder='Buscar Productos'
                onChange={e => guardarBusqueda(e.target.value)}
            />
            <Submit type='submit'>Buscar</Submit>
        </form>
    );
}

export default Buscar;