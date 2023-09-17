export type PopularBooks = {
  query: string
  works?: Works[]
  days: number
  hours: number
}
export type Works = {
  key: string
  title: string
  edition_count: number
  first_publish_year: number
  has_fulltext: boolean
  public_scan_b: boolean
  cover_edition_key: string
  cover_i: number
  language?: string[]
  author_key?: string[]
  author_name?: string[]
  ia?: string[]
  ia_collection_s?: string
  lending_edition_s?: string
  lending_identifier_s?: string
  availability?: Availability
  id_librivox?: string[]
  id_project_gutenberg?: string[]
  id_standard_ebooks?: string[]
  subtitle?: string
}
export type Availability = {
  status: string
  available_to_browse?: boolean
  available_to_borrow?: boolean
  available_to_waitlist?: boolean
  is_printdisabled?: boolean
  is_readable?: boolean
  is_lendable?: boolean
  is_previewable?: boolean
  identifier: string
  isbn?: string
  oclc?: null
  openlibrary_work?: string
  openlibrary_edition?: string
  last_loan_date?: string
  num_waitlist?: string
  last_waitlist_date?: string
  is_restricted: boolean
  is_browseable?: boolean
  __src__: string
  error_message?: string
}

export type Work = {
  first_publish_date: string
  key: string
  title: string
  authors?: AuthorsEntity[]
  other_titles?: string[]
  translated_titles?: TranslatedString[]
  type: Key
  covers?: number[]
  cover_edition?: Edition
  description: string | Description
  lc_classifications?: string[]
  links?: Link[]
  dewey_number?: string[]
  subject_places?: string[]
  subject_people?: string[]
  subject_times?: string[]
  original_languages?: Language[]
  excerpts?: Excerpts[]
  subjects?: string[]
  latest_revision: number
  revision: number
  created: Description
  last_modified: Description
}
export type Authors = {
  key: string
  photos?: number[]
  entity_type: string
  type: Key
  links?: Links[]
  personal_name: string
  bio: Description
  title: string
  name: string
  remote_ids: RemoteIds
  fuller_name: string
  alternate_names?: string[]
  source_records?: string[]
  wikipedia: string
  birth_date: string
  latest_revision: number
  revision: number
  created: Description
  last_modified: Description
}

type AuthorsEntity = {
  author: Key
  type: Key
}

export type RemoteIds = {
  wikidata: string
  isni: string
  goodreads: string
  viaf: string
  librarything: string
  amazon: string
}

export type Key = {
  key: string
}
export type Excerpts = {
  comment: string
  excerpt: string
  author: Key
}

export type Editions = {
  links: Links
  size: number
  entries?: Edition[]
}
export type Links = {
  self: string
  work: string
  next: string
}
export type Edition = {
  authors?: Key[]
  by_statement?: string
  classifications?: Classifications
  contributions?: string[]
  copyright_date?: string
  covers?: number[]
  created: Description
  description?: string | Description
  dewey_decimal_class?: string[]
  distributors?: string[]
  edition_name?: string
  full_title?: string
  ia_box_id?: string[]
  identifiers?: Identifiers
  isbn_10?: string[]
  isbn_13?: string[]
  key: string
  languages?: Key[]
  last_modified: Description
  lc_classifications?: string[]
  lccn?: string[]
  local_id?: string[]
  latest_revision: number
  notes?: Description | string
  number_of_pages?: number
  ocaid?: string
  oclc_numbers?: string[]
  other_titles?: string[]
  pagination?: string
  physical_dimensions?: string
  physical_format?: string
  publish_country?: string
  publish_date: string
  publish_places?: string[]
  publishers?: string[]
  revision: number
  series?: string[]
  source_records?: string[]
  subtitle?: string
  title: string
  translated_from?: Language[]
  translation_of?: string
  type: Key
  uri_descriptions?: string[]
  uris?: string[]
  volumes: Volume[]
  url?: string[]
  weight?: string
  work_titles?: string[]
  works?: Key[]
}
type Description = {
  type: string
  value: string
}
type Identifiers = {
  amazon_co_uk_asin?: string[]
  amazon?: string[]
  goodreads?: string[]
  canadian_national_library_archive?: string[]
  librarything?: string[]
  alibris_id?: string[]
  overdrive?: string[]
  google?: string[]
  british_library?: string[]
  wikidata?: string[]
  amazon_de_asin?: string[]
  amazon_ca_asin?: string[]
  british_national_bibliography?: string[]
  libris?: string[]
}
type Classifications = {
  lccn_permalink?: string[]
}
type Contributors = {
  role: string
  name: string
}

export type Rating = {
  summary: Summary
  counts: Counts
}
type Summary = {
  average: number
  count: number
  sortable: number
}
type Counts = {
  1: number
  2: number
  3: number
  4: number
  5: number
}

type About = {
  title: string
  body: string
}

export type Author = {
  name: string
  eastern_order: boolean
  personal_name: string
  enumeration: string
  title: string
  alternate_names: string[]
  uris: string[]
  bio: string
  location: string
  birth_date: string
  death_date: string
  date: string
  wikipedia: string
  links: Link[]
}

export type AuthorRole = {
  author: Author
  role: string
  as: string
}

type BackReference = {
  name: string
  expected_type: Type
  property_name: string
}

type Collection = {
  name: string
}

type Content = {
  title: string
  body: string
}

type Contribution = {
  role: string
  contributor: string
}

type Doc = {
  title: string
  body: string
}

