const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user"); // Adjust path as needed
const Chat = require("./models/chat"); // Adjust path as needed
const ConnectionRequest = require("./models/connectionRequest"); // Adjust path as needed
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Common password for all users
const COMMON_PASSWORD = "TestPass123!";

// Sample data arrays
const firstNames = [
  "Alex",
  "Sarah",
  "Mike",
  "Emma",
  "David",
  "Lisa",
  "John",
  "Anna",
  "Chris",
  "Kate",
  "Ryan",
  "Sofia",
  "James",
  "Miami",
  "Daniel",
  "Olivia",
  "Matt",
  "Grace",
  "Luke",
  "Chloe",
  "Noah",
  "Zoey",
  "Ethan",
  "Lily",
  "Owen",
  "Ella",
  "Liam",
  "Norisa",
  "Mason",
  "Sophia",
  "Jacob",
  "Isabella",
  "William",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Elijah",
  "Harper",
  "Lucas",
  "Evelyn",
  "Henry",
  "Abigail",
  "Alexander",
  "Emily",
  "Sebastian",
  "Madison",
  "Samuel",
  "Scarlett",
  "Gabriel",
  "Victoria",
  "Carter",
  "Aria",
  "Julian",
  "Luna",
  "Wyatt",
  "Layla",
  "leonel",
  "Penelope",
  "Jayden",
  "Riley",
  "Nathan",
  "Nora",
  "Caleb",
  "Ellie",
  "Hunter",
  "Hazel",
  "Connor",
  "Violet",
  "Eliyah",
  "Aurora",
  "Adrian",
  "Savannah",
  "Colton",
  "Audrey",
  "Jordan",
  "Brooklyn",
  "Brayden",
  "Bella",
  "Nicholas",
  "Claire",
  "Aaron",
  "Skylar",
  "Cameron",
  "Lucy",
  "Evan",
  "Paisley",
  "Jack",
  "Everly",
  "Kevin",
  "Caroline",
  "Tyler",
  "Nova",
  "Jose",
  "Genesis",
  "Parker",
  "Emilia",
  "Adam",
  "Kennedy",
  "Jace",
  "Samantha",
  "Brandon",
  "Maya",
  "Hudson",
  "Willow",
  "Nathaniel",
  "Kinsley",
  "Easton",
  "Naomi",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Gomez",
  "Phillips",
  "Evans",
  "Turner",
  "Diaz",
  "Parker",
  "Cruz",
  "Edwards",
  "Collins",
  "Reyes",
  "Stewart",
  "Morris",
  "Morales",
  "Murphy",
  "Cook",
  "Rogers",
  "Gutierrez",
  "Ortiz",
  "Morgan",
  "Cooper",
  "Peterson",
  "Bailey",
  "Reed",
  "Kelly",
  "Howard",
  "Ramos",
  "Kim",
  "Cox",
  "Ward",
  "Richardson",
  "Watson",
  "Brooks",
  "Chavez",
  "Wood",
  "James",
  "Bennett",
  "Gray",
  "Mendoza",
  "Ruiz",
  "Hughes",
  "Price",
  "Alvarez",
  "Castillo",
  "Sanders",
  "Patel",
  "Myers",
  "Long",
  "Ross",
  "Foster",
  "Jimenez",
];

const skills = [
  "JavaScript",
  "Python",
  "Java",
  "React",
  "Node.js",
  "MongoDB",
  "SQL",
  "HTML",
  "CSS",
  "TypeScript",
  "Angular",
  "Vue.js",
  "Express.js",
  "Django",
  "Spring Boot",
  "Docker",
  "AWS",
  "Azure",
  "Git",
  "Machine Learning",
  "Data Science",
  "UI/UX Design",
  "Project Management",
  "Agile",
  "Scrum",
  "DevOps",
  "Kubernetes",
  "GraphQL",
  "REST APIs",
  "Testing",
  "Photography",
  "Writing",
  "Marketing",
  "Sales",
  "Finance",
  "Accounting",
  "HR",
  "Operations",
  "Strategy",
  "Analytics",
  "Leadership",
];

const aboutTexts = [
  "Passionate developer with a love for clean code and innovative solutions.",
  "Creative professional who enjoys building meaningful connections.",
  "Tech enthusiast always eager to learn new technologies.",
  "Problem solver with a knack for finding elegant solutions.",
  "Collaborative team player who thrives in dynamic environments.",
  "Innovation-driven developer focused on user experience.",
  "Experienced professional with a passion for continuous learning.",
  "Detail-oriented developer who values quality and efficiency.",
  "Creative thinker with strong analytical skills.",
  "Results-oriented professional with excellent communication skills.",
  "Adaptable developer who embraces new challenges.",
  "User-focused designer with technical expertise.",
  "Strategic thinker with hands-on development experience.",
  "Quality-driven professional with a passion for excellence.",
  "Innovative problem solver with diverse skill set.",
  "Hey there! I am using Echo.",
  "Building the future, one line of code at a time.",
  "Connecting ideas with technology.",
  "Always learning, always growing.",
  "Turning coffee into code since 2020.",
];

const chatMessages = [
  "Hey! How are you doing?",
  "Good to connect with you!",
  "Thanks for accepting my connection request.",
  "Would love to collaborate on a project sometime.",
  "Your profile looks impressive!",
  "I noticed we have similar interests.",
  "Are you working on anything interesting lately?",
  "Hope you're having a great day!",
  "Let's catch up soon!",
  "Nice to meet you!",
  "I saw your recent post, very insightful.",
  "Would you be interested in a quick chat?",
  "Your experience in this field is amazing.",
  "Looking forward to working together.",
  "Thanks for the connection!",
  "Great to have you in my network.",
  "I'd love to learn more about your work.",
  "Your skills complement mine perfectly.",
  "Excited about future collaborations.",
  "Welcome to the platform!",
];

