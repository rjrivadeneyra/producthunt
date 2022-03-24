import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {useRouter} from 'next/router';
import DetalleProducto from '../components/DetalleProducto';
import useProductos from '../hooks/useProductos';
import { fil } from 'date-fns/locale';

const Buscar = () => {

    const [resultado, guardarResultado] = useState([]);

    const router = useRouter();
    const {query: {q}} = router;
    
    // Todos los productos
    const {productos} = useProductos('creado');
    
    useEffect(() => {
        const busqueda = q.toLowerCase();
        
        const filtro = productos.filter( producto => {
            return (
                producto.nombre.toLowerCase().includes(busqueda)
            )
        })
        guardarResultado(filtro);
    }, [q, productos]);

    return (
        <div>
            <Layout>
                <div className='listado-productos'>
                    <div className='contenedor'>
                        <ul className='bg-white'>
                        {resultado.map(producto => (
                            <DetalleProducto
                            key={producto.id}
                            producto={producto}
                            />
                        ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Buscar;