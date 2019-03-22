import React, { Component } from 'react';
import MyAppointmentStyle from '../../styelsheets/MyAppointmentStyle';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { Card } from 'react-native-elements';
import { DoctorCardStyle } from '../../styelsheets/DoctorCardStyle';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import Star from 'react-native-star-view';
import imageConstantURI from '../../constants/imageConst';

export default class Appointment_Card_Upcoming extends Component {
    navigateTo = () => {
        this.props.doctorSpecializations();
        //this.props.navigation.navigate('MyAppointmentPast');
    };

    render() {

        const starStyle = {
            width: 100,
            height: 20,
            marginBottom: 20,

        };
        const BTNArea = (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,
            }}>

                <View>
                    <TouchableOpacity
                        style={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle1]}>

                        <Text style={{fontFamily: 'Roboto',
                                        color: '#93278f',
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        textAlign: 'center'}}>View Prescription</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle1]}>

                        <Text style={{
                            fontFamily: 'Roboto',
                            color: '#93278f',
                            fontSize: 15,
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Print Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        return (
            <Card container style={DoctorCardStyle}>
                <View>
                    <View>
                        <View style={MyAppointmentStyle.doctordetails}>
                            <View style={MyAppointmentStyle.cardInnerArea}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={HomeStyles.off_txt_h}>Patient Name : </Text>
                                    </View>
                                    <View>
                                        <Text style={HomeStyles.off_txt_p}>Arup Kumar Roy</Text>
                                    </View>
                                </View>
                                
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={HomeStyles.off_txt_h}>Location : </Text>
                                    </View>
                                    <View>
                                        <Text style={HomeStyles.off_txt_p}>New Garia</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={HomeStyles.off_txt_h}>Date & Time : </Text>
                                    </View>
                                    <View>
                                        <Text style={HomeStyles.off_txt_p}>Mar 1, 2019, Mon 2 a.m.</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={HomeStyles.off_txt_h}>Rating : </Text>
                                    </View>
                                    <View style = {{ marginTop: 7 }}>
                                        <Star score={4.8} style={starStyle} />
                                    </View>
                                </View>
                               
                            </View>
                            <View style={MyAppointmentStyle.rightArrow}>
                                <TouchableOpacity>
                                    <Image style={MyAppointmentStyle.rightArrowImageContainer}
                                        source={imageConstantURI.rightAngle.src} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {BTNArea}
                    </View>
                </View>
            </Card>
        );
    }
};

