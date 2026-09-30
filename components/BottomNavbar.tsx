import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useRouter, usePathname } from "expo-router";

interface BottomNavbarProps {
  activeTab?: string;
  onTabPress?: (tabName: string) => void;
}

const NavTab = ({
  icon,
  label,
  isActive,
  onPress,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      scale.value = withSequence(
        withSpring(1.25, { damping: 10, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 180 })
      );
    } else {
      scale.value = withSpring(1);
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.Text
        style={[
          isActive ? styles.navIconActive : styles.navIcon,
          animatedStyle,
        ]}
      >
        {icon}
      </Animated.Text>
      <Text style={isActive ? styles.navTextActive : styles.navText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const BottomNavbar = ({ activeTab, onTabPress }: BottomNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveFromPath = () => {
    if (activeTab) return activeTab;
    const lowerPath = pathname.toLowerCase();
    if (lowerPath.includes("explore")) return "Explore";
    if (lowerPath.includes("cart")) return "Cart";
    if (lowerPath.includes("wishlist")) return "Wishlist";
    if (lowerPath.includes("profile")) return "Profile";
    return "Home";
  };

  const currentTab = getActiveFromPath();

  const handlePress = (tabName: string, routePath: string) => {
    if (onTabPress) {
      onTabPress(tabName);
    }
    try {
      router.replace(routePath as any);
    } catch (e) {}
  };

  const cartScale = useSharedValue(1);

  const animatedCartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartScale.value }],
  }));

  const handleCartPress = () => {
    cartScale.value = withSequence(
      withSpring(1.2, { damping: 8 }),
      withSpring(1, { damping: 12 })
    );
    handlePress("Cart", "/Screens/cart/cart");
  };

  return (
    <View style={styles.bottomNav}>
      <NavTab
        icon="🏠"
        label="Home"
        isActive={currentTab === "Home"}
        onPress={() => handlePress("Home", "/Screens/home/home")}
      />

      <NavTab
        icon="🔍"
        label="Explore"
        isActive={currentTab === "Explore"}
        onPress={() =>
          handlePress("Explore", "/Screens/ExploreScreen/ExploreScreen")
        }
      />

      <TouchableOpacity activeOpacity={0.85} onPress={handleCartPress}>
        <Animated.View style={[styles.navCartItem, animatedCartStyle]}>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>3</Text>
          </View>
          <Text style={styles.cartIcon}>🛒</Text>
        </Animated.View>
      </TouchableOpacity>

      <NavTab
        icon="❤️"
        label="Wishlist"
        isActive={currentTab === "Wishlist"}
        onPress={() => handlePress("Wishlist", "/Screens/wishlist/wishlist")}
      />

      <NavTab
        icon="👤"
        label="Profile"
        isActive={currentTab === "Profile"}
        onPress={() => handlePress("Profile", "/Screens/profile/profile")}
      />
    </View>
  );
};

export default BottomNavbar;

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    height: 68,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  navIconActive: {
    fontSize: 20,
  },
  navTextActive: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0052FF",
    marginTop: 2,
  },
  navIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  navText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#7C8DB0",
    marginTop: 2,
  },
  navCartItem: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FF5500",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -28,
    shadowColor: "#FF5500",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  cartIcon: {
    fontSize: 22,
  },
  cartBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#0052FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  cartBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});