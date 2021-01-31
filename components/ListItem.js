import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  Button,
  Card,
  ListItem as RNEListItem,
  Text,
} from 'react-native-elements';

const ListItem = ({singleMedia, navigation}) => {
  return (
    // <RNEListItem
    //   bottomDivider
    //   onPress={() => {
    //     navigation.navigate('Single', {file: singleMedia});
    //   }}
    // >
    //   <Avatar
    //     size="medium"
    //     square
    //     source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
    //   ></Avatar>
    //   <RNEListItem.Content>
    //     <RNEListItem.Title h4>{singleMedia.title}</RNEListItem.Title>
    //     <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
    //   </RNEListItem.Content>
    //   <RNEListItem.Chevron />
    // </RNEListItem>
    <Card>
      <Card.Title>{singleMedia.title}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{uri: uploadsUrl + singleMedia.thumbnails.w320}}
        onPress={() => {
          navigation.navigate('Single', {file: singleMedia});
        }}
        style={styles.image}
      />
      <Text style={styles.description}>{singleMedia.description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  description: {
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
