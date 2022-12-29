package com.weblabs;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageNotFoundController {

	@RequestMapping(path = "/{path:^(?!api)\\w*}")
	public String returnIndex() {
		return "index.html";
	}

}
