import "../_styles/analyze.css"
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getData } from "../_cache/cache";
import Spinner from "../_components/spinner"
import LookupParagraph from "../_components/lookupParagraph";
import SavedWordsView from "../_components/SavedWordsView";
import AnalyzedText from "../_components/AnalyzedText";
import AnalysisData from "../_types/analysisData";

export default async function AnalysisPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

	const params = await searchParams
	const id = Array.isArray(params.analysis) ? params.analysis[0] : params.analysis
	if (!id) notFound()

	const resultsData = await getData<AnalysisData>(id)
	if (resultsData === null) notFound()

	const { firstLookup, chunks } = resultsData

	return (
		<section className="main-content">
			<section className="analysis-container">
				<AnalyzedText id={id}>
					<LookupParagraph chunk={chunks[0]} lookupData={firstLookup} />
					{chunks.slice(1).map((chunk: string, index: number) => (
						<Suspense key={index} fallback={<Spinner text={chunk} />}>
							<LookupParagraph chunk={chunk} lookupData={null} />
						</Suspense>
					))}
				</AnalyzedText>
				<SavedWordsView name={firstLookup.name} />
			</section>
		</section >
	)
}
