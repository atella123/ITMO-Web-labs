package com.weblabs.beans;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;

@ManagedBean(name = "areaRequest")
@RequestScoped
public class AreaCheckRequest implements Serializable {

	private double x;
	private double y;
	private double r;

	public AreaCheckRequest() {
	}

	public AreaCheckRequest(double x, double y, double r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}

	public double getX() {
		return x;
	}

	public void setX(double x) {
		this.x = x;
	}

	public double getY() {
		return y;
	}

	public void setY(double y) {
		this.y = y;
	}

	public double getR() {
		return r;
	}

	public void setR(double r) {
		this.r = r;
	}

	@Override
	public String toString() {
		return "Request [x=" + x + ", y=" + y + ", r=" + r + "]";
	}

}
