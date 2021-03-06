export const requestData = value => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			or: value
		},
		fields: {
			id: true,
			title: true,
			coverImgSrc: true,
			subTitle: true,
			authorId: true,
			blogContent: true,
			published: true,
			categories: true,
			createdAt: true,
			updatedAt: true
		}
	};
};

export const requestDataComment = value => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			...value
		},
		fields: {
			id: true,
			comment: true,
			userId: true,
			createdAt: true,
			blogId: true
		}
	};
};

export const requestDataLike = value => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			title: { like: `%${value}%` }
		},
		fields: {
			id: true,
			title: true,
			coverImgSrc: true,
			subTitle: true,
			authorId: true,
			blogContent: true,
			published: true,
			categories: true,
			createdAt: true,
			updatedAt: true
		}
	};
};

export const requestDataUserLike = value => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			fullName: { like: `%${value}%` }
		},
		fields: {
			id: true,
			fullName: true,
			bio: true,
			imgSrc: true
		}
	};
};

export const requestDataUserLikesBlog = (blogId, userId) => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,
		where: {
			and: [{ blogId: blogId }, { userId: userId }, { active: 1 }]
		}
	};
};

export const requestBlogDataForUser = id => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			authorId: id,
			published: 1
		},
		fields: {
			id: true,
			title: true,
			coverImgSrc: true,
			subTitle: true,
			authorId: true,
			blogContent: true,
			published: true,
			categories: true,
			createdAt: true,
			updatedAt: true
		}
	};
};

export const requestDataSavedBlog = id => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,
		where: {
			userId: id,
			active: 1
		},
		fields: {
			id: true,
			userId: true,
			blogId: true,
			active: true,
			createdAt: true,
			updatedAt: true
		}
	};
};

export const requestDataForDrafts = id => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			authorId: id,
			published: 0
		},
		fields: {
			id: true,
			title: true,
			coverImgSrc: true,
			subTitle: true,
			authorId: true,
			blogContent: true,
			published: true,
			categories: true,
			createdAt: true,
			updatedAt: true
		}
	};
};

export const getSavedBlogRequestData = blogIdArray => {
	return {
		offset: 0,
		limit: 100,
		skip: 0,

		where: {
			id: { inq: blogIdArray }
		},
		fields: {
			id: true,
			title: true,
			coverImgSrc: true,
			subTitle: true,
			authorId: true,
			blogContent: true,
			published: true,
			categories: true,
			createdAt: true,
			updatedAt: true
		}
	};
};
