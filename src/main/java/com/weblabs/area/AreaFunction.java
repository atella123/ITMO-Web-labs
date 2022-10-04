package com.weblabs.area;

@FunctionalInterface
public interface AreaFunction {
    boolean inArea(double x, double y, double r);
}
