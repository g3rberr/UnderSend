// Messages page functionality
document.addEventListener("DOMContentLoaded", () => {
  const chatListContainer = document.getElementById("chat-list-container");
  const chatMessagesContainer = document.getElementById("chat-messages-container");
  const messageInput = document.getElementById("message-input");
  const sendMessageButton = document.getElementById("send-message");
  const chatListView = document.getElementById("chat-list-view");
  const chatWindowView = document.getElementById("chat-window-view");
  const backToChatsButton = document.getElementById("back-to-chats");
  const chatUserAvatar = document.getElementById("chat-user-avatar");
  const chatUserName = document.getElementById("chat-user-name");
  
  // Если необходимые элементы не существуют на странице, прекращаем выполнение скрипта
  if (!chatListContainer || !chatMessagesContainer) {
    return; // Выходим из функции, если элементы не найдены
  }

  let activeChat = null; // Start with no active chat

  // Mock chat data (replace with API calls later)
  const chats = window.chats || [
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

  // Render chat list
  function renderChatList() {
    chatListContainer.innerHTML = "";

    chats.forEach((chat) => {
      const chatItem = document.createElement("div");
      chatItem.className = `chat-item ${activeChat && chat.id === activeChat.id ? "active" : ""}`;
      chatItem.dataset.chatId = chat.id;

      chatItem.innerHTML = `
        <div class="chat-item-avatar">
          <img src="${chat.avatar}" alt="${chat.username}" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'">
          ${chat.unread ? '<div class="chat-item-unread"></div>' : ""}
        </div>
        <div class="chat-item-info">
          <div class="chat-item-header">
            <span class="chat-item-username">${chat.username}</span>
            <span class="chat-item-time">${chat.time}</span>
          </div>
          <div class="chat-item-message">${chat.lastMessage}</div>
        </div>
      `;

      chatListContainer.appendChild(chatItem);
    });
  }

  // Render chat messages
  function renderChatMessages() {
    chatMessagesContainer.innerHTML = "";

    if (!activeChat) {
      chatMessagesContainer.innerHTML = `
        <div class="no-chat-selected">
          <i class="fas fa-comment-dots"></i>
          <p>Select a chat to start messaging</p>
        </div>
      `;
      return;
    }

    activeChat.messages.forEach((message) => {
      const messageElement = document.createElement("div");
      messageElement.className = `message ${message.isOwn ? "message-own" : "message-other"}`;

      messageElement.innerHTML = `
        <div class="message-content">${message.content}</div>
        <div class="message-time">${message.timestamp}</div>
      `;

      chatMessagesContainer.appendChild(messageElement);
    });

    // Scroll to bottom of messages
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  // Update chat window header
  function updateChatHeader() {
    if (!chatUserAvatar || !chatUserName) return;
    
    if (activeChat) {
      chatUserAvatar.src = activeChat.avatar;
      chatUserName.textContent = activeChat.username;
      
      // Handle image error
      chatUserAvatar.onerror = function() {
        this.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
      };
    } else {
      chatUserAvatar.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
      chatUserName.textContent = "Select a chat";
    }
  }

  // Show chat window (for mobile)
  function showChatWindow() {
    if (!chatListView || !chatWindowView) return;
    
    chatListView.style.display = "none";
    chatWindowView.classList.add("active");
  }

  // Show chat list (for mobile)
  function showChatList() {
    if (!chatListView || !chatWindowView) return;
    
    chatListView.style.display = "block";
    chatWindowView.classList.remove("active");
  }

  // Initialize chat
  renderChatList();
  renderChatMessages();
  updateChatHeader();

  // Check if we're on mobile
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Add event listener for chat list items
  chatListContainer.addEventListener("click", (event) => {
    const chatItem = event.target.closest(".chat-item");
    if (!chatItem) return;

    const chatId = Number(chatItem.dataset.chatId);
    const chat = chats.find((c) => c.id === chatId);

    if (chat) {
      activeChat = chat;
      chat.unread = false; // Mark as read
      renderChatList();
      renderChatMessages();
      updateChatHeader();

      // On mobile, show the chat window
      if (isMobile()) {
        showChatWindow();
      }
    }
  });

  // Back to chats button (mobile only)
  if (backToChatsButton) {
    backToChatsButton.addEventListener("click", () => {
      showChatList();
    });
  }

  // Add event listener for send message button
  if (sendMessageButton && messageInput) {
    sendMessageButton.addEventListener("click", sendMessage);

    // Add event listener for enter key in message input
    messageInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Send message function
  function sendMessage() {
    if (!messageInput) return;
    
    const messageText = messageInput.value.trim();
    if (!messageText || !activeChat) return;

    // Create new message
    const newMessage = {
      id: activeChat.messages.length + 1,
      sender: "me",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    };

    // Add message to active chat
    activeChat.messages.push(newMessage);
    activeChat.lastMessage = messageText;
    activeChat.time = "now";

    // Clear input
    messageInput.value = "";

    // Update UI
    renderChatList();
    renderChatMessages();
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      // Reset display properties on desktop
      if (chatListView) chatListView.style.display = "block";
      if (chatWindowView) chatWindowView.classList.add("active");
    } else if (!activeChat) {
      // On mobile with no active chat, show chat list
      showChatList();
    }
  });

  // Initial check for mobile
  if (isMobile()) {
    showChatList();
  }
});
