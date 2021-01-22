import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

export const AppStyles = {
  primaryColor: '#293462',
  secondaryColor: '#11818a',
  solidColor: '#b5b2b2',
  textColor: '#fff',
  titleColor: '#fff',
  inputTextColor: '#293462',
  colorBackground: '#293462',

  titleFontSize: 22,
  contentFontSize: 20,
  defaultFontSize: 16,

  buttonWidth: width * 0.6,
  buttonHeight: 42,

  textInputWidth: '80%',
  textInputBackgroundColor: '#fff',
  borderRadiusMain: 25,
  borderRadiusSmall: 5,
  width,
  height,
};

// export const AppIcon = {
//   container: {
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 8,
//     marginRight: 10,
//   },
//   style: {
//     tintColor: AppStyles.color.tint,
//     width: 25,
//     height: 25,
//   },
// };

// export const HeaderButtonStyle = StyleSheet.create({
//   multi: {
//     flexDirection: 'row',
//   },
//   container: {
//     padding: 10,
//   },
//   image: {
//     justifyContent: 'center',
//     width: 35,
//     height: 35,
//     margin: 6,
//   },
//   rightButton: {
//     color: AppStyles.color.tint,
//     marginRight: 10,
//     fontWeight: 'normal',
//     fontFamily: AppStyles.fontName.main,
//   },
// });

// export const ListStyle = StyleSheet.create({
//   title: {
//     fontSize: 16,
//     color: AppStyles.color.subtitle,
//     fontFamily: AppStyles.fontName.bold,
//     fontWeight: 'bold',
//   },
//   subtitleView: {
//     minHeight: 55,
//     flexDirection: 'row',
//     paddingTop: 5,
//     marginLeft: 10,
//   },
//   leftSubtitle: {
//     flex: 2,
//   },
//   avatarStyle: {
//     height: 80,
//     width: 80,
//   },
// });
