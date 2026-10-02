interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    userId: number;
    title: string;
}

const users: User[] = [
    { id: 1, name: "Ayten", email: "ayten@example.com" },
    { id: 2, name: "Rahul", email: "rahul@example.com" },
    { id: 3, name: "Sara", email: "sara@example.com" }
];

const posts: Post[] = [
    { id: 101, userId: 1, title: "TypeScript Basics" },
    { id: 102, userId: 1, title: "Async Programming" },
    { id: 103, userId: 2, title: "Cyber Security" },
    { id: 104, userId: 3, title: "Web Development" }
];

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUsers(): Promise<User[]> {
    console.log("Fetching users...");
    await delay(1000);
    return users;
}

async function getPosts(): Promise<Post[]> {
    console.log("Fetching posts...");
    await delay(800);
    return posts;
}

async function findUser(id: number): Promise<User | undefined> {
    const data = await getUsers();
    return data.find(user => user.id === id);
}

async function findPostsByUser(userId: number): Promise<Post[]> {
    const data = await getPosts();
    return data.filter(post => post.userId === userId);
}

async function getUserProfile(id: number): Promise<void> {
    try {
        const user = await findUser(id);

        if (!user) {
            console.log("User not found");
            return;
        }

        const userPosts = await findPostsByUser(user.id);

        console.log("\nUser Profile");
        console.log("------------");
        console.log(`ID: ${user.id}`);
        console.log(`Name: ${user.name}`);
        console.log(`Email: ${user.email}`);
        console.log(`Posts: ${userPosts.length}`);

        for (const post of userPosts) {
            console.log(`- ${post.title}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function getAllData(): Promise<void> {
    try {
        console.log("\nLoading all data...");
        const [userData, postData] = await Promise.all([
            getUsers(),
            getPosts()
        ]);

        console.log(`\nTotal users: ${userData.length}`);
        console.log(`Total posts: ${postData.length}`);

        for (const user of userData) {
            const count = postData.filter(
                post => post.userId === user.id
            ).length;

            console.log(`${user.name} has ${count} post(s).`);
        }
    } catch (error) {
        console.error("Failed to load data:", error);
    }
}

async function main(): Promise<void> {
    console.log("Starting async TypeScript program...");

    await getUserProfile(1);

    await getAllData();

    console.log("\nProgram completed.");
}

main().catch(error => {
    console.error("Unexpected error:", error);
});
