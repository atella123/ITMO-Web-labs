package com.weblabs.config;

import java.util.Arrays;
import java.util.Collection;

import com.weblabs.model.AreaFunction;

public final class AreaConfig {

	private static final Collection<AreaFunction> areas = Arrays.asList(
			(x, y, r) -> // rectange area
			x >= 0 && x <= r && y <= 0 && y >= -r / 2,
			(x, y, r) -> // triangle area
			x <= 0 && y <= 0 && x + r >= -y * 2,
			(x, y, r) -> // Circle area
			x >= 0 && y >= 0 && x * x + y * y <= r * r);

	private AreaConfig() {
	}

	public static final Collection<AreaFunction> getAreas() {
		return areas;
	}

}
