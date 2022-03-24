import React, {useEffect, useContext, useState} from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import Error404 from '../../components/404';
import Spinner from '../../components/ui/Spinner';
import { Campo, InputSubmit} from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

import { FirebaseContext } from '../../firebase';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;
const CreadorProducto = styled.p`
    background-color: #da552f;
    display: inline-block;
    padding: .5rem 2rem;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    border-radius: 2rem;
    font-size: 1.2rem;
    margin-top: 1rem!important;
`;

const Producto = () => {

    // State del componente
    const [producto, guardarProducto] = useState({});
    const [error, guardarError] = useState(false);
    const [comentario, guardarComentario] = useState({});
    const [consultaDB, guardarConsultaDB] = useState(true);

    // Routing para obtener el ID actual
    const router = useRouter();
    const {query: {id}} = router;

    // Context de Firebase
    const {firebase, usuario} = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultaDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists) {
                    guardarProducto(producto.data());
                    guardarConsultaDB(false);
                } else {
                    guardarError(true);
                    guardarConsultaDB(false);
                }                
            }
            obtenerProducto();
        }
    }, [id]);

    if(Object.keys(producto).length === 0 && !error) {
        return (
            <Spinner />
        );
    }

    const {comentarios, creado, descripcion, empresa, creador, nombre, url, urlimagen, votos, haVotado} = producto;  
    
    const votarProducto = () => {
        if(!usuario) {
            return router.push('/');
        }

        // Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) return;

        // Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;        

        // Guardar el id del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];

        // Actualizar en BD
        firebase.db.collection('productos').doc(id).update({
            votos: nuevoTotal,
            haVotado: nuevoHaVotado
        })

        // Actualizar en el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal,
            haVotado: nuevoHaVotado
        })
        guardarConsultaDB(true);
    }

    // Funciones para crear comentarios
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }

    const agregarComentario = e => {
        e.preventDefault();

        if(!usuario) {
            return router.push('/');
        }

        // Agregamos información extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar copia de los comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizar la BD
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })

        // Actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })
        guardarConsultaDB(true);
    }

    const esCreador = id => {
        if(creador.id == id) {
            return true;
        }
    }
    
    // Función que revisa que el creador del producto sea el mismo que está logueado
    const puedeBorrar = () => {
        if(!usuario) return false;

        if(creador.id === usuario.uid){
            return true;
        }
    }

    const eliminarProducto = async () => {
        if(!usuario) {
            return router.push('/login');
        }
        if(creador.id !== usuario.uid){
            return router.push('/');
        }

        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Layout>
            <>
                {error ? <Error404 />: (
                    <div className='contenedor'>
                        <h1
                            css={css`
                                margin-top: 5rem;
                                text-align: center;
                            `}
                        >{nombre}</h1>
                        <ContenedorProducto>
                            <div>
                                <img src={urlimagen}/>
                                <p>Publicado hace: {formatDistanceToNow(new Date(creado), {locale: es})}</p>
                                <p>Por: {creador.nombre} de {empresa}</p>
                                <p>{descripcion}</p>

                                {usuario && (
                                    <>
                                        <h2>Agrega tu comentario</h2>
                                        <form
                                            onSubmit={agregarComentario}
                                        >
                                            <Campo>
                                                <input
                                                    type='text'
                                                    name='mensaje'
                                                    onChange={comentarioChange}
                                                />
                                            </Campo>
                                            <InputSubmit
                                                type='submit'
                                                value='Agregar Comentario'
                                            />
                                        </form>
                                    </>
                                )}                  

                                <h2
                                    css={css`
                                        margin-top: 2rem;
                                    `}
                                >Comentarios</h2>
                                <ul>
                                    {comentarios.map((comentario, i) => (
                                        <li
                                            key={`${comentario.usuarioId}-${i}`}
                                            css={css`
                                                border: 1px solid #e1e1e1;
                                                padding: 1.5rem;
                                                border-radius: 3rem;
                                                margin-bottom: 1rem;
                                                :last-of-type {
                                                    margin-bottom: 0;
                                                }
                                                p {
                                                    margin: 0;
                                                }
                                            `}
                                        >
                                            <p
                                                css={css`
                                                    font-weight: bold;
                                                `}
                                            >{comentario.usuarioNombre}</p>
                                            <p>{comentario.mensaje}</p>
                                            {esCreador(comentario.usuarioId) && <CreadorProducto>Creador</CreadorProducto>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <aside>
                                <Boton
                                    target='_blank'
                                    bgColor='true'
                                    href={url}
                                >Visitar Página</Boton>                            

                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p
                                        css={css`
                                            text-align: center;
                                        `}
                                    >{votos} votos</p>

                                    {usuario && (
                                        <>
                                            <Boton
                                                onClick={votarProducto}
                                            >
                                                Votar
                                            </Boton>
                                            {haVotado.length !== 0 && 
                                            <p
                                                css={css`
                                                    text-align: center;
                                                `}
                                            >Solo un voto por usuario</p>}
                                        </>
                                        
                                    )}
                                    
                                </div>
                            </aside>
                        </ContenedorProducto>
                        {puedeBorrar() && 
                            <Boton
                                onClick={eliminarProducto}
                            >Eliminar Producto</Boton>
                        }
                    </div>
                )}                
            </>            
        </Layout>
    );
}

export default Producto;