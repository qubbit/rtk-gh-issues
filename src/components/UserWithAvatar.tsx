import React from 'react'

import { User } from 'api/githubAPI'

interface UserAvatarProps {
  user: User
  orientation?: 'vertical' | 'horizontal'
  link?: boolean
  classes?: { [key: string]: string }
}

export const UserWithAvatar = ({
  user,
  orientation = 'vertical',
  link = true,
  classes = {}
}: UserAvatarProps) => {
  return <></>
}
