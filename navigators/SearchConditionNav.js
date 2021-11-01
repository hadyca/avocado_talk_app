import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SearchConditionDistrict from "../screens/SearchConditionDistrict";
import SearchConditionSector from "../screens/SearchConditionSector";

const Tab = createMaterialTopTabNavigator();

export default function SearchConditionNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="SearchConditionDistrict"
        component={SearchConditionDistrict}
        options={{
          title: "지역",
        }}
      />
      <Tab.Screen
        name="SearchConditionSector"
        component={SearchConditionSector}
        options={{
          title: "산업/업종",
        }}
      />
    </Tab.Navigator>
  );
}
