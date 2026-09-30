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
  FadeInDown,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import BottomNavbar from "../../../components/BottomNavbar";

const { width } = Dimensions.get("window");

const initialCartItems = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    variant: "256GB - Natural Titanium",
    price: 139900,
    oldPrice: 149900,
    quantity: 1,
    emoji: "📱",
  },
  {
    id: "2",
    name: "AirPods Pro 2nd Gen",
    variant: "USB-C MagSafe Case",
    price: 22900,
    oldPrice: 24900,
    quantity: 1,
    emoji: "🎧",
  },
  {
    id: "3",
    name: "Apple Watch Ultra 2",
    variant: "49mm Titanium - Ocean Band",
    price: 89900,
    oldPrice: 94900,
    quantity: 1,
    emoji: "⌚",
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  const checkoutScale = useSharedValue(1);

  const updateQuantity = (id: string, type: "inc" | "dec") => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof initialCartItems
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "MOBILE10") {
      setDiscount(5000);
      setAppliedCode("MOBILE10");
      setPromoCode("");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 0 : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  const handleCheckout = () => {
    checkoutScale.value = withSpring(0.95, {}, () => {
      checkoutScale.value = withSpring(1);
    });
  };

  const checkoutAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkoutScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.ambientBlue} />
      <View style={styles.ambientOrange} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>My Cart 🛒</Text>
          <Text style={styles.headerSub}>
            {cartItems.length} items in your basket
          </Text>
        </Animated.View>

        {cartItems.length === 0 ? (
          <Animated.View
            entering={FadeInDown.duration(400)}
            style={styles.emptyCartBox}
          >
            <Text style={styles.emptyEmoji}>🛍️</Text>
            <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptySub}>
              Looks like you haven't added any gadgets yet.
            </Text>
          </Animated.View>
        ) : (
          <View>
            <View style={styles.itemsList}>
              {cartItems.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 100)}
                  layout={Layout.springify()}
                  style={styles.cartCard}
                >
                  <View style={styles.imageBox}>
                    <Text style={styles.itemEmoji}>{item.emoji}</Text>
                  </View>

                  <View style={styles.itemDetails}>
                    <View style={styles.itemHeaderRow}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Text style={styles.deleteIcon}>🗑️</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.itemVariant}>{item.variant}</Text>

                    <View style={styles.priceAndQtyRow}>
                      <Text style={styles.itemPrice}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </Text>

                      <View style={styles.qtyContainer}>
                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, "dec")}
                        >
                          <Text style={styles.qtyBtnText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.qtyText}>{item.quantity}</Text>

                        <TouchableOpacity
                          style={styles.qtyBtn}
                          onPress={() => updateQuantity(item.id, "inc")}
                        >
                          <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>

            <Animated.View
              entering={FadeInDown.delay(300)}
              style={styles.promoBox}
            >
              <Text style={styles.promoIcon}>🏷️</Text>
              <TextInput
                style={styles.promoInput}
                placeholder="Enter Code (e.g. MOBILE10)"
                placeholderTextColor="#A0AABF"
                value={promoCode}
                onChangeText={setPromoCode}
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={applyPromo}
                activeOpacity={0.8}
              >
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </Animated.View>

            {appliedCode ? (
              <View style={styles.appliedSuccessBox}>
                <Text style={styles.appliedText}>
                  ✓ Promo '{appliedCode}' applied (-₹5,000)
                </Text>
              </View>
            ) : null}

            <Animated.View
              entering={FadeInDown.delay(400)}
              style={styles.billCard}
            >
              <Text style={styles.billTitle}>Order Summary</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billValue}>
                  ₹{subtotal.toLocaleString()}
                </Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.freeDeliveryText}>FREE</Text>
              </View>

              {discount > 0 && (
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Promo Discount</Text>
                  <Text style={styles.discountText}>
                    -₹{discount.toLocaleString()}
                  </Text>
                </View>
              )}

              <View style={styles.divider} />

              <View style={styles.billRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>
                  ₹{grandTotal.toLocaleString()}
                </Text>
              </View>

              <Animated.View style={checkoutAnimatedStyle}>
                <TouchableOpacity
                  style={styles.checkoutBtn}
                  onPress={handleCheckout}
                  activeOpacity={0.9}
                >
                  <Text style={styles.checkoutText}>Proceed to Checkout ➔</Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </View>
        )}
      </ScrollView>

      <BottomNavbar activeTab="Cart" />
    </View>
  );
};

export default CartScreen;

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
  scrollContent: {
    paddingTop: Platform.OS === "ios" ? 60 : 45,
    paddingHorizontal: 20,
    paddingBottom: 120,
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
  emptyCartBox: {
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
  itemsList: {
    gap: 14,
    marginBottom: 20,
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 4,
  },
  imageBox: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: "#F8FAFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 36,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1A2530",
    flex: 1,
  },
  deleteIcon: {
    fontSize: 14,
    paddingLeft: 8,
  },
  itemVariant: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7C8DB0",
    marginTop: 2,
    marginBottom: 8,
  },
  priceAndQtyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0052FF",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7FE",
    borderRadius: 10,
    padding: 3,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  qtyBtnText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#1A2530",
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A2530",
    paddingHorizontal: 10,
  },
  promoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
    marginBottom: 10,
  },
  promoIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  promoInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#1A2530",
  },
  applyBtn: {
    backgroundColor: "#FF5500",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  applyBtnText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  appliedSuccessBox: {
    backgroundColor: "rgba(0, 82, 255, 0.08)",
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  appliedText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0052FF",
    textAlign: "center",
  },
  billCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 82, 255, 0.08)",
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A2530",
    marginBottom: 14,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7C8DB0",
  },
  billValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1A2530",
  },
  freeDeliveryText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#FF5500",
  },
  discountText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0052FF",
  },
  divider: {
    height: 1,
    backgroundColor: "#F4F7FE",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1A2530",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0052FF",
  },
  checkoutBtn: {
    backgroundColor: "#0052FF",
    borderRadius: 16,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    shadowColor: "#0052FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  checkoutText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
});