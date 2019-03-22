import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState, addMember } from '../../actions/group';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FindDoctorStyle } from '../../styelsheets/FindDoctorStyle';
import { LinearGradient } from 'expo';
import en from '../../messages/en-us';

class AddNewGroupMember extends Component {
    static navigationOptions = {
        title: 'AddNewGroupMember',
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

    componentWillUnmount() {
        // console.log('Component is being unmounted');
        const addMember = {
            name: '',
            contactNo: '',
            emailAddress: '',
            minor: '',
        };
        
        this.props.updateState({ addMember });

    }


        onValueChange = (value, id) => {
            const { addMember } = this.props.userState;
            addMember[id] = value;
            this.props.updateState({ addMember })
        }
        addMember = () => {
            console.log("button trigger");
            this.props.addMember();
            this.props.navigation.navigate('GroupDetails');
        }
      
    render() {   
        //const { addMember } = this.props.userState;
        const withHover = { ...FindDoctorStyle.buttonStyle, ...FindDoctorStyle.hoverButton };
        const withoutHover = { ...FindDoctorStyle.buttonStyle };
        const withHoverText = { ...FindDoctorStyle.orStyle1 };
        const withoutHoverText = { ...FindDoctorStyle.orStyle };

        const { groupDetails } = this.props.userState;
        const { addMember } = this.props.userState;
         const nameArea = (
            <View style={{ height: 70,padding:5,marginTop:5}}>
                 <Text style={{ padding: 5, fontSize: 15 }}>{en.commonLabel.nameLabel}</Text>
                <TextInput
                    style={{ height: 45, borderColor: '#972493',padding:5,borderBottomWidth:1 }}
                    placeholder="Name"
                     value={addMember.name}
                     onChangeText={(e) => this.onValueChange(e,'name')}
                />
            </View>
        );
        const mobileArea = (
            <View style={{ height: 70,padding:5,marginTop:10}}>
                <Text style={{ padding: 5, fontSize: 15 }}>{en.loginLabels.mobileNumberLabel}</Text>
                <TextInput
                    style={{ height: 45, borderColor: '#972493',padding:5,borderBottomWidth: 1, }}
                    placeholder="Provide Mobile Number"
                    value={addMember.contactNo}
                    onChangeText={(e) => this.onValueChange(e,'contactNo')}
                />
            </View>
        );
        const emailArea = (
            <View style={{ height: 80,padding:5,marginTop:10, marginBottom: 15 }}>
                <Text style={{ padding: 5, fontSize: 15 }}>{en.loginLabels.emailLabel}</Text>
                <TextInput
                    style={{ height: 45, borderColor: '#972493',padding:5,borderBottomWidth: 1 }}
                    placeholder="Provide Email Address"
                    value={addMember.emailAddress}
                    onChangeText={(e) => this.onValueChange(e,'emailAddress')}
                />
            </View>
        );  

         const minoradultbuttonArea = (
             <View style={FindDoctorStyle.addressContainer}>
             <View style = {{ flex: 0.25}}>
             </View>

                 <View style={addMember.minor === 'true' ? withHover : withoutHover}>
                     <TouchableOpacity onPress={() => this.onValueChange('true', 'minor')}>
                         <Text style={addMember.minor === 'true' ? withHoverText : withoutHoverText}>{en.groupLabels.minorTabLabel}</Text>
                     </TouchableOpacity>
                 </View>
                 <View style={addMember.minor === 'false' ? withHover : withoutHover}>
                     <TouchableOpacity onPress={() => this.onValueChange('false', 'minor')}>
                         <Text style={addMember.minor === 'false' ? withHoverText : withoutHoverText}>{en.groupLabels.adultTabLabel}</Text>
                     </TouchableOpacity>
                 </View>
                 <View style={{ flex: 0.25 }}>
                 </View>
             </View>                   
                 );  

        const addbuttonArea = (
            <View style={[FindDoctorStyle.linearGradiantContainer, { marginTop: 15 }]}>
                <LinearGradient
                    style={FindDoctorStyle.linearGradiant}
                    colors={['#a25ca8', '#582491']}
                >
                <TouchableOpacity onPress={this.addMember }>
                        <Text style={FindDoctorStyle.search}>{en.commonLabel.addBtnLabel}</Text>
                </TouchableOpacity>
                </LinearGradient>                      
                       </View>
                 );  
        
        return (
            <View style={{ flex: 1,}}>
                <ScrollView>
                      <View style={{ flex: 1,marginTop:10, height:30,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{ fontSize: 17, }}>{en.groupLabels.newMemberLabel}{groupDetails.groupName}</Text>
                      </View>
                                    {nameArea}
                                    {mobileArea}
                                    {emailArea}
                                    {minoradultbuttonArea}
                                    {addbuttonArea}                  
                                   
                </ScrollView>                  
            </View>
        );   }
};

AddNewGroupMember.propTypes = {
    userDetails: PropTypes.object,
    commonState: PropTypes.object
}
const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.common
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, addMember }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewGroupMember);