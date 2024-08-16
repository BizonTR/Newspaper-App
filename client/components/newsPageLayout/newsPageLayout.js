import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

Template.newsPageLayout.onCreated(function () {
    const savedNews = localStorage.getItem('selectedNews');
    if (savedNews) {
        Session.set('selectedNews', JSON.parse(savedNews));
    }
});

Template.newsPageLayout.onRendered(function () {
    // Resimlerin yüklenmesi sırasında hata oluşursa placeholder resmine yönlendir
    this.$('img').on('error', function () {
        $(this).attr('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnXQ6G25zyfOkV-l07fuhWCPQnz6CviD9B4A&s');
    });
});

Template.newsPageLayout.helpers({
    selectedNews() {
        return Session.get('selectedNews');
    },
    imageWithFallback() {
        const news = Session.get('selectedNews');
        const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnXQ6G25zyfOkV-l07fuhWCPQnz6CviD9B4A&s';
        return news && news.image && news.image !== '' ? news.image : placeholder;
    }
});