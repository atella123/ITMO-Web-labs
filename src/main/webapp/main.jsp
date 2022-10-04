<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.weblabs.util.DateFormatter" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>AAAAAAAAAAA🤣</title>
	<link href="<%= request.getContextPath() %>/static/favicon.ico" rel="icon">
	<script type="module" src="<%= request.getContextPath() %>/static/scripts/utils.js"></script>
	<script defer type="module" src="<%= request.getContextPath() %>/static/scripts/main.js"></script>
	<script defer type="module" src="<%= request.getContextPath() %>/static/scripts/canvas.js"></script>
	<link rel="stylesheet" href="<%= request.getContextPath() %>/static/styles/style.css">
</head>

<body>
	<header class="display-flex space-evenly rect-bg">
		<p>Полушкин М.Ю.</p>
		<p>P32301</p>
		<p>Вариант 321300</p>
	</header>
	<section class="display-flex" id="main-section">
		<canvas class="rect-bg round-bg default-padding" id="graph" width="450" height="450"></canvas>
		<form class="rect-bg round-bg default-padding" id="xyrForm">
			<div class="grid">
				<label for="x">x value:</label>
				<select name="x" class="form-input" id="x-input">
					<option value="-3">-3</option>
					<option value="-2">-2</option>
					<option value="-1">-1</option>
					<option selected value="0">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
				<label for="y">y value:</label>
				<div>
					<input type="text" placeholder="-3 < y > 5" name="y" class="form-input" id="y-input" maxlength="10">
					<br>
					<sup id="y-error-message" class="invalid"></sup>
				</div>
				<label for="r">R value:</label>
				<div>
					<div class="display-flex even-items form-input gap-half">
						<input type="button" class="r-selector" value="1">
						<input type="button" class="r-selector" value="1.5">
						<input type="button" class="r-selector" value="2">
						<input type="button" class="r-selector" value="2.5">
						<input type="button" class="r-selector" value="3">
					</div>
					<input type="hidden" name="r" id="r-input">
				</div>
			</div>
			<div class="display-flex space-evenly flex-wrap">
				<button class="form-button rect-bg" type="submit">check</button>
				<button class="form-button rect-bg" type="reset">reset</button>
			</div>
		</form>
	</section>
	<section class="display-flex">
		<jsp:useBean id="result" class="com.weblabs.beans.Requests" scope="application"></jsp:useBean>
		<% 
			String hiddenAttribute = result.getResponses().isEmpty() ? "hidden" : ""; 
		%>
		<table class="rect-bg round-bg default-padding" id="result-table" aria-describedby="requestResults" <%= hiddenAttribute %> >
			<thead>
				<tr>
					<th>x</th>
					<th>y</th>
					<th>R</th>
					<th>Is inside?</th>
					<th>Completion time</th>
					<th>Current time</th>
				</tr>
			</thead>
			<tbody id="result-table-body">
				<c:forEach var="resp" items="${result.getResponses()}">
					<tr>
						<fmt:setLocale value="en-US"/>
						<td class="response-x">
							<fmt:formatNumber type="number" pattern="###.###" minFractionDigits="0" value="${resp.getX()}"/>
						</td>
						<td class="response-y">
							<fmt:formatNumber type="number" pattern="###.###" minFractionDigits="0" value="${resp.getY()}"/>
						</td>
						<td class="response-r">
							<fmt:formatNumber type="number" pattern="###.###" minFractionDigits="0" value="${resp.getR()}"/>
						</td>
						<td class="response-result ${resp.isHit() ? "hit" : "miss"}">
							${resp.isHit() ? "Yes!" : "No"}
						</td>
						<td class="response-completion-time">
							${resp.getCompletionTime()}
						</td>
						<td class="response-color" hidden>
							${resp.getColor()}
						</td>
						<td class="response-current-time">
							${DateFormatter.longToUTCString(resp.getCurrentTime() / 1000)}
						</td>
					</tr>
				</c:forEach>
			</tbody>
		</table>
	</section>
</body>

</html>