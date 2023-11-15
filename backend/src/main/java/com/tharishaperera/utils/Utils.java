package com.tharishaperera.utils;

import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class Utils {
    // generate a simple incrementing ID
    // public static Long generateId() {
    // return System.currentTimeMillis();
    // }

    private static final Set<Long> generatedIds = new HashSet<>();
    private static final Random random = new Random();

    public static Long generateId() {
        long minPossibleID = 1000L;
        long maxPossibleID = 9999L;

        while (true) {
            long candidateID = Math.abs(minPossibleID + random.nextLong() % (maxPossibleID - minPossibleID + 1));
            if (!generatedIds.contains(candidateID)) {
                generatedIds.add(candidateID);
                return candidateID;
            }
        }
    }
}
