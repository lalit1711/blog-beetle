import _get from "lodash/get"
export default function getDataFromResponse(response) { return _get(response, "data") }
