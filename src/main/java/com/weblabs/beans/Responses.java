package com.weblabs.beans;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

import com.weblabs.area.Config;
import com.weblabs.area.check.AreaChecker;
import com.weblabs.area.requests.AreaCheckResponse;

@ManagedBean(name = "responses")
@ApplicationScoped
public class Responses implements Serializable {

	private List<AreaCheckResponse> responseList;
	private double x;
	private double y;
	private double r;

	public Responses() {
		responseList = new ArrayList<>();
	}

	@Override
	public String toString() {
		return "Results [responses=" + responseList + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((responseList == null) ? 0 : responseList.hashCode());
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
		Responses other = (Responses) obj;
		if (responseList == null) {
			if (other.responseList != null)
				return false;
		} else if (!responseList.equals(other.responseList))
			return false;
		return true;
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

	public List<AreaCheckResponse> getResponseList() {
		return responseList;
	}

	public void setResponseList(List<AreaCheckResponse> responses) {
		this.responseList = responses;
	}

	public void addResponse() {
		System.out.println(123);
		long startTimeNano = System.nanoTime();
		responseList.add(
				new AreaCheckResponse(x, y, r,
						AreaChecker.check(x, y, r, Config.getAreas()),
						System.nanoTime() - startTimeNano,
						Instant.now().toEpochMilli()));
	}
}
