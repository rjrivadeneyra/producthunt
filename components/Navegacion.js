import Link from 'next/link';
import React, {useContext} from 'react';
import styled from '@emotion/styled';
import { FirebaseContext } from '../firebase';

const Nav =  styled.nav`
    display: flex;
    column-gap: 2rem;
    padding-left: 2rem;
    a {
        font-size: 1.8rem;
        font-family: 'PT Sans', sans-serif;
        color: var(--gris2);
    }
`;

const Navegacion = () => {

    const {usuario} = useContext(FirebaseContext);

    return (
        <Nav>
            <Link href='/'>Inicio</Link>
            <Link href='/populares'>Populares</Link>
            {usuario && (<Link href='/nuevo-producto'>Nuevo Producto</Link>) }
            
        </Nav>
    );
}

export default Navegacion;