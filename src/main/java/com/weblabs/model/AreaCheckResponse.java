package com.weblabs.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "areas")
public class AreaCheckResponse {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;

	private double x;
	private double y;
	private double r;
	private boolean inArea;
	private long completionTime;
	@Column(name = "cur_time")
	private long currentTime;

	public AreaCheckResponse() {

	}

	public AreaCheckResponse(double x, double y, double r, boolean result,
			long completionTime, long currentTime) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.inArea = result;
		this.completionTime = completionTime;
		this.currentTime = currentTime;
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

	public boolean isInArea() {
		return inArea;
	}

	public long getCompletionTime() {
		return completionTime;
	}

	public long getCurrentTime() {
		return currentTime;
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

	public void setInArea(boolean hit) {
		this.inArea = hit;
	}

	public void setCompletionTime(long completionTime) {
		this.completionTime = completionTime;
	}

	public void setCurrentTime(long currentTime) {
		this.currentTime = currentTime;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(x);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(y);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(r);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + (inArea ? 1231 : 1237);
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
		if (Double.doubleToLongBits(x) != Double.doubleToLongBits(other.x))
			return false;
		if (Double.doubleToLongBits(y) != Double.doubleToLongBits(other.y))
			return false;
		if (Double.doubleToLongBits(r) != Double.doubleToLongBits(other.r))
			return false;
		if (inArea != other.inArea)
			return false;
		if (completionTime != other.completionTime)
			return false;
		return currentTime == other.currentTime;
	}

	@Override
	public String toString() {
		return "AreaCheckResponse [x=" + x + ", y=" + y + ", r=" + r + ", hit=" + inArea + ", completionTime="
				+ completionTime + ", currentTime=" + currentTime + "]";
	}
}
