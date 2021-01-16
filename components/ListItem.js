import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <View style={styles.box}>
      <TouchableOpacity style={styles.row}>
        <View style={styles.imageBox}>
          <Image
            style={styles.image}
            source={{uri: props.singleMedia.thumbnails.w160}}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.listTitle}>{props.singleMedia.title}</Text>
          <Text>{props.singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#eee',
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
  imageBox: {
    flex: 2,
    height: '80%',
    alignSelf: 'center',
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingBottom: 10,
    color: '#0f9200',
  },
  mainImg: {
    height: 100,
    width: 100,
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1.3,
    borderColor: '#0f9200',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: {
          height: 2,
          width: 2,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textBox: {
    flex: 2,
    padding: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
});

export default ListItem;
