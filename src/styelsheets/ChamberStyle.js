import { StyleSheet } from 'react-native';
import styleConstants from '../constants/styleConstants';

export default ChamberStyle = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        padding:10,
        backgroundColor: '#fff',
    },
    ChamberNameContainer: {
        flex: 0.5,
        width: 200,
        marginTop: 7,        
    },
    CountryContainer: {
        flex: 0.5,
        width: 160,
        marginTop: 7,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    LandmarkContainer: {
        flex: 0.5,       
        marginTop: 7,
    },
    ChamberbtnContainer: { 
        flex: 1,
        height: 40,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },  
    BTNContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    mainSubContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    subContainer1: {
        flex: 0.5,
        marginRight: 15,
    },
    subContainer2: {
        flex: 0.5,
        marginRight: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    margin: {
        marginTop: 10,
    },
    dropDownPicker: {
        width: 130,
    },
});
