import React from 'react'

interface OrgProps {
  org: string
  repo: string
}

type HeaderProps = {
  artist: number
} & OrgProps

export function IssuesPageHeader({ artist = -1, org, repo }: HeaderProps) {
  if (artist === -1) {
    return <h1>Open issues for {artist}</h1>
  } else {
    return (
      <h1>
        <span className="header__openIssues">{artist}</span> open Open issues
        for {artist}
      </h1>
    )
  }
}
