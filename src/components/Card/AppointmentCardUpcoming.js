import React, { Component } from 'react';
import MyAppointmentStyle from '../../styelsheets/MyAppointmentStyle';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import { Card } from 'react-native-elements';
import { DoctorCardStyle } from '../../styelsheets/DoctorCardStyle';
import { buttonStyle } from '../../styelsheets/CommonStyle';
import imageConstantURI from '../../constants/imageConst';

export default class Appointment_Card_Upcoming extends Component {
    navigateTo = () => {
        this.props.doctorSpecializations();
        //this.props.navigation.navigate('MyAppointmentPast');
    };

    render() {
        
        const BTNArea = (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 10,}}>
                
                <View>
                    <TouchableOpacity
                        style={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle1]}>
                       
                        <Text style={[buttonStyle.secondaryBtnText]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        style={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle1]}>

                        <Text style={[buttonStyle.secondaryBtnText]}>Reschdule</Text>
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
                                <View style = {{ flexDirection: 'row'}}>
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
                                        <Text style={HomeStyles.off_txt_p}>Mar 7,2019, Thu 2 a.m.</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={HomeStyles.off_txt_h}>App Status : </Text>
                                    </View>
                                    <View>
                                        <Text style={HomeStyles.off_txt_p}>Confirmed</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={HomeStyles.off_txt_h}>Visit Frequency : </Text>
                                    </View>
                                    <View>
                                        <Text style={HomeStyles.off_txt_p}>3 rd Followup</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text style={HomeStyles.off_txt_h}>Payment : </Text>
                                    </View>
                                    <View>
                                        <Text style={HomeStyles.off_txt_p}>Paid</Text>
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

