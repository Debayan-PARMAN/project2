import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState as userUpdateState } from '../../actions/doctors';
import { updateState as docUpdateState } from '../../actions/doctors';
import { getAppoinmentList, cancelAppointment } from '../../actions/doctors';
import { forgotPassword } from '../../actions/user';
import MyAppointmentStyle from '../../styelsheets/MyAppointmentStyle';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Appointment_Card from '../../components/Card/AppointmentCard';
import { updateState, doctorSpecializations } from '../../actions/doctors';
import en from '../../messages/en-us';
import { LinearGradient } from 'expo';

class MyAppointment extends Component {
    componentDidMount() {
        this.props.getAppoinmentList();
        //this.props.forgotPassword();
    }

    static navigationOptions = {
        title: 'MyAppointment',
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
            paddingLeft: 40,
            //justifyContent: 'center',
            //alignItems: 'center',
        },
    };

    selectedAppointment = (AppointmentDetails) => {
        //console.log("APP",AppointmentDetails);
        //const {AppointmentDetails} = this.props.doctorState;
        this.props.updateState({ AppointmentDetails});
        this.props.doctorSpecializations();
        this.props.navigation.navigate('AppointmentDetails');
    }

    // navigateTo = () => {
    //     this.props.doctorSpecializations();
    //     this.props.navigation.navigate('MyAppointmentPast');
    // };
      
    render() {
        const { appointmentList, AppointmentDetails } = this.props.doctorState;
        //console.log("h.....",appointmentList);
        return (
            <View style={MyAppointmentStyle.mainWrapper}>
                <ScrollView>
                    <View style = {{flex:1,height:30,}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAppointmentFilter')}>
                            <Text style={{ fontSize: 17, textDecorationLine: 'underline', paddingRight: 10, textAlign: 'right' }}>{en.doctorSearchLabel.filterLabel} </Text></TouchableOpacity>
                    </View>
                    <View style={MyAppointmentStyle.toptabArea}>
                        <View style={MyAppointmentStyle.toptab}>
                         
                            <View style={MyAppointmentStyle.upcoming}>
                                <Text style={MyAppointmentStyle.upcomingtext}>{en.appointmentScreens.upcomingLabel} </Text>
                            </View>
                         
                            <View style={MyAppointmentStyle.past}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAppointmentPast')}><Text style={{}}>{en.appointmentScreens.pastLabel}</Text></TouchableOpacity>
                            </View>
                        </View>                                                                            
                    </View>
                    {appointmentList.map(Appointment =>
                        <Appointment_Card key={Appointment.appointmentPk} AppointmentDetails={Appointment} selectedAppointment={this.selectedAppointment}/>
                    )}  

                    
                
                </ScrollView>
             </View>
        );
    }
};

MyAppointment.propTypes = {
    doctorDetails: PropTypes.object,
    userDetails: PropTypes.object,
    appointmentList: PropTypes.object,
    AppointmentDetails: PropTypes.object,
}
const mapStateToProps = state => ({
    userState: state.userState,
    doctorState: state.doctorState,
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ 
        userUpdateState, updateState, docUpdateState, getAppoinmentList,
        doctorSpecializations,
        cancelAppointment, forgotPassword }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAppointment);