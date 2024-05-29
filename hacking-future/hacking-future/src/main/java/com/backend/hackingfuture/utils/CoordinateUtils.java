package com.backend.hackingfuture.utils;

public class CoordinateUtils {

    public static String generateRandomCoordinate() {
        // Generate random latitude within the specified range
        double latitude = Math.round((500 - (-500)) * Math.random() - 500) * 100.0 / 100.0;
      
        // Generate random longitude within the specified range
        double longitude = Math.round((500 - (-500)) * Math.random() - 500) * 100.0 / 100.0;
      
        // Format the coordinates with two decimal places
        return String.format("%.2f,%.2f", latitude, longitude);
      }
}