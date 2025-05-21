// Sample data for the application
window.users = [
  {
    username: "john_doe",
    name: "John Doe",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    bio: "Photography enthusiast and traveler",
    website: "https://johndoe.com",
    email: "john@example.com",
    phone: "+1 234 567 890",
    gender: "Male",
    posts: 24,
    followers: 1240,
    following: 420,
    isCurrentUser: true
  },
  {
    username: "jane_doe",
    name: "Jane Doe",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    bio: "Digital artist and designer",
    website: "https://janedoe.com",
    posts: 15,
    followers: 850,
    following: 310,
    isCurrentUser: false
  }
];

// Sample posts data
window.posts = [
  {
    id: 1,
    username: "john_doe",
    userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    location: "New York",
    image: "https://placehold.co/400",
    likes: 150,
    isLiked: false,
    isSaved: false,
    caption: "Enjoying the city views!",
    comments: [
      { username: "jane_doe", text: "Awesome shot!" },
      { username: "peter_pan", text: "I love New York!" },
    ],
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    username: "jane_doe",
    userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    location: "Paris",
    image: "https://placehold.co/400",
    likes: 200,
    isLiked: true,
    isSaved: true,
    caption: "Bonjour from Paris!",
    comments: [{ username: "john_doe", text: "Beautiful!" }],
    timestamp: "1 day ago",
  },
  {
    id: 3,
    username: "john_doe",
    userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    location: "Tokyo",
    image: "https://placehold.co/400",
    likes: 300,
    isLiked: false,
    isSaved: true,
    caption: "Amazing architecture in Tokyo!",
    comments: [],
    timestamp: "3 days ago",
  }
];

// Sample explore posts
window.explorePosts = [
  { image: "https://placehold.co/400", username: "user1", likes: 150 },
  { image: "https://placehold.co/400", username: "user2", likes: 200 },
  { image: "https://placehold.co/400", username: "user3", likes: 100 },
  { image: "https://placehold.co/400", username: "user4", likes: 250 },
  { image: "https://placehold.co/400", username: "user5", likes: 180 },
  { image: "https://placehold.co/400", username: "user6", likes: 320 },
  { image: "https://placehold.co/400", username: "user7", likes: 90 },
  { image: "https://placehold.co/400", username: "user8", likes: 400 },
  { image: "https://placehold.co/400", username: "user9", likes: 270 },
];

// Sample chats
window.chats = [
  {
    id: 1,
    username: "John Doe",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    lastMessage: "Hey, how's it going?",
    time: "10:30 AM",
    unread: true,
    messages: [
      { id: 1, sender: "other", content: "Hey!", timestamp: "10:29 AM" },
      { id: 2, sender: "me", content: "How are you?", timestamp: "10:30 AM", isOwn: true },
    ],
  },
  {
    id: 2,
    username: "Jane Smith",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    lastMessage: "See you tomorrow!",
    time: "Yesterday",
    unread: false,
    messages: [
      { id: 1, sender: "other", content: "Okay, sounds good!", timestamp: "Yesterday" },
      { id: 2, sender: "me", content: "See you tomorrow!", timestamp: "Yesterday", isOwn: true },
    ],
  },
];

// Sample liked posts
window.likedPosts = [
  {
    id: 1,
    username: "jane_doe",
    userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    image: "https://placehold.co/400",
    likes: 200,
    caption: "Beautiful sunset at the beach!",
    timestamp: "2 days ago",
  },
  {
    id: 2,
    username: "john_doe",
    userImage: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    image: "https://placehold.co/400",
    likes: 150,
    caption: "Mountain hiking adventure!",
    timestamp: "1 week ago",
  },
];
