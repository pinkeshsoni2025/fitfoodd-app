import { View, Text, ScrollView, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { authStyles } from "../../assets/styles/auth.styles";

const TabsLayout = () => {
  const { isSignedIn, isLoaded, signOut } = useAuth();

  if (!isLoaded) return null;


  if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />;

  const handleSignOut = async () => {
      try {
        await signOut();
        // Optionally navigate the user to a public route after logout
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

  return (
      <><TouchableOpacity
                      style={[authStyles.authButton, !isLoaded && authStyles.buttonDisabled]}
                      onPress={handleSignOut}
                      disabled={!isLoaded}
                      activeOpacity={0.8}
                    >
                      <Text style={authStyles.buttonText}>{!isLoaded ? "Logout.." : "Logout"}</Text>
                    </TouchableOpacity>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
    </Tabs>
    </>
  );
};
export default TabsLayout;
