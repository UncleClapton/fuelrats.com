import moment from 'moment'





import BaseModel from 'models/Base'





export default class Comment extends BaseModel {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _decrappify (string) {
    // Remove inline styles
    string = string.replace(/(align=".*")?/gi, '')
    string = string.replace(/(style=".*")?/gi, '')

    // Language attributes shouldn't be set on elements
    string = string.replace(/(lang=".*")?/gi, '')

    return string
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  parse (response) {
    if (!response.parsed) {
      // Convert dates to moment objects
      response.date = moment(response.date_gmt)

      // Simplify the author details
      response.author = {
        avatar: response.author_avatar_urls['96'],
        name: response.author_name,
        url: response.author_url
      }

      // Remove Wordpress crap that could mess us up
      response.content = this._decrappify(response.content.rendered)

      // Clean up unnecessary attributes
      delete response._links
      delete response.date_gmt
      delete response.link

      // Mark the blog as parsed so it doesn't get parsed again
      response.parsed = true
    }

    return response
  }
}
