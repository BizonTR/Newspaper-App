import { Template } from 'meteor/templating'
import { currentPage, currentTag, totalPages, pageRange, updatePageRange, handleFetchResult, getCountry, loading } from '../../main.js'

Template.newsPagination.events({
  'click button.page-button': function (event) {
    const page = parseInt(event.target.dataset.page) - 1
    const tag = currentTag.get()
    currentPage.set(page)
    loading.set(true) // Veriler yüklenene kadar loading'i true olarak ayarla

    if (getCountry() === '' || getCountry() === null) {
      Meteor.call('news.fetchGeneral', 'tr', tag, page, handleFetchResult)
    } else {
      Meteor.call('news.fetchGeneral', getCountry(), tag, page, handleFetchResult)
    }

    updatePageRange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  'click button.prev': function () {
    let page = currentPage.get()

    if (page > 0) {
      page -= 1
      currentPage.set(page)
      const tag = currentTag.get()
      loading.set(true) // Veriler yüklenene kadar loading'i true olarak ayarla

      if (getCountry() === '' || getCountry() === null) {
        Meteor.call('news.fetchGeneral', 'tr', tag, page, handleFetchResult)
      } else {
        Meteor.call('news.fetchGeneral', getCountry(), tag, page, handleFetchResult)
      }

      updatePageRange(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  'click button.next': function () {
    let page = currentPage.get()
    if (page < totalPages.get() - 1) {
      page += 1
      currentPage.set(page)
      const tag = currentTag.get()
      loading.set(true) // Veriler yüklenene kadar loading'i true olarak ayarla
      if (getCountry() === '' || getCountry() === null) {
        Meteor.call('news.fetchGeneral', 'tr', tag, page, handleFetchResult)
      } else {
        Meteor.call('news.fetchGeneral', getCountry(), tag, page, handleFetchResult)
      }
      updatePageRange(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
})

Template.newsPagination.helpers({
  pages: function () {
    return pageRange.get()
  },
  isActive: function (page) {
    return currentPage.get() === page - 1 ? 'active' : ''
  },
})
