import LookupResponse from "./lookupResponse";

export default interface AnalysisData {
	firstLookup: LookupResponse;
	chunks: string[];
}
