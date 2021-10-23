import { StyleSheet } from "react-native"

export const getListStyles = (colors) => {
  return StyleSheet.create({
    headerRow: {
      flexDirection: "row",
      backgroundColor: colors.darkTextColor,
      paddingVertical: 10,
      width: "100%",
      borderRadius: 5,
      justifyContent: "space-around",
      alignItems: "center"
    },
    bodyRow: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center",
      borderBottomColor: colors.primaryColor,
      borderBottomWidth: 1,
      borderStyle: "solid",
      paddingVertical: 10
    }
  })
}