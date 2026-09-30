import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import BottomNavbar from "../../../components/BottomNavbar";

const { width } = Dimensions.get("window");

const cities = ["Delhi NCR", "Mumbai", "Jaipur", "Indore", "Ahmedabad"];

const categories = [
  { id: "1", title: "Under ₹10k", icon: "💰" },
  { id: "2", title: "Used iPhones", icon: "🍏" },
  { id: "3", title: "Like New 5G", icon: "⚡" },
  { id: "4", title: "Shops Near Me", icon: "🏪" },
  { id: "5", title: "Sell Old Phone", icon: "🔄" },
];

const registeredShops = [
  {
    id: "s1",
    name: "Verma Mobile Zone",
    location: "Raja Park, City Center",
    rating: "4.8",
    phonesCount: "34 Old Phones",
    status: "Verified Shop",
    badge: "TOP RATED",
  },
  {
    id: "s2",
    name: "iHub Old Phone Store",
    location: "MG Road, Block B",
    rating: "4.9",
    phonesCount: "52 Old Phones",
    status: "Verified Shop",
    badge: "BEST DEALS",
  },
  {
    id: "s3",
    name: "Gupta Electronics",
    location: "Main Market, Shop 12",
    rating: "4.6",
    phonesCount: "19 Old Phones",
    status: "Verified Shop",
    badge: "POPULAR",
  },
  {
    id: "s4",
    name: "Mobile Adda Hub",
    location: "Sector 18, Hub Plaza",
    rating: "4.7",
    phonesCount: "41 Old Phones",
    status: "Verified Shop",
    badge: "OFFICIAL",
  },
  {
    id: "s5",
    name: "Royal Refurbished Care",
    location: "Station Road, Tower 4",
    rating: "4.5",
    phonesCount: "28 Old Phones",
    status: "Verified Shop",
    badge: "TRUSTED",
  },
];

const usedProducts = [
  {
    id: "1",
    name: "iPhone 13 (128GB)",
    condition: "Like New (90% Battery)",
    price: "₹38,999",
    originalPrice: "₹69,900",
    discount: "44% OFF",
    shopName: "Verma Mobile Zone",
    warranty: "6 Months Shop Warranty",
    rating: "4.9",
    tag: "VERIFIED",
  },
  {
    id: "2",
    name: "Samsung S22 Ultra 5G",
    condition: "Superb Condition",
    price: "₹42,500",
    originalPrice: "₹1,09,999",
    discount: "61% OFF",
    shopName: "iHub Old Phone Store",
    warranty: "3 Months Shop Warranty",
    rating: "4.8",
    tag: "BEST PRICE",
  },
  {
    id: "3",
    name: "OnePlus 11R 5G",
    condition: "Minor Scratch / Mint",
    price: "₹24,999",
    originalPrice: "₹39,999",
    discount: "37% OFF",
    shopName: "Gupta Electronics",
    warranty: "6 Months Shop Warranty",
    rating: "4.7",
    tag: "HOT DEAL",
  },
  {
    id: "4",
    name: "Vivo X80 Pro",
    condition: "Good Condition",
    price: "₹29,999",
    originalPrice: "₹79,999",
    discount: "62% OFF",
    shopName: "Mobile Adda Hub",
    warranty: "1 Month Shop Warranty",
    rating: "4.6",
    tag: "SUPER SAVER",
  },
];

const DashboardScreen = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedCity, setSelectedCity] = useState("Delhi NCR");
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.ambientBlue} />
      <View style={styles.ambientOrange} />

      <View style={styles.fixedHeaderArea}>
        <View style={styles.header}>
          <View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationPin}>📍</Text>
              <Text style={styles.locationText}>{selectedCity}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </View>
            <View style={styles.brandRow}>
              <Text style={styles.brandBlue}>MOBILE </Text>
              <Text style={styles.brandOrange}>ADDA</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.profileBadge} activeOpacity={0.8}>
            <Text style={styles.profileText}>MA</Text>
            <View style={styles.activeDot} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cityScroll}
        >
          {cities.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cityChip,
                selectedCity === city && styles.cityChipActive,
              ]}
              onPress={() => setSelectedCity(city)}
            >
              <Text
                style={[
                  styles.cityChipText,
                  selectedCity === city && styles.cityChipTextActive,
                ]}
              >
                {city}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search old phones, registered shops..."
            placeholderTextColor="#A0AABF"
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.bannerCard}>
          <View style={styles.bannerTextCol}>
            <Animated.View style={[styles.offerBadge, badgeAnimatedStyle]}>
              <Text style={styles.offerBadgeText}>
                VERIFIED LOCAL SHOPS MARKETPLACE
              </Text>
            </Animated.View>

            <Text style={styles.bannerTitle}>Buy Pre-Owned Phones</Text>

            <Text style={styles.bannerSubText}>
              Directly from trusted local mobile shops with shop warranty!
            </Text>

            <TouchableOpacity style={styles.shopNowBtn} activeOpacity={0.85}>
              <Text style={styles.shopNowText}>Explore Shops</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bannerIconBox}>
            <Text style={styles.bannerEmoji}>🏬</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
            >
              <View style={styles.categoryIconBox}>
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
              </View>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View style={styles.flashHeaderRow}>
            <Text style={styles.sectionTitle}>
              Registered Shops in {selectedCity}
            </Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>10 Shops Active</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.shopsScroll}
        >
          {registeredShops.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              style={styles.shopCard}
              activeOpacity={0.85}
            >
              <View style={styles.shopBadgeRow}>
                <View style={styles.shopTagBadge}>
                  <Text style={styles.shopTagText}>{shop.badge}</Text>
                </View>
                <Text style={styles.shopRating}>⭐ {shop.rating}</Text>
              </View>

              <View style={styles.shopAvatarBox}>
                <Text style={styles.shopEmoji}>🏪</Text>
              </View>

              <Text style={styles.shopName} numberOfLines={1}>
                {shop.name}
              </Text>
              <Text style={styles.shopLocation} numberOfLines={1}>
                📍 {shop.location}
              </Text>

              <View style={styles.shopFooter}>
                <Text style={styles.phonesCountText}>{shop.phonesCount}</Text>
                <View style={styles.visitBtn}>
                  <Text style={styles.visitBtnText}>Visit Shop</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View style={styles.flashHeaderRow}>
            <Text style={styles.sectionTitle}>Available Old Phones</Text>
            <View style={styles.timerBadge}>
              <Text style={styles.timerText}>Verified Stock</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productGrid}>
          {usedProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              activeOpacity={0.85}
            >
              <View style={styles.productTagBadge}>
                <Text style={styles.productTagText}>{item.tag}</Text>
              </View>

              <TouchableOpacity style={styles.wishlistBtn}>
                <Text style={styles.wishlistText}>🤍</Text>
              </TouchableOpacity>

              <View style={styles.productImageBox}>
                <Text style={styles.productEmoji}>📱</Text>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.conditionText}>{item.condition}</Text>

                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.priceCurrent}>{item.price}</Text>
                  <Text style={styles.priceOld}>{item.originalPrice}</Text>
                </View>

                <View style={styles.sellerRow}>
                  <Text style={styles.sellerLabel}>Seller Shop:</Text>
                  <Text style={styles.sellerName} numberOfLines={1}>
                    {item.shopName}
                  </Text>
                </View>

                <View style={styles.warrantyBox}>
                  <Text style={styles.warrantyText}>🛡️ {item.warranty}</Text>
                </View>

                <TouchableOpacity
                  style={styles.addCartBtn}
                  activeOpacity={0.85}
                >
                  <Text style={styles.addCartText}>Contact Shop</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavbar
        activeTab={activeTab}
        onTabPress={(tab) => setActiveTab(tab)}
      />
    </View>
  );
};

