import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const screenHeight = Dimensions.get("window").height;

function AppModal({
  title,
  onCancel,
  onSubmit,
  inputText,
  visible,
  buttonOneName,
  buttonTwoName,
}) {
  return (
    <Modal visible={visible} animationType={"slide"}>
      <View style={styles.nameModal}>
        <Text style={styles.modalText}>{title}</Text>
        <TextInput
          style={styles.renameInput}
          onChangeText={(text) => inputText(text)}
        ></TextInput>
        <View style={styles.modalButtons}>
          <TouchableOpacity delayPressIn={0} onPress={() => onCancel(false)}>
            <Text style={styles.modalButton1}>{buttonTwoName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => {
              onSubmit();
              onCancel(false);
            }}
          >
            <Text style={styles.modalButton2}>{buttonOneName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  nameModal: {
    flex: 1,
    backgroundColor: "#424242",
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: "5%",
    width: "75%",
    justifyContent: "space-between",
  },
  modalButton1: {
    color: "#9e9e9e",
    fontSize: 22,
  },
  modalButton2: {
    color: "#1DB954",
    fontSize: 22,
  },
  renameInput: {
    width: "85%",
    marginTop: "10%",
    borderBottomWidth: 2,
    borderColor: "#757575",
    fontSize: 22,
    color: "#9e9e9e",
    fontWeight: "bold",
  },
  modalText: {
    marginTop: screenHeight * 0.3,
    fontSize: 28,
    fontWeight: "bold",
    color: "#9e9e9e",
  },
});

export default AppModal;
