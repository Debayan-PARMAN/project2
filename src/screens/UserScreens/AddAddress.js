import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState, addAddress } from '../../actions/user';
import { getStates } from '../../actions/common';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import { View, Text, TouchableOpacity, TextInput, ScrollView,KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo';
import AddAddressStyle from '../../styelsheets/AddAddressStyle';
import Drop_Down from '../../components/DropDown';
import en from '../../messages/en-us';
import ButtonComponent from '../../components/Button/ButtonComponent';

class AddAddress extends Component {
    static navigationOptions = {
        title: 'AddAddress',
        headerBackground: (
            <LinearGradient
                colors={[styleConstants.colorStyles.primaryGradientColor, styleConstants.colorStyles.secondaryGradientColor]}
                style={{ flex: 1, }}
                start={[0, 0]}
                end={[1, 1]}
            />
        ),
        headerTintColor: '#fff',
        headerTitleStyle: {
            // fontWeight: 'bold',
            paddingLeft: 50,
            //justifyContent: 'center',
            //alignItems: 'center',
        },
    };

    onNavigate = () => {
        this.props.navigation.navigate('UpdateUserProfile');
    }

    onSubmit = () => {
        // console.log('Add Address Button triggered');
        const { doctorDetails } = this.props.userState;
        //console.log("doctorDetails.addressDetails ---------------", doctorDetails.addressDetails);
        if (doctorDetails.addressDetails.addressExits) {
            doctorDetails.addressList.forEach((address) => {
                if (address.id === doctorDetails.addressDetails.id) {
                    address = doctorDetails.addressDetails;
                }
                else{
                    //console.log("Match not found");
                }
            });
                doctorDetails.addressExits = false;
            //console.log("Updated address list  ################# ",doctorDetails.addressList);
        } 
        else {
            doctorDetails.addressList.push(doctorDetails.addressDetails);  
        }
       
        doctorDetails.addressDetails = {
            addressType: '',
            line1: '',
            line2: '',
            country: '',
            city: '',
            pinCode: '',
            state: '',
        }
        
        // console.log('onSubmit Address ', doctorDetails.addressDetails);
        // console.log('onSubmit AddressList ', doctorDetails.addressList);
        this.props.addAddress();
        this.props.updateState({doctorDetails});
        this.props.navigation.navigate('UpdateUserProfile');
    }

    onValueChange = (value, id) => {
        // console.log('onValueChange id ', id);
        // console.log('onValueChange value ', value); 
        const { doctorDetails } = this.props.doctorState;
        if (id === 'selectedCountry') {
            doctorDetails[id] = value;
            doctorDetails.addressDetails.country = value;
        } else {
            doctorDetails.addressDetails[id] = value;
        }
        this.props.updateState({ doctorDetails });

    }

    onToggle = (value) => {
        // console.log(value);
        const { doctorDetails } = this.props.userState;
        switch (value) {
            case 'Home':
                doctorDetails.addressDetails.addressType = "Home";
                doctorDetails.addCustomAddress = false;
                break;
            case 'Office':
                doctorDetails.addressDetails.addressType = "Office";
                doctorDetails.addCustomAddress = false;
                break;
            default:
                doctorDetails.addressDetails.addressType = "";
                doctorDetails.addCustomAddress = true;
                break;
        }
        this.props.updateState({ doctorDetails });
    }


    render() {
        const { doctorDetails } = this.props.userState;
        const { countries, states } = this.props.commonState;
        // console.log(countries);


        const customAddressArea = (
           
                <TextInput
                    style={[textInputStyle.primaryTextInput, {marginTop:10}]}
                    placeholder="Provide Address Type"
                    value={doctorDetails.addressDetails.addressType}
                    onChangeText={(e) => this.onValueChange(e, 'addressType')}
                />
           
        );

        const selectCountryArea = (
            <View style={AddAddressStyle.countryContainer}>
                <Drop_Down
                    selectedData='selectedCountry'
                    selectedValue={doctorDetails.selectedCountry} 
                    options={countries} 
                    onValueChange={(e) => this.onValueChange(e,'selectedCountry')}
                    optionId='id'
                    optionLabel='countryName'
                    //optionValue='countryCode'
                    optionValue='countryName'
                />
                {/* <TextInput
                    style={{ height: 45, borderColor: 'gray', padding: 6, marginTop: 0 }}
                    placeholder="Country"
                    value={doctorDetails.addressDetails.country}
                    onChangeText={(e) => this.onValueChange(e, 'country')}
                /> */}
            </View>
        );

        const selectStateArea = (
            <View >
                {/* <Drop_Down
                    selectedData='selectedState'
                    selectedValue={doctorDetails.selectedStates}
                    options={states}
                    onValueChange={this.onValueChange}
                    optionId='id'
                    optionLabel='stateName'
                    optionValue='stateCode'
                /> */}
                 <TextInput
                    style={[textInputStyle.primaryTextInput, {marginTop:10}]}
                    placeholder="State"                
                   
                    value={doctorDetails.addressDetails.state}
                    onChangeText={(e) => this.onValueChange(e, 'state')}
                />
            </View>
        );
        const pinCode = (
           
                 <TextInput
                    style={[textInputStyle.primaryTextInput, {marginTop:10}]}
                    placeholder="6 digit 0-9 pin code"
                    keyboardType="numeric"
                    value={doctorDetails.addressDetails.pinCode}
                    onChangeText={(e) => this.onValueChange(e, 'pinCode')}
                />
            
        );

        const flatHouse = (
                    <TextInput
                    style={[textInputStyle.primaryTextInput, {marginTop:10}]}
                    placeholder="Flat/House/Floor/Building"
                    value={doctorDetails.addressDetails.line1}
                    onChangeText={(e) => this.onValueChange(e, 'line1')}
                />
                    );
        const landmark = (
            <TextInput
                style={[textInputStyle.primaryTextInput, { marginTop: 10 }]}
                placeholder="Landmark"
                value={doctorDetails.addressDetails.line2}
                onChangeText={(e) => this.onValueChange(e, 'line2')}
            />
               );
        const city = (
                <TextInput
                    style={[textInputStyle.primaryTextInput, {marginTop:10}]}
                    placeholder="City"
                    value={doctorDetails.addressDetails.city}
                    onChangeText={(e) => this.onValueChange(e, 'city')}
                />
                   );
        const addressBtn = (
            <View style={AddAddressStyle.btnContainer}>               

                <ButtonComponent
                    buttonLabel={en.userScreensLabel.addAddressLabel}
                    buttonFunction={() => { } }
                    buttonType='type1'
                    buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
                    buttonTextStyle={[buttonStyle.primaryBtnText]} />
            </View>
        );

        return (
            <View style={AddAddressStyle.mainWrapper}>
                <ScrollView>                   
                    <KeyboardAvoidingView behavior="position">
                            {/*<HomeAddress/>*/}                          
                                    {customAddressArea }
                                    { selectCountryArea }
                                    { pinCode }
                                    { flatHouse }
                                    { landmark }
                                    { city }
                                    { selectStateArea }
                                    { addressBtn }                              
                       </KeyboardAvoidingView>
                </ScrollView>                  
            </View>
        );
    }
};

AddAddress.propTypes = {
    doctorDetails: PropTypes.object,
    userDetails: PropTypes.object,
    commonState: PropTypes.object
}
const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.common,
    doctorState: state.doctorState,
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, addAddress, getStates }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
