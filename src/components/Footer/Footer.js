import React, { Component } from 'react';
import { View } from 'react-native';
import imageConst from '../../constants/imageConst';
import Footer_Icons from './Footer_Icons';
import { LinearGradient } from 'expo';

export default class Footer_Component extends Component {
    render() {
        const { HomeIcon, MyAccountIcon, MyCartIcon, NotificationsIcon, HelpIcon } = imageConst;
        return (
            <View Container='Footer'>
                <LinearGradient
                    style={{
                        paddingTop: 25,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row' }}
                    colors={['#a25ca8', '#582491']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}>
                    <Footer_Icons iconLabel={HomeIcon.label} iconSrc={HomeIcon.src} iconLink='Home' />
                    <Footer_Icons iconLabel={MyAccountIcon.label} iconSrc={MyAccountIcon.src} iconLink='My Account' />
                    <Footer_Icons iconLabel={MyCartIcon.label} iconSrc={MyCartIcon.src} iconLink='Cart' />
                    <Footer_Icons iconLabel={NotificationsIcon.label} iconSrc={NotificationsIcon.src} iconLink='Notifications' />
                    <Footer_Icons iconLabel={HelpIcon.label} iconSrc={HelpIcon.src} iconLink='Icon' />
                </LinearGradient>
            </View>
        );
    }
}