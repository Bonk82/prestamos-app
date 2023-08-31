import { createContext, useContext, useEffect, useState } from "react";
// import { useState } from "react";
import { supabase } from "../supabase/client";
// import {SupaContext} from './contexto'

export const SupaContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSupa = () => {
  const context = useContext(SupaContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const SupabaseContextProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [usuario, setUsuario] = useState(null)

  useEffect(()=>{
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const pivotUser = await supabase.auth.getUser();
      console.log('ingresando',pivotUser);
      pivotUser.data.user?.identities.forEach(e => {
        e.identity_data.picture ? setAvatar(e.identity_data.picture):'C'
        // console.log('entroEach',avatar);
      });
      // pivotUser.data.user.email === 'bonkalvarado@gmail.com' ? pivotUser.data.user.rol =  'ADMIN': 'USUARIO';
      if (pivotUser.data.user) setUsuario(pivotUser.data.user)
    } catch (error) {
      console.log('erro al cargar usuario',error);
    }
  }

  const createCliente = async ({nombre,apodo,fecha_nacimiento,ci,telefonos,direccion}) => {
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
        direccion,
      });
      console.log('llega aca',error,data,clientes);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message || error);
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
        .select("id, nombre, apodo, fecha_nacimiento,ci,telefonos,direccion")
        // .eq("done", done)
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }
      setClientes(data);
      console.log('los clientes',data);
      return data;
    } catch (error) {
      alert(error.error_description || error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const updateCliente = async (id, updatedFields) => {
    try {
      // const user = supabase.auth.user();
      console.log('actualizando',id,updatedFields);
      const { error, data } = await supabase
        .from("cliente")
        .update(updatedFields)
        .eq("id", id)
      if (error) {
        throw error;
      }
      console.log(error,data);
    } catch (error) {
      alert(error.error_description || error.message || error);
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

  const create = async (reg,table) => {
    setAdding(true);
    try {
      const { error, data } = await supabase.from(table).insert(reg);
      console.log('llega aca',error,data,reg,table);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message || error);
    } finally {
      setAdding(false);
    }
  };

  const getRegs = async (table,col,ascending) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(col, { ascending});

      if (error) throw error;
      if(table === 'cliente') setClientes(data);
      console.log(table,data);
      return data;
    } catch (error) {
      alert(error.error_description || error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupaContext.Provider
      value={{
        clientes,
        getClientes,
        createCliente,
        updateCliente,
        deleteTask,
        loading,
        adding,
        loginWithMagicLink,
        signInWithEmail,
        signInWithGoogle,
        logout,
        getUser,
        avatar,
        usuario,
        create,
        getRegs,
      }}
    >
      {children}
    </SupaContext.Provider>
  );
};
