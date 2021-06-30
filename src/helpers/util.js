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
