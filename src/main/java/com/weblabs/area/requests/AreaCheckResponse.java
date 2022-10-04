package com.weblabs.area.requests;

import java.io.Serializable;

public class AreaCheckResponse implements Serializable {

	private boolean valid;
	private double x;
	private double y;
	private double r;
	private boolean hit;
	private long completionTime;
	private long currentTime;
	private String color;

	public AreaCheckResponse(boolean valid) {
		this.valid = valid;
	}

	public AreaCheckResponse(boolean valid, double x, double y, double r, boolean result,
			long completionTime, long currentTime, String color) {
		this.valid = valid;
		this.x = x;
		this.y = y;
		this.r = r;
		this.hit = result;
		this.completionTime = completionTime;
		this.currentTime = currentTime;
		this.color = color;
	}

	public boolean isValid() {
		return valid;
	}

	public double getX() {
		return x;
	}

	public double getY() {
		return y;
	}

	public double getR() {
		return r;
	}

	public boolean isHit() {
		return hit;
	}

	public long getCompletionTime() {
		return completionTime;
	}

	public long getCurrentTime() {
		return currentTime;
	}

	public String getColor() {
		return color;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	public void setX(double x) {
		this.x = x;
	}

	public void setY(double y) {
		this.y = y;
	}

	public void setR(double r) {
		this.r = r;
	}

	public void setHit(boolean hit) {
		this.hit = hit;
	}

	public void setCompletionTime(long completionTime) {
		this.completionTime = completionTime;
	}

	public void setCurrentTime(long currentTime) {
		this.currentTime = currentTime;
	}

	public void setColor(String color) {
		this.color = color;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (valid ? 1231 : 1237);
		long temp;
		temp = Double.doubleToLongBits(x);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(y);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(r);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + (hit ? 1231 : 1237);
		result = prime * result + (int) (completionTime ^ (completionTime >>> 32));
		result = prime * result + (int) (currentTime ^ (currentTime >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AreaCheckResponse other = (AreaCheckResponse) obj;
		if (valid != other.valid)
			return false;
		if (Double.doubleToLongBits(x) != Double.doubleToLongBits(other.x))
			return false;
		if (Double.doubleToLongBits(y) != Double.doubleToLongBits(other.y))
			return false;
		if (Double.doubleToLongBits(r) != Double.doubleToLongBits(other.r))
			return false;
		if (hit != other.hit)
			return false;
		if (completionTime != other.completionTime)
			return false;
		return currentTime == other.currentTime;
	}

	@Override
	public String toString() {
		return "AreaCheckResponse [valid=" + valid + ", x=" + x + ", y=" + y + ", r=" + r + ", hit=" + hit
				+ ", completionTime=" + completionTime + ", currentTime=" + currentTime + "]";
	}
}
