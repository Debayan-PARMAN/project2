import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState } from '../../actions/user';
import { View, Text, Image, TouchableOpacity, ScrollView, CheckBox,} from 'react-native';
import GroupDetailsStyle from '../../styelsheets/GroupDetailsStyle';
import imageConstantURI from '../../constants/imageConst';
import { viewGroupMember, deleteGroup } from '../../actions/group';
import GroupMemberCard from '../../components/Card/GroupMemberCard';
import en from '../../messages/en-us';

class GroupDetails extends Component {

    componentDidMount() {
        this.props.viewGroupMember();
    }
    static navigationOptions = {
        title: 'GroupDetails',
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

    
    onSelectedMember = (id) => {
        const { viewMember } = this.props.userState;
        let memberDetails = {};
        const selectedMemberDetails = viewMember.filter(member => member.id === id);
        memberDetails = selectedMemberDetails[0];
        this.props.updateState({ memberDetails });
        this.props.navigation.navigate('GroupMember');
    }

    onDelete = () => {
        console.log("button trigger");
        this.props.deleteGroup();
        this.props.navigation.navigate('MyGroups');
    }  

    
    render() {
        const { groupDetails } = this.props.userState;
        const { viewMember } = this.props.userState;
        //console.log(groupDetails);
        
        const adminSection = (
            <View style={{ height: 35, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => { }} >
                    <View style={{ width: 70, height: 30, justifyContent: 'center', backgroundColor: '#972493', borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', }}>{en.groupLabels.adminLabel}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ width: 250, height: 30, marginLeft: 5, }}>
                    <Text style={{ fontSize: 17, color: '#000', marginTop: 1.5 }}>{groupDetails.groupOwnerName}</Text>
                </View>
            </View>
        );
        const groupBtn = (
            <View style={{height: 45, flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNewGroupMember') }>
                    <View style={{ width: 120, height: 30, borderWidth: 1, borderColor: '#972493',  borderRadius: 5,justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'center', alignItems: 'center', color: '#000', }}>{en.groupLabels.addMemberBtn}</Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.onDelete} >
                    <View style={{ width: 120, height: 30,borderWidth: 1,marginLeft:20 ,borderRadius: 5,borderColor:'#972493',justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'center', alignItems: 'center', color: '#000', }}>{en.groupLabels.deleteGroupBtn}</Text>

                    </View>
                </TouchableOpacity>
            </View>
        );

        

        let memberArea = (<Text> {en.groupMsg.groupMsgInfo} </Text>);
        //console.log(doctorslist);
        if (viewMember !== undefined && viewMember.length > 0) {
            memberArea = (
                <ScrollView>
                    {viewMember.map(member =>
                        <GroupMemberCard key={member.id}
                            memberData={member} onSelectedMember={this.onSelectedMember} />)}
                    
                </ScrollView>
            );
        }

        return (
            <View style={GroupDetailsStyle.mainWrapper}>               
                   
                <View style={{ height: 80, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, }}> {en.groupLabels.groupLabel} {groupDetails.groupName} </Text>
                    {groupBtn}
                </View>                                               
                    { memberArea }
                        
                </View>                                         
                
           
        );
    }
};

GroupDetails.propTypes = {
    groupDetails: PropTypes.object,
    //commonState: PropTypes.object
}
const mapStateToProps = state => ({
    userState: state.userState,
    //commonState: state.common
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, viewGroupMember, deleteGroup }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);