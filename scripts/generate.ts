import { writeFileSync } from 'node:fs'
import { ofetch } from 'ofetch'

/**
 * Fetch from {@link https://github.com/disposable/disposable-email-domains}
 */
async function fetchDisposableDomainList() {
  const domains = await ofetch<string[]>('https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.json', {
    responseType: 'json',
  })

  // remove duplicates (very rare), and put everything lowercase
  // there are 2 domain that are not lowercased: window.dataLayer and navigator.userAgent
  const normalizedDomains = [...new Set(domains.map(domain => domain.toLowerCase()))]

  // compute the max len for the domain, its 126 most of the time
  // const maxLen = normalizedDomains.reduce((maxLen, el) => Math.max(maxLen, el.length), 0)

  return `/**
 * Creates a function to check if an email address is from a disposable email domain.
 *
 * This function should be used for bulk validation, as it keeps in memory the set of disposable domains.
 *
 * For implementation details, see {@link isDisposable}.
 *
 * The disposable domain list used: {@link https://github.com/disposable/disposable-email-domains}.
 */
export function createDisposableFactory() {
  const set = new Set(${JSON.stringify(normalizedDomains)})

  return (domainOrEmail: string | null | undefined): boolean => {
    return typeof domainOrEmail === 'string' ? set.has(domainOrEmail.split('@').pop()!.toLowerCase()) : true
  }
}

/**
 * Checks if the email address is from a disposable email domain.
 *
 * It is suggested that you reject strings that are invalid emails, longer than 254 or that contains a whitespace.
 *
 * - Always return \`false\` for non \`string\` types.
 * - The string is lower-cased before validating.
 * - The string is **NOT** validated.
 * - The string is **NOT** trimmed.
 *
 * The disposable domain list used: {@link https://github.com/disposable/disposable-email-domains}.
 */
export function isDisposable(domainOrEmail: string | null | undefined): boolean {
  return createDisposableFactory()(domainOrEmail)
}
`
}

async function writeToFile() {
  const text = await fetchDisposableDomainList()

  writeFileSync('src/index.ts', text, 'utf8')
}

writeToFile()
