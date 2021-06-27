import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Button from "../../components/atoms/button";
import CategoryTile from "../../components/atoms/categoryTile";

function Categories(props) {
	const [categoryList, setCategoryList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [loader, setLoader] = useState(false);
	const location = useLocation();

	useEffect(() => {
		axios.get(`/categories`).then(res => {
			setCategoryList(res.data);
		});
	}, []);

	function updateCategoryTile(id, action) {
		if (action === "add") {
			setSelectedCategory([...selectedCategory, id]);
		} else {
			setSelectedCategory(selectedCategory.filter(o => o !== id));
		}
	}

	function saveCategories() {
		setLoader(true);
		const data = { categories: selectedCategory.join(",") };
		axios.patch(`/users/${location.search.split("=")[1]}`, data).then(res => {
			setLoader(false);
			routeToLogin();
		});
	}

	function routeToLogin() {
		props.history.push(`/login`);
	}

	return (
		<div className=" categories-container columns">
			<div className="column is-2"></div>
			<div className="column is-8 main-container">
				<div className="columns is-multiline">
					{categoryList.map(category =>
						renderCategoryTile(category, updateCategoryTile, selectedCategory)
					)}
				</div>
				<div className="columns">
					<div className="column">
						<div className="actions">
							<Button onClick={routeToLogin} disabled={loader} loading={loader}>
								Save
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="column is-2"></div>
		</div>
	);
}

function renderCategoryTile(category, updateCategoryTile, selectedCategory) {
	return (
		<div className="column is-3" key={category.id}>
			<CategoryTile
				category={category}
				onClick={updateCategoryTile}
				selected={selectedCategory.includes(category.id)}
			/>
		</div>
	);
}

export default Categories;
