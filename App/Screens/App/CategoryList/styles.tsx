import { StyleSheet } from "react-native";
import Colors from "../../../Colors";

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  textStyle: {
    fontSize: 20,
    color: 'blue',
    padding: 10,
    fontWeight: 'bold',
  },
  headerAbs: {
    position: 'absolute',
    backgroundColor: Colors.bgColor,
    borderRadius: 100,
    marginTop: 45,
    right: 10,
  },
  cartNo: {
    color: '#E5E5E5',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
  },
  touchView: {
    justifyContent: 'flex-end',
    marginRight: 20,
    flexDirection: 'row',
  },
  plus: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'yellow',
    fontSize: 13,
  },
  addCartTouch: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    backgroundColor: '#999791',
    borderRadius: 100,
    marginEnd: 10,
  },
  renderTopView: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  thumnail: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    margin: 3,
  },
  imgView: {
    margin: 4,
    borderRadius: 10,
    height: 70,
    width: 90,
    justifyContent: 'center',
  },
  category: {
    fontSize: 15,
    color: Colors.bgColor,
    fontWeight: '600',
  },
  leftMar: {marginLeft: 20},
  brand: {
    fontSize: 14,
    color: '#200',
    fontWeight: '600',
    marginVertical: 7,
  },
  price: {
    fontSize: 14,
    color: Colors.bgColor,
    fontWeight: 'bold',
  },
  pList: {
    marginTop: 50,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.bgColor,
    // marginLeft:30
  },
  rdView: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: Colors.darkwhite,
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    elevation: 6,
    zIndex: 999,
    // flexDirection: 'row',
    top: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  logTouch: {
    margin: 30,
    marginTop: 50,
    // backgroundColor:'orange'
  },
  thImg: {height: 40, width: 40, borderRadius: 100},
  shadowViews: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '50%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginEnd: 5,
    elevation: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shadowView: {
    elevation: 10,
    shadowColor: '#52006A',
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  sshadowViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  shadowViewRow: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marView: {marginLeft: 20, flex: 1},
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumImg: {height: 120, width: 120},
  touch: {fontSize: 22, color: 'gray', fontWeight: 'bold'},
  marginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    margin: 30,
  },
  proList: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});
export default styles