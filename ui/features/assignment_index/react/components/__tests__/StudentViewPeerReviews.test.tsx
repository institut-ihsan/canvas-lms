/*
 * Copyright (C) 2022 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {render} from '@testing-library/react'
import {StudentViewPeerReviews, StudentViewPeerReviewsProps} from '../StudentViewPeerReviews'

describe('StudentViewPeerReviews Component Tests', () => {
  it('renders the StudentViewPeerReviews component with anonymous peer reviewers', async () => {
    const defaultProps: StudentViewPeerReviewsProps = {
      assignment: {
        id: '1',
        anonymous_peer_reviews: true,
        assessment_requests: [
          {
            anonymous_id: 'anonymous1',
            user_id: 'user1',
            user_name: 'username1',
            available: true
          },
          {
            anonymous_id: 'anonymous2',
            user_id: 'user2',
            user_name: 'username2',
            available: true
          }
        ]
      }
    }

    const {container, queryByText, queryAllByText} = render(
      <StudentViewPeerReviews {...defaultProps} />
    )
    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(queryAllByText('Anonymous Student')).toHaveLength(2)
    expect(queryByText('username1')).not.toBeInTheDocument()
    expect(queryByText('username2')).not.toBeInTheDocument()

    const firstLink = container.querySelectorAll('a.item_link')[0]
    const secondLink = container.querySelectorAll('a.item_link')[1]
    expect(firstLink.attributes.getNamedItem('href')?.value).toEqual(
      'assignments/1?anonymous_asset_id=anonymous1'
    )
    expect(secondLink.attributes.getNamedItem('href')?.value).toEqual(
      'assignments/1?anonymous_asset_id=anonymous2'
    )
  })

  it('renders the StudentViewPeerReviews component with non anonymous peer reviewers', () => {
    const defaultProps: StudentViewPeerReviewsProps = {
      assignment: {
        id: '1',
        anonymous_peer_reviews: false,
        assessment_requests: [
          {
            anonymous_id: 'anonymous1',
            user_id: 'user1',
            user_name: 'username1',
            available: true
          },
          {
            anonymous_id: 'anonymous2',
            user_id: 'user2',
            user_name: 'username2',
            available: true
          },
          {
            anonymous_id: 'anonymous3',
            user_id: 'user3',
            user_name: 'username3',
            available: true
          }
        ]
      }
    }

    const {container, queryByText} = render(<StudentViewPeerReviews {...defaultProps} />)
    expect(container.querySelectorAll('li')).toHaveLength(3)
    expect(queryByText('Anonymous Student')).not.toBeInTheDocument()
    expect(queryByText('username1')).toBeInTheDocument()
    expect(queryByText('username2')).toBeInTheDocument()
    expect(queryByText('username3')).toBeInTheDocument()

    const firstLink = container.querySelectorAll('a.item_link')[0]
    const secondLink = container.querySelectorAll('a.item_link')[1]
    const thirdLink = container.querySelectorAll('a.item_link')[2]
    expect(firstLink.attributes.getNamedItem('href')?.value).toEqual(
      'assignments/1?reviewee_id=user1'
    )
    expect(secondLink.attributes.getNamedItem('href')?.value).toEqual(
      'assignments/1?reviewee_id=user2'
    )
    expect(thirdLink.attributes.getNamedItem('href')?.value).toEqual(
      'assignments/1?reviewee_id=user3'
    )
  })

  it('renders the StudentViewPeerReviews with mix of unavailable reviews', () => {
    const defaultProps: StudentViewPeerReviewsProps = {
      assignment: {
        id: '1',
        anonymous_peer_reviews: false,
        assessment_requests: [
          {
            anonymous_id: 'anonymous1',
            user_id: 'user1',
            user_name: 'username1',
            available: true
          },
          {
            anonymous_id: 'anonymous2',
            user_id: 'user2',
            user_name: 'username2',
            available: false
          }
        ]
      }
    }
    const {container, queryByText} = render(<StudentViewPeerReviews {...defaultProps} />)
    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(queryByText('Anonymous Student')).not.toBeInTheDocument()
    expect(queryByText('username1')).toBeInTheDocument()
    expect(queryByText('Not Available')).toBeInTheDocument()

    const firstLink = container.querySelectorAll('a.item_link')[0]
    const secondLink = container.querySelectorAll('a.item_link')[1]
    expect(firstLink.attributes.getNamedItem('href')?.value).toEqual(
      'assignments/1?reviewee_id=user1'
    )
    expect(secondLink.attributes.getNamedItem('href')?.value).toEqual(
      'assignments/1?reviewee_id=user2'
    )
  })
})
