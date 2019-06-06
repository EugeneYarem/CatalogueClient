/**
 * This container (can be called a screen or page) presents product list.
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ProductRow from "../components/ProductRow";

type Props = {};
type States = {};
export default class CommentsPage extends Component<Props, States> {
  render() {
    return (
      <View style={styles.page}>
        <FlatList
          data={[
            {
              image: "http://smktesting.herokuapp.com/static/img1.png",
              id: 1,
              text: "This is a device which I do not know how to use.",
              title: "Product1"
            },
            {
              image: "http://smktesting.herokuapp.com/static/img2.png",
              id: 2,
              text: "This is a device which I do not know how to use.",
              title: "Product2"
            },
            {
              image:
                "https://cdn.pixabay.com/photo/2016/08/03/06/22/space-1565986_960_720.jpg",
              id: 3,
              text: "This is a device which I do not know how to use.",
              title: "Product3"
            },
            {
              image:
                "https://upload.wikimedia.org/wikipedia/commons/e/ec/Very_Large_Array_dish_scale.jpg",
              id: 4,
              text: "This is a device which I do not know how to use.",
              title: "Product4"
            },
            {
              image: "http://smktesting.herokuapp.com/static/img1.png",
              id: 5,
              text: "This is a device which I do not know how to use.",
              title: "Product5"
            }
          ]}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductRow
              image={item.image}
              onPress={() => this.props.navigation.navigate("About")}
              text={item.text}
              title={item.title}
            />
          )}
          style={styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  /********************
   * container styles *
   ********************/
  list: {
    flex: 1
  },
  page: {
    backgroundColor: "rgba(30, 144, 255, 0.08)",
    flex: 1
  }
});
