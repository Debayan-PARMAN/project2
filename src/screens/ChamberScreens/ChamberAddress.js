import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState,} from '../../actions/user';
import { getStates } from '../../actions/common';
import { View, Text,TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import ChamberStyle from '../../styelsheets/ChamberStyle';
import Drop_Down from '../../components/DropDown';
import en from '../../messages/en-us';
import ButtonComponent from '../../components/Button/ButtonComponent';

class ChamberAddress extends Component {
    static navigationOptions = {
        title: 'ChamberAddress',       
        headerBackground: (
            <LinearGradient
                colors={[styleConstants.colorStyles.primaryGradientColor, styleConstants.colorStyles.secondaryGradientColor]}
                style={{ flex: 1, }}
                start={[0, 0]}
                end={[1, 1]}
            />),
        headerTintColor: '#fff',
        headerTitleStyle: {          
            paddingLeft: 50,            
        },
    };  

    onSubmit = () => { 
        console.log('U submitted the form');
    }

    onValueChange = (value, id) => {
        // console.log('onValueChange id ', id);
        // console.log('onValueChange value ', value);      
        const { userDetails } = this.props.userState;
        if (id === 'selectedCountry') {
            userDetails[id] = value;
            userDetails.addressDetails.country = value;
        } else {
            userDetails.addressDetails[id] = value;
        }
        this.props.updateState({ userDetails });
    }   

    render() {
        const { userDetails } = this.props.userState;
        const { countries, states } = this.props.commonState;
        // console.log(countries);


        const chamberNameArea = (
            <View style={ChamberStyle.ChamberNameContainer}>
                <Text style={textInputStyle.primaryTextInputFontStyle}>Chamber Name</Text>
                <TextInput
                    style={textInputStyle.primaryTextInput}
                    //placeholder="Enter your Chamber Name"                 
                  
                    />          
            </View>
        );

        const selectCountryArea = (
            <View style={ChamberStyle.CountryContainer}>
                <Text style={textInputStyle.primaryTextInputFontStyle}>Country</Text>
                <Drop_Down
                    selectedData='selectedCountry'
                    selectedValue={userDetails.selectedCountry}
                    options={countries}
                    onValueChange={(e) => this.onValueChange(e, 'selectedCountry')}
                    optionId='id'
                    optionLabel='countryName'
                    //optionValue='countryCode'
                    optionValue='countryName'
                />
                {/* <TextInput
                    style={{ height: 45, borderColor: 'gray', padding: 6, marginTop: 0 }}
                    placeholder="Country"
                    value={userDetails.addressDetails.country}
                    onChangeText={(e) => this.onValueChange(e, 'country')}
                /> */}
            </View>
        );

        const selectStateArea = (
            <View style={ChamberStyle.ChamberNameContainer}>
                {/* <Drop_Down
                    selectedData='selectedState'
                    selectedValue={userDetails.selectedStates}
                    options={states}
                    onValueChange={this.onValueChange}
                    optionId='id'
                    optionLabel='stateName'
                    optionValue='stateCode'
                /> */}               
                    <Text style={textInputStyle.primaryTextInputFontStyle}>State</Text>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        //placeholder="State Name"
                    />
                </View>
        );
        const pinCode = (
            <View style={ChamberStyle.ChamberNameContainer}>
                <Text style={textInputStyle.primaryTextInputFontStyle}>Pin Code</Text>
                <TextInput
                    style={textInputStyle.primaryTextInput}
                   // placeholder="6 digit 0-9 pin code"
                    maxLength={6}
                    keyboardType="numeric"
                />
            </View>
        );

        const flatHouse = (
            <View style={ChamberStyle.LandmarkContainer}>
                <Text style={textInputStyle.primaryTextInputFontStyle}>Flat/House/Floor/Building</Text>
                <TextInput
                    style={textInputStyle.primaryTextInput}
                    //placeholder="Flat/House/Floor/Building"                    
                />
            </View>
        );
        const landmark = (
            <View style={ChamberStyle.LandmarkContainer}>
                <Text style={textInputStyle.primaryTextInputFontStyle}>Landmark</Text>
                <TextInput
                    style={textInputStyle.primaryTextInput}
               // placeholder="Landmark"
               // value={userDetails.addressDetails.line2}
               // onChangeText={(e) => this.onValueChange(e, 'line2')}
            />
        </View>
        );
        const city = (
            <View style={ChamberStyle.LandmarkContainer}>
                <Text style={textInputStyle.primaryTextInputFontStyle}>City</Text>
                <TextInput
                    style={textInputStyle.primaryTextInput}
                    //placeholder="City"
                   // value={userDetails.addressDetails.city}
                   // onChangeText={(e) => this.onValueChange(e, 'city')}
                />
            </View>
        );
        const ChamberBtn = (
            <View style={ChamberStyle.ChamberbtnContainer}>                
                <ButtonComponent 
                    buttonLabel='Next'
                    buttonFunction={() => this.props.navigation.navigate('ChamberDetails')}
                    buttonType='type2'
                    buttonStyle={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle1]}
                    buttonTextStyle={[buttonStyle.secondaryBtnText]} />

                <ButtonComponent
                    buttonLabel='Save'
                    buttonFunction={() => this.onSubmit()}
                    buttonType='type1'
                    buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
                    buttonTextStyle={[buttonStyle.primaryBtnText]} />
            </View>
        );

        return (          
                <KeyboardAvoidingView style={ChamberStyle.mainWrapper} behavior="position">
                <ScrollView>             
                    {chamberNameArea}
                    {selectCountryArea}
                    {pinCode}
                    {flatHouse}
                    {landmark}
                    {city}
                    {selectStateArea}
                    {ChamberBtn} 
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
};

ChamberAddress.propTypes = {
    userDetails: PropTypes.object,
    commonState: PropTypes.object
}
const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.common
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, ChamberAddress, getStates }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChamberAddress);