import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { forgotPassword, updateState } from '../../actions/user';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { LoginStyles, FontStyles } from '../../styelsheets/MainStyle';
import en from '../../messages/en-us';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';

class ForgotPasswordOtp extends Component {
    static navigationOptions = {
        title: 'ForgotPassword',
        headerStyle: {
            backgroundColor: '#572a6f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            paddingLeft: 30,
        },
    };   

    onValueChange = (value, id) => {
        const { userDetails } = this.props.userState;
        userDetails[id] = value;
        this.props.updateState({ userDetails });
    }

    onSubmit = () => {
        const { userDetails } = this.props.userState;
        if(userDetails.contactNo !== '' && userDetails.userOTP !== ''){
            //this.props.forgotPassword();
            this.props.navigation.navigate('ChangePassword');

        } else {
            alert("Enter OTP");
        }
        
    }

    onResendOtp = () => {
        this.props.forgotPassword();
    }

    render() {   
        const { userDetails } = this.props.userState;

        const resetPasswordButton = (<ButtonComponent buttonLabel={en.loginLabels.resetPasswordLabel}
            buttonFunction={() => this.onSubmit()}
            buttonType='type1'
            buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
            buttonTextStyle={[buttonStyle.primaryBtnText]} />);

        const resendOTPButton = (<ButtonComponent buttonLabel={en.loginLabels.resendOTPLabel}
            buttonFunction={() => this.onGetOtp()}
            buttonType='type3'
            buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
            buttonTextStyle={[FontStyles.ForgetPasswordFont, LoginStyles.text_underline]} />);

        return (
            <View style={{ flex: 1,}}>
                <ScrollView>
                <View style={{ flex: 1,marginTop:5, height:30,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{ fontSize: 15, }}>{en.loginLabels.forgotPasswordLabel}</Text>
                </View>
                    
                <View style={{ height: 80,padding:4,marginTop:5}}>
                    <Text style={{ marginLeft: 5, fontSize: 15 }}>{en.loginLabels.mobileNumberLabel}</Text>
                    <TextInput
                        style={{ height: 45, borderColor: 'gray',padding:5,borderBottomWidth:1,}}
                        placeholder="Enter Number"
                        value={userDetails.contactNo}
                        maxLength={10}
                        keyboardType="numeric"
                        onChangeText={(e) => this.onValueChange(e, 'contactNo')} 
                    />
                </View>
                <View style={{ height: 80, padding: 4, marginTop: 5 }}>
                    <Text style={{ marginLeft: 5, fontSize: 15 }}>{en.OTPMsg.OTPMsgInfo}</Text>
                    <TextInput
                        style={{ height: 45, borderColor: 'gray', padding: 5, borderBottomWidth: 1, }}
                        placeholder="Enter OTP"
                        value={userDetails.userOTP}
                        maxLength={6}
                        keyboardType="numeric"
                        onChangeText={(e) => this.onValueChange(e, 'userOTP')}
                    />
                </View>
                
                <View style={{ flex: 1, height: 40, marginTop: 15, justifyContent: 'center',alignItems: 'center', }}>
                    {resetPasswordButton}                      
                </View> 
                <View style={LoginStyles.forget_pass_view}>
                    {resendOTPButton}
                </View>                                                             
                                    
                </ScrollView>                  
            </View>
        );
    }
};

ForgotPasswordOtp.propTypes = {
    userDetails: PropTypes.object,
}
const mapStateToProps = state => ({
    userState: state.userState,
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, forgotPassword }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordOtp);