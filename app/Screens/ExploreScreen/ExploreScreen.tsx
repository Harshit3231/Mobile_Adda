import React, { useState } from "react";
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
  withSpring,
  FadeInDown,
  FadeInRight,
  Layout,
} from "react-native-reanimated";
import BottomNavbar from "../../../components/BottomNavbar";

const { width } = Dimensions.get("window");

const exploreCategories = [
  "All",
  "Smartphones",
  "Audio",
  "Wearables",
  "Accessories",
  "5G Phones",
  "Chargers",
];

const recentSearches = [
  "iPhone 15 Pro",
  "OnePlus 12",
  "AirPods Pro",
  "Fast Charger",
];

const trendingSearches = [
  { id: "1", term: "Samsung S24 Ultra", count: "12.4k searches" },
  { id: "2", term: "Realme 12 Pro+", count: "8.1k searches" },
  { id: "3", term: "Wireless Earbuds", count: "15.2k searches" },
  { id: "4", term: "Smart Watch 7", count: "6.9k searches" },
];

const allProducts = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    category: "Smartphones",
    price: "₹1,39,900",
    oldPrice: "₹1,49,900",
    discount: "7% OFF",
    rating: "4.9",
    tag: "POPULAR",
    emoji: "📱",
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra",
    category: "Smartphones",
    price: "₹1,29,999",
    oldPrice: "₹1,39,999",
    discount: "8% OFF",
    rating: "4.8",
    tag: "TRENDING",
    emoji: "📱",
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: "₹29,990",
    oldPrice: "₹34,990",
    discount: "14% OFF",
    rating: "4.9",
    tag: "BEST AUDIO",
    emoji: "🎧",
  },
  {
    id: "4",
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    price: "₹89,900",
    oldPrice: "₹94,900",
    discount: "5% OFF",
    rating: "4.8",
    tag: "NEW",
    emoji: "⌚",
  },
  {
    id: "5",
    name: "Anker 65W Fast Charger",
    category: "Chargers",
    price: "₹2,999",
    oldPrice: "₹3,999",
    discount: "25% OFF",
    rating: "4.7",
    tag: "HOT DEAL",
    emoji: "⚡",
  },
  {
    id: "6",
    name: "OnePlus Buds Pro 2",
    category: "Audio",
    price: "₹9,999",
    oldPrice: "₹11,999",
    discount: "16% OFF",
    rating: "4.6",
    tag: "POPULAR",
    emoji: "🎧",
  },
];

