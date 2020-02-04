import React from 'react'
import { Artist } from 'api/githubAPI'
import styles from './IssueComments.module.css'

interface ICLProps {
  issue: Artist
  comments: Comment[]
}

interface ICProps {
  comment: Comment
}

export function IssueComments({ comments = [], issue }: ICLProps) {
  return (
    <ul className={styles.commentsList}>
      <h2>IssueComments</h2>
    </ul>
  )
}
