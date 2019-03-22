import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState, addGroup } from '../../actions/group';
import { View, Text, TouchableOpacity, TextInput, ScrollView,  } from 'react-native';
import AddAddressStyle from '../../styelsheets/AddAddressStyle';
import { LinearGradient } from 'expo';
import { FindDoctorStyle } from '../../styelsheets/FindDoctorStyle';
import en from '../../messages/en-us';

class AddGroup extends Component {
    static navigationOptions = {
        title: 'AddGroup',
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
    
    onValueChange = (value, id) => {
        const { addGroup } = this.props.userState;
        addGroup[id] = value;
        this.props.updateState({ addGroup })
    }

    
    onSubmit = () => {
        this.props.addGroup();
        this.props.navigation.navigate('MyGroups');
    }

    

   

    render() {
        
        //const { addGroup } = this.props.userState;
       const customAddressArea = (
            <View style={{ height: 45, marginTop: 10, marginTop: 5, backgroundColor: '#fff', }}>
                <TextInput
                    style={{ height: 45, borderColor: 'gray', borderBottomWidth: 1, padding: 6, marginTop: 0 }}
                    placeholder="Group Name"
                    //value={addGroup.groupName}
                    onChangeText={(e) => this.onValueChange(e, 'groupName')}
                />
            </View>
        );

        const groupBtn = (
            <View style={{ flex: 1, height: 40, marginTop: 20, flexDirection: 'row', justifyContent: 'center', }}>
                <View style={FindDoctorStyle.linearGradiantContainer}>
                    <LinearGradient
                        style={FindDoctorStyle.linearGradiant}
                        colors={['#a25ca8', '#582491']}

                    >    
            <TouchableOpacity onPress={this.onSubmit} >
                    
                            <Text style={FindDoctorStyle.search}>{en.groupLabels.addGroupLabel}</Text>

                   
                </TouchableOpacity>
                    </LinearGradient>
                
               </View>
            </View>
        );

        return (
            <View style={UserProfileStyle.mainWrapper}>
                <ScrollView>
                    <View style={{ flex: 1, }} >
                        <View style={AddAddressStyle.AddAddress}>
                            <Text style={AddAddressStyle.AddAddressText}>
                                {en.groupLabels.addNewGroupLabel}
                        </Text>
                        </View>
                        

                        
                    </View>

                    <View style={AddAddressStyle.EnterAddress}>
                        
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, padding: 10, backgroundColor: 'fff', }}>
                                { customAddressArea }
                                { groupBtn }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

AddGroup.propTypes = {
    addGroup: PropTypes.object,
    //commonState: PropTypes.object
}
const mapStateToProps = state => ({
    userState: state.userState,
    //commonState: state.common
});
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ updateState, addGroup, }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);