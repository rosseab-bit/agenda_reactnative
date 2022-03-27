import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight, Platform } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';


export default function App() {
  // definimos los states
  const [mostrarform, guardarMostrarForm]=useState(false);

  const [citas, setCitas]=useState([
    {id: "1", paciente:"Hook", propietario:"Juan", sintomas:"no come"},
    {id: "2", paciente:"Popy", propietario:"Ricky", sintomas:"no duerme"},
    {id: "3", paciente:"Lucky", propietario:"Sergio", sintomas:"no canta"}
  ]);

  const eliminarPaciente = id => {
    setCitas((citasActuales)=>{
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  /*mostrar u ocultar formulario*/
  const mostrarFormulario=()=>{
    guardarMostrarForm(!mostrarform)
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de citas</Text>

      <View>
        <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
          <Text style={styles.textoMostrarForm}>
            Crear Nueva Cita
          </Text>
        </TouchableHighlight>
      </View>

      <View style={styles.contenido}>
      {mostrarform ? (
        <>
        <Text style={styles.titulo}>Crear Nueva Cita</Text>
        <Formulario
        citas={citas}
        setCitas={setCitas}
        guardarMostrarForm={guardarMostrarForm}
        />
        </>
      ):(
        <>
        <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas': 'No tienes citas'}</Text>

        <FlatList
        style={styles.listado}
        data={citas}
        renderItem={({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
        keyExtractor={cita => cita.id}
        />
        </>
      )}
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor:'#AA076B',
    flex:1
  },
  titulo: {
    color:"#FFF",
    marginTop:Platform.OS==='ios'?40:20,
    marginBottom:20,
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center'
  },
  contenido:{
    flex:1,
    marginHorizontal:'2.5%'
  },
  listado:{
    flex:1
  },
  btnMostrarForm:{
    padding:10,
    backgroundColor:'#7d024e',
    marginVertical:10
  },
  textoMostrarForm:{
    color:'#FFF',
    fontWeight:'bold',
    textAlign:'center'
  }
});
