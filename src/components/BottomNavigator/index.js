import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TabItem from '../TabItem';

function BottomNavigator({state, descriptors, navigation}) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            onPress={onPress}
            onLongPress={onLongPress}
            label={label}
            key={index}
            isFocused={isFocused}
          />
        );
      })}
    </View>
  );
}

export default BottomNavigator;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 7,
  },
});
