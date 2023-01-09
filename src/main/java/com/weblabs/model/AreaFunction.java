package com.weblabs.model;

@FunctionalInterface
public interface AreaFunction {
    boolean inArea(double x, double y, double r);
}
