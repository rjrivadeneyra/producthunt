import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Producto = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    padding: 4rem;
`;

const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    :hover {
        cursor: pointer;
    }
`;

const DescripcionProducto = styled.div`
    flex: 0 1 60rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Comentarios = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2rem;

    div {
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;
    }
    img {
        width: 2rem;
        margin-right: 1rem;
    }
    p {
        font-size: 1.6rem;
        margin: 0 1rem 0 0;
        font-weight: 700;

    }
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
    }

    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`;

const Imagen = styled.img`
    width: 20rem;
`;

const DetalleProducto = ({producto}) => {
    
    const {id, comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos} = producto;
    
    return (
        <Producto>
            <DescripcionProducto>
                <div>
                    <Imagen src={urlimagen}/>
                </div>
                <div>
                    <Link href="/productos/[id]" as={`/productos/${id}`}>                    
                        <Titulo>{nombre}</Titulo>
                    </Link>

                    <p
                        css={css`
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 3;
                            overflow: hidden;
                        `}
                    >{descripcion}</p>

                    <Comentarios>
                        <div>
                            <img src='/img/comentario.png' />
                            <p>{comentarios.length} comentarios</p>
                        </div>
                    </Comentarios>
                    <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                </div>
            </DescripcionProducto>
            <Votos>
                <div>&#9650;</div>
                <p>{votos}</p>
            </Votos>
        </Producto>
    );
}

export default DetalleProducto;