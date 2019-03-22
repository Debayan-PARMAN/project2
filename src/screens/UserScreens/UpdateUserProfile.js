import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState, getDoctorDetails } from '../../actions/doctors';
import { View, Image, Text, Alert, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import UpdateUserProfileStyle from '../../styelsheets/UpdateUserProfileStyle';
import { KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import imageConstantURI from '../../../src/constants/imageConst';
import { LinearGradient } from 'expo';
import Drop_Down from '../../components/DropDown';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import { TextInputStyles } from '../../styelsheets/TextInputStyle';

class Update_User_Profile extends Component {

    static navigationOptions = {
        title: 'DoctorProfile',
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
            paddingLeft: 30,
            
        },
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
        const { bloodGroupOptions } = this.props.common;
        // console.log("doctorDetails", doctorDetails);

        const userProfileTabs = (<View style={UpdateUserProfileStyle.userProfileTabs}>
            <View style={UpdateUserProfileStyle.userProfileInnerTabs}>
                <View style={UpdateUserProfileStyle.userProfileInnerFirstTabs} >
                    <Text style={UpdateUserProfileStyle.tabText}>{en.userScreensLabel.personalTabLabel}</Text>
                </View>
                <View style={UpdateUserProfileStyle.userProfileInnerSecondTabs} >
                    <Text style={UpdateUserProfileStyle.userProfileInnerSecondTabsText}>{en.userScreensLabel.medicalTabLabel}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LifeStyle')} >
                <View style={UpdateUserProfileStyle.userProfileInnerLastTabs} >
                    <Text style={UpdateUserProfileStyle.userProfileInnerSecondTabsText}>{en.userScreensLabel.lifestyleTabLabel}</Text>
                </View>
                </TouchableOpacity>
              </View> 
            </View>
        );

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

        let dobArea = '';
        if(!doctorDetails.fieldsEditable){
            dobArea = (<View>
                <Text style={TextInputStyles.font}>{en.userScreensLabel.dateOfBirthLabel}</Text>
                <TextInput editable={doctorDetails.fieldsEditable} style={TextInputStyles.textInputfield}
                onChangeText={(e) => this.onValueChange(e, 'age')}
                    value={doctorDetails.dateOfBirth} />
        </View>);
        }
         else {
            dobArea = (<View style={UpdateUserProfileStyle.datearea}>
                <Text>Date of Birth</Text>                             
                <DatePicker
                    style={{ width: 200 }}
                    date={doctorDetails.dateOfBirth}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1960-01-01"
                    maxDate="2020-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 10,
                            marginRight: 10,
                        },
                        dateInput: {
                            marginLeft: 46,
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    placeholder="dateofBirth"
                    onDateChange={(date) => { this.onValueChange(date, 'dateOfBirth') }}
                />
            </View>);
        }

        const row = (<View style={UpdateUserProfileStyle.bloodheightweight}>
            <View style={UpdateUserProfileStyle.bloodgroup} >
                <Text style={UpdateUserProfileStyle.bloodgrouptext}>{en.userScreensLabel.bloodGroupLabel}</Text>
                {
                    !doctorDetails.fieldsEditable ?
                    <TextInput editable={doctorDetails.fieldsEditable}
                        value={doctorDetails.bloodGroup}
                        style={UpdateUserProfileStyle.textInput}
                        placeholder="bloodGroup"
                        onChangeText={(e) => this.onValueChange(e, 'bloodGroup')}
                        value={doctorDetails.bloodGroup}
                    />
                    :
                    <Drop_Down
                        selectedData='bloodGroup'
                        selectedValue={doctorDetails.bloodGroup}
                        options={bloodGroupOptions}
                        onValueChange={this.onValueChange}
                        optionId='attributePk'
                        optionLabel='displayValue'
                        optionValue='attributeValue' />
                }
            </View>

            <View style={UpdateUserProfileStyle.heightWeightArea} >
                <Text style={TextInputStyles.font}>{en.userScreensLabel.heightLabel}</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={TextInputStyles.textInputfield}
                    placeholder="Height"
                    keyboardType="numeric"
                    onChangeText={(e) => this.onValueChange(e, 'height')}
                    value={doctorDetails.height} 
                    />
            </View>

            <View style={UpdateUserProfileStyle.heightWeightArea} >
                <Text style={TextInputStyles.font}>{en.userScreensLabel.weightLabel}</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={TextInputStyles.textInputfield}
                    placeholder="Weight"
                    keyboardType="numeric"
                    onChangeText={(e) => this.onValueChange(e, 'weight')}
                    value={doctorDetails.weight} />
            </View>
        </View>);
       
        const row1 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flex: 0.50, height: 60, }} >
                    <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>Registration Number</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                   style={textInputStyle.secondaryTextInput}
                   // placeholder="Registration Number"
                    onChangeText={(e) => this.onValueChange(e, 'registrationNo')}
                    value={doctorDetails.registrationNo} />
            </View>
            <View style={{ flex: 0.50, height: 60, marginLeft: 10}} >
                    <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>Years of Experience</Text>
                   <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                   // placeholder="0"
                    keyboardType="numeric"
                    onChangeText={(e) => this.onValueChange(e, 'yearsOfExperience')}
                    value={doctorDetails.yearsOfExperience} />
            </View>
        </View>);
        const row2 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flex: 0.5, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>Specialization</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="Specialization"
                    onChangeText={(e) => this.onValueChange(e, 'gender')}
                    value={doctorDetails.gender} />
            </View>
            <View style={{ flex: 0.5, height: 60, marginLeft: 10 }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}> </Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="Sub Specialization"
                    onChangeText={(e) => this.onValueChange(e, 'maritialStatus')}
                    value={doctorDetails.maritialStatus} />
            </View>
        </View>);
        const row3 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between',}}>
            <View style={{ flex: 0.30, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>Qualification</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="Qualification"
                    onChangeText={(e) => this.onValueChange(e, 'gender')}
                    value={doctorDetails.gender} />
            </View>
            <View style={{ flex: 0.30, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}> </Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="Year"
                    onChangeText={(e) => this.onValueChange(e, 'maritialStatus')}
                    value={doctorDetails.maritialStatus} />
            </View>
            <View style={{ flex: 0.30, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}> </Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="Institute"
                    onChangeText={(e) => this.onValueChange(e, 'maritialStatus')}
                    value={doctorDetails.maritialStatus} />
            </View>
        </View>);
        const row4 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flex: 0.5, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>DOB</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="DD-MM-YYYY"
                    onChangeText={(e) => this.onValueChange(e, 'dateOfBirth')}
                    value={doctorDetails.dateOfBirth} />
            </View>
            <View style={{ flex: 0.5, height: 60, marginLeft: 10 }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>Alternate Number 1 </Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="+91"
                    onChangeText={(e) => this.onValueChange(e, 'maritialStatus')}
                    value={doctorDetails.mobileNo2} />
            </View>
        </View>);
        const row5 = (<View style={{ flex: 1, height: 60, marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flex: 0.5, height: 60, }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>Alternate Number 2</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                    placeholder="+91"
                    onChangeText={(e) => this.onValueChange(e, 'gender')}
                    value={doctorDetails.mobileNo3} />
            </View>
            <View style={{ flex: 0.5, height: 60, marginLeft: 10 }} >
                <Text editable={doctorDetails.fieldsEditable} style={textInputStyle.secondaryTextInputFontStyle}>LandLine</Text>
                <TextInput editable={doctorDetails.fieldsEditable}
                    style={textInputStyle.secondaryTextInput}
                   // placeholder="Sub Specialization"
                    onChangeText={(e) => this.onValueChange(e, 'maritialStatus')}
                    value={doctorDetails.maritialStatus} />
            </View>
        </View>);
        const addressArea = (
            <View style={{ flex: 1}} >
                <Text style={UpdateUserProfileStyle.address}>{en.userScreensLabel.addressLabel}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')} >

                    <View style={UpdateUserProfileStyle.addaddress}>
                        {doctorDetails.doctorAddressList.length > 0 ? 
                            <Text style={UpdateUserProfileStyle.doctorDetailsText}>{en.userScreensLabel.addressFoundText}.... {doctorDetails.doctorAddressList.length}</Text>
                        :   
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Address')} >
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={UpdateUserProfileStyle.addaddresslogoContainer} >
                            <Image style={UpdateUserProfileStyle.addaddresslogo}
                                          source={imageConstantURI.add.src} />
                           </View>
                             <View style={{ width: 90, height: 40, }} >
                                        <Text style={[UpdateUserProfileStyle.doctorDetailsText,{marginTop:12}]}>{en.userScreensLabel.addAddressLabel}</Text>
                             </View>
                           </View>
                        </TouchableOpacity>
                    } 
                      
                    </View>
                </TouchableOpacity>
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
        return (
            <View style={UpdateUserProfileStyle.mainWrapper}>               
                    <ScrollView>
                       
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
                       
                    </ScrollView>               
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