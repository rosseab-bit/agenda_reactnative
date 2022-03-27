import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
/* https://github.com/mmazzarolo/react-native-modal-datetime-picker  => de aca saco el componente para el picker*/
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

  const [paciente, guardarPaciente]=useState('');
  const [propietario, guardarPropietario]=useState('');
  const [telefono, guardarTelefono]=useState('');
  const [sintomas, guardarSintomas]=useState('');

  const [fecha, guardarFecha]=useState('');
  const [hora, guardarHora]=useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones={year:'numeric', month:'long', day:'2-digit'}
    guardarFecha(date.toLocaleDateString('es_ES', opciones))
    hideDatePicker();
  };

  /*Muestra y oculta picker de hora*/
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const confirmarHora = (hora) => {
    console.log(hora);
    const opciones={ hour:'numeric', minute:'2-digit', hour12:false };
    guardarHora(hora.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  /*Validacion: campos no vacios*/
  const crearNuevaCita=()=>{
    if(paciente.trim()===''||
      propietario.trim()===''||
      telefono.trim()===''||
      sintomas.trim()===''||
      fecha.trim()===''||
      hora.trim()==''){
      console.log('Campos vacios algo salio mal...')
      return;
    }
    /*Crear una nueva cita*/
    const cita={paciente, propietario, sintomas, fecha, hora};
    cita.id=shortid.generate();
    const citasNuevo=[...citas, cita];
    setCitas(citasNuevo);

    /*Ocultar el Formulario*/
    guardarMostrarForm(false);
    /*Recetear el formulario*/
  };

  /*Alerta si falla la validacion*/
  const mostrarAlerta=()=>{
    Alert.alert(
      'Error', /*Esto es el titulo de la alerta*/
      'Todos los campos son obligatorios', /*Esto es el cuerpo del mensaje*/
      [{
        text:'OK' /*Arreglo de botones*/
      }]
    )
  }

  return(
    <>
    <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
        style={styles.input}
        onChangeText={texto=>{guardarPaciente(texto)}} /* texto: puede ser cualquier nombre aca tomamos lo que se ingresa en el input */
        />
      </View>
      <View>
        <Text style={styles.label}>Dueño:</Text>
        <TextInput
        style={styles.input}
        onChangeText={texto=>{guardarPropietario(texto)}} /* texto: puede ser cualquier nombre aca tomamos lo que se ingresa en el input */
        />
      </View>
      <View>
        <Text style={styles.label}>Telefono Contacto:</Text>
        <TextInput
        style={styles.input}
        onChangeText={ texto=>{guardarTelefono(texto)}} /* texto: puede ser cualquier nombre aca tomamos lo que se ingresa en el input */
        keyboardType='numeric'
        />
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal /*Las funciones se encuentran declaradas mas arriba*/
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale='es_ES'
          />
          <Text>{fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal /*Las funciones se encuentran declaradas mas arriba*/
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale='es_ES'
          />
          <Text>{hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas</Text>
        <TextInput
        multiline /*Esto nos permite utilizar con si fuera un text-area*/
        style={styles.input}
        onChangeText={texto=>{guardarSintomas(texto)}} /* texto: puede ser cualquier nombre aca tomamos lo que se ingresa en el input */
        />
      </View>
      <View>
        <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}>
            Crear Cita
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
    </>
  );
}

const styles=StyleSheet.create({
  formulario:{
    backgroundColor:'#FFF',
    paddingHorizontal:20, /*Con esto damos margenes a ambos lados por igual.*/
    paddingVertical:10, /*Esto es para dar espacio tanto arriba como a bajo*/
    marginHorizontal:'2.5%' /*Esto es para que no tome toda la pantalla. En este caso 2.5 por cada lado*/
  },
  label:{
    fontWeight:'bold',
    fontSize:18,
    marginTop:20
  },
  input:{
    marginTop:10,
    height:50,
    borderColor:'#e1e1e1', /*Siempre tenemos que colocar cada atributo de border por separado*/
    borderWidth:1,
    borderStyle:'solid'
  },
  btnSubmit:{
    padding:10,
    backgroundColor:'#7d024e',
    marginVertical:10
  },
  textoSubmit:{
    color:'#FFF',
    fontWeight:'bold',
    textAlign:'center'
  }
})

export default Formulario;
