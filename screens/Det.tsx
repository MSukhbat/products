import { useNavigation, useRoute } from "@react-navigation/native";
import useSWR from "swr";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";

export default function Details() {
  const route = useRoute();
  const params = route.params as {
    id: number;
    name: string;
    description: string;
    price: number;
  };
  const Number = params.id as unknown as { id: number };
  console.log("params", Number);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `https://fakestoreapi.com/products/${Number}`,
    fetcher
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;
  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={{ display: "flex" }}></View>
          <View style={styles.column}>
            <View key={data.id} style={styles.itng}>
              <View>
                <Text style={styles.item}>{data.title}</Text>
                <Text style={styles.item}>{data.description}</Text>
                <Text style={styles.item}>{data.price}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
  },
  item: {
    fontSize: 15,
    width: 250,
  },
  prou: {
    padding: 30,
  },
  itng: {
    display: "flex",
    flexDirection: "column",
    width: 390,
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: 120,
  },
});
