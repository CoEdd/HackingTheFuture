package com.backend.hackingfuture.utils;

public class CoordinateUtils {

    // Method to generate a random coordinate string in the format "latitude,longitude"
    public static String generateRandomCoordinate() {
    // Generate random latitude with two decimal places
    double latitude = Math.round((-90 + (90 - (-90)) * Math.random()) * 100) / 100.0;
    
    // Generate random longitude with two decimal places
    double longitude = Math.round((-180 + (180 - (-180)) * Math.random()) * 100) / 100.0;
    
    return String.format("%.2f,%.2f", latitude, longitude);
    }
}
