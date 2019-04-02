import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState} from '../../actions/user';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AppRegistry} from 'react-native';
import { CardStyle } from '../../styelsheets/CardStyle';
import Status_Indicator from '../../components/StatusIndicator.1';
import { updateState as userUpdateState } from '../../actions/doctors';
import { updateState as docUpdateState } from '../../actions/doctors';
import { getDoctorDetails,} from '../../actions/doctors';
import Header_Blank from '../../components/Header/Header_Blank';
import BookAppointmentStyle from '../../styelsheets/BookAppointmentStyle';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import en from '../../messages/en-us';
import { LinearGradient } from 'expo';
import Moment from 'moment';
import Footer from '../../components/Footer/Footer';

class Book_Appoinment_Second extends Component {

    static navigationOptions = {
        title: 'BOOK APPOINTMENT',       
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
            textAlign: "center",
            justifyContent: 'space-around',
            flex: 1
        },
        headerRight: (<Header_Blank />)
    };

    onToggle = () => {
        this.props.navigation.navigate('BookAppoinmentSecond')
    }
    

    render() {
        const { doctorDetails, chamberDetails, AppointmentDetails } = this.props.doctorState;
        const { userDetails } = this.props.userState;
        const timeDetails = `${AppointmentDetails.appointmentDate}, ${Moment(AppointmentDetails.appointmentTime, "h:mm A").format("HH:mm")}`;

        return (
            <View style={{flex:1}}>
            <View style={BookAppointmentStyle.mainWrapper}>
                <ScrollView>
                    <KeyboardAvoidingView behavior="position">
                        <Status_Indicator />
                        <View style={CardStyle.mainContainer}>
                            <View style={CardStyle.flex}>
                                <Text style={CardStyle.name}>{en.appointmentScreens.drLabel} {doctorDetails.doctorName}</Text>
                            </View>
                            <View style={CardStyle.flex}>
                                <Text style={CardStyle.specialization}>BDS, MDS General Dentistry</Text>
                            </View>
                        </View>
                       
                        <Text style={[CardStyle.name, {marginTop:4}]}>{en.doctorSearchLabel.locationLabel} - {chamberDetails.line1}, {chamberDetails.line2}</Text>
                         
                            <Text style={[CardStyle.name, { marginTop: 4 }]}>
                                {en.appointmentScreens.dateTimeLabel} - {timeDetails}
                            </Text>
                        
                      
                        <View style={BookAppointmentStyle.PatientFirstPart}>
                            <View style={[BookAppointmentStyle.PatientName,{marginTop:5}]}>                               
                                <Text style={BookAppointmentStyle.HeaderText}>{en.appointmentScreens.patientDetailsLabel}</Text>                                
                               
                                 <TouchableOpacity
                                    style={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle3]}
                                    onPress={() => this.props.navigation.navigate('BookAppoinmentThird')} >
                                    <Text style={[buttonStyle.secondaryBtnText, { fontSize: 13 }]}>{en.appointmentScreens.editBtnLabel} </Text>
                                </TouchableOpacity>
                            </View>
                                                        
                          
                          
                            <Text style={[textInputStyle.primaryTextInputFontStyle, {marginTop:4}]}>{en.appointmentScreens.patientNameLabel}</Text>
                                    <TextInput style={textInputStyle.primaryTextInput}
                                        //placeholder="Rupnarayan Bhattacharya"
                                    editable={false}
                                    value={userDetails.username}
                                    onChangeText={(e) => this.onValueChange(e, 'username')} 
                                    />
                          
                          
                          
                                 <Text style={[textInputStyle.primaryTextInputFontStyle, {marginTop:4}]}>{en.loginLabels.emailLabel}</Text>
                               <TextInput style={textInputStyle.primaryTextInput}
                                    //placeholder="rupnarayan.b@gmail.com"
                                    editable={false}
                                    value={userDetails.emailAddress}
                                    onChangeText={(e) => this.onValueChange(e, 'emailAddress')} 
                                />
                           
                             <Text style={[textInputStyle.primaryTextInputFontStyle, {marginTop:4}]}>{en.loginLabels.mobileNumberLabel}</Text>
                               <TextInput style={textInputStyle.primaryTextInput}
                                    //placeholder="9830159381"
                                    editable={false}
                                    value={userDetails.contactNo}
                                    onChangeText={(e) => this.onValueChange(e, 'contactNo')} 
                                />
                          
                               <Text style={[textInputStyle.primaryTextInputFontStyle, {marginTop:4}]}>{en.appointmentScreens.ageLabel}</Text>
                            <TextInput style={[textInputStyle.primaryTextInput, {width: 200 }]}
                                 //placeholder="65"
                                    editable={false}
                                    value={userDetails.age}
                                    onChangeText={(e) => this.onValueChange(e, 'age')}
                                />
                          <Text style={[textInputStyle.primaryTextInputFontStyle, {marginTop:4}]}>{en.appointmentScreens.genderLabel}</Text>
                            <TextInput style={[textInputStyle.primaryTextInput, {width: 130 }]}
                                 //placeholder="Male"
                                editable={false}
                                value={userDetails.gender}
                                onChangeText={(e) => this.onValueChange(e, 'gender')}
                            />
                            </View>
                            
                       

                        <View style={BookAppointmentStyle.btnContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PaymentDetails')} >
                                {/* onPress={this.props.onSubmit} */}
                                <LinearGradient
                                    style={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle6,]}
                                    colors={[styleConstants.colorStyles.primaryGradientColor, styleConstants.colorStyles.secondaryGradientColor]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }} >
                                    <Text style={[buttonStyle.primaryBtnText]}>{en.appointmentScreens.confirmBtnLabel}</Text>
                                </LinearGradient>
                            </TouchableOpacity>                        
                    </View>             
                </KeyboardAvoidingView>
            </ScrollView>
           
        </View>
        <Footer navigation={this.props.navigation} />
        </View>
        );
    }
    
};

Book_Appoinment_Second.propTypes = {
    doctorDetails: PropTypes.object,
    userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState,
    doctorState: state.doctorState,
    common: state.common
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, userUpdateState, docUpdateState, getDoctorDetails,}, dispatch)
});
AppRegistry.registerComponent('project1', () => Book_Appoinment_Second);

export default connect(mapStateToProps, mapDispatchToProps)(Book_Appoinment_Second);


