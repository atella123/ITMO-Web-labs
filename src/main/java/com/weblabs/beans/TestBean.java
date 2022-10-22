package com.weblabs.beans;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

@ManagedBean(name = "testBean")
@SessionScoped
public class TestBean implements Serializable {

	private String name;
	private Integer age;
	private String aboba;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getAboba() {
		return aboba;
	}

	public void setAboba(String aboba) {
		this.aboba = aboba;
	}

}
