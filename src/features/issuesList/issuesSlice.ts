import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Links } from 'parse-link-header'

import {
  Artist,
  ArtistsResult,
  getArtist,
  getSimilarArtists
} from 'api/githubAPI'
import { AppThunk } from 'app/store'

interface IssuesState {
  issuesByNumber: Record<string, Artist>
  currentPageIssues: string[]
  pageCount: number
  pageLinks: Links | null
  isLoading: boolean
  error: string | null
}

const issuesInitialState: IssuesState = {
  issuesByNumber: {},
  currentPageIssues: [],
  pageCount: 0,
  pageLinks: {},
  isLoading: false,
  error: null
}

function startLoading(state: IssuesState) {
  state.isLoading = true
}

function loadingFailed(state: IssuesState, action: PayloadAction<string>) {
  state.isLoading = false
  state.error = action.payload
}

const issues = createSlice({
  name: 'issues',
  initialState: issuesInitialState,
  reducers: {
    getIssueStart: startLoading,
    getIssuesStart: startLoading,
    getIssueSuccess(state, { payload }: PayloadAction<Artist>) {
      const { mbid } = payload
      state.issuesByNumber[mbid] = payload
      state.isLoading = false
      state.error = null
    },
    getIssuesSuccess(state, { payload }: PayloadAction<ArtistsResult>) {
      const {
        similarartists: { artist }
      } = payload
      state.isLoading = false
      state.error = null

      artist.forEach(artist => {
        state.issuesByNumber[artist.mbid] = artist
      })

      state.currentPageIssues = artist.map(artist => artist.mbid)
    },
    getIssueFailure: loadingFailed,
    getIssuesFailure: loadingFailed
  }
})

export const {
  getIssuesStart,
  getIssuesSuccess,
  getIssueStart,
  getIssueSuccess,
  getIssueFailure,
  getIssuesFailure
} = issues.actions

export default issues.reducer

export const fetchSimilarArtists = (
  org: string,
  repo: string,
  page?: number
): AppThunk => async dispatch => {
  try {
    dispatch(getIssuesStart())
    const issues = await getSimilarArtists(org)
    dispatch(getIssuesSuccess(issues))
  } catch (err) {
    dispatch(getIssuesFailure(err.toString()))
  }
}

export const fetchIssue = (
  org: string,
  repo: string,
  number: number
): AppThunk => async dispatch => {
  try {
    dispatch(getIssueStart())
    const artist = await getArtist(org)
    dispatch(getIssueSuccess(artist))
  } catch (err) {
    dispatch(getIssueFailure(err.toString()))
  }
}
