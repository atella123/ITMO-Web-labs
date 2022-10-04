package com.weblabs.area.requests;

public class AreaCheckRequest {

	final Double x;
	final Double y;
	final Double r;
	final String color;

	public AreaCheckRequest(Double x, Double y, Double r, String color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
	}

	public Double getX() {
		return x;
	}

	public Double getY() {
		return y;
	}

	public Double getR() {
		return r;
	}

	public String getColor() {
		return color;
	}
}
