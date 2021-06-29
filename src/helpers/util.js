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