type Home = {
  title: string
  body: string
  news: string
  stats: string
}

type Language = {
  name: string
  code: string
  library_of_congress_name: string
  translated_names: TranslatedString[]
}

type Library = {
  ip_ranges: string
  website: string
  contact_person: string
  contact_email: string
  country: string
  addresses: string
  telephone: string
}

type Link = {
  title: string
  url: string
}

type List = {
  name: string
  description: string
  tags: string[]
}

type LocalId = {
  name: string
  source_ocaid: string
  urn_prefix: string
  id_location: string
  barcode: string
}

type Macro = {
  macro: string
  description: string
}

type Page = {
  title: string
  body: string
}

type Permission = {
  description: string
  readers: UserGroup[]
  writers: UserGroup[]
  admins: UserGroup[]
}

type Place = {
  name: string
  latitude: number
  longitude: number
  zoom_level: number
  kind: string
  highlights: Work[]
  is_in: Place[]
  marc_names: string[]
}

type Property = {
  name: string
  expected_type: Type
  unique: boolean
}

type RawText = {
  title: string
  content_type: string
  body: string
}

type Redirect = {
  location: string
}

type ScanLocation = {
  name: string
}

type ScanRecord = {
  edition: Edition
  scan_status: string
  locations: ScanLocation[]
  source_record_id: string
  shelves: string[]
  barcodes: string[]
  request_date: string
  sponsor: User
  completion_date: string
}

type Series = {
  title: string
  original_language: Language
  subjects: string[]
  subject_places: string[]
  subject_times: string[]
  genres: string[]
  description: string
  works: Work[]
  links: Link[]
}
type Subject = {
  name: string
}

type Tag = {
  name: string
  tag_type: string
  tag_description: string
  tag_plugins: string[]
}

type Template = {
  title: string
  body: string
}

type TocItem = {
  class: string
  label: string
  title: string
  pagenum: string
}

type TranslatedString = {
  language: Language
  text: string
}

type Type = {
  name: string
  description: string
  properties: Property[]
  backreferences: BackReference[]
  kind: string
}

type User = {
  displayname: string
  website: string[]
  description: string
  bot: boolean
}

type UserGroup = {
  description: string
  members: User[]
}

type Volume = {
  ia_id: string
  volume_number: number
}

export type SearchOutput = {
  numFound: number
  start: number
  numFoundExact: boolean
  docs?: SearchResults[] | null
  num_found: number
  q: string
  offset?: null
}
export type SearchResults = {
  key: string
  type: string
  seed?: string[] | null
  title: string
  title_sort: string
  title_suggest: string
  edition_count: number
  edition_key?: string[] | null
  publish_date?: string[] | null
  publish_year?: number[] | null
  first_publish_year?: number | null
  number_of_pages_median?: number | null
  lccn?: string[] | null
  publish_place?: string[] | null
  oclc?: string[] | null
  contributor?: string[] | null
  lcc?: string[] | null
  ddc?: string[] | null
  isbn?: string[] | null
  last_modified_i: number
  ebook_count_i: number
  ebook_access: string
  has_fulltext: boolean
  public_scan_b: boolean
  ia?: string[] | null
  ia_collection?: string[] | null
  ia_collection_s?: string | null
  lending_edition_s?: string | null
  lending_identifier_s?: string | null
  printdisabled_s?: string | null
  ratings_average?: number | null
  ratings_sortable?: number | null
  ratings_count?: number | null
  ratings_count_1?: number | null
  ratings_count_2?: number | null
  ratings_count_3?: number | null
  ratings_count_4?: number | null
  ratings_count_5?: number | null
  readinglog_count?: number | null
  want_to_read_count?: number | null
  currently_reading_count?: number | null
  already_read_count?: number | null
  cover_edition_key?: string | null
  cover_i?: number | null
  publisher?: string[] | null
  language?: string[] | null
  author_key?: string[] | null
  author_name?: string[] | null
  author_alternative_name?: string[] | null
  person?: string[] | null
  place?: string[] | null
  subject?: string[] | null
  time?: string[] | null
  id_alibris_id?: string[] | null
  id_amazon?: string[] | null
  id_canadian_national_library_archive?: string[] | null
  id_depósito_legal?: string[] | null
  id_goodreads?: string[] | null
  id_google?: string[] | null
  id_librarything?: string[] | null
  id_overdrive?: string[] | null
  id_paperback_swap?: string[] | null
  id_wikidata?: string[] | null
  ia_loaded_id?: string[] | null
  ia_box_id?: string[] | null
  publisher_facet?: string[] | null
  person_key?: string[] | null
  place_key?: string[] | null
  time_facet?: string[] | null
  person_facet?: string[] | null
  subject_facet?: string[] | null
  _version_: number
  place_facet?: string[] | null
  lcc_sort?: string | null
  author_facet?: string[] | null
  subject_key?: string[] | null
  time_key?: string[] | null
  ddc_sort?: string | null
  first_sentence?: string[] | null
  id_amazon_ca_asin?: string[] | null
  id_amazon_co_uk_asin?: string[] | null
  id_amazon_de_asin?: string[] | null
  id_amazon_it_asin?: string[] | null
  id_bcid?: string[] | null
  id_better_world_books?: string[] | null
  id_british_national_bibliography?: string[] | null
  id_nla?: string[] | null
  id_bibliothèque_nationale_de_france?: string[] | null
  id_british_library?: string[] | null
  id_hathi_trust?: string[] | null
  id_scribd?: string[] | null
}
