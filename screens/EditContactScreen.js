import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, AsyncStorage,Alert, ScrollView } from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base'


export default class EditContactScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      key: ""
    }
  }

  componentDidMount(){
    const {navigation} =this.props;
    navigation.addListener("focus", () => {
      var key = this.props.route.params? this.props.route.params.key : "";
      this.getContact(key);
    })
  }

  getContact = async key =>{
    await AsyncStorage.getItem(key)
    .then(contactJsonString =>{
      var contact =JSON.parse(contactJsonString);
      //set key in this object
      contact["key"] = key;
      this.setState(contact);
    })
    .catch(error => {
      console.log(error)
    })
  }


  updateContact = async key => {
    if (this.state.fname !== "" &&
    this.state.lname !== "" &&
    this.state.phone !== "" &&
    this.state.email !== "" &&
    this.state.address !== ""
    ) {
      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
      }
      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
      .then( () => {
        this.props.navigation.goBack()
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  render(){
    return (
      <TouchableWithoutFeedback
      onPress = { () => {
        Keyboard.dismiss()
      }}
      >
        <ScrollView style={styles.container}>
          <Form>
            <Item>
              <Label style={styles.inputItem}>First Name</Label>
              <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={fname =>this.setState({fname})}
              value={
                this.state.fname
              }
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Last Name</Label>
              <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={lname =>this.setState({lname})}
              value={
                this.state.lname
              }
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Phone</Label>
              <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="num-pad"
              onChangeText={phone =>this.setState({phone})}
              value={
                this.state.phone
              }
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Email</Label>
              <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={email =>this.setState({email})}
              value={
                this.state.email
              }
              />
            </Item>
            <Item>
              <Label style={styles.inputItem}>Address</Label>
              <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              onChangeText={address =>this.setState({address})}
              value={
                this.state.address
              }
              />
            </Item>
          </Form>
          <Button
          full
          rounded
          style={styles.button}
          onPress={ () => {
            this.updateContact(this.state.key);
          }}
          >
              <Text style={styles.buttonText}>Update</Text>
          </Button>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
