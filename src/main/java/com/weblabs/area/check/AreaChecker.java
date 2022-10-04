package com.weblabs.area.check;

import com.weblabs.area.AreaFunction;
import java.util.Collection;

public class AreaChecker {

    private AreaChecker() { throw new UnsupportedOperationException(); }

    public static boolean check(double x, double y, double r, Collection<AreaFunction> areas) {
        if (areas.isEmpty()) {
            throw new IllegalArgumentException("Area collection must not be empty");
        }

        return areas.stream().anyMatch(area -> area.inArea(x, y, r));
    }
}
