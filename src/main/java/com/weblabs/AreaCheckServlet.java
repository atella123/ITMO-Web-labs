package com.weblabs;

import java.io.IOException;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.weblabs.area.AreaFunction;
import com.weblabs.area.check.AreaChecker;
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

	final transient Gson gson;
	static final Collection<AreaFunction> areas = Arrays.asList(
			(x, y, r) -> // rectange area
			x < 0 && x > -r / 2 && y > 0 && y < r,
			(x, y, r) -> // triangle area
			x > 0 && y > 0 && x - r < -y,
			(x, y, r) -> // Circle area
			x < 0 && y < 0 && x * x + y * y < r * r);

	public AreaCheckServlet() {
		this.gson = new Gson();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		long start = Instant.now().toEpochMilli();

		String reqBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		AreaCheckRequest areaCheckReq = gson.fromJson(reqBody, AreaCheckRequest.class);

		if (areaCheckReq == null) {
			resp.sendError(400, "Unable to parse JSON");
			return;
		}

		boolean result = AreaChecker.check(areaCheckReq.getX(), areaCheckReq.getY(), areaCheckReq.getR(), areas);

		long end = Instant.now().toEpochMilli();

		AreaCheckResponse areaCheckResp = new AreaCheckResponse(true, areaCheckReq.getX(), areaCheckReq.getY(),
				areaCheckReq.getR(), result, end - start, end, areaCheckReq.getColor());

		Requests rq = (Requests) getServletContext().getAttribute("result");
		rq.getResponses().add(areaCheckResp);

		resp.getWriter().println(gson.toJson(rq.getResponses()));
	}
}
