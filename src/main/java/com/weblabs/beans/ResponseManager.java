package com.weblabs.beans;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.weblabs.area.Config;
import com.weblabs.area.check.AreaChecker;
import com.weblabs.area.requests.AreaCheckResponse;

public class ResponseManager implements Serializable {

	private List<AreaCheckResponse> responseList;

	public ResponseManager() {
		responseList = new ArrayList<>();
	}

	@Override
	public String toString() {
		return "Results [responses=" + responseList + "]";
	}

	public List<AreaCheckResponse> getResponseList() {
		return responseList;
	}

	public void setResponseList(List<AreaCheckResponse> responses) {
		this.responseList = responses;
	}

	public void clearResponseList() {
		this.responseList.clear();
	}

	public void handleRequest(AreaCheckRequest request) {
		long startTimeNano = System.nanoTime();

		double x = request.getX();
		double y = request.getY();
		double r = request.getR();

		AreaCheckResponse resp = new AreaCheckResponse(x, y, r,
				AreaChecker.check(x, y, r, Config.getAreas()),
				System.nanoTime() - startTimeNano,
				Instant.now().toEpochMilli());

		responseList.add(resp);
	}

	public boolean hasResponses() {
		return !responseList.isEmpty();
	}
}
