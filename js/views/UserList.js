import Backbone from 'backbone'

import UserSummaryView from 'views/UserSummary'
import template from 'templates/UserList.hbs'





export default class UserList extends Backbone.Marionette.CompositeView {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (options) {
    options = _.extend(options || {}, {
      template: template
    })

    super(options)
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get childView () {
    return UserSummaryView
  }

  get childViewContainer () {
    return '.user-list'
  }

  get tagName () {
    return 'main'
  }
}
