import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestOTP, updateState, numberCheckRegistration } from '../../actions/user';
import { View, Image, Text, Alert, TouchableOpacity, TextInput, ScrollView, TouchableHighlight,} from 'react-native';
import { LoginStyles, FontStyles, Button_fb_google, } from '../../styelsheets/MainStyle';
import imageConstantURI from '../../constants/imageConst';
import { LinearGradient } from 'expo';
import { TextInputStyles } from '../../styelsheets/TextInputStyle';
import { buttonStyle } from '../../styelsheets/CommonStyle';
import styleConstants from '../../constants/styleConstants';
import ButtonComponent from '../../components/Button/ButtonComponent';
import en from '../../messages/en-us';

class Registration extends Component {

  static navigationOptions = {
    title: 'CREATE ACCOUNT',
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
      fontWeight: 'bold',
      paddingLeft: 30,
      //alignItems:'center',
    },
  };

  onValueChange = (value, id) => {
    const { userDetails } = this.props.userState;
    userDetails[id] = value;
    this.props.updateState({ userDetails });
  }

  // checkData = (commonData) => {
  //   if (commonData.length === 10 && commonData.test(/d/g)){
  //     this.setState({ contactNo: commonData });
  //     return true;
  //   } else {
  //     this.setState({ emailAddress: commonData });
  //     return false;
  //   }
  // }

  onCancelAlert = () => {
    this.props.updateState({ responseTriggerred: false });
    // this.props.navigation.navigate('Home');
  }

  onSubmit = () => {
    //console.log('Registration Button triggered');
    const {userDetails} = this.props.userState;
    const regex = /[0-9]/g;

    if (!(regex.test(userDetails.contactNo) && userDetails.contactNo.length === 10)){
      Alert.alert(
        '',
        message='Provide a valid number',
        [{
          text: 'Cancel',
          onPress: this.onCancelAlert,
          style: 'cancel'
        }], {
          cancelable: false
        }
      );
    }
    else {
      this.props.numberCheckRegistration(this.props.navigation.navigate)
      //   // this.props.navigation.navigate('VerifyMobileMumber');
      // } else {
      //   Alert.alert(
      //     '',
      //     message = 'Number1 already exists',
      //     [{
      //       text: 'Cancel',
      //       onPress: this.onCancelAlert,
      //       style: 'cancel'
      //     }], {
      //       cancelable: false
      //     }
      //   );
      // }
    }
  }
  render() {
    const { userDetails } = this.props.userState;

    const nextButton = (<ButtonComponent buttonLabel={en.commonLabel.nextBtnLabel}
      buttonFunction={() => this.onSubmit()}
      buttonType='type1'
      buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
      buttonTextStyle={[buttonStyle.primaryBtnText]} />);

    const faceBookButton = (
      <ButtonComponent buttonLabel={en.loginLabels.facebookLabel}
        buttonFunction={() => console.log('Login with facebook')}
        buttonType='type4'
        buttonStyle={[Button_fb_google.second_container, Button_fb_google.third_container, LoginStyles.toggleButton_Sub_Container_Row1]}
        buttonImageSRC={imageConstantURI.facebook.src}
        buttonImageStyle={Button_fb_google.image}
        buttonTextStyle={[FontStyles.font, { color: 'white' }]} />
    );

    const googleButton = (
      <ButtonComponent buttonLabel={en.loginLabels.googleLabel}
        buttonFunction={() => console.log('Login with google')}
        buttonType='type4'
        buttonStyle={[Button_fb_google.second_container, Button_fb_google.third_container, LoginStyles.toggleButton_Sub_Container_Row1]}
        buttonImageSRC={imageConstantURI.google.src}
        buttonImageStyle={Button_fb_google.image}
        buttonTextStyle={[FontStyles.font, { color: 'white' }]} />
    );

    const signInPasswordButton = (<ButtonComponent buttonLabel={en.commonLabel.signInBtn}
      buttonFunction={() => this.props.navigation.navigate('Login')}
      buttonType='type1'
      buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
      buttonTextStyle={[buttonStyle.primaryBtnText]} />);

    const mobileDataArea = (<View style={LoginStyles.textInput}>
      <Text style={TextInputStyles.font}>{en.loginLabels.mobileNumberLabel}</Text>
      <TextInput
        style={TextInputStyles.textInputfield}
        placeholder="Type your Mobile Number"
        value={userDetails.contactNo}
        maxLength={10}
        keyboardType="numeric"
        onChangeText={(e) => this.onValueChange(e, 'contactNo')} />
    </View>);

    return (
      <View style={LoginStyles.mainWrapper}>
        <ScrollView>
          
          {mobileDataArea}
                    
          <View style={{ height: 30 }}></View>

          <View style={LoginStyles.button}>
            
            <View style={{ flex: 0.7, }}></View>

            <View style={{ flex: 1, }}>{nextButton}</View>
            
            <View style={{ flex: 0.7, }}></View>

          </View>
          
          <View style={{ height: 25 }}></View>

          <View style={LoginStyles.bannerArea2_Text}>
            <Text style={FontStyles.font}>----------------------------------------- {en.commonLabel.orLabel} -----------------------------------------</Text>
          </View>
          
          <View style={{ height: 25 }}></View>

          <View style={Button_fb_google.first_container}>{faceBookButton}</View>

          <View style={Button_fb_google.first_container}>{googleButton}</View>

          <View style={LoginStyles.forget_pass_view}>
            <Text style={FontStyles.font}>{en.createAccountMsg.createAccountpageInfo}</Text>
          </View>

          <View style={LoginStyles.button}>           
            <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
              {signInPasswordButton}
            </View>            
          </View>
        </ScrollView>
      </View>
    );
  }
};

Registration.propTypes = {
  userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ requestOTP, updateState, numberCheckRegistration }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);