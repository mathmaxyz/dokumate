import fs from 'fs/promises'
import path from 'path'


const CACHE_DIR = path.join(process.cwd(), '.next', 'cache')

export async function saveData<T>(data: T): Promise<string> {
	const id = crypto.randomUUID()
	await fs.mkdir(CACHE_DIR, { recursive: true })
	await fs.writeFile(
		path.join(CACHE_DIR, `${id}.json`),
		JSON.stringify({ data: data, timestamp: Date.now() })
	)
	console.log("Saved to file: ", id)
	return id
}

// NOTE: `T` is an unchecked assertion — nothing validates that the file on disk
// actually matches. Same caveat as CLEANUP.md 4.1; real fix is runtime validation.
export async function getData<T>(id: string): Promise<T | null> {
	try {
		const filePath = path.join(CACHE_DIR, `${id}.json`)
		const content = await fs.readFile(filePath, 'utf-8')
		const parsed = JSON.parse(content)
		console.log("Retrieved from file: ", parsed)
		return parsed.data as T
	} catch {
		console.log("File not found: ", id)
		return null
	}
}
