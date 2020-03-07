// @ts-nocheck
import React from 'react'
import { ListItem as RNEListItem, ListItemProps, Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import Colors from '@Styles/Colors'

export default class ListItem extends React.Component<ListItemProps> {
  render() {
    return (
      <RNEListItem
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        leftAvatar={<Icon name="user-circle-o" type="font-awesome" color={Colors.pink} size={40} />}
        titleStyle={{ color: Colors.mainTextColor, fontSize: 18, fontWeight: '300' }}
        rightContentContainerStyle={{ alignSelf: 'flex-start' }}
        rightTitleStyle={{ color: Colors.mainTextColor, fontSize: 16, fontWeight: '200' }}
        subtitleStyle={{ color: Colors.secTextColor, fontSize: 14 }}
        {...this.props}
      />
    )
  }
}
