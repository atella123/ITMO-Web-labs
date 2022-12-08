package com.weblabs.beans.util;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

@ManagedBean(name = "dateFormatter")
@ApplicationScoped
public class DateFormatter {

	private DateTimeFormatter formatter = DateTimeFormatter
			.ofPattern("EEE, dd MMM yyyy HH:mm:ss", new Locale("en"))
			.withZone(ZoneId.of("GMT"));

	public String longToUTCString(long time) {
		return formatter.format(Instant.ofEpochSecond(time)) + " GMT";
	}

}
