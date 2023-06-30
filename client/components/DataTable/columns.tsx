"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Weather = {
  id: string;
  date: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

export const columns: ColumnDef<Weather>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "temp",
    header: "Temperature °C",
  },
  {
    accessorKey: "feels_like",
    header: "Feels Like °C",
  },
  {
    accessorKey: "temp_min",
    header: "Min Temperature °C",
  },
  {
    accessorKey: "temp_max",
    header: "Max Temperature °C",
  },
  {
    accessorKey: "pressure",
    header: "Pressure (hPa)",
  },
  {
    accessorKey: "humidity",
    header: "Humidity (%)",
  },
];
