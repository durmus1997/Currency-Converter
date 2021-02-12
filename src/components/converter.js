import React, {Component} from 'react';
import {StyleSheet,Text,View,TextInput} from 'react-native';
import axios from 'axios';
class Converter extends Component {

  constructor(props){
    super(props);

    this.state = {
      tl : '',
      usd : '',
      cad : '',
      jpy : '',
      eur : '',
      input: '',
      rates: []
    }

    this.getRates = this.getRates.bind(this);
  }

getRates(){
  axios.get('http://data.fixer.io/api/latest?access_key=4c64150b35d52424d68d2bdccb2119b8&format=1&symbols=EUR,TRY,USD,CAD,JPY')
  .then(response => {
    const rates = response.data.rates;
    this.setState({
      rates
    })
  })
}

componentDidMount(){
  this.getRates();
}

  render(){
    const {converterWrapper,inputStyle,textStyle} = styles;
    const {input, tl , usd , cad , jpy , eur, rates} = this.state;
    return(
      <View style={converterWrapper}>
        <TextInput placeholder='Enter EUR Value'
                   style={inputStyle}
                   keyboardType= 'numeric'
                   onChangeText={(text) => {
                     const i = parseFloat(text) || 0;
                     this.setState({
                       input: text,
                       tl: (i * rates['TRY']).toFixed(5),
                       usd: (i * rates['USD']).toFixed(5),
                       cad: (i * rates['CAD']).toFixed(5),
                       jpy: (i * rates['JPY']).toFixed(5),
                       eur: (i * rates['EUR']).toFixed(5)
                     })
                   }}
        value={input} />

        <Text style={textStyle}> TRY : {tl} </Text>
        <Text style={textStyle}> USD : {usd} </Text>
        <Text style={textStyle}> CAD : {cad} </Text>
        <Text style={textStyle}> JPY : {jpy} </Text>
        <Text style={textStyle}> EUR : {eur} </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
inputStyle:{
width: 200,
height: 40,
paddingBottom:15,
},
converterWrapper:{
paddingTop: 30,
justifyContent: 'center',
alignItems: 'center',

},
textStyle:{
  width: 170,
  height: 50,
  fontWeight: 'bold',
}
})
export default Converter;