export default DashboardScreen;

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
    opacity: 0.06,
  },
  ambientOrange: {
    position: "absolute",
    bottom: -100,
    right: -100,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "#FF5500",
    opacity: 0.06,
  },
  fixedHeaderArea: {
    backgroundColor: "#F4F7FE",
    paddingTop: Platform.OS === "ios" ? 55 : 40,
    paddingHorizontal: 20,
    zIndex: 10,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  locationPin: {
    fontSize: 12,
    marginRight: 4,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#7C8DB0",
  },
  dropdownArrow: {
    fontSize: 10,
    color: "#7C8DB0",
    marginLeft: 4,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  brandBlue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0052FF",
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  brandOrange: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FF5500",
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  profileBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#0052FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  profileText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  activeDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF5500",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  cityScroll: {
    marginBottom: 12,
  },
  cityChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.1)",
  },
  cityChipActive: {
    backgroundColor: "#0052FF",
    borderColor: "#0052FF",
  },
  cityChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7C8DB0",
  },
  cityChipTextActive: {
    color: "#FFFFFF",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    height: 50,
    paddingHorizontal: 16,
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#1A2530",
  },
  filterBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
  },
  filterBtnText: {
    fontSize: 14,
  },
  scrollContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  bannerCard: {
    width: "100%",
    backgroundColor: "#0052FF",
    borderRadius: 28,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 12,
    marginBottom: 24,
  },
  bannerTextCol: {
    flex: 1,
  },
  offerBadge: {
    backgroundColor: "#FF5500",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  offerBadgeText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  bannerSubText: {
    fontSize: 11,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 4,
    marginBottom: 12,
  },
  shopNowBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  shopNowText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#0052FF",
  },
  bannerIconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  bannerEmoji: {
    fontSize: 34,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1A2530",
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0052FF",
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
  },
  categoryIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#1A2530",
  },
  flashHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  countBadge: {
    backgroundColor: "rgba(0, 82, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  countText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0052FF",
  },
  shopsScroll: {
    marginBottom: 24,
  },
  shopCard: {
    width: 190,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    marginRight: 14,
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  shopBadgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  shopTagBadge: {
    backgroundColor: "#FF5500",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  shopTagText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  shopRating: {
    fontSize: 11,
    fontWeight: "800",
    color: "#1A2530",
  },
  shopAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  shopEmoji: {
    fontSize: 22,
  },
  shopName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A2530",
  },
  shopLocation: {
    fontSize: 10,
    fontWeight: "600",
    color: "#7C8DB0",
    marginTop: 2,
    marginBottom: 10,
  },
  shopFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F4F7FE",
    paddingTop: 8,
  },
  phonesCountText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#0052FF",
  },
  visitBtn: {
    backgroundColor: "#F4F7FE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  visitBtnText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#1A2530",
  },
  timerBadge: {
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  timerText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF5500",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: (width - 52) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  productTagBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#0052FF",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 1,
  },
  productTagText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  wishlistBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  wishlistText: {
    fontSize: 11,
  },
  productImageBox: {
    height: 90,
    borderRadius: 14,
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  productEmoji: {
    fontSize: 40,
  },
  productInfo: {
    marginTop: 2,
  },
  conditionText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FF5500",
    marginBottom: 2,
  },
  productName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1A2530",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  priceCurrent: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0052FF",
    marginRight: 4,
  },
  priceOld: {
    fontSize: 9,
    fontWeight: "700",
    color: "#A0AABF",
    textDecorationLine: "line-through",
  },
  sellerRow: {
    marginBottom: 6,
  },
  sellerLabel: {
    fontSize: 8,
    fontWeight: "700",
    color: "#A0AABF",
  },
  sellerName: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1A2530",
  },
  warrantyBox: {
    backgroundColor: "#F4F7FE",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  warrantyText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#0052FF",
  },
  addCartBtn: {
    width: "100%",
    height: 34,
    backgroundColor: "#0052FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addCartText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});