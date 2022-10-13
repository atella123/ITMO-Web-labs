package com.weblabs;

import java.io.IOException;
import java.time.Instant;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.weblabs.area.Config;
import com.weblabs.area.check.AreaChecker;
import com.weblabs.area.gson.AreaCheckRequestDeserializer;
import com.weblabs.area.requests.AreaCheckRequest;
import com.weblabs.area.requests.AreaCheckResponse;
import com.weblabs.beans.Requests;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

	private final transient Gson gson;

	public AreaCheckServlet() {
		this.gson = new GsonBuilder()
				.registerTypeAdapter(AreaCheckRequest.class, new AreaCheckRequestDeserializer())
				.create();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		long startTimeNano = System.nanoTime();

		String reqBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		AreaCheckRequest areaCheckReq = gson.fromJson(reqBody, AreaCheckRequest.class);

		if (areaCheckReq == null) {
			resp.sendError(400, "Unable to parse JSON");
			return;
		}

		boolean result = AreaChecker.check(areaCheckReq.getX(), areaCheckReq.getY(), areaCheckReq.getR(),
				Config.getAreas());

		Instant endTime = Instant.now();

		AreaCheckResponse areaCheckResp = new AreaCheckResponse(areaCheckReq.getX(), areaCheckReq.getY(),
				areaCheckReq.getR(), result,
				System.nanoTime() - startTimeNano, endTime.toEpochMilli(),
				areaCheckReq.getColor());

		Requests rq = (Requests) getServletContext().getAttribute("result");
		rq.getResponses().add(areaCheckResp);

		resp.getWriter().println(gson.toJson(rq.getResponses()));
	}
}
