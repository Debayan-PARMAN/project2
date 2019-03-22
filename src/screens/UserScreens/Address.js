import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState, addAddress } from '../../actions/user';
import { getStates } from '../../actions/common';
import { LinearGradient } from 'expo';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import { View, Text,Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import AddAddressStyle from '../../styelsheets/AddAddressStyle';
import imageConstantURI from '../../constants/imageConst';
// import Drop_Down from '../components/DropDown';
import en from '../../messages/en-us';

class Address extends Component {
    static navigationOptions = {
        title: 'Address Type',
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
            paddingLeft: 70,
            //justifyContent: 'center',
            //alignItems: 'center',
        },
    };

    openSelectedAddress = (id) => {
        const { doctorDetails } = this.props.doctorState;
        const tempArr = doctorDetails.doctorAddressList.filter(address => address.doctorAddressPk === id);
        doctorDetails.addressDetails = tempArr[0];
        this.props.updateState({ doctorDetails });
        this.props.navigation.navigate('AddAddress')
    }

    createNewAddress = () => {
        const { doctorDetails } = this.props.doctorState;
        doctorDetails.addressDetails = {
            addressType: '',
            line1: '',
            line2: '',
            country: '',
            city: '',
            pinCode: '',
            state: '',
        }
        this.props.updateState({ doctorDetails });
        this.props.navigation.navigate('AddAddress')
    }
    render() {
        const { doctorDetails } = this.props.doctorState;
        // const { countries, states } = this.props.commonState;
        const addressTypeArea = doctorDetails.doctorAddressList.length > 0 ?
            doctorDetails.doctorAddressList.map((address, index) =>
                <TouchableOpacity
                    onPress={() => this.openSelectedAddress(address.doctorAddressPk)} key={index}>

                    <View style={AddAddressStyle.AddnewAreaContainer }>
                        <View style={AddAddressStyle.Container1 }>
                            <Text style={AddAddressStyle.AddressTypeText}>{address.addressType}</Text>
                        </View>
                        <View style={AddAddressStyle.Container2}>                            
                                <Image style={[AddAddressStyle.ImageView, {padding:6}]}
                                    source={imageConstantURI.rightArrow.src} />
                            
                        </View>
                    </View>
                </TouchableOpacity >)
            :
            <View></View>;
        const addnewaddressArea = (
            <TouchableOpacity onPress={() => this.createNewAddress()} >
                <View style={AddAddressStyle.AddnewAreaContainer}>
                    <View style={AddAddressStyle.Container1}>
                        <Text style={AddAddressStyle.AddressTypeText}>+ {en.userScreensLabel.addNewAddressLabel}</Text>
                    </View>
                    <View style={AddAddressStyle.Container2}>
                      
                        <Image style={[AddAddressStyle.ImageView, { padding: 6 }]}
                                source={imageConstantURI.rightArrow.src} />
                       
                    </View>
                </View>
            </TouchableOpacity >);     

        return (
            <View style={AddAddressStyle.mainWrapper}>
                  <ScrollView>                                          
                        <View style={AddAddressStyle.AddressType}>
                           {/* // <Text style={AddAddressStyle.AddressTypeText}>{en.userScreensLabel.addressTypeLabel}</Text> */}
                        </View>
                        {addressTypeArea}
                        {/* {officeArea}
                        {othersArea} */}
                        {addnewaddressArea}                    
                                         
                   </ScrollView>                  
            </View>
        );
    }
};

Address.propTypes = {
    doctorDetails: PropTypes.object,
    commonState: PropTypes.object
}
const mapStateToProps = state => ({
    doctorState: state.doctorState,
    commonState: state.common
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, Address, getStates }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Address);
