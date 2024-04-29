<template>
  <div class="friends-container">
    <div class="friends-card" v-for="friend in friends" :key="friend.id">
      <img
        class="friends-picture"
        :src="friend.picture"
        :alt="`Profile picture of ${friend.username}`"
      />
      <div class="friends-info">
        <h2 class="username">{{ friend.username }}</h2>
        <div class="additional-details">
          <p class="additional-text">{{ friend.detail1 }}</p>
          <p class="additional-text">{{ friend.detail2 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        {
          id: 1,
          poster: "https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg",
          title: "Diuna",
          username: "JohnDoe123",
          detail1: "This is a longer text to test whether it wraps properly and allows scrolling if it overflows.",
          detail2: "Another longer piece of text to see if it requires scrolling to stay within the container.",
        },
        {
          id: 2,
          poster: "https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg",
          title: "Diuna",
          username: "JaneDoe456",
          detail1: "Some shorter text.",
          detail2: "Another short piece of text.",
        },
        {
          id: 3,
          poster: "https://static.posters.cz/image/1300/plakaty/diuna-czesc-1-i122815.jpg",
          title: "Diuna",
          username: "AliceDoe789",
          detail1: "A variety of text lengths to test scrolling andfafasffasf wrafasfafasfafspping behavior.",
          detail2: "Another text to check how well it works with gsdgdgsgsdgdgsdgsdg content.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.friends-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
  padding: 10px;
}

.friends-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 4px 13px 3px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  padding: 15px;
  width: 180px;
  height: 250px;
}

.friends-picture {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
}

.friends-info {
  text-align: center;
  margin-top: 10px;
}

.username {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.additional-details {
  text-align: left;
  overflow: auto;
  white-space: normal;
  max-height: 100px;
  -webkit-overflow-scrolling: touch;
}

.additional-text {
  font-size: 14px; 
  color: #555;
  margin: 0;
}
</style>