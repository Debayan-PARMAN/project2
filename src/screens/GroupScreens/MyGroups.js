import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState } from '../../actions/user';
import { getStates } from '../../actions/common';
import { getMyGroup } from '../../actions/group';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FindDoctorStyle } from '../../styelsheets/FindDoctorStyle';
import { LinearGradient } from 'expo';
import en from '../../messages/en-us';

class MyGroups extends Component {

    componentDidMount() {
        this.props.getMyGroup();
    }
    static navigationOptions = {
        title: 'My Groups',
        headerStyle: {
            backgroundColor: '#572a6f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            // fontWeight: 'bold',
            paddingLeft: 70,
            //justifyContent: 'center',
            //alignItems: 'center',
        },
    };

    
    openSelectedGroup = (id) => {
            const { myGroup } = this.props.userState;
            let groupDetails = {};
            const selectedGroupDetails = myGroup.filter(group => group.id === id);
            groupDetails = selectedGroupDetails[0];
            this.props.updateState({ groupDetails });
            this.props.navigation.navigate('GroupDetails');
    }


    createNewGroup = () => {
       
        //this.props.updateState({ userDetails });
        this.props.navigation.navigate('AddGroup');
    }

    

    render() {
        const { myGroup } = this.props.userState;
    
        const groupTypeArea = myGroup.length > 0 ?
            myGroup.map((group, index) =>
                <TouchableOpacity onPress={() => this.openSelectedGroup(group.id)} key={index}>
                    <View style={{ flex: 1, height: 50, padding: 10, flexDirection: 'row', }}>
                        <View style={{ flex: 1, height: 35, borderBottomWidth: 1, borderColor: '#972493' }}>
                            <Text style={{ fontSize: 15, padding: 2, }}>{group.groupName}</Text>
                        </View>
                        <View style={{ flex: 0.1, height: 35, borderBottomWidth: 1, borderColor: '#972493' }}>
                            <View style={{ padding: 6 }} >
                                <Image style={{ width: 20, height: 20 }}
                                    source={imageConstantURI.rightArrow.src}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity >)
            :
            <View></View>;

        const createnewArea = (
            <View style={[FindDoctorStyle.linearGradiantContainer,{marginTop:10}]}>
                <LinearGradient
                    style={FindDoctorStyle.linearGradiant}
                    colors={['#a25ca8', '#582491']}

                >
            <TouchableOpacity onPress={() => this.createNewGroup()} >
                
                        <Text style={FindDoctorStyle.search}>{en.groupLabels.createNewLabel}</Text>
                   
            </TouchableOpacity >
            </LinearGradient>
                            </View >);

       

        return (
            <View style={UserProfileStyle.mainWrapper}>
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#fff' }} >

                        <View style={{ flex: 1, height: 45, borderBottomWidth: 1, marginBottom: 5,}} >
                            <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{en.groupLabels.memberOfLabel} {myGroup.length} {en.groupLabels.groupsLabel} </Text>
                        </View>
                        
                        { groupTypeArea }
                        
                        
                        {createnewArea}
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
};

MyGroups.propTypes = {
    userDetails: PropTypes.object,
    commonState: PropTypes.object,
    myGroup: PropTypes.object,
}
const mapStateToProps = state => ({
    userState: state.userState,
    commonState: state.common,
    
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, getMyGroup, getStates }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MyGroups);