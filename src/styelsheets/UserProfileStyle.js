import { StyleSheet } from 'react-native';
import styleConstants from '../constants/styleConstants';

export default UserProfileStyle = StyleSheet.create({
    mainWrapper: {
        flex: 1,
    },
    welcome: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ccc',
        height:80
    },
    welcomeText: {
        fontFamily: styleConstants.fontStyles.fontFamily,
        //fontSize: styleConstants.fontStyles.headerGroup.h2FontSize,
        color: styleConstants.fontStyles.headerGroup.headerColor,
        fontSize: 18,
        padding:30,
        textAlign: 'center',
        justifyContent: 'center',
    },
    ToServe: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#ccc',
        height: 40
    },
    ToServeText: {
        fontFamily: styleConstants.fontStyles.fontFamily,
        fontSize: 14,
        //fontSize: styleConstants.fontStyles.bodyFontSize,
        color: styleConstants.colorStyles.fontColor,
        fontWeight:'bold',
        padding: 10,
        // textAlign: 'center',
        justifyContent: 'center',
    },
    EmailAgeBloodWeight: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
        marginTop:5,
        height: 65,
        backgroundColor: '#fff',
    },
    EmailText: {
        fontFamily: styleConstants.fontStyles.fontFamily,
        fontSize: 16,
        //fontSize: styleConstants.fontStyles.headerGroup.h3FontSize,
        color: styleConstants.colorStyles.fontColor,
        // fontWeight: styleConstants.fontStyles.fontWeight,       
        // textAlign: 'center',
        justifyContent: 'center',
        marginTop:5
    },
    EmailTextInput: {
        height: 30, 
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 3,
    },    
    AgeBloodWeight: {
        flex: 1,
        height: 60,
        marginTop: 20,
        alignItems:'center',
        flexDirection: 'row',
    },
    AgeBloodWeightHorizontalAlignment: {
        width: 100,
        height: 50,
        marginLeft: 10
    },
    AgeBloodWeightTextInput: {
        height: 45,
        borderColor: 'gray',
        borderBottomWidth: 1,
    },
    AgeText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        marginTop: 2,
    },
    GenderIama: {
        flex: 0.15,
        textAlign:'right',       
        fontSize: 16,  
    },
    Gender: {
        flex: 0.75,     
        flexDirection: 'row',
        justifyContent: 'center',      
        borderWidth:1,
        borderColor:'#972493',
    },
    GenderButton: {
        width: 90,
        height: 30,       
        borderRightWidth: 1,
        borderColor: '#972493',             
    },
    hoverButton: {
        backgroundColor: '#972493',
    },

    hoverText: {
        textAlign: 'center',
        color: '#fff',
        marginTop: 4,
    },
    GenderText: {
        textAlign: 'center',       
        color: '#000',       
         marginTop: 4,
    },
    Next: {
        flex: 1,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    nextbtn: {
        width: 120,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',         
    },    
    NextText: {
        textAlign: 'center',
        color: '#fff',
        justifyContent: 'center',       
    },
     
  });
