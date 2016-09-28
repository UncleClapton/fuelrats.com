import BaseModel from 'models/Base'
import User from 'models/User'
import APICollection from 'collections/API'
import RatsCollection from 'collections/Rats'





export default class Users extends APICollection {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    this.data.listenTo(this, 'sync', this._updateData.bind(this))
  }

  _updateData () {
    this.data.set({
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

  parseRecords (response) {
    let allRats = Backbone.Radio.channel('application').request('rats')

    response.data.forEach(user => {
      let userRats = user.CMDRs

      user.CMDRs = new RatsCollection

      userRats.forEach(id => {
        let idHash = {
          id: id
        }

        let ratModel = allRats.findWhere(idHash)

        if (!ratModel) {
          ratModel = allRats.add(idHash)
        }

        user.CMDRs.add(ratModel)
      })
    })

    allRats.fetch({
      bulk: true
    })

    return response.data
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

  get comparator () {
    return 'email'
  }

  get data () {
    return this._data || (this._data = new BaseModel)
  }

  get model () {
    return User
  }

  get queryParams () {
    return this._queryParams || (this._queryParams = {
      currentPage: 'offset',
      pageSize: 'limit'
    })
  }

  get state () {
    return this._state || (this._state = {
      currentPage: 1,
      firstPage: 1,
      pageSize: 100
    })
  }

  get url () {
    return '/api/users'
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
