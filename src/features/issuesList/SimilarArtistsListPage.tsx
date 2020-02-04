import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchIssuesCount } from 'features/repoSearch/repoDetailsSlice'
import { RootState } from 'app/rootReducer'
import { IssuesList } from './IssuesList'
import { fetchSimilarArtists } from './issuesSlice'

interface ILProps {
  org: string
  repo: string
  page: number
  setJumpToPage: (page: number) => void
  showIssueComments: (issueId: number) => void
}

export const SimilarArtistsListPage = ({
  org,
  repo,
  page = 1,
  setJumpToPage,
  showIssueComments
}: ILProps) => {
  const dispatch = useDispatch()

  const {
    currentPageIssues,
    isLoading,
    error: issuesError,
    issuesByNumber
  } = useSelector((state: RootState) => state.artists)

  const artists = currentPageIssues.map(
    issueNumber => issuesByNumber[issueNumber]
  )

  useEffect(() => {
    dispatch(fetchSimilarArtists(org, repo, page))
    dispatch(fetchIssuesCount(org, repo))
  }, [org, repo, page, dispatch])

  if (issuesError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{issuesError.toString()}</div>
      </div>
    )
  }

  let renderedList = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <IssuesList artists={artists} showIssueComments={showIssueComments} />
  )

  return <div id="issue-list-page">{renderedList}</div>
}
