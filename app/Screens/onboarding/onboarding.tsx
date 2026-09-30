import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    titlePart1: "DISCOVER ",
    titlePart2: "SMART",
    titleEnd: "TECH",
    description:
      "Explore the latest smartphones, gadgets, and exclusive deals crafted just for you.",
    badge: "MOBILE ADDA",
  },
  {
    id: "2",
    titlePart1: "LIGHTNING ",
    titlePart2: "FAST",
    titleEnd: "DELIVERY",
    description:
      "Get your favorite devices delivered right to your doorstep with zero hassle.",
    badge: "SUPER FAST",
  },
  {
    id: "3",
    titlePart1: "100% ",
    titlePart2: "TRUSTED",
    titleEnd: "DEALS",
    description:
      "Certified genuine products with unmatched warranty and customer support.",
    badge: "VERIFIED",
  },
];

const OnboardingItem = ({
  item,
  index,
  scrollX,
}: {
  item: (typeof slides)[0];
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const cardAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolation.CLAMP,
    );
    const rotateY = interpolate(
      scrollX.value,
      inputRange,
      [30, 0, -30],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.2, 1, 0.2],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { scale },
        { perspective: 1000 },
        { rotateY: `${rotateY}deg` },
      ],
      opacity,
    };
  });

  return (
    <View style={styles.slideContainer}>
      <Animated.View style={[styles.visualCard, cardAnimatedStyle]}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>M</Text>
          <View style={styles.orangeDot} />
        </View>
        <View style={styles.miniBadge}>
          <Text style={styles.miniBadgeText}>{item.badge}</Text>
        </View>
      </Animated.View>

      <View style={styles.textSection}>
        <View style={styles.titleRow}>
          <Text style={styles.titleBlue}>{item.titlePart1}</Text>
          <Text style={styles.titleOrange}>{item.titlePart2}</Text>
        </View>
        <Text style={styles.titleBlue}>{item.titleEnd}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = () => {
  const router = useRouter();
  const flatListRef = useRef<Animated.FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push("/Screens/auth/login");
    }
  };

  const handleSkip = () => {
    router.push("/Screens/auth/login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.ambientBlue} />
      <View style={styles.ambientOrange} />

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item, index }) => (
          <OnboardingItem item={item} index={index} scrollX={scrollX} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.footerContainer}>
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => {
            const dotStyle = useAnimatedStyle(() => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const dotWidth = interpolate(
                scrollX.value,
                inputRange,
                [8, 28, 8],
                Extrapolation.CLAMP,
              );
              const dotColor = interpolate(
                scrollX.value,
                inputRange,
                [0, 1, 0],
                Extrapolation.CLAMP,
              );
              return {
                width: dotWidth,
                backgroundColor: dotColor > 0.5 ? "#0052FF" : "#D1D9E6",
              };
            });

            return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
          })}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FE",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  ambientBlue: {
    position: "absolute",
    top: -50,
    left: -50,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: "#0052FF",
    opacity: 0.08,
  },
  ambientOrange: {
    position: "absolute",
    bottom: -50,
    right: -50,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: "#FF5500",
    opacity: 0.08,
  },
  skipButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0, 82, 255, 0.08)",
    borderRadius: 20,
  },
  skipText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0052FF",
  },
  slideContainer: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  visualCard: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.18,
    shadowRadius: 30,
    elevation: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: "#0052FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 16,
  },
  iconText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFFFFF",
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  orangeDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FF5500",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  miniBadge: {
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  miniBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF5500",
    letterSpacing: 1.5,
  },
  textSection: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleBlue: {
    fontSize: 26,
    fontWeight: "900",
    color: "#0052FF",
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  titleOrange: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FF5500",
    letterSpacing: 1,
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7C8DB0",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  footerContainer: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#0052FF",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
});