// Helper function to get random element from array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random elements from array
function getRandomElements(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to generate random age
function getRandomAge() {
  return Math.floor(Math.random() * (65 - 18 + 1)) + 18;
}

// Helper function to generate random gender
function getRandomGender() {
  const genders = ["male", "female", "others"];
  return getRandomElement(genders);
}

// Helper function to generate random status
function getRandomStatus() {
  const statuses = ["online", "offline"];
  return getRandomElement(statuses);
}

// Function to generate users
async function generateUsers() {
  const users = [];
  const hashedPassword = await bcrypt.hash(COMMON_PASSWORD, 10);
  const usedFirstNames = new Set();

  for (let i = 0; i < 100; i++) {
    let firstName;

    // Ensure unique firstName
    if (i < firstNames.length) {
      firstName = firstNames[i];
    } else {
      // Generate unique firstName with numbers for users beyond the firstNames array
      const baseFirstName = getRandomElement(firstNames);
      firstName = `${baseFirstName}${i}`;
    }

    // Double-check uniqueness
    while (usedFirstNames.has(firstName)) {
      firstName = `${getRandomElement(firstNames)}${Math.floor(
        Math.random() * 1000
      )}`;
    }

    usedFirstNames.add(firstName);

    const lastName = getRandomElement(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const gender = getRandomGender();

    const user = {
      firstName,
      lastName,
      emailId: email,
      password: hashedPassword,
      age: getRandomAge(),
      gender,
      about: getRandomElement(aboutTexts),
      skills: getRandomElements(skills, Math.floor(Math.random() * 8) + 1),
      status: getRandomStatus(),
    };

    users.push(user);
  }

  return users;
}

// Function to generate chats
async function generateChats(users) {
  const chats = [];
  const userIds = users.map((user) => user._id);

  // Generate 25-30 chats with 3-4 messages each
  const numberOfChats = Math.floor(Math.random() * 6) + 25; // 25-30 chats

  for (let i = 0; i < numberOfChats; i++) {
    // Select 2 random users for this chat
    const shuffledUsers = [...userIds].sort(() => 0.5 - Math.random());
    const participants = shuffledUsers.slice(0, 2);

    // Generate 3-4 messages for this chat
    const messageCount = Math.floor(Math.random() * 2) + 3; // 3-4 messages
    const messages = [];

    for (let j = 0; j < messageCount; j++) {
      const senderId = participants[j % 2]; // Alternate between participants
      const message = {
        senderId,
        text: getRandomElement(chatMessages),
        createdAt: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ), // Random time in last 7 days
        updatedAt: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ),
      };
      messages.push(message);
    }

    // Sort messages by creation time
    messages.sort((a, b) => a.createdAt - b.createdAt);

    const chat = {
      participants,
      messages,
      createdAt: messages[0].createdAt,
      updatedAt: messages[messages.length - 1].createdAt,
    };

    chats.push(chat);
  }

  return chats;
}

// Function to generate connection requests
async function generateConnectionRequests(users) {
  const connectionRequests = [];
  const userIds = users.map((user) => user._id);
  const statuses = ["ignored", "interested", "accepted", "rejected"];

  // Generate 40-50 connection requests
  const numberOfRequests = Math.floor(Math.random() * 11) + 40; // 40-50 requests

  for (let i = 0; i < numberOfRequests; i++) {
    const shuffledUsers = [...userIds].sort(() => 0.5 - Math.random());
    const fromUserId = shuffledUsers[0];
    const toUserId = shuffledUsers[1];

    const connectionRequest = {
      fromUserId,
      toUserId,
      status: getRandomElement(statuses),
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ), // Random time in last 30 days
      updatedAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ),
    };

    connectionRequests.push(connectionRequest);
  }

  return connectionRequests;
}

// Main seeding function
async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Chat.deleteMany({});
    await ConnectionRequest.deleteMany({});
    console.log("Cleared existing data");

    // Generate and insert users
    console.log("Generating users...");
    const userData = await generateUsers();
    const users = await User.insertMany(userData);
    console.log(`Created ${users.length} users`);

    // Generate and insert chats
    console.log("Generating chats...");
    const chatData = await generateChats(users);
    const chats = await Chat.insertMany(chatData);
    console.log(`Created ${chats.length} chats`);

    // Generate and insert connection requests
    console.log("Generating connection requests...");
    const connectionRequestData = await generateConnectionRequests(users);
    const connectionRequests = await ConnectionRequest.insertMany(
      connectionRequestData
    );
    console.log(`Created ${connectionRequests.length} connection requests`);

    console.log("Database seeding completed successfully!");
    console.log(`\nSummary:`);
    console.log(`- Users: ${users.length}`);
    console.log(`- Chats: ${chats.length}`);
    console.log(`- Connection Requests: ${connectionRequests.length}`);
    console.log(`- Common Password: ${COMMON_PASSWORD}`);

    // Display some sample user credentials
    console.log(`\nSample user credentials:`);
    for (let i = 0; i < 5; i++) {
      console.log(`- Email: ${users[i].emailId}, Password: ${COMMON_PASSWORD}`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding function
seedDatabase();

// Export for use in other files
module.exports = {
  seedDatabase,
  COMMON_PASSWORD,
};
