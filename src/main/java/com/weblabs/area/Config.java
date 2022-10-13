package com.weblabs.area;

import java.util.Arrays;
import java.util.Collection;
import java.util.function.DoublePredicate;

public final class Config {

	private static final Collection<AreaFunction> areas = Arrays.asList(
			(x, y, r) -> // rectange area
			x <= 0 && x >= -r / 2 && y >= 0 && y <= r,
			(x, y, r) -> // triangle area
			x >= 0 && y >= 0 && x - r <= -y,
			(x, y, r) -> // Circle area
			x <= 0 && y <= 0 && x * x + y * y <= r * r);

	private static final double[] rValues = { 1, 2, 3, 4, 5 };

	private static final DoublePredicate xPredicate = x -> x > -3 && x < 5;
	private static final DoublePredicate yPredicate = y -> y > -5 && y < 3;
	private static final DoublePredicate rPredicate = r -> Arrays.stream(rValues).anyMatch(x -> x == r);

	private Config() {
	}

	public static final Collection<AreaFunction> getAreas() {
		return areas;
	}

	public static final boolean checkXValidity(double x) {
		return xPredicate.test(x);
	}

	public static final boolean checkYValidity(double y) {
		return yPredicate.test(y);
	}

	public static final boolean checkRValidity(double r) {
		return rPredicate.test(r);
	}
}
