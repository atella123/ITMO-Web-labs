package com.weblabs.area.gson;

import java.lang.reflect.Type;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.weblabs.area.requests.AreaCheckRequest;

public class AreaCheckRequestDeserializer implements JsonDeserializer<AreaCheckRequest> {

	@Override
	public AreaCheckRequest deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
			throws JsonParseException {

		JsonObject jsonObject = json.getAsJsonObject();

		String xStr = jsonObject.get("x").getAsString();
		String yStr = jsonObject.get("y").getAsString();
		String rStr = jsonObject.get("r").getAsString();
		Double x = Double.parseDouble(xStr.substring(0, Math.min(10, xStr.length())));
		Double y = Double.parseDouble(yStr.substring(0, Math.min(10, yStr.length())));
		Double r = Double.parseDouble(rStr.substring(0, Math.min(10, rStr.length())));

		String color = jsonObject.get("color").getAsString();

		return new AreaCheckRequest(x, y, r, color);
	}

}
