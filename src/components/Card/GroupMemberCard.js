import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Card, CheckBox } from 'react-native-elements'
import imageConstantURI from '../../constants/imageConst';
import { updateState, } from '../../actions/user';
import { viewGroupMember, deleteGroup, addMember } from '../../actions/group';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import en from '../../messages/en-us';

class GroupMemberCard extends Component {   
    render() { 
        const { memberData } = this.props;
        //console.log(memberData.groupPermission.status);      
        return (   
                  
            <Card style={{ flex: 1,backgroundColor: '#fff', }}>                   
                <View style={{ flex: 1,height:35,justifyContent:'space-between',alignItems:'center',flexDirection:'row', backgroundColor: '#fff', }}>
                    <Text style={{ fontSize: 15, }}>{en.commonLabel.nameLabel} : { memberData.name }</Text>                          
                    <View style={{ width: 90, height:28,justifyContent:'center',borderRadius:5 }}>
                        <Text style={{ fontSize: 13, color: '#972493', fontWeight: 'bold', textAlign: 'center', }}> { memberData.groupRole }</Text>
                    </View>       
                </View>

                <View style={{ flex: 1, height: 60, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row',  }}>
                    <View style={{ flex: 1, height: 60, justifyContent: 'center',}}>
                        <Text style={{ fontSize: 15, }}>{en.commonLabel.contactNoLabel} : { memberData.contactNo }</Text>                         
                        <Text style={{ fontSize: 15, marginTop: 10 }}> {en.loginLabels.emailLabel} : { memberData.emailAddress }</Text>
                    </View>
                    <TouchableOpacity onPress={(e) => this.props.onSelectedMember(memberData.id)}>
                        <View style={{ width: 40, height: 60, justifyContent: 'space-around',borderRadius: 5 }}>
                            <Image style={{ width: 22, height: 22,marginLeft:20 }} source={imageConstantURI.rightArrow.src}/>
                        </View>
                    </TouchableOpacity>
                </View>
                    
                <View style={{ flex: 1, height: 30,justifyContent: 'center', }}>
                    <Text>{en.appointmentScreens.statusLabel} : { memberData.groupPermission.status ? 'True' : 'False'}</Text>
                </View> 
                </Card>             
                
        );
    }
};

GroupMemberCard.propTypes = {
    groupDetails: PropTypes.object,
}

const mapStateToProps = state => ({
    userState: state.userState,
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, viewGroupMember, deleteGroup, addMember }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMemberCard);
