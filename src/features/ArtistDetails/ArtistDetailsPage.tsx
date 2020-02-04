import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { RootState } from 'app/rootReducer'
import { fetchIssue } from 'features/issuesList/issuesSlice'

import styles from './ArtistDetailsPage.module.css'
import './ArtistDetailsPage.css'

interface IDProps {
  org: string
  repo: string
  issueId: number
  showIssuesList: () => void
}

export const ArtistDetailsPage = ({
  org,
  repo,
  issueId,
  showIssuesList
}: IDProps) => {
  const dispatch = useDispatch()

  const artist = useSelector(
    (state: RootState) => state.artists.issuesByNumber[issueId]
  )

  useEffect(() => {
    if (!artist) {
      dispatch(fetchIssue(org, repo, issueId))
    }

    // Since we may have the artist already, ensure we're scrolled to the top
    window.scrollTo({ top: 0 })
  }, [org, repo, issueId, artist, dispatch])

  let content

  const backToIssueListButton = (
    <button className="pure-button" onClick={showIssuesList}>
      Back to Issues List
    </button>
  )

  if (artist === null) {
    content = (
      <div className="artist-detail--loading">
        {backToIssueListButton}
        <p>Loading artist #{issueId}...</p>
      </div>
    )
  } else {
    content = (
      <div className={classnames('issueDetailsPage', styles.issueDetailsPage)}>
        <h1 className="artist-detail__title">{artist.name}</h1>
      </div>
    )
  }

  return <div>{content}</div>
}
