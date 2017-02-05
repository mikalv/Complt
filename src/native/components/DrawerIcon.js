import React from 'react';
import { MaterialIcons } from 'react-native-vector-icons';

const DrawerIcon = icon => ({ tintColor }) => ( // eslint-disable-line react/prop-types
  <MaterialIcons
    name={icon}
    size={24}
    style={[{ color: tintColor }]}
  />
);

export default DrawerIcon;
