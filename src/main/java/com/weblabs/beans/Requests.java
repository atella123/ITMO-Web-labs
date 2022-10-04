package com.weblabs.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.weblabs.area.requests.AreaCheckResponse;

public class Requests implements Serializable {

	private List<AreaCheckResponse> responses;

	public Requests() {
		responses = new ArrayList<>();
	}

	@Override
	public String toString() {
		return "Results [responses=" + responses + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((responses == null) ? 0 : responses.hashCode());
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
		Requests other = (Requests) obj;
		if (responses == null) {
			if (other.responses != null)
				return false;
		} else if (!responses.equals(other.responses))
			return false;
		return true;
	}

	public List<AreaCheckResponse> getResponses() {
		return responses;
	}

	public void setResponses(List<AreaCheckResponse> responses) {
		this.responses = responses;
	}

}
