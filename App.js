import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { TouchableOpacity } from "react-native-gesture-handler";

import Food from "./components/Food";
import Head from "./components/Head";
import Tail from "./components/Tail";
import { GRID_SIZE, CELL_SIZE, SPEED } from "./constants";
import { randomPositions } from "./helpers";
import GameLoop from "./systems/GameLoop";

export default function App() {
  const BoardSize = GRID_SIZE * CELL_SIZE;
  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const entities = {
    head: {
      position: [0, 0],
      size: CELL_SIZE,
      updateFrequency: SPEED,
      nextMove: SPEED,
      xspeed: 0,
      yspeed: 0,
      renderer: <Head />,
    },
    food: {
      position: [
        randomPositions(0, GRID_SIZE - 1),
        randomPositions(0, GRID_SIZE - 1),
      ],
      size: CELL_SIZE,
      renderer: <Food />,
    },
    tail: {
      size: CELL_SIZE,
      elements: [],
      renderer: <Tail />,
    },
  };
  const resetGame = () => {
    engine.current.swap(entities);
    setIsGameRunning(true);
  };

  return (
    <View style={styles.canvas}>
      {!isGameRunning && (
        <TouchableOpacity onPress={resetGame}>
          <Text
            style={{
              color: "white",
              marginBottom: 15,
              fontSize: 22,
              padding: 10,
              backgroundColor: "grey",
              borderRadius: 10,
            }}
          >
            Start New Game
          </Text>
        </TouchableOpacity>
      )}
      <GameEngine
        ref={engine}
        style={{
          width: BoardSize,
          height: BoardSize,
          flex: null,
          backgroundColor: "white",
        }}
        entities={entities}
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={(e) => {
          switch (e) {
            case "game-over":
              alert("Game over!");
              setIsGameRunning(false);
              return;
          }
        }}
      />
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-left")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View style={[styles.controlBtn, { backgroundColor: null }]} />
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-right")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-down")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "yellow",
    width: 100,
    height: 100,
  },
});
