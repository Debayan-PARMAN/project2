import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import { Picker } from 'react-native';
import { CheckBox } from 'react-native-elements';
import GroupDetailsStyle from '../../styelsheets/GroupDetailsStyle';
import ChamberStyle from '../../styelsheets/ChamberStyle';
import ButtonComponent from '../../components/Button/ButtonComponent';

class ChamberDetails extends Component {

    
    static navigationOptions = {
        title: 'CHAMBERDETAILS',
        headerBackground: (
            <LinearGradient
                colors={[styleConstants.colorStyles.primaryGradientColor, styleConstants.colorStyles.secondaryGradientColor]}
                style={{ flex: 1, }}
                start={[0, 0]}
                end={[1, 1]}
            />),
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            //paddingLeft: 50,
            textAlign: "center",
            justifyContent: 'center',
            flex: 0.8,

        }
    };

    render() {

        const chamberType = (
            <View>
                <View>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>Chamber Type</Text>
                </View>
                <View style={ ChamberStyle.dropDownPicker }>
                    <Picker
                        //selectedValue={Personal}
                        mode='dropdown'>
                        <Picker.Item label="Personal" value="Personal" />

                    </Picker>
                </View>
            </View>
        );

        const OPDType = (
            <View>
                <View style = { ChamberStyle.margin }>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>OPD Type</Text>
                </View>
                <View style={ ChamberStyle.mainSubContainer}>
                    <View style={ChamberStyle.subContainer1}>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Phone 1</Text>
                        <TextInput
                            style={textInputStyle.primaryTextInput}
                            placeholder=""
                        />
                    </View>
                    <View style={ ChamberStyle.subContainer2 }>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Phone 2</Text>
                        <TextInput
                            style={textInputStyle.primaryTextInput}
                            placeholder=""
                        />
                    </View>
                </View>
            </View>

        );
        
        const roomNoDept = (
            <View style={ ChamberStyle.mainSubContainer }>
                <View style={ChamberStyle.subContainer1}>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>Room No</Text>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        placeholder=""
                    />
                </View>
                <View style={ChamberStyle.subContainer2 }>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>Dept</Text>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        placeholder=""
                    />
                </View>
            </View>
        );

        const averageVisit = (
            <View style={ChamberStyle.margin}>
                <Text style={textInputStyle.primaryTextInputFontStyle}>Average visit duration ( Minutes )</Text>
                <TextInput
                    style={[textInputStyle.primaryTextInput, { width: 240 }]}
                    placeholder=""
                />
            </View>
        );
        
        const feesArea = (
            <View style={ChamberStyle.mainSubContainer}>
                <View style={ChamberStyle.subContainer1}>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>Fees</Text>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        placeholder=""
                    />
                </View>
                <View style={ ChamberStyle.subContainer2 }>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>Booking Amount</Text>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        placeholder=""
                    />
                </View>
            </View>
        );

        const checkboxArea = (
            <View style={ ChamberStyle.checkboxContainer}>
                <View style={GroupDetailsStyle.ratebtn}>
                    <CheckBox
                    />
                </View>
                <View>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>Auto confirm appointment</Text>
                </View>
            </View>
        );

        const BTNArea = (
            <View style = { ChamberStyle.BTNContainer }>
                
                   
                    <ButtonComponent
                        buttonLabel='Book'
                        buttonFunction={() => this.props.navigation.navigate('ChamberDetails')}
                        buttonType='type2'
                        buttonStyle={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle7]}
                        buttonTextStyle={[buttonStyle.secondaryBtnText]} />
              
                    <ButtonComponent
                        buttonLabel='Next'
                        buttonFunction={() => this.props.navigation.navigate('ChamberDetails')}
                        buttonType='type2'
                        buttonStyle={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle7]}
                        buttonTextStyle={[buttonStyle.secondaryBtnText]} />              
                    
                <ButtonComponent
                    buttonLabel='Save'
                    buttonFunction={() => this.props.navigation.navigate('ChamberDetails')}
                    buttonType='type1'
                    buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle7]}
                    buttonTextStyle={[buttonStyle.primaryBtnText]} />

               
            </View>
        );

        return (
            <KeyboardAvoidingView style={ChamberStyle.mainWrapper} behavior="position">
           
                <ScrollView>
                    { chamberType }
                    { OPDType }
                    { roomNoDept }
                    { averageVisit }
                    { feesArea }
                    { checkboxArea }
                    { BTNArea }
                </ScrollView>   
            </KeyboardAvoidingView>
        );
    }
}

ChamberDetails.propTypes = {
    doctorDetails: PropTypes.object,
    myGroup: PropTypes.object,
    // userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    doctorState: state.doctorState,
    groupState: state.groupState,
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChamberDetails);


