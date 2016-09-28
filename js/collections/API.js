import Backbone from 'backbone'

import BaseModel from 'models/Base'
import RatsCollection from 'collections/Rats'





export default class API extends Backbone.PageableCollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.data.listenTo(this, 'sync', this._updateData.bind(this))
  }

  _updateData () {
    this.data.set({
      hasMultiplePages: this.hasNextPage() || this.hasPreviousPage(),
      nextPage: this.hasNextPage() ? this.state.currentPage + 1 : false,
      previousPage: this.hasPreviousPage() ? this.state.currentPage - 1 : false
    })
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  initialize () {
    this._bindEvents()
  }

  parseState (response, queryParams, state, options) {
    let totalRecords = response.meta.total

    return {
      totalRecords: totalRecords
    }
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get data () {
    return this._data || (this._data = new BaseModel)
  }

  get queryParams () {
    return this._queryParams || (this._queryParams = {
      currentPage: 'offset',
      pageSize: 'limit',
      totalPages: '',
      totalRecords: ''
    })
  }

  get state () {
    return this._state || (this._state = {
      firstPage: 0,
      pageSize: 100
    })
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set queryParams (value) {
    this._queryParams = value
  }

  set state (value) {
    this._state = value
  }
}
