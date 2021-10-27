import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, TouchableWithoutFeedback } from "react-native";
import Screen from "./Screen";
import Data from "./data.json";
import PlaceholderSearch from "../components/PlaceHolderSearch";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const data = Data;

const RECOMMENDATIONS = [
    'a',
    'General Health',
    'Sex Education',
    'Pregnancy',
    'Stomach Ache',
    'Gastritis',
    'Ulcer',
]

const SearchScreen = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const inputRef = useRef(null);
  const [recommendations, setRecommendations] = useState(RECOMMENDATIONS)

  const placeholders = [
    "Search by title",
    "Search by author",
    "Search by year",
  ];

  const handleFilter = (text) => {
    const newData = data.filter((value) => {
      return (
        value.title.toLowerCase().includes(text.toLowerCase()) ||
        value.author.toLowerCase().includes(text.toLowerCase()) ||
        value.year.toString().toLowerCase().includes(text.toLowerCase())
      );
    });
    if (text.length != 0) {
      setPlaceholderVisible(false);
      console.log(newData);
      setFilteredData(newData);
    } else {
      setPlaceholderVisible(true);
      setFilteredData([]);
    }
    setQueryText(text);
  };
  const clearInput = () => {
    setPlaceholderVisible(true);
    setQueryText("");
    setFilteredData([]);
  };

  const focusInput = () => {
    if (inputRef) {
      inputRef.current.focus();
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.boxContainer}>
        {placeholderVisible && (
          <PlaceholderSearch placeholders={placeholders} />
        )}
        <TextInput
          ref={inputRef}
          value={queryText}
          style={styles.inputBox}
          onChangeText={(text) => handleFilter(text)}
        />

        {queryText.length === 0 ? (
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={24}
            color="black"
          />
        ) : (
          <Ionicons
            style={styles.searchIcon}
            onPress={clearInput}
            name="backspace-outline"
            size={24}
            color="black"
          />
        )}
      </View>
      {!placeholderVisible ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={filteredData}
          initialNumToRender={7}
          keyExtractor={(_, i) => `result-${i}`}
          style={styles.resultsContainer}
          renderItem={({ item }) => {
            return (
              <View style={styles.resultItem}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
              </View>
            );
          }}
        />
      ):(
          <View style={styles.recommendationContainer}>
              <Text style={{color: '#666'}}>Popular Searches</Text>
              <View style={styles.hr}></View>
              <View style={styles.recommendationsWrapper}>
                {recommendations.map((item, index)=>{
                    return(
                        <TouchableWithoutFeedback onPress={()=>handleFilter(item)} key={index}>
                            <Text style={styles.recommendation}>{item}</Text>
                        </TouchableWithoutFeedback>
                    )
                })}
              </View>
          </View>
      )}
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
    hr:{
        borderBottomColor: '#666',
        borderBottomWidth: 0.3,
        marginTop: 6,
        marginBottom: 5
    },
    recommendationContainer:{
        marginHorizontal: 20,
        marginTop:60
    },
    recommendation:{
        padding: 10,
        borderWidth: 1,
        borderColor: '#666',
        borderRadius: 20,
        fontSize: 12,
        color: '#666',
        marginRight: 10,
        marginVertical: 10
    },
    recommendationsWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: '#000'
  },
  author: {
    fontSize: 13,
    marginTop: 5,
    marginRight: 40,
  },
  year: {
    fontSize: 11,
    marginLeft: 6,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.4,
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#555",
    width: "90%",
    backgroundColor: "#fff",
  },
  inputBox: {
    height: 50,
    fontSize: 16,
    borderWidth: 0,
    width: "80%",
  },

  searchIcon: {
    color: "#444",
  },

  backIcon: {
    color: "grey",
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultItem: {
    paddingVertical: 15,
    marginBottom: 5,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: "#888",
    borderRadius: 6,
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
