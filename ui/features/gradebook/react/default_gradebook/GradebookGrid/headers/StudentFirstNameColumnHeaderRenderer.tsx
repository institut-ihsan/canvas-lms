/*
 * Copyright (C) 2021 - present Instructure, Inc.
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
import ReactDOM from 'react-dom'
import StudentFirstNameColumnHeader from './StudentFirstNameColumnHeader'
import type Gradebook from '../../Gradebook'
import type GridSupport from '../GridSupport'

function getProps(gradebook: Gradebook, options) {
  const columnId = 'student_firstname'

  return {
    ref: options.ref,
    addGradebookElement: gradebook.keyboardNav?.addGradebookElement,
    disabled: !gradebook.contentLoadStates.studentsLoaded,
    removeGradebookElement: gradebook.keyboardNav?.removeGradebookElement,
    onHeaderKeyDown: event => {
      gradebook.handleHeaderKeyDown(event, columnId)
    }
  }
}

export default class StudentFirstNameColumnHeaderRenderer {
  gradebook: Gradebook

  constructor(gradebook: Gradebook) {
    this.gradebook = gradebook
  }

  render(_column, $container: HTMLElement, _gridSupport: GridSupport, options) {
    const props = getProps(this.gradebook, options)
    ReactDOM.render(<StudentFirstNameColumnHeader {...props} />, $container)
  }

  destroy(_column, $container: HTMLElement, _gridSupport: GridSupport) {
    ReactDOM.unmountComponentAtNode($container)
  }
}