const ExploreScreen = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFocused, setIsFocused] = useState(false);

  const searchBarScale = useSharedValue(1);

  const handleFocus = () => {
    setIsFocused(true);
    searchBarScale.value = withSpring(1.02);
  };

  const handleBlur = () => {
    setIsFocused(false);
    searchBarScale.value = withSpring(1);
  };

  const animatedSearchBarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchBarScale.value }],
    borderColor: isFocused ? "#0052FF" : "rgba(0, 82, 255, 0.08)",
  }));

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <View style={styles.container}>
      <View style={styles.ambientBlue} />
      <View style={styles.ambientOrange} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          entering={FadeInDown.duration(600)}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Explore Gadgets</Text>
          <Text style={styles.headerSub}>
            Find smartphones, audio & accessories
          </Text>
        </Animated.View>

        <Animated.View
          style={[styles.searchBarContainer, animatedSearchBarStyle]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search iPhone, OnePlus, Audio..."
            placeholderTextColor="#A0AABF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={styles.clearIcon}>✖️</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterBtnText}>⚙️</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {exploreCategories.map((cat, index) => {
            const isActive = selectedCategory === cat;
            return (
              <Animated.View
                key={cat}
                entering={FadeInRight.delay(index * 60)}
                layout={Layout.springify()}
              >
                <TouchableOpacity
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isActive && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>

        {searchQuery.length === 0 && (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
            </View>

            <View style={styles.recentTagsContainer}>
              {recentSearches.map((item, index) => (
                <Animated.View
                  key={item}
                  entering={FadeInDown.delay(index * 80)}
                >
                  <TouchableOpacity
                    style={styles.recentTag}
                    onPress={() => setSearchQuery(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.recentTagIcon}>🕒</Text>
                    <Text style={styles.recentTagText}>{item}</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>

            <View style={[styles.sectionHeader, { marginTop: 20 }]}>
              <Text style={styles.sectionTitle}>🔥 Trending Searches</Text>
            </View>

            <View style={styles.trendingList}>
              {trendingSearches.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 100)}
                >
                  <TouchableOpacity
                    style={styles.trendingCard}
                    onPress={() => setSearchQuery(item.term)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.trendingInfo}>
                      <Text style={styles.trendingNumber}>0{index + 1}</Text>
                      <View>
                        <Text style={styles.trendingTerm}>{item.term}</Text>
                        <Text style={styles.trendingCount}>{item.count}</Text>
                      </View>
                    </View>
                    <Text style={styles.arrowIcon}>↗</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
        )}

        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>
            {searchQuery.length > 0 ? "Search Results" : "Featured Products"}
          </Text>
          <Text style={styles.resultCount}>
            ({filteredProducts.length} items)
          </Text>
        </View>

        {filteredProducts.length === 0 ? (
          <Animated.View
            entering={FadeInDown.duration(400)}
            style={styles.emptyContainer}
          >
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No Products Found</Text>
            <Text style={styles.emptySub}>
              Try searching with another keywords or category
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.productGrid}>
            {filteredProducts.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(index * 100)}
                layout={Layout.springify()}
                style={styles.productCardWrapper}
              >
                <TouchableOpacity
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
                    <Text style={styles.productEmoji}>{item.emoji}</Text>
                  </View>

                  <View style={styles.productInfo}>
                    <View style={styles.ratingRow}>
                      <Text style={styles.starIcon}>⭐</Text>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>

                    <Text style={styles.productName} numberOfLines={1}>
                      {item.name}
                    </Text>

                    <View style={styles.priceRow}>
                      <Text style={styles.priceCurrent}>{item.price}</Text>
                      <Text style={styles.priceOld}>{item.oldPrice}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.addCartBtn}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.addCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomNavbar
        activeTab={activeTab}
        onTabPress={(tab) => setActiveTab(tab)}
      />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FE",
  },
  ambientBlue: {
    position: "absolute",
    top: -100,
    right: -100,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "#0052FF",
    opacity: 0.05,
  },
  ambientOrange: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: "#FF5500",
    opacity: 0.05,
  },
  scrollContent: {
    paddingTop: Platform.OS === "ios" ? 60 : 45,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1A2530",
    fontFamily: Platform.OS === "ios" ? "Arial Black" : "sans-serif-black",
  },
  headerSub: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7C8DB0",
    marginTop: 4,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    height: 54,
    paddingHorizontal: 16,
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 20,
    borderWidth: 1.5,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  clearIcon: {
    fontSize: 12,
    padding: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A2530",
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
  },
  filterBtnText: {
    fontSize: 14,
  },
  categoryScroll: {
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryChipActive: {
    backgroundColor: "#0052FF",
    borderColor: "#0052FF",
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#7C8DB0",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A2530",
  },
  resultCount: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0052FF",
  },
  recentTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  recentTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  recentTagIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  recentTagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1A2530",
  },
  trendingList: {
    gap: 10,
  },
  trendingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  trendingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendingNumber: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FF5500",
    marginRight: 14,
  },
  trendingTerm: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A2530",
  },
  trendingCount: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7C8DB0",
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0052FF",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1A2530",
  },
  emptySub: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7C8DB0",
    marginTop: 4,
    textAlign: "center",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCardWrapper: {
    width: (width - 52) / 2,
    marginBottom: 16,
  },
  productCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 12,
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
    top: 12,
    left: 12,
    backgroundColor: "#FF5500",
    paddingHorizontal: 8,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  wishlistText: {
    fontSize: 12,
  },
  productImageBox: {
    height: 100,
    borderRadius: 16,
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  productEmoji: {
    fontSize: 44,
  },
  productInfo: {
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  starIcon: {
    fontSize: 10,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1A2530",
  },
  productName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A2530",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  priceCurrent: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0052FF",
    marginRight: 6,
  },
  priceOld: {
    fontSize: 10,
    fontWeight: "700",
    color: "#A0AABF",
    textDecorationLine: "line-through",
  },
  addCartBtn: {
    width: "100%",
    height: 36,
    backgroundColor: "#0052FF",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addCartText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});