import axios from 'axios'

export interface ArtistResponse {
  artist: Artist
}

export interface Artist {
  name: string
  mbid: string
  url: string
  image: Image[]
  streamable: string
  ontour: string
  stats: Stats
  similar: Similar
  tags: Tags
  bio: Bio
}

export interface Bio {
  links: Links
  published: string
  summary: string
  content: string
}

export interface Links {
  link: Link
}

export interface Link {
  '#text': string
  rel: string
  href: string
}

export interface Image {
  '#text': string
  size: string
}

export interface Similar {
  artist: ArtistElement[]
}

export interface ArtistElement {
  name: string
  url: string
  image: Image[]
}

export interface Stats {
  listeners: string
  playcount: string
}

export interface Tags {
  tag: Tag[]
}

export interface Tag {
  name: string
  url: string
}
export interface Label {
  id: number
  name: string
  color: string
}

export interface User {
  login: string
  avatar_url: string
}

export interface ArtistsResult {
  similarartists: { artist: Artist[] }
}

const API_URL =
  'https://ws.audioscrobbler.com/2.0/?api_key=98a63757c7bd350beb8ff827d9274442&format=json'

export async function getArtist(artistName: string) {
  const x = `${API_URL}&method=artist.getInfo&artist=${encodeURIComponent(
    artistName
  )}`
  const { data } = await axios.get<Artist>(x)
  return data
}

export async function getSimilarArtists(artistName: string) {
  const { data } = await axios.get<ArtistsResult>(
    `${API_URL}&method=artist.getSimilar&artist=${encodeURIComponent(
      artistName
    )}`
  )
  return data
}
