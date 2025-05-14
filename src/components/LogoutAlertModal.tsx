import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
let showModalCallback: (() => void) | null = null;

export const triggerLogoutModal = () => {
  if (showModalCallback) {
    showModalCallback();
  }
};
interface LogoutAlertModalProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutAlertModal: React.FC<LogoutAlertModalProps> = ({setIsLoggedIn}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    showModalCallback = () => setVisible(true);
    return () => {
      showModalCallback = null;
    };
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      setVisible(false);
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error clearing AsyncStorage:", error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    navigation.reset({
        index: 0,
        routes: [{ name: "Main" as never }],
      });
    
  };

  return (
    <SafeAreaView >
    <Modal 
    transparent
    visible={visible}
    animationType="fade"
    statusBarTranslucent
    hardwareAccelerated
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.title}>Logout</Text>
          <Text style={styles.message}>Are you sure you want to log out?</Text>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
    </SafeAreaView>
  );
};

export default LogoutAlertModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",   
  },
  modal: {
    width: 300,
    maxWidth: "90%", 
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    justifyContent: "center",

  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FF3B30",
    borderRadius: 6,
  },
  cancelText: {
    fontSize: 16,
    color: "#555",
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
  },
});
