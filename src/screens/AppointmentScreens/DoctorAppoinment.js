import React, { Component } from 'react'; 
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image, AppRegistry} from 'react-native'; 
import { LoginStyles,} from '../../styelsheets/MainStyle'; 
import {DoctorCardStyle} from '../../styelsheets/DoctorCardStyle';
import imageConstantURI from '../../constants/imageConst';
import { getDoctorDetails, } from '../../actions/doctors';
import Doctor_Card from '../../components/Card/DoctorCard';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState } from '../../actions/doctors';
import Header_Blank from '../../components/Header/Header_Blank';
import Footer from '../../components/Footer/Footer';
import { LinearGradient } from 'expo';
import styleConstants from '../../constants/styleConstants';
import Moment from 'moment';


class Doctor_Appoinment extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedDate: '',
        }
    }
    componentDidMount() {
        const { userDetails } = this.props.userState;
        if (userDetails.userId !== ""){
            this.props.getDoctorDetails();
        }else{
            this.props.navigation.navigate('Login');
            alert("Please Login first");
            
        }
        
        //this.props.onOpenModal(DatePicker);
    }

    static navigationOptions = {
        title: 'DOCTOR APPOINTMENT',
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
    ///Pass Value////
    selectedChamber = (chamberDetails,timeSlot) => {
        if (timeSlot === undefined || timeSlot === null) { return; }
        const { AppointmentDetails } = this.props.doctorState; 
        AppointmentDetails.appointmentTime = timeSlot;
        this.props.updateState({ chamberDetails, AppointmentDetails});
         this.props.navigation.navigate('BookAppoinment');
    }

    onTimeSlot = () => {
        this.props.navigation.navigate('BookAppoinment');
    }

    onDateSelect = (newdate) => {
        const { AppointmentDetails } = this.props.doctorState; 
        this.setState({selectedDate: newdate});
        AppointmentDetails.appointmentDate = Moment(newdate).format('YYYY-DD-MM');
        // console.log(AppointmentDetails.appointmentDate);
        this.props.updateState({ AppointmentDetails});
    }
   
    render() {
        
        const { doctorDetails, AppointmentDetails } = this.props.doctorState;
        const datePickerArea = (
            <View style={{justifyContent:'center',}}>
                <TouchableOpacity>
                    <DatePicker
                        style={{ width: 200, }}
                        date={this.state.selectedDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        maxDate="2019-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        mode="date"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 20,
                                top: 4,
                                marginLeft: 5,
                                marginRight: 5,
                            },
                            dateInput: {
                                marginLeft: 10,
                            }

                        }}
                        onDateChange={(date) => { this.onDateSelect(date) }}
                    />
                </TouchableOpacity>
            </View>
        );

        const doctorDetailArea = (
            <View style={DoctorCardStyle.mainContainerAppiontment}>
                <View style={DoctorCardStyle.height1}> 
                    <View style={DoctorCardStyle.subContainer1}>
                        <View style = { DoctorCardStyle.flex1 }>
                            <View style = { DoctorCardStyle.flex2 }>
                                <Image style={DoctorCardStyle.profileImage} source={imageConstantURI.doctorImage.src} />
                            </View>
                            <View style={DoctorCardStyle.heartIconContainer}>
                                {/* <Image style={ DoctorCardStyle.heartIconImage } source={imageConstantURI.heartIcon.src} /> */}
                            </View>
                        </View>
                        <View style={DoctorCardStyle.textContainer}>
                            <Text style={DoctorCardStyle.doctorName} >Dr. {doctorDetails.doctorName}
                             {/* {qualificationList} */}
                             </Text>
                            <Text style={DoctorCardStyle.doctorDescription}>
                            {/* {specializationList} */}
                            </Text>
                            <Text style={DoctorCardStyle.doctorDescription}>Medical registration verified</Text>
                             <Text style={DoctorCardStyle.doctorDescription}>{doctorDetails.yearsOfExperience} years of experience</Text>
                            <Text style={DoctorCardStyle.doctorDescription}>12 reviews</Text>
                        </View>
                        </View>                     
                   
                    </View>               
            </View>
        );

        const doctorChamberDetails = (
            <View style={{ flex: 1 }}>
                <Text style={[DoctorCardStyle.doctorDescription, {fontSize:16,marginLeft:10}]}>Chambers</Text>
                {doctorDetails.doctorChamberList !== undefined && doctorDetails.doctorChamberList.length !== 0 ?
                    <ScrollView>
                        {doctorDetails.doctorChamberList.map(chamber => 
                            <Doctor_Card key={chamber.chamberPk} chamberDetails={chamber} onTimeSlot={this.onTimeSlot} selectedChamber={this.selectedChamber} />
                        )}    
                    </ScrollView>
                    : 
                    <Text>Loading data.......</Text>
                }
            </View>
        );
        return (
            <View style={{flex:1}}>
              <View style={LoginStyles.mainWrapper}>
                  <KeyboardAvoidingView style={LoginStyles.mainWrapper} behavior="padding" enabled>
                      {datePickerArea}

                      {doctorDetailArea}

                      {doctorChamberDetails}

                  </KeyboardAvoidingView>
               </View>
               <Footer navigation={this.props.navigation} />
            </View>
        );
    }
};

Doctor_Appoinment.propTypes = {
    doctorDetails: PropTypes.object,
    AppointmentDetails: PropTypes.object,    
    userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState,
    doctorState: state.doctorState,
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, getDoctorDetails,}, dispatch)
});

AppRegistry.registerComponent('project1', () => Doctor_Appoinment);

export default connect(mapStateToProps, mapDispatchToProps)(Doctor_Appoinment);
