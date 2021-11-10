import React from "react";
import { Calendar as RNCalendar, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { ptBR } from "./localeConfig";
import { DateData } from "react-native-calendars/src/types";
export { generateInterval } from './generateInterval'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export interface MarkedDatesProps {
  [date: string]: {
    color: string
    textColor: string
    disabled?: boolean
    disableTouchEvent?: boolean
  }
}
interface CalendarProps {
  markedDates: MarkedDatesProps
  onDayPress: (date: DateData) => void
}

export const Calendar: React.FC<CalendarProps> = ({ onDayPress, markedDates }) => {
  const theme = useTheme();
  return (
    <RNCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};
