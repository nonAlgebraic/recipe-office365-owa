'use strict';

module.exports = Franz => {
  const getMessages = function getMessages() {
    let unreadMail = 0;
    console.log('foo');
    if (location.pathname.match(/\/owa/)) {
      // classic app
      unreadMail = parseInt(
        jQuery("span[title*='Inbox'] + div > span")
          .first()
          .text(),
        10
      );
    } else {
      // new app
      const folders = document.querySelector('div[title="Folders"]');
      debugger;
      if (!folders) {
        return;
      }

      unreadMail = [...folders.parentNode.parentNode.children].reduce(
        (count, child) => {
          const unread = child.querySelector('.screenReaderOnly');
          return unread && unread.textContent === 'unread'
            ? count + parseInt(unread.previousSibling.textContent, 10)
            : count;
        },
        0
      );
    }

    Franz.setBadge(unreadMail);
  };
  Franz.loop(getMessages);
};
