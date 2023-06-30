"use client";

import * as z from "zod";
import { format, parseISO, toDate } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DataTable } from "./DataTable/data-table";
import { Weather, columns } from "./DataTable/columns";

const FormSchema = z.object({
  dates: z.array(
    z.date({
      required_error: "Atleast one date is required.",
    })
  ),
});

export function CalendarForm() {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [weather, setWeather] = useState<Weather[]>([]);

  async function fetchWeatherDataFromDB() {
    const response = await toast.promise(
      fetch("http://localhost:5000/weather"),
      {
        loading: "Getting data from MongoDB",
        success: "Got the data from MongoDB",
        error: "Error when fetching",
      }
    );
    const data = await response.json();
    const totalWeatherData: Weather[] = [...weather, ...data];
    setWeather(totalWeatherData);
  }

  useEffect(() => {
    if (location.latitude === 0 && location.longitude === 0) {
      getLocation();
    }
    fetchWeatherDataFromDB();
  }, []);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        toast.success("Located!", {
          style: {
            minWidth: "250px",
          },
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (location.latitude === 0 && location.longitude === 0) {
      alert("Please allow location access to use this feature.");
      return;
    }

    try {
      const response = await toast.promise(
        fetch("http://localhost:5000/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: location.latitude,
            lon: location.longitude,
          }),
        }),
        {
          loading: "Loading",
          success: "Got the data",
          error: "Error when fetching",
        },
        {
          style: {
            minWidth: "250px",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const weatherData = {
          id: data.id,
          date: format(toDate(data.dt * 1000), "HH:mm, MMM dd"),
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          pressure: data.main.pressure,
          humidity: data.main.humidity,
        };
        const totalWeatherData: Weather[] = [...weather, weatherData];
        setWeather(totalWeatherData);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  async function onSaveData() {
    try {
      const response = await toast.promise(
        fetch("http://localhost:5000/weathers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cord: location,
            data: weather,
          }),
        }),
        {
          loading: "Loading",
          success: "Saved the data",
          error: "Error when saving",
        }
      );

      if (response.ok) {
        toast.success("Saved the data");
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  }

  return (
    <div className="flex space-x-8 w-full">
      <div className="space-y-2">
        <div className="space-y-2 w-full">
          <Label htmlFor="number">Latitude</Label>
          <Input disabled type="number" placeholder={`${location.latitude}`} />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="number">Longitude</Label>
          <Input disabled type="number" placeholder={`${location.longitude}`} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dates</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            field.value.length === 1 ? (
                              format(field.value[0], "MMM d, yyyy")
                            ) : (
                              `${field.value.length} dates selected`
                            )
                          ) : (
                            <span className="opacity-50">Select a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="multiple"
                        max={5}
                        selected={field.value}
                        // @ts-ignore
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Dates used to query weather data.
                  </FormDescription>
                  <FormMessage />
                  {field.value &&
                    field.value.length > 1 &&
                    field.value.map((date) => (
                      <div key={date.toDateString()}>
                        <Badge variant="outline" className="p-2">
                          {format(date, "MMM d, yyyy")}
                        </Badge>
                      </div>
                    ))}
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col space-y-2 items-end h-full">
        <DataTable columns={columns} data={weather} />
        {weather.length > 0 && <Button onClick={onSaveData}>Save</Button>}
      </div>
      <Toaster />
    </div>
  );
}
