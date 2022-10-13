package com.weblabs;

import java.io.IOException;
import java.util.stream.Collectors;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import com.weblabs.area.Config;
import com.weblabs.area.gson.AreaCheckRequestDeserializer;
import com.weblabs.area.requests.AreaCheckRequest;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = "/")
public class ControllerServlet extends HttpServlet {

	private final transient Gson gson;

	public ControllerServlet() {
		this.gson = new GsonBuilder()
				.registerTypeAdapter(AreaCheckRequest.class, new AreaCheckRequestDeserializer())
				.create();
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		if (req.getRequestURI().equals("/lab/")) {
			getServletContext().getRequestDispatcher("/main.jsp").forward(req, resp);
			return;
		}
		getServletContext().getNamedDispatcher("default").forward(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		req.getReader().mark(Integer.parseInt(req.getHeader("Content-Length")) + 1);

		try {
			AreaCheckRequest areaCheckRequest = gson.fromJson(
					req.getReader().lines().collect(Collectors.joining(System.lineSeparator())),
					AreaCheckRequest.class);

			if (areaCheckRequest.getX() == null) {
				resp.sendError(400, "Unable to parse JSON: x value not provided");
				return;
			}
			if (areaCheckRequest.getY() == null) {
				resp.sendError(400, "Unable to parse JSON: y value not provided");
				return;
			}
			if (areaCheckRequest.getR() == null) {
				resp.sendError(400, "Unable to parse JSON: r value not provided");
				return;
			}
			if (areaCheckRequest.getColor() == null) {
				resp.sendError(400, "Unable to parse JSON: color value not provided");
				return;
			}
			if (!Config.checkXValidity(areaCheckRequest.getX())) {
				resp.sendError(400, String.format("%f is not valid x value",
						areaCheckRequest.getX()));
				return;
			}
			if (!Config.checkYValidity(areaCheckRequest.getY())) {
				resp.sendError(400, String.format("%f is not valid y value",
						areaCheckRequest.getY()));
				return;
			}
			if (!Config.checkRValidity(areaCheckRequest.getR())) {
				resp.sendError(400, String.format("%f is not valid r value",
						areaCheckRequest.getR()));
				return;
			}
		} catch (JsonParseException | NumberFormatException e) {
			resp.sendError(400, String.format("Unable to parse JSON: %s", e.getLocalizedMessage()));
			return;
		}

		req.getReader().reset();

		RequestDispatcher rd = getServletContext().getNamedDispatcher("AreaCheckServlet");
		rd.forward(req, resp);
	}
}
