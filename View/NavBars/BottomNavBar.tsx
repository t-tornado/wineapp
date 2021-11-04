import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {heightDp, widthDp} from '../../Config/Dimensions';
import EStyleSheet from 'react-native-extended-stylesheet';

const NAVBAR_HEGIHT = heightDp('7');
const NAVBAR_W = widthDp('55');
const DROP_ICON_S = heightDp('3%');

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
  const translateY = heightDp('86');

  return (
    <View style={styles.container}>
      <View style={[styles.navBar, {transform: [{translateY}]}]}>
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
                  color={isFocused ? '#FFF' : '#00000090'}
                  size={DROP_ICON_S}
                />
              ) : (
                <Entypo
                  name="drop"
                  size={DROP_ICON_S}
                  color={isFocused ? '#fff' : '#00000090'}
                />
              )}
              <Text
                style={[styles.label, {color: isFocused ? '#fff' : '#000000'}]}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  navBar: {
    height: NAVBAR_HEGIHT,
    width: NAVBAR_W,
    backgroundColor: '#7579E7',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '30rem',
    // borderTopRightRadius: '20rem',
  },
  container: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
  },
});

export {BottomNavbar};
