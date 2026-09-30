import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { useRouter } from "expo-router";
import BottomNavbar from "../../../components/BottomNavbar";

const { width } = Dimensions.get("window");

const menuSections = [
  {
    title: "Account Settings",
    items: [
      { id: "orders", title: "My Orders", subtitle: "12 active & past orders", icon: "📦" },
      { id: "address", title: "Saved Addresses", subtitle: "2 addresses saved", icon: "📍" },
      { id: "payments", title: "Payment Methods", subtitle: "UPI & Saved Cards", icon: "💳" },
    ],
  },
  {
    title: "Preferences & Security",
    items: [
      { id: "notifications", title: "Push Notifications", subtitle: "Offers & Order updates", icon: "🔔", isSwitch: true },
      { id: "privacy", title: "Privacy & Security", subtitle: "Passcode & Biometrics", icon: "🔒" },
      { id: "language", title: "App Language", subtitle: "English (US)", icon: "🌐" },
    ],
  },
  {
    title: "Support & Legal",
    items: [
      { id: "help", title: "Help Center & Support", subtitle: "24x7 Customer Care", icon: "🎧" },
      { id: "terms", title: "Terms & Privacy Policy", subtitle: "Legal details", icon: "📄" },
    ],
  },
];

const ProfileScreen = () => {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    router.replace("/auth/login" as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ambientBlue} />
      <View style={styles.ambientOrange} />

      <View style={styles.fixedHeader}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>My Profile 👤</Text>
            <Text style={styles.headerSub}>Manage your account & orders</Text>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>✏️ Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={styles.profileCard}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarText}>MA</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>

          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>Rahul Sharma</Text>
              <View style={styles.membershipTag}>
                <Text style={styles.membershipText}>👑 GOLD</Text>
              </View>
            </View>

            <Text style={styles.userEmail}>rahul.sharma@example.com</Text>
            <Text style={styles.userPhone}>+91 98765 43210</Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(100)}
          style={styles.statsRow}
        >
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>04</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "#FF5500" }]}>
              ₹450
            </Text>
            <Text style={styles.statLabel}>Adda Cash</Text>
          </View>
        </Animated.View>

        {menuSections.map((section, sIndex) => (
          <Animated.View
            key={section.title}
            entering={FadeInDown.delay(200 + sIndex * 100)}
            style={styles.sectionContainer}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.menuCard}>
              {section.items.map((item, iIndex) => (
                <View key={item.id}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={0.7}
                  >
                    <View style={styles.menuIconBox}>
                      <Text style={styles.menuIcon}>{item.icon}</Text>
                    </View>

                    <View style={styles.menuTextCol}>
                      <Text style={styles.menuTitle}>{item.title}</Text>
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    </View>

                    {item.isSwitch ? (
                      <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: "#E2E8F0", true: "#0052FF" }}
                        thumbColor="#FFFFFF"
                      />
                    ) : (
                      <Text style={styles.chevron}>➔</Text>
                    )}
                  </TouchableOpacity>

                  {iIndex < section.items.length - 1 && (
                    <View style={styles.menuDivider} />
                  )}
                </View>
              ))}
            </View>
          </Animated.View>
        ))}

        <Animated.View entering={FadeInDown.delay(500)}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.versionText}>MobileAdda App v2.4.0</Text>
      </ScrollView>

      <BottomNavbar activeTab="Profile" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FE",
  },
  ambientBlue: {
    position: "absolute",
    top: -100,
    left: -100,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "#0052FF",
    opacity: 0.05,
  },
  ambientOrange: {
    position: "absolute",
    bottom: -100,
    right: -100,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "#FF5500",
    opacity: 0.05,
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#F4F7FE",
    paddingTop: Platform.OS === "ios" ? 55 : 40,
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 82, 255, 0.05)",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1A2530",
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  headerSub: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7C8DB0",
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0052FF",
  },
  scrollContent: {
    paddingTop: Platform.OS === "ios" ? 130 : 115,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarBadge: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: "#0052FF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  onlineDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#FF5500",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A2530",
    marginRight: 8,
  },
  membershipTag: {
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  membershipText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#FF5500",
  },
  userEmail: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C8DB0",
  },
  userPhone: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A2530",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
    marginBottom: 22,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0052FF",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#7C8DB0",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "#F4F7FE",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#1A2530",
    marginBottom: 10,
    paddingLeft: 4,
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuTextCol: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A2530",
  },
  menuSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7C8DB0",
    marginTop: 2,
  },
  chevron: {
    fontSize: 12,
    fontWeight: "900",
    color: "#7C8DB0",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#F4F7FE",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    height: 52,
    borderWidth: 1,
    borderColor: "rgba(255, 85, 0, 0.2)",
    marginTop: 10,
    marginBottom: 16,
  },
  logoutIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FF5500",
  },
  versionText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A0AABF",
    textAlign: "center",
  },
});