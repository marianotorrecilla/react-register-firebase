import React, {useEffect, useState} from 'react';
import Create from './Create';
import {db} from '../firebase';
import {toast} from 'react-toastify';
import './List.css';


const List = () => {

    const [users, setUsers] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addUsers = async (userObject) => {
        try {
            if(currentId === '') {
                await db.collection('users').doc().set(userObject);
                toast('Usuario Registrado!!!', {
                    type: "success",
                    autoClose: 2000
                })
            } else {
                await db.collection('users').doc(currentId).update(userObject);
                toast('Usuario Editado!!!', {
                    type: "warning",
                    autoClose: 2000
                });
                setCurrentId('');
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onDeleteUser = async (id) =>{
        if (window.confirm('¿estas seguro q queres eliminar este usuario?')){
            await db.collection('users').doc(id).delete();
            toast('Usuario Eliminado!!!', {
                type: "error",
                autoClose: 2000
            })
        }
    }

    const getUsers = async () => {
        db.collection('users').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({...doc.data(), id:doc.id})
            })
            setUsers(docs);
        });
        
    }

    useEffect(() => {
        getUsers();
    }, [])

  return (
    <>
    <div className="row col-12 mt-5 justify-content-center">
        <div className="col-sm-8 col-md-8 col-lg-4 col-xl-4">
              <div>
                <Create {...{addUsers, currentId, users}}/>
              </div>
        </div>
    </div>
    <table className="col-12 mt-5 table text-white">
        <thead>
            <tr className="col-12">
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Mail</th>
                <th scope="col">Editar</th>
                <th scope="col">Borrar</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
            
                <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.email}</td>
                    <td><button type="submit" className="btn btn-success" onClick={()=> setCurrentId(user.id)}>Edit</button></td>
                    <td>
                        <button type="submit" className="btn btn-danger" onClick={()=> onDeleteUser(user.id)} >Delete</button>    
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
};

export default List;

//<td><a type="submit" className="icon" onClick={()=>{props.editBici(bici)}}> <ion-icon name="pencil-outline"></ion-icon></a></td>
//<td><a type="submit" className="trash" onClick={()=>{props.deleteBici(bici.id)}}> <ion-icon name="trash-outline"></ion-icon></a></td>

/*<td>
    <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal" onClick={()=>onDeleteProduct(product.id)} >Delete</button>    
</td>
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Eliminar Producto</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Si desea ELIMINAR el producto, presione DELETE. Caso contrario, presione VOLVER.
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" className="btn btn-dark" data-dismiss="modal">Volver</button>
                                        <button type="submit" className="btn btn-danger" data-dismiss="modal" onClick={()=>onDeleteProduct(product.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>*/