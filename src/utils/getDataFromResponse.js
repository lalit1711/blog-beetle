import _get from "lodash/get"
export default getDataFromResponse = (response) => _get(response, "data")
