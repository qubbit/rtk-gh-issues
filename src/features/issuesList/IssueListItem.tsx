import React from 'react'
import { Artist } from 'api/githubAPI'
import styles from './IssueListItem.module.css'

type Props = Artist & {
  showIssueComments: (issueId: number) => void
}

export const IssueListItem = ({ name, url, showIssueComments }: Props) => {
  return (
    <div className={styles.issue}>
      <h1>{name}</h1>
    </div>
  )
}
