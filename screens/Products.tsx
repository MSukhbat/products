import { StatusBar } from "expo-status-bar";
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
import useSWR from "swr";
import Constants from "expo-constants";
import { useNavigation, useRoute } from "@react-navigation/native";

type Product = {
  title: string;
  price: number;
  image: string;
  id: number;
};
export default function Products() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    "https://fakestoreapi.com/products",
    fetcher
  );
  const navigation = useNavigation();
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;
  return (
    // <SafeAreaView style={{ flex: 1 }}>

    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        ListHeaderComponent={() => (
          <ImageBackground
            source={{
              uri: "https://i.pinimg.com/originals/58/a8/d5/58a8d51c5d9fbed835b6fdda52211cda.gif",
            }}
            resizeMethod="resize"
          >
            <View style={{ width: 410, height: 300 }}></View>
          </ImageBackground>
        )}
        style={styles.prou}
        data={data}
        // data1={Array.from({ length: 1 })}
        renderItem={({ item: product }) => (
          <View>
            <View>
              <View style={{ display: "flex" }}></View>
              <View style={styles.column}>
                <View key={product.id} style={styles.itng}>
                  <Image
                    width={120}
                    height={150}
                    source={{ uri: `${product.image}` }}
                  />
                  <View>
                    <Text style={styles.item}>{product.title}</Text>
                    <View>
                      <Text style={styles.item}>{product.price + "$"}</Text>
                      <Button
                        title="details"
                        onPress={() =>
                          navigation.navigate("Details", {
                            id: product.id,
                          })
                        }
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
      <View
        style={{
          width: 420,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#2196f3",
        }}
      >
        <View>
          <Button title="|||" />
        </View>
        <Button title="o" />
        <Button title="<" />
      </View>
    </View>

    // </SafeAreaView>
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
    flexDirection: "row",
    width: 390,
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: 120,
  },
});
