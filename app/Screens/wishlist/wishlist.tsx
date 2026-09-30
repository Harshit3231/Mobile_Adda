import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  FadeInDown,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import BottomNavbar from "../../../components/BottomNavbar";

const { width } = Dimensions.get("window");

const initialWishlistItems = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: "₹1,39,900",
    oldPrice: "₹1,49,900",
    rating: "4.9",
    stock: "In Stock",
    priceDrop: "Price dropped ₹10,000",
    emoji: "📱",
  },
  {
    id: "2",
    name: "Galaxy S24 Ultra 5G",
    price: "₹1,29,999",
    oldPrice: "₹1,39,999",
    rating: "4.8",
    stock: "Only 2 Left",
    priceDrop: "Special Offer",
    emoji: "📱",
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Headphones",
    price: "₹29,990",
    oldPrice: "₹34,990",
    rating: "4.9",
    stock: "In Stock",
    priceDrop: "Price dropped ₹5,000",
    emoji: "🎧",
  },
  {
    id: "4",
    name: "OnePlus 12 5G (Silky Black)",
    price: "₹64,999",
    oldPrice: "₹69,999",
    rating: "4.7",
    stock: "In Stock",
    priceDrop: "Best Deal",
    emoji: "📱",
  },
];

const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [movedItems, setMovedItems] = useState<string[]>([]);

  const removeItem = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveToCart = (id: string) => {
    setMovedItems((prev) => [...prev, id]);
    setTimeout(() => {
      removeItem(id);
    }, 600);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ambientBlue} />
      <View style={styles.ambientOrange} />

      <View style={styles.fixedHeader}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>My Wishlist ❤️</Text>
            <Text style={styles.headerSub}>
              {wishlistItems.length} saved products
            </Text>
          </View>

          <TouchableOpacity style={styles.clearAllBtn} onPress={() => setWishlistItems([])}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {wishlistItems.length === 0 ? (
          <Animated.View
            entering={FadeInDown.duration(400)}
            style={styles.emptyBox}
          >
            <Text style={styles.emptyEmoji}>💔</Text>
            <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
            <Text style={styles.emptySub}>
              Explore products and save your favorite devices here.
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.itemsGrid}>
            {wishlistItems.map((item, index) => {
              const isMoved = movedItems.includes(item.id);

              return (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 100)}
                  layout={Layout.springify()}
                  style={styles.cardWrapper}
                >
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <View style={styles.priceDropTag}>
                        <Text style={styles.priceDropText}>
                          🔥 {item.priceDrop}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => removeItem(item.id)}
                      >
                        <Text style={styles.removeIcon}>✖️</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.imageBox}>
                      <Text style={styles.itemEmoji}>{item.emoji}</Text>
                    </View>

                    <View style={styles.cardBody}>
                      <View style={styles.ratingStockRow}>
                        <View style={styles.ratingBadge}>
                          <Text style={styles.starIcon}>⭐</Text>
                          <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>

                        <Text
                          style={[
                            styles.stockText,
                            item.stock.includes("Only") && styles.lowStockText,
                          ]}
                        >
                          {item.stock}
                        </Text>
                      </View>

                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.name}
                      </Text>

                      <View style={styles.priceRow}>
                        <Text style={styles.priceCurrent}>{item.price}</Text>
                        <Text style={styles.priceOld}>{item.oldPrice}</Text>
                      </View>

                      <TouchableOpacity
                        style={[
                          styles.moveToCartBtn,
                          isMoved && styles.movedBtn,
                        ]}
                        onPress={() => handleMoveToCart(item.id)}
                        activeOpacity={0.85}
                        disabled={isMoved}
                      >
                        <Text style={styles.moveToCartText}>
                          {isMoved ? "Added to Cart ✓" : "🛒 Move to Cart"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <BottomNavbar activeTab="Wishlist" />
    </View>
  );
};

export default WishlistScreen;

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
  clearAllBtn: {
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF5500",
  },
  scrollContent: {
    paddingTop: Platform.OS === "ios" ? 130 : 115,
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    marginTop: 40,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1A2530",
  },
  emptySub: {
    fontSize: 13,
    color: "#7C8DB0",
    textAlign: "center",
    marginTop: 6,
  },
  itemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: (width - 52) / 2,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  priceDropTag: {
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    flex: 1,
    marginRight: 4,
  },
  priceDropText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#FF5500",
  },
  removeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F4F7FE",
    alignItems: "center",
    justifyContent: "center",
  },
  removeIcon: {
    fontSize: 10,
  },
  imageBox: {
    height: 95,
    borderRadius: 16,
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  itemEmoji: {
    fontSize: 42,
  },
  cardBody: {
    marginTop: 2,
  },
  ratingStockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    fontSize: 10,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1A2530",
  },
  stockText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#0052FF",
  },
  lowStockText: {
    color: "#FF5500",
  },
  itemName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A2530",
    marginBottom: 4,
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
    marginRight: 4,
  },
  priceOld: {
    fontSize: 10,
    fontWeight: "700",
    color: "#A0AABF",
    textDecorationLine: "line-through",
  },
  moveToCartBtn: {
    width: "100%",
    height: 36,
    backgroundColor: "#0052FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  movedBtn: {
    backgroundColor: "#10B981",
  },
  moveToCartText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});