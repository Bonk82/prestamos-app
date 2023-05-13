import { createContext, useEffect, useState } from "react";
// import { useState } from "react";
import { supabase } from "../supabase/client";
// import {SupaContext} from './contexto'

export const SupaContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupabaseContextProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [avatar, setAvatar] = useState('');

  useEffect(()=>{
    getUser();
  },[])

  const loginWithMagicLink = async (email) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        throw error;
      }
      alert("revisa tu correo para usar el enlace mágico");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async(email,password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log(data,error);
  };

  const signInWithGoogle = async ()=> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    console.log(data,error);
  }

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () =>{
    try {
      const usuario = await supabase.auth.getUser();
      console.log('ingresanbdo',usuario);
      usuario.data.user.identities.forEach(e => {
        e.identity_data.picture ? setAvatar(e.identity_data.picture):'C'
        console.log('entroEach',avatar);
      });
    } catch (error) {
      console.log('erro al cargar usuario',error);
    }
  }

  const createCliente = async (nombre,apodo,fecha_nacimiento,ci,telefonos) => {
    setAdding(true);
    try {
      // const usuario = await supabase.auth.getUser()
      // console.log(usuario);
      const { error, data } = await supabase.from('cliente').insert({
        nombre,
        apodo,
        fecha_nacimiento,
        ci,
        telefonos,
        // id:usuario.data.user.id
      });
      console.log('llega aca',error,data,clientes);
      // setClientes([...clientes, ...data]);
      if (error) {
        throw error;
      }
    } catch (error) {
      // alert('en ins'+ error.error_description || error.message);
      alert('en ins'+ error.error_description || error.message || error);
    } finally {
      setAdding(false);
    }
  };

  const getClientes = async () => {
    setLoading(true);
    // const user = supabase.auth.user();
    try {
      const { data, error } = await supabase
        .from("cliente")
        .select("id, nombre, apodo, fecha_nacimiento,ci,telefonos")
        // .eq("done", done)
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }
      setClientes(data);
    } catch (error) {
      alert(error.error_description || error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const updateTasks = async (id, updatedFields) => {
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase
        .from("tasks")
        .update(updatedFields)
        .eq("userId", user.id)
        .eq("id", id);
      if (error) {
        throw error;
      }

      setClientes(clientes.filter((task) => task.id !== data[0].id));
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const user = supabase.auth.user();

      const { error, data } = await supabase
        .from("tasks")
        .delete()
        .eq("userId", user.id)
        .eq("id", id);

      if (error) {
        throw error;
      }

      setClientes(clientes.filter((task) => task.id !== data[0].id));
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <SupaContext.Provider
      value={{
        clientes,
        getClientes,
        createCliente,
        updateTasks,
        deleteTask,
        loading,
        adding,
        loginWithMagicLink,
        signInWithEmail,
        signInWithGoogle,
        logout,
        getUser,
        avatar,
      }}
    >
      {children}
    </SupaContext.Provider>
  );
};
