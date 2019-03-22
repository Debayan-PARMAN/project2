import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPassword, updateState } from '../../actions/user';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { buttonStyle, textInputStyle } from '../../styelsheets/CommonStyle';
import en from '../../messages/en-us';

class ChangePassword extends Component {
    static navigationOptions = {
        title: 'ChangePassword',
        headerStyle: {
            backgroundColor: '#572a6f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            // fontWeight: 'bold',
            paddingLeft: 30,
            //justifyContent: 'center',
            //alignItems: 'center',
        },
    };   
    onValueChange = (value, id) => {
        const { userDetails } = this.props.userState;
        userDetails[id] = value;
        this.props.updateState({ userDetails });
    }

    onSubmit = () => {
        const { userDetails } = this.props.userState;
        if (userDetails.password !== '' && userDetails.password.length >= 8) {
            this.props.resetPassword();
            this.props.navigation.navigate('Home');

        } else {
            alert("Enter valid Password minimum 8 characters");
        }

    }
    render() {   
        const { userDetails } = this.props.userState;

        const changePasswordButton = (<ButtonComponent buttonLabel={en.commonLabel.submitLabel}
            buttonFunction={() => this.onSubmit()}
            buttonType='type1'
            buttonStyle={[buttonStyle.primaryBtnStyle, buttonStyle.btnSizeStyle1]}
            buttonTextStyle={[buttonStyle.primaryBtnText]} />);
        
        return (
            <View style={{ flex: 1,}}>
                <ScrollView>
                    <View style={{ flex: 1,marginTop:5, height:30,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{ fontSize: 16, }}>{en.loginLabels.changePasswordLabel}</Text>
                    </View>                    
                   

                    <View style={{ height: 80,padding:4,marginTop:5}}>
                        <Text style={{ marginLeft: 5, fontSize: 15 }}>{en.loginLabels.newPasswordLabel}</Text>
                        <TextInput
                            style={{ height: 45, borderColor: 'grey',padding:5,borderBottomWidth:1,}}
                            placeholder="************"
                            value={userDetails.password}
                            onChangeText={(e) => this.onValueChange(e, 'password')}
                        />
                    </View>  

                    <View style={{ flex: 1, height: 40, marginTop: 15, justifyContent: 'center',alignItems: 'center', }}>
                        {changePasswordButton}                
                    </View>                                                 
                                 
                </ScrollView>                  
            </View>           
        ); 
      }
};

ChangePassword.propTypes = {
    userDetails: PropTypes.object,
    commonState: PropTypes.object
}
const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.common
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, resetPassword}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);