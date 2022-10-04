package com.weblabs.util;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class DateFormatter {

	private static DateTimeFormatter formatter = DateTimeFormatter
			.ofPattern("EEE, dd MMM yyyy HH:mm:ss", new Locale("en"))
			.withZone(ZoneId.of("GMT"));

	private DateFormatter() {

	}

	public static String longToUTCString(long time) {
		return formatter.format(Instant.ofEpochSecond(time)) + " GMT";
	}

}
