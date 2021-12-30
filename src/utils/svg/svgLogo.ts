import { Dimensions } from 'react-native';

const svgWidth = 415;
const svgHeight = 415;

//WIDTH WITH 64 PADDING
const width = Dimensions.get('window').width - 200;
//WIDTH * ASPECT RATIO (svgHeight / svgWidth)
const height = (width * svgHeight) / svgWidth;

export { svgWidth, svgHeight, width, height };
