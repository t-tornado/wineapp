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
import {heightDp, widthDp} from '../../Config/Dimensions';
import EStyleSheet from 'react-native-extended-stylesheet';

const NAVBAR_HEGIHT = heightDp('9%');
const NAVBAR_W = widthDp('100');
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

const styles = EStyleSheet.create({
  container: {
    height: NAVBAR_HEGIHT,
    width: NAVBAR_W,
    backgroundColor: '#F9F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: '20rem',
    borderTopRightRadius: '20rem',
  },
  label: {
    fontSize: 13,
  },
});

export {BottomNavbar};
