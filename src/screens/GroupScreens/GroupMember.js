import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { updateState, addAddress } from '../actions/user';
import { getStates } from '../../actions/common';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { CheckBox } from 'react-native-elements';
import GroupDetailsStyle from '../../styelsheets/GroupDetailsStyle';
import { updateState, deleteMember, editMember } from '../../actions/group';
import en from '../../messages/en-us';

class GroupMember extends Component {
    componentWillUnmount() {
        // console.log('Component is being unmounted');
        const { memberDetails } = this.props.userState;
        memberDetails.groupPermission = {
            editPermissionFlag: false,
            viewPermissionFlag: false,
            notifyPermissionFlag: false,
        };
        this.props.updateState({ memberDetails });

    }
    static navigationOptions = {
        title: 'GroupMember',
        headerStyle: {
            backgroundColor: '#572a6f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            // fontWeight: 'bold',
            paddingLeft: 50,
            //justifyContent: 'center',
            //alignItems: 'center',
        },
    }; 
    onSubmit = () => {
        this.props.deleteMember();
        this.props.navigation.navigate('GroupDetails');
    } 

    onClick = (id) => {
        console.log("button trigger", id);
        const { memberDetails } = this.props.userState;
        memberDetails.groupPermission[id] = !memberDetails.groupPermission[id];
        this.props.updateState({ memberDetails });
    };
    
    
    updateMember = () => {
        this.props.editMember();
        this.props.navigation.navigate('GroupDetails');
    }
    render() {  
        const { memberDetails } = this.props.userState;      
        const adminSection = (
            <View style={{
                flex: 1, height: 40,justifyContent: 'center',alignItems:'center',}}>                         
                  <Text style={{ fontSize:17,textAlign: 'center', color: '#000',}}>{ memberDetails.name }</Text>                                
            </View>
        );
        const groupBtn = (
            <View style={{ flex: 1, height: 40, marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly',  }}>
                <TouchableOpacity onPress={this.onSubmit}>
                    <View style={{ width: 120, height: 30, borderWidth: 1, borderColor: '#972493', borderRadius: 5, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ textAlign: 'center', color: '#000', }}>{en.groupLabels.removeBtnLabel}</Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.updateMember} >
                    <View style={{ width: 120, height: 30, borderWidth: 1, borderColor: '#972493', borderRadius: 5, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ textAlign: 'center', color: '#000', }}>{en.groupLabels.updateBtnLabel}</Text>

                    </View>
                </TouchableOpacity>
            </View>
        );
        return (
            <View style={GroupDetailsStyle.mainWrapper}>
                <ScrollView>
                    <View style={{ flex: 1, }} >
                        <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1,alignItems: 'center',height: 45,}}>
                            <Text style={{ fontWeight: 'bold' }}> {memberDetails.groupName}{en.groupLabels.memberLabel} </Text>
                        </View>                       
                    </View>                               
                        <View style={{ flex: 1, padding: 10, backgroundColor: 'fff', }}>
                                {adminSection}
                                <View style={{flex: 1,height: 60,}}>
                                    <View style={{flex: 1,margin: 1,borderBottomWidth: 1,borderColor: '#ccc',}}>
                                                                      
                                        <View style={{flex: 0.85, height: 25, justifyContent: 'center',}}>                                                   
                                            <View style={{flex: 0.85, height: 25, marginTop:5,flexDirection: 'row', justifyContent: 'space-between',}}>
                                                <View style={GroupDetailsStyle.ratebtn}>
                                                    <CheckBox checked={memberDetails.groupPermission.editPermissionFlag}
                                                        onPress={() => this.onClick('editPermissionFlag')} 
                                                    />
                                            <Text style={GroupDetailsStyle.ratebtnText}>{en.groupLabels.editCheckboxLabel}</Text>
                                                </View>
                                                <View style={GroupDetailsStyle.ratebtn}>
                                                <CheckBox checked={memberDetails.groupPermission.viewPermissionFlag} 
                                                        onPress={() =>this.onClick('viewPermissionFlag') }/>
                                            <Text style={GroupDetailsStyle.ratebtnText}>{en.groupLabels.viewCheckboxLabel} </Text>
                                                </View>
                                                <View style={GroupDetailsStyle.notificationbtn}>
                                                <CheckBox checked={memberDetails.groupPermission.notifyPermissionFlag} 
                                                        onPress={() =>this.onClick('notifyPermissionFlag') }/>
                                            <Text style={GroupDetailsStyle.ratebtnText}>{en.groupLabels.notificationCheckboxLabel} </Text>
                                                </View>
                                            </View>
                                            </View>                                                                     
                                            </View>
                                          </View>                              
                                {groupBtn}
                            </View>                             

                </ScrollView>
            </View>
        );
    }
};

GroupMember.propTypes = {
    // userDetails: PropTypes.object,
    // commonState: PropTypes.object,
    memberDetails: PropTypes.object
}
const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.common
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, GroupMember, getStates, deleteMember, editMember }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMember);