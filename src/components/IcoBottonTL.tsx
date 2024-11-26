// import React from 'react';
// import { TouchableOpacity, Image, StyleSheet } from 'react-native';

// const IconButton = ({ onPress, iconSource, iconSize = 34 }) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={styles.icon}>
//       <Image
//         source={iconSource}
//         style={[styles.icon, { width: iconSize, height: iconSize }]}
//       />
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   icon: {
//     width: 34, 
//     height: 34, 
//   }
// });

// export default IconButton;


import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

const IconButton = ({ onPress, iconSource, iconSize = 34, buttonStyle = {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image
        source={iconSource}
        style={[styles.icon, { width: iconSize, height: iconSize }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 34, 
    height: 34, 
  },
});

export default IconButton;
