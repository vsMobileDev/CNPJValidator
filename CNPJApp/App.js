/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import moment from 'moment';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import ApiCall, { APICall } from './src/axios/ApiCall';


const App = () => {
  const [cnpjText, setCnpjText] = useState('')
  const [cnjpString, setCnjpString] = useState('')
  const [situation, setSituation] = useState('')
  const [telephone, setTelephone] = useState('')
  const [activities, setActivities] = useState([])
  const [income, setIncome] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyLegalName, setCompanyLegalName] = useState('')
  const [lastUpdate, setlastUpdate] = useState('')
  const [success, setSuccess] = useState(false)
  const [apiSuccess,setApiSuccess]=  useState(false)
  const onChangeText = (text) => {

    var updatedText = text
    updatedText = updatedText.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4-')
    setCnjpString(updatedText.replace(/[^0-9]/g, ""))
    setCnpjText(updatedText)
  }
  const getData = () => {
    setApiSuccess(true)
    APICall(cnjpString, (res) => {
      setApiSuccess(false)

      console.log(res)
      Keyboard.dismiss()
      if (res.status == 'ERROR') {
        alert(res.message)
      }
      else {
        setSuccess(true)
        setSituation(res.situacao)
        setTelephone(res.telefone)
        setActivities(res.atividade_principal)
        setIncome(res.capital_social)
        setCompanyName(res.fantasia)
        setCompanyLegalName(res.nome)
        setlastUpdate(moment(res.ultima_atualizacao).format('MMM DD, YYYY'))
      }
    })
  }

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.inBoxStyleNew, { backgroundColor: '#f5ab56', marginBottom: 10, marginTop: 10 }]}>
        <Text style={{
          fontSize: 18,
          textAlign: 'center',
        }}> {item.text} </Text>
      </View>
    )
  }
  return (
    <ScrollView keyboardShouldPersistTaps='handled'>

      <View style={styles.mainView}>
        <StatusBar barStyle='light-content' />
        <View style={{ backgroundColor: '#173263', width: '100%', height: 80, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 10, fontSize: 18 }}>CNPJ Validator</Text>
        </View>
    
            {
              apiSuccess && (
                <ActivityIndicator size="large" color="#000" style={{marginTop:20}} animating={apiSuccess}/>

              )
            }

       


        <View style={styles.inputView}>
          <TextInput
            value={cnpjText}
            placeholder='CNPJ no.'
            style={styles.cnpjInputStyle}
            onChangeText={onChangeText}
            keyboardType='number-pad'
            returnKeyLabel='Done'
            returnKeyType='done'
            maxLength={18}
            onSubmitEditing={getData}
            
          />
          <TouchableOpacity style={styles.searchBtn} onPress={() => getData()}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
          </TouchableOpacity>
        </View>
        {
          success && (
            <View style={styles.bottomView}>
              <Text style={styles.activities}>Atividade Principal:</Text>
              <FlatList
                data={activities}
                horizontal
                renderItem={renderItem}
              />
              <View style={[styles.boxView]}>
                <View style={[styles.inBoxStyle, { backgroundColor: '#f7b0f6' }]}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Situacao:</Text>
                  <Text style={styles.resultText}> {situation} </Text>
                </View>
                <View style={[styles.inBoxStyle, { backgroundColor: '#fcbbc6' }]}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Telefone</Text>
                  <Text style={styles.resultText}> {telephone} </Text>
                </View>
              </View>
              <View style={styles.boxView}>
                <View style={[styles.inBoxStyle, { backgroundColor: '#bdbbfc' }]}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Capital Social:</Text>
                  <Text style={styles.resultText}> {income} </Text>
                </View>
                <View style={[styles.inBoxStyle, { backgroundColor: '#bbfcfa' }]}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Fantasia: </Text>
                  <Text style={styles.resultText}> {companyName} </Text>
                </View>
              </View>
              <View style={[styles.boxView,{marginBottom:40}]}>
                <View style={[styles.inBoxStyle, { backgroundColor: '#bbfcc9' }]}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Nome:</Text>
                  <Text style={styles.resultText}> {companyLegalName} </Text>
                </View>
                <View style={[styles.inBoxStyle, { backgroundColor: '#f2fcbb' }]}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Ultima Atualizacao:</Text>
                  <Text style={styles.resultText}> {lastUpdate} </Text>
                </View>
              </View>

            </View>
          )
        }

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  cnpjInputStyle: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    fontSize:18
  },
  mainView: {
    flex: 1
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginLeft:10,
    marginRight:10
  },
  searchBtn: {
    marginLeft: 10,
    backgroundColor: '#173263',
    borderRadius: 20,
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomView: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  inBoxStyle: {
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 150
  },
  inBoxStyleNew: {
    borderRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: 150
  },
  boxView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  },
  activities: {
    fontSize: 20,
    fontWeight: 'bold'
    , marginTop: 40,
    textAlign: 'center'
  }
});

export default App;
