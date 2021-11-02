import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {heightDp} from '../../Config/Dimensions';

const {height, width} = Dimensions.get('window');
const NAVBAR_HEGIHT = height * 0.07;
const NAVBAR_W = width;
const DROP_ICON_S = heightDp('4%');

type NavbarProps = {
  state: Object;
  descriptors: Object;
  navigation: Object;
};

const BottomNavbar: React.FC<NavbarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const {routes} = state;

  return (
    <View style={styles.container}>
      {routes.map((route: Object, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const pressHandler: () => void = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
            onPress={pressHandler}>
            {route.name === 'Home' ? (
              <MaterialIcons
                name="home-filled"
                color={isFocused ? '#000' : '#00000090'}
                size={DROP_ICON_S}
              />
            ) : (
              <Feather
                name="search"
                size={DROP_ICON_S}
                color={isFocused ? '#000' : '#00000090'}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: NAVBAR_HEGIHT,
    width: NAVBAR_W,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
  },
});

export {BottomNavbar};