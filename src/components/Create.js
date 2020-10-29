import React, {useEffect} from 'react';
import { db } from '../firebase';
import useCustomForm from "../utils/useCustomForm";
// npm install @hookform/resolvers yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './Create.css';

const Create = (props) => {

  const schema = yup.object().shape({
    nombre: yup
      .string()
      .required("El campo es obligatorio")
      .min(3, "El mínimo es 3 caracteres"),
    apellido: yup
      .string()
      .required("El campo es obligatorio")
      .min(3, "El mínimo es 3 caracteres"),
    email: yup.string().email().required('Debe colocar un email válido'),
  });

  const [values, handler, setValues] = useCustomForm();

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(schema),
  })

  const registro = (e) => {
    console.log('Usuario Registrado!!!');
    console.log(e.nombre, e.apellido);
    props.addUsers(values)
    setValues({});
  }

  const getUserById = async (id) => {
    const doc = await db.collection('users').doc(id).get();
    setValues({...doc.data()})
  }

  useEffect(() => {
    if(props.currentId === '') {
      setValues({})
    } else {
      getUserById(props.currentId)
    }
  }, [props.currentId])


  return (
    <>
    <h3 className="text-center mt-5">{props.currentId === '' ? 'REGISTRATE' : 'EDITAR USUARIO'}</h3>
    <form className="mt-5" onSubmit={handleSubmit(registro)}>
        <div className="form-group mb-3">
            <label htmlFor="nombre">Nombre</label><span className="text-danger">*</span>
            <input id="nombre" type="text" className="form-control" placeholder="Nombre"   name="nombre" value={values.nombre || ""} onChange={handler} ref={register}/>
            <label className="text-danger">{errors.nombre?.message}</label>
        </div>
        <div className="form-group">
            <label htmlFor="apellido">Apellido</label><span className="text-danger">*</span>
            <input id="apellido" type="text" className="form-control" placeholder="Apellido"  name="apellido" value={values.apellido || ""} onChange={handler} ref={register}/>
            <label className="text-danger">{errors.apellido?.message}</label>
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label><span className="text-danger">*</span>
            <input id="email" type="text" className="form-control" placeholder="Email"  name="email" value={values.email || ""} onChange={handler} ref={register}/>
            <label className="text-danger">{errors.email?.message}</label>
        </div>
        
        <button type="submit" className="btn btn-success btn-lg btn-block">{props.currentId === '' ? 'REGISTRARSE' : 'EDITAR'}</button>
    </form>
   
    </>
  )
  
};

export default Create;
