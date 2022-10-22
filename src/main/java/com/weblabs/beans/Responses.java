package com.weblabs.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;

import com.weblabs.area.requests.AreaCheckResponse;

@ManagedBean
@ApplicationScoped
public class Responses implements Serializable {

	private List<AreaCheckResponse> responseList;

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

	public List<AreaCheckResponse> getResponses() {
		return responseList;
	}

	public void setResponses(List<AreaCheckResponse> responses) {
		this.responseList = responses;
	}

}
