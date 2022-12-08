package com.weblabs.beans;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.annotation.PostConstruct;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;

import com.weblabs.area.Config;
import com.weblabs.area.check.AreaChecker;
import com.weblabs.area.requests.AreaCheckResponse;

@ManagedBean(name = "responses")
@ApplicationScoped
public class ResponseManager implements Serializable {

	@PersistenceContext(unitName = "database")
	private transient EntityManager entityManager;

	@Resource
	private transient UserTransaction userTransaction;

	private List<AreaCheckResponse> responseList;

	public ResponseManager() {
		responseList = new ArrayList<>();
	}

	@PostConstruct
	public void init() {
		responseList.addAll(entityManager
				.createQuery("SELECT a FROM responses a", AreaCheckResponse.class)
				.getResultList());
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
		try {
			userTransaction.begin();
			this.responseList.clear();
			entityManager.createQuery("DELETE FROM responses").executeUpdate();
			userTransaction.commit();
		} catch (NotSupportedException | SystemException | SecurityException | IllegalStateException | RollbackException
				| HeuristicMixedException
				| HeuristicRollbackException e) {
			e.printStackTrace();
		}
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

		try {
			userTransaction.begin();
			responseList.add(resp);
			entityManager.persist(resp);
			userTransaction.commit();
		} catch (NotSupportedException | SystemException | SecurityException | IllegalStateException | RollbackException
				| HeuristicMixedException
				| HeuristicRollbackException e) {
			e.printStackTrace();
		}
	}

	public boolean hasResponses() {
		return !responseList.isEmpty();
	}

	public String getEM() {
		return entityManager.toString();
	}
}
