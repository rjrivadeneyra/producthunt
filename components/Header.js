import React, {useContext} from 'react';
import Buscar from './ui/Buscar';
import Boton from './ui/Boton';
import Navegacion from './Navegacion';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FirebaseContext } from '../firebase';

const ContenedorHeader = styled.div`
    max-width: 120rem;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', sans-serif;
    &:hover {
        cursor: pointer;
    }
`;

const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext);

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        column-gap: 1rem;
                    `}
                >
                    <Link href='/'>
                        <Logo>P</Logo>
                    </Link>

                    <Buscar />
                    <Navegacion />

                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    {usuario ? (
                        <>
                            <p
                            css={css`
                                margin-right: 1rem;
                            `}
                            >Bienvenido {usuario.displayName}</p>
                            
                            <Boton
                                bgColor='true'
                                onClick={() => firebase.cerrarSesion()}
                            >Cerrar Sesión</Boton>                                    
                        </>                    
                    ): (
                        <>
                            <Link href='/login'>
                                <Boton
                                    bgColor='true'
                                >Login</Boton>
                            </Link>
                            <Link href='/crear-cuenta'>
                                <Boton
                                    bgColor='true'
                                >Crear Cuenta</Boton>
                            </Link>
                        </>
                    )}
                </div>
            </ContenedorHeader>
        </header>

    );
}

export default Header;