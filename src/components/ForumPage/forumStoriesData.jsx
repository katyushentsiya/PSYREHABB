// components/ForumPage/forumStoriesData.js
const forumStoriesData = [
  { id: 1, author: { name: 'Марія', email: 'maria@gmail.com', photo: '/user2.png' }, text: '...', topic: 'Підтримка', comments: 8 },
  { id: 2, author: { name: 'Олена', email: 'olena@gmail.com', photo: '/user1.png' }, title: 'Треба придумать', text: '...', topic: 'Травма', comments: 3 },
  { id: 3, author: { name: 'Петро', email: 'petro@gmail.com', photo: '/user3.png' }, text: '...', topic: 'Відновлення', comments: 2 },
  { id: 4, author: { name: 'Руслан', email: 'ruslan@gmail.com', photo: '/user4.png' }, title: 'Треба придумать', text: '...', topic: 'Адаптація', comments: 5 },
  { id: 5, author: { name: 'Віктор', email: 'victor@gmail.com', photo: '/user5.png' }, text: '...', topic: 'Стрес', comments: 1 },
  { // Особиста історія Tarabakina
    id: 'personal',
    author: { name: 'Tarabakina', email: 'tarabyta@gmail.com', photo: '/userProfileImage.jpg' },
    title: 'Особиста історія',
    text: 'Треба придумать...',
    topic: 'Особисті',
    likes: 5,
    comments: 1,
  },
];

export default forumStoriesData;