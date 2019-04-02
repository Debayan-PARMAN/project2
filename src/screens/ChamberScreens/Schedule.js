import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import { CheckBox } from 'react-native-elements';
import GroupDetailsStyle from '../../styelsheets/GroupDetailsStyle';
import ChamberStyle from '../../styelsheets/ChamberStyle';
import ButtonComponent from '../../components/Button/ButtonComponent';
import Header_Blank from '../../components/Header/Header_Blank';
import Footer from '../../components/Footer/Footer';

class Schedule extends Component {

    static navigationOptions = {
        title: 'SCHEDULE',
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
        const DaysArea = (
            <View>
                <View style={ChamberStyle.checkboxContainer}>
                    <View style={GroupDetailsStyle.ratebtn}>
                        <CheckBox
                        />
                    </View>
                    <View>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Monday</Text>
                    </View>
                </View>
                <View style={ChamberStyle.checkboxContainer}>
                    <View style={GroupDetailsStyle.ratebtn}>
                        <CheckBox
                        />
                    </View>
                    <View>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Tuesday</Text>
                    </View>
                </View>
                <View style={ChamberStyle.checkboxContainer}>
                    <View style={GroupDetailsStyle.ratebtn}>
                        <CheckBox
                        />
                    </View>
                    <View>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Wednesday</Text>
                    </View>
                </View>
                <View style={ChamberStyle.checkboxContainer}>
                    <View style={GroupDetailsStyle.ratebtn}>
                        <CheckBox
                        />
                    </View>
                    <View>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Thirsday</Text>
                    </View>
                </View>
                <View style={ChamberStyle.checkboxContainer}>
                    <View style={GroupDetailsStyle.ratebtn}>
                        <CheckBox
                        />
                    </View>
                    <View>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Friday</Text>
                    </View>
                </View>
                <View style={ChamberStyle.checkboxContainer}>
                    <View style={GroupDetailsStyle.ratebtn}>
                        <CheckBox
                        />
                    </View>
                    <View>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Saturday</Text>
                    </View>
                </View>
                <View style={ChamberStyle.checkboxContainer}>
                    <View style={GroupDetailsStyle.ratebtn}>
                        <CheckBox
                        />
                    </View>
                    <View>
                        <Text style={textInputStyle.primaryTextInputFontStyle}>Sunday</Text>
                    </View>
                </View>
            </View>
        );
        const addBTN = (
            
                <View style = {{ alignItems: 'flex-end'}}>
                    <TouchableOpacity>
                        <LinearGradient
                            style={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle7]}
                            colors={[styleConstants.colorStyles.primaryGradientColor, styleConstants.colorStyles.secondaryGradientColor]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }} >
                            <Text style={[buttonStyle.primaryBtnText]}>Add</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            
        );

        const deleteArea = (
            <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
                
                <View style={{ flex: 0.8 }}>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        placeholder=""
                    />
                </View>
                <View style={{ flex: 0.2, alignItems: 'flex-end', }}>
                    <TouchableOpacity>
                        <Text style={[textInputStyle.primaryTextInputFontStyle, { textDecorationLine: 'underline' }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

        const startEnd = (
            <View style={ChamberStyle.mainSubContainer}>
                <View style={ChamberStyle.subContainer1}>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>Start Time</Text>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        placeholder=""
                    />
                </View>
                <View style={ChamberStyle.subContainer2}>
                    <Text style={textInputStyle.primaryTextInputFontStyle}>End Time</Text>
                    <TextInput
                        style={textInputStyle.primaryTextInput}
                        placeholder=""
                    />
                </View>
            </View>
        );

        const BTNArea = (
            <View style={ChamberStyle.BTNContainer}>


                <ButtonComponent
                    buttonLabel='Book'
                    buttonFunction={() => this.props.navigation.navigate('')}
                    buttonType='type2'
                    buttonStyle={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle7]}
                    buttonTextStyle={[buttonStyle.secondaryBtnText]} />

                <ButtonComponent
                    buttonLabel='Next'
                    buttonFunction={() => this.props.navigation.navigate('')}
                    buttonType='type2'
                    buttonStyle={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle7]}
                    buttonTextStyle={[buttonStyle.secondaryBtnText]} />

                <ButtonComponent
                    buttonLabel='Save'
                    buttonFunction={() => this.props.navigation.navigate('')}
                    buttonType='type1'
                    buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle7]}
                    buttonTextStyle={[buttonStyle.primaryBtnText]} />


            </View>
        );


        return (<View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={ChamberStyle.mainWrapper} behavior="position">
                <ScrollView>
                    { addBTN }
                    { DaysArea }
                    { startEnd }
                    {deleteArea }
                    { BTNArea }
                </ScrollView>
           </KeyboardAvoidingView> 
            <Footer navigation={this.props.navigation} />
            </View >
        );
    }
}

Schedule.propTypes = {
    doctorDetails: PropTypes.object,
    myGroup: PropTypes.object,
    // userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    doctorState: state.doctorState,
    groupState: state.groupState,
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);


