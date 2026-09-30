import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const containerY = useSharedValue(40);
  const containerOpacity = useSharedValue(0);
  const tabPosition = useSharedValue(0);

  useEffect(() => {
    containerOpacity.value = withTiming(1, { duration: 600 });
    containerY.value = withSpring(0, { damping: 14, stiffness: 90 });
    tabPosition.value = withSpring(isRegister ? 1 : 0, {
      damping: 14,
      stiffness: 120,
    });
    setOtpSent(false);
  }, [isRegister]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerY.value }],
  }));

  const tabIndicatorStyle = useAnimatedStyle(() => {
    const maxTranslate = width > 400 ? 320 : width - 88;
    return {
      transform: [
        {
          translateX: interpolate(
            tabPosition.value,
            [0, 1],
            [0, maxTranslate / 2],
          ),
        },
      ],
    };
  });

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyAndSubmit = () => {
    router.replace("/Screens/home/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.ambientBlue} />
      <View style={styles.ambientOrange} />

      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.heroHeader}>
          <View style={styles.badgeBox}>
            <Text style={styles.badgeText}>M</Text>
            <View style={styles.dotOrange} />
          </View>
          <View style={styles.brandRow}>
            <Text style={styles.titleBlue}>MOBILE </Text>
            <Text style={styles.titleOrange}>ADDA</Text>
          </View>
          <Text style={styles.subtitle}>
            {isRegister
              ? "Join the tech community"
              : "Welcome back! Login to continue"}
          </Text>
        </View>

        <View style={styles.segmentedControl}>
          <Animated.View style={[styles.segmentIndicator, tabIndicatorStyle]} />
          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() => setIsRegister(false)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                !isRegister && styles.activeSegmentText,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() => setIsRegister(true)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.segmentText,
                isRegister && styles.activeSegmentText,
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {isRegister && (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#A0AABF"
              />
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>MOBILE NUMBER</Text>
            <TextInput
              style={styles.input}
              placeholder="10-digit mobile number"
              placeholderTextColor="#A0AABF"
              keyboardType="phone-pad"
              maxLength={10}
              editable={!otpSent}
            />
          </View>

          {otpSent && (
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>ENTER 4-DIGIT OTP</Text>
              <View style={styles.otpBoxesRow}>
                <TextInput
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                />
                <TextInput
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                />
                <TextInput
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                />
                <TextInput
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              </View>
            </View>
          )}

          {otpSent && (
            <View style={styles.otpHelperRow}>
              <TouchableOpacity onPress={() => setOtpSent(false)}>
                <Text style={styles.helperBlue}>Edit Number</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSendOtp}>
                <Text style={styles.helperOrange}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}

          {!otpSent ? (
            <TouchableOpacity
              style={styles.actionButtonBlue}
              activeOpacity={0.85}
              onPress={handleSendOtp}
            >
              <Text style={styles.actionButtonText}>GET OTP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionButtonOrange}
              activeOpacity={0.85}
              onPress={handleVerifyAndSubmit}
            >
              <Text style={styles.actionButtonText}>VERIFY & LOGIN</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  ambientBlue: {
    position: "absolute",
    top: -100,
    left: -100,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "#0052FF",
    opacity: 0.08,
  },
  ambientOrange: {
    position: "absolute",
    bottom: -100,
    right: -100,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "#FF5500",
    opacity: 0.08,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 36,
    padding: 24,
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  heroHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  badgeBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#0052FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  dotOrange: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF5500",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleBlue: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0052FF",
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  titleOrange: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FF5500",
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C8DB0",
    marginTop: 4,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#F4F7FE",
    borderRadius: 14,
    height: 48,
    padding: 4,
    marginBottom: 20,
    position: "relative",
  },
  segmentIndicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    width: "50%",
    backgroundColor: "#0052FF",
    borderRadius: 10,
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  segmentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7C8DB0",
  },
  activeSegmentText: {
    color: "#FFFFFF",
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0052FF",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F8FAFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.12)",
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A2530",
  },
  otpBoxesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpBox: {
    width: "22%",
    height: 50,
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#FF5500",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: "#1A2530",
  },
  otpHelperRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  helperBlue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0052FF",
  },
  helperOrange: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF5500",
  },
  actionButtonBlue: {
    width: "100%",
    height: 52,
    backgroundColor: "#0052FF",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginTop: 4,
  },
  actionButtonOrange: {
    width: "100%",
    height: 52,
    backgroundColor: "#FF5500",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5500",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginTop: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.5,
  },
});
