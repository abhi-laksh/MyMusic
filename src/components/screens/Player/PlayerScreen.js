import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from '../../globals/ThemeProvider';
import PlayerControl from './PlayerControl';
import AlbumImage from './AlbumImage';
import SongProgressBar from './SongProgressBar';

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    paddingBottom: 0,
  },
  childView: {
    // flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});


class PlayerScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentTheme } = this.props;

    return (
      <View style={[styles.parent, { backgroundColor: currentTheme.background }]}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AlbumImage />
        </View>
        {/* <AlbumImage /> */}
        <View style={styles.childView}>
          <SongProgressBar />
          <PlayerControl navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

export default withTheme(PlayerScreen);
