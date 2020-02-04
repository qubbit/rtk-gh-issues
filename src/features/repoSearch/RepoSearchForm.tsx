import React, { useState, ChangeEvent } from 'react'

import './pure-forms.css'
import './pure-buttons.css'

interface Props {
  artistName: string
  repo: string
  setOrgAndRepo: (artistName: string, repo: string) => void
  setJumpToPage: (page: number) => void
}

type InputEvent = ChangeEvent<HTMLInputElement>
type ChangeHandler = (e: InputEvent) => void

export const RepoSearchForm = ({
  artistName,
  repo,
  setOrgAndRepo,
  setJumpToPage
}: Props) => {
  const [currentOrg, setCurrentOrg] = useState(artistName)
  const [currentRepo, setCurrentRepo] = useState(repo)

  const onOrgChanged: ChangeHandler = e => {
    setCurrentOrg(e.target.value)
  }

  const onLoadRepoClicked = () => {
    setOrgAndRepo(currentOrg, currentRepo)
  }

  return (
    <form className="pure-form">
      <div>
        <label htmlFor="artistName" style={{ marginRight: 5 }}>
          Artist name:
        </label>
        <input name="artistName" value={currentOrg} onChange={onOrgChanged} />
        <button
          type="button"
          className="pure-button pure-button-primary"
          style={{ marginLeft: 5 }}
          onClick={onLoadRepoClicked}
        >
          Search
        </button>
      </div>
    </form>
  )
}
