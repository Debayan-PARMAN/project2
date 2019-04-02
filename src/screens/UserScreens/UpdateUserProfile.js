import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState, getDoctorDetails } from '../../actions/doctors';
import { View, Image, Text,  TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import UpdateUserProfileStyle from '../../styelsheets/UpdateUserProfileStyle';
import imageConstantURI from '../../../src/constants/imageConst';
import { LinearGradient } from 'expo';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import Header_Blank from '../../components/Header/Header_Blank';
import Footer from '../../components/Footer/Footer';

class Update_User_Profile extends Component {

    static navigationOptions = {
        title: 'DOCTOR PROFILE',
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

    onValueChange = (value, id) => {
        const { doctorDetails } = this.props.doctorState;
        doctorDetails[id] = value;
        this.props.updateState({ doctorDetails });
    }

    onUpdateProfile = () => {
        //console.log('function triggered');
        const { doctorDetails } = this.props.doctorState;
        doctorDetails.fieldsEditable = true;
        this.props.updateState({ doctorDetails });
    }

    onSaveUpdatedProfile = () => {
        //console.log('function triggered');
        const { doctorDetails } = this.props.doctorState;
        doctorDetails.fieldsEditable = false;
        this.props.updateState({ doctorDetails });
    }

    onSubmit = () => {
        // console.log('Save Profile Button triggered');
        this.onSaveUpdatedProfile();
        this.props.updateUserProfile();
        // this.props.navigation.navigate('AddAddress');
        // this.onUpdateProfile();
        this.props.navigation.navigate('Home');
    }

    render() {

        const {doctorDetails} = this.props.doctorState;
       // console.log("doctorDetails", doctorDetails);

        const specializationList = doctorDetails.doctorSpecializationList.map(item => item.specialization).join(', ');
        const subspecializationList = doctorDetails.doctorSpecializationList.map(item => item.subSpecialization).join(',');
        const qualificationList = doctorDetails.doctorQualificationList.map(item => item.qualification).join(',');
        const qualificationInstitute = doctorDetails.doctorQualificationList.map(item => item.institute).join(',');

        const doctorDetailsArea = (<View style={UpdateUserProfileStyle.userNameArea} >
            <View style={UpdateUserProfileStyle.userNameFirstArea} >
                <Text style={[UpdateUserProfileStyle.doctorDetailsText, { marginTop: 5 }]}>{doctorDetails.doctorName}</Text>
                <Text style={[UpdateUserProfileStyle.doctorDetailsText, {marginTop:4}]}>{doctorDetails.emailId}</Text>
                <Text style={[UpdateUserProfileStyle.doctorDetailsText, { marginTop: 5 }]}>{doctorDetails.mobileNo1}</Text>
            </View>
            <View style={UpdateUserProfileStyle.userNameLastArea} >
                <Image style={UpdateUserProfileStyle.profileImageArea}
                    source={imageConstantURI.doctorImage.src} />
            </View>
        </View>);
       
       
       
        const row1 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flex: 0.45, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Registration Number</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                   style={textInputStyle.primaryTextInput}
                   // placeholder="Registration Number"
                    onChangeText={(e) => this.onValueChange(e, 'registrationNo')}
                    value={doctorDetails.registrationNo} />
            </View>
            <View style={{ flex: 0.45,}} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Years of Experience</Text>
                   <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                   // placeholder="0"
                   // keyboardType="numeric"
                    onChangeText={(e) => this.onValueChange(e, 'yearsOfExperience')}
                    value={doctorDetails.yearsOfExperience} />
            </View>
        </View>);
        const row2 = (         
                <View style={{ flex: 1,  }} >
                <View style={{ marginTop: 4, }} >       
                    <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Specialization</Text>
                    <TextInput style={textInputStyle.primaryTextInput}  
                   value= {specializationList} >
                    </TextInput>
                    </View>          
                <View style={{marginTop: 4,}} > 
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Sub Specialization</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                   // placeholder="Sub Specialization"
                    onChangeText={(e) => this.onValueChange(e, 'maritialStatus')}
                    value={subspecializationList} />
                     </View>           
        </View>);
        const row3 = (
            <View style={{ flex: 1,}} >
                 <View style={{marginTop: 4,}} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Qualification</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                   // placeholder="Qualification"
                    onChangeText={(e) => this.onValueChange(e, 'Qualification')}
                    value={qualificationList} />
            </View>
            <View style={{marginTop: 4,}} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Year</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                   // placeholder="Year"
                    onChangeText={(e) => this.onValueChange(e, 'Year')}
                    value={doctorDetails.maritialStatus} />
            </View>
             <View style={{marginTop: 4,}} > 
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Institute</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                    //placeholder="Institute"
                    onChangeText={(e) => this.onValueChange(e, 'Institute')}
                    value={qualificationInstitute} />
            </View>
        </View>);
        const row4 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flex: 0.5, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>DOB</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                   // placeholder="DD-MM-YYYY"
                    onChangeText={(e) => this.onValueChange(e, 'dateOfBirth')}
                    value={doctorDetails.dateOfBirth} />
            </View>
            <View style={{ flex: 0.5, height: 50, marginLeft: 10 }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Alternate Number 1 </Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                    //placeholder="+91"
                    onChangeText={(e) => this.onValueChange(e, 'mobileNo2')}
                    value={doctorDetails.mobileNo2} />
            </View>
        </View>);
        const row5 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flex: 0.5, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>Alternate Number 2</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                   // placeholder="+91"
                    onChangeText={(e) => this.onValueChange(e, 'mobileNo3')}
                    value={doctorDetails.mobileNo3} />
            </View>
            <View style={{ flex: 0.5, height: 60, marginLeft: 10 }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.primaryTextInputFontStyle}>LandLine</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.primaryTextInput}
                   // placeholder="Sub Specialization"
                    onChangeText={(e) => this.onValueChange(e, 'LandLine')}
                    value={doctorDetails.LandLine} />
            </View>
        </View>);
        const addressArea = (
            <View style={{ flex: 1,marginTop:15}} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')} >
                    <View style={AddAddressStyle.AddnewAreaContainer}>
                        <View style={[AddAddressStyle.Container1,{borderColor:'#ccc'}]}>
                            <Text style={AddAddressStyle.AddressTypeText}>My Addresses</Text>
                        </View>
                        <View style={[AddAddressStyle.Container2,{borderColor:'#ccc'}]}>

                            <Image style={[AddAddressStyle.ImageView, { padding: 6 }]}
                                source={imageConstantURI.rightArrow.src} />

                        </View>
                    </View>
                </TouchableOpacity >
                {/* <Text style={UpdateUserProfileStyle.address}>{en.userScreensLabel.addressLabel}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')} >

                    <View style={UpdateUserProfileStyle.addaddress}>
                    {userDetails.addressList.length > 0 ? 
                            <Text style={UpdateUserProfileStyle.addaddressText}>{en.userScreensLabel.addressFoundText}.... {userDetails.addressList.length}</Text>
                        :   
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')} >
                            <View style={{ flex: 1,flexDirection: 'row', }}>
                                <View style={UpdateUserProfileStyle.addaddresslogoContainer} >
                            <Image style={UpdateUserProfileStyle.addaddresslogo}
                                          source={imageConstantURI.add.src} />
                           </View>
                           
                                    <Text style={[UpdateUserProfileStyle.addaddressText, { marginTop: 12,}]}>{en.userScreensLabel.addAddressLabel}</Text>
                           
                           </View>
                        </TouchableOpacity>
                    } 
                      
                    </View>
                </TouchableOpacity> */}
            </View>
        );
       
        
        const buttonArea = (<View style={UpdateUserProfileStyle.buttons}>
            {!doctorDetails.fieldsEditable ? 
                
                    <TouchableOpacity onPress={() => this.onUpdateProfile()} >
                        <LinearGradient
                            style={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
                            colors={[styleConstants.colorStyles.primaryGradientColor, styleConstants.colorStyles.secondaryGradientColor]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }} >
                            <Text style={[buttonStyle.primaryBtnText]}> {en.commonLabel.updateProfileBtn}</Text>
                        </LinearGradient>                   
                </TouchableOpacity>
           
            :
                
                <TouchableOpacity onPress={() => { this.onSubmit() }} >
                        <LinearGradient
                            style={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
                            colors={[styleConstants.colorStyles.primaryGradientColor, styleConstants.colorStyles.secondaryGradientColor]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }} >
                            <Text style={[buttonStyle.primaryBtnText]}>{en.commonLabel.saveProfileBtn}</Text>
                        </LinearGradient>                   
                </TouchableOpacity>
          
            }            
           
                <TouchableOpacity
                    style={[buttonStyle.secondaryBtnStyle, buttonStyle.btnSizeStyle1]}
                     onPress={() => this.props.navigation.navigate('Home')} >            
                    <Text style={[buttonStyle.secondaryBtnText]}>{en.commonLabel.skipBtn}</Text>
                </TouchableOpacity>
           
        </View>
        );        
        return (<View style={{ flex: 1 }}>                      
                <ScrollView style={UpdateUserProfileStyle.mainWrapper}> 
                      <KeyboardAvoidingView behavior="position">
                            {/* <View style={UpdateUserProfileStyle.health}>
                                <Text style={UpdateUserProfileStyle.healthText}>{en.userScreensLabel.healthProfileHeading}</Text>
                            </View> */}
                            {/* {userProfileTabs} */}                           
                                {doctorDetailsArea}
                                {/* {dobArea} */}
                                {/* {row1} */}
                                {row1}
                                {row2}
                                {row3}
                                {row4}
                                {row5}
                                {addressArea}                            
                            {buttonArea}
                    </KeyboardAvoidingView>   
                    </ScrollView>                     
                <Footer navigation={this.props.navigation} />
            </View>              
           
        );
    }
};

Update_User_Profile.propTypes = {
    doctorDetails: PropTypes.object,
    common: PropTypes.object,
}
const mapStateToProps = state => ({
    doctorState: state.doctorState,
    common: state.common,
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, getDoctorDetails }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Update_User_Profile);