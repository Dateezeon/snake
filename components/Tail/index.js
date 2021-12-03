import React from "react";
import { View } from "react-native";

import { GRID_SIZE } from "../../constants";

export default function Tail({ elements, size }) {
  console.log(elements);
  const tailList = elements.map((el, idx) => (
    <View
      key={idx}
      style={{
        width: size,
        height: size,
        position: "absolute",
        left: el[0] * size,
        top: el[1] * size,
        backgroundColor: "red",
      }}
    />
  ));
  return (
    <View
      style={{
        width: GRID_SIZE * size,
        height: GRID_SIZE * size,
      }}
    >
      {tailList}
    </View>
  );
}
