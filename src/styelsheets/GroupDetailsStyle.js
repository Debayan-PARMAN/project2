import { StyleSheet } from 'react-native';
import styleConstants from '../constants/styleConstants';

export default GroupDetailsStyle = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },    
    // ***********new*****************   
    pastContainer: {
        flex: 1,
        height: 75,
    },
    pastInnerContainer: {
        flex: 1,
        margin: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    }, 
    locationContainer: {
        flex: 1, height: 55, flexDirection: 'row',marginTop:5,
        //backgroundColor:'red'
    },
    location: {
        flex: 0.85, height: 25, justifyContent: 'center',
    },
    locationText: {
        fontSize: 17, padding: 5
    },
    TouchableContainer: {
        width: 40, height: 50,justifyContent: 'center', alignItems: 'center'
    },
    ImageContainer: {
        flex: 0.15, height: 60,justifyContent: 'center', alignItems: 'center'
    },
    ImageSize: {
        width: 25, height: 25,
    },
    rateprescriptionorderContainer: {
        flex: 0.85, height: 25, marginTop:5,flexDirection: 'row', justifyContent: 'space-between',
    },
    ratebtn: {
        width: 60, height: 25, flexDirection: 'row',justifyContent:'center',alignItems:'center'

    },
    notificationbtn: {
        width: 100, height: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginRight:10

    },
    ratebtnText: {
        padding: .1,fontSize:15, textAlign: 'center'
    },



});
