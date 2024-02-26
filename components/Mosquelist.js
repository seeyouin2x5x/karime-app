import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
} from "react-native";
import {
  List,
  TextInput,
  Divider,
  Button,
  Text,
  Provider,
  Appbar,
} from "react-native-paper";
import { Searchbar, Card } from "react-native-paper";
import { withTheme } from "react-native-paper";
// import * as WebBrowser from "expo-web-browser";

const data = require("../components/mosque.json");
const MosqueList = ({ theme }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [donationAmount, setDonationAmount] = useState(200);
  const [searchQuery, setSearchQuery] = useState("");
  const [mosques, setMosques] = useState(() => {
    return data;
  });
  const [mosque, setMosque] = useState("");
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async ({ payment_url }) => {
    // const result = await WebBrowser.openBrowserAsync(payment_url);
    // setResult(result);
    if (Platform.OS === "web") {
      return window.open(payment_url);
    }

    return await Linking.openURL(payment_url);
  };

  const handleDonatePress = ({ item }) => {
    setMosque(`${item.mosque_name} and ${item.location} montant `);

    setModalVisible(true);
  };

  const handlePayPress = async () => {
    // Handle payment logic here
    const { payment_token, payment_url } = await getLink({
      amount: donationAmount,
      description: mosque,
    });
    if (payment_url) {
      _handlePressButtonAsync({ payment_url });
      setModalVisible(false);
    }
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <Card style={{ marginVertical: 6 }}>
      <Card.Cover source={{ uri: item.image_url }} />
      <List.Item
        title={item.mosque_name}
        description={`${item.location}`}
        // left={() => <List.Icon source={{ uri: item.image_url }} />}
        right={() => (
          <Button icon="cash" onPress={() => handleDonatePress({ item })}>
            Donate
          </Button>
        )}
        onPress={() => {
          // Handle mosque details navigation or display
        }}
      />
    </Card>
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredMosques = mosques.filter((mosque) =>
    mosque.mosque_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, paddingHorizontal: 9 }}>
      <Appbar.Header>
        <Appbar.Content title="Karime" subtitle="Subtitle" />
        {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
        <Appbar.Action icon="dots-vertical" onPress={null} />
      </Appbar.Header>
      <Searchbar
        placeholder="Search Mosques"
        onChangeText={handleSearch}
        value={searchQuery}
        style={{ marginVertical: 6 }}
      />

      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={filteredMosques}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Enter donation amount (minimum 200 XOF)</Text>
          <Text>{mosque}</Text>

          <TextInput
            label="Amount"
            value={donationAmount}
            onChangeText={(text) => setDonationAmount(text)}
            keyboardType="numeric"
          />

          <Button
            style={{ marginTop: 6 }}
            mode="contained-tonal"
            onPress={handlePayPress}
          >
            Donate
          </Button>
          <Button
            style={{ paddingVertical: 6 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            Back
          </Button>
        </View>
      </Modal>
    </View>
  );
};

async function getLink({ amount, description }) {
  const body = {
    apikey: "208502353263ef823645c149.22531677",
    site_id: "365756",
    amount: parseInt(amount),
    currency: "XOF",
    description,
    notify_url: "",
    return_url: "https://karime.akwaba.app/",
    transaction_id: Math.floor(Math.random() * 100000000).toString(), //
  };

  const { data } = await (
    await fetch("https://api-checkout.cinetpay.com/v2/payment", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  if (data) {
    const { payment_token, payment_url } = data;
    return { payment_token, payment_url };
  }
  return null;
}

export default withTheme(MosqueList);
