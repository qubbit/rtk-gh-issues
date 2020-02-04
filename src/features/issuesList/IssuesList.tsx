import React from 'react'
import { Artist } from 'api/githubAPI'
import { IssueListItem } from './IssueListItem'
import styles from './IssuesList.module.css'

interface Props {
  artists: Artist[]
  showIssueComments: (issueId: number) => void
}

export const IssuesList = ({ artists, showIssueComments }: Props) => {
  const renderedIssues = artists.map(issue => (
    <li key={issue.mbid}>
      <IssueListItem {...issue} showIssueComments={showIssueComments} />
    </li>
  ))

  return <ul className={styles.issuesList}>{renderedIssues}</ul>
}
