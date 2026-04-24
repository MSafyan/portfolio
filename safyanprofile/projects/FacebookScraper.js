We created a scraper using headless where we get thousands of user points from many groups and its runs automatically in from user broswer.
no manual process needed.

const { chromium } = require("playwright");
const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

async function setupBrowser() {
  const userDataDir = path.join(__dirname, "user_data");
  await fs.mkdir(userDataDir, { recursive: true });

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    slowMo: 50,
  });

  const page = await context.newPage();
  console.log("Browser context launched and new page created");
  return { context, page };
}

async function performFacebookLogin(page) {
  await page.goto("https://www.facebook.com");
  console.log("Navigated to Facebook");

  const isLoggedIn = await page.evaluate(() => {
    return document.cookie.includes("c_user");
  });

  if (isLoggedIn) {
    console.log("Already logged in to Facebook");
    return;
  }

  await page.waitForSelector("#email");
  await page.fill("#email", process.env.FB_EMAIL);
  await page.fill("#pass", process.env.FB_PASSWORD);
  await page.click('button[name="login"]');
  console.log("Login form submitted");

  // Wait for either 2FA page or successful login
  const result = await Promise.race([
    page
      .waitForURL("**/two_step_verification/*", { timeout: 60000 })
      .then(() => ({ type: "2FA" })),
    page
      .waitForSelector('[aria-label="Facebook"]', { timeout: 60000 })
      .then(() => ({ type: "success" })),
  ]).catch(() => ({ type: "timeout" }));

  if (result.type === "2FA") {
    console.log("Device-based 2FA detected. Waiting for approval...");
    await handleDeviceBased2FA(page);
  } else if (result.type === "success") {
    console.log("Login successful without 2FA");
  } else {
    throw new Error("Login unsuccessful or timeout occurred");
  }

  // Final check to ensure we're logged in
  await page
    .waitForSelector('[aria-label="Facebook"]', { timeout: 30000 })
    .then(() => console.log("Successfully logged in"))
    .catch(() => {
      throw new Error(
        "Login unsuccessful. Please check the browser for any issues."
      );
    });
}

async function handleDeviceBased2FA(page) {
  console.log("Please approve the login on your other device.");
  console.log("Waiting for 2FA approval...");

  // Wait for navigation to either Facebook home or another verification step
  await Promise.race([
    page.waitForNavigation({ timeout: 300000 }), // 5 minutes timeout
    page.waitForSelector('[aria-label="Facebook"]', { timeout: 300000 }),
  ]);

  console.log("2FA process completed or navigation occurred.");
}

async function checkUserInGroup(page, user, groupId) {
  console.log(`Checking user: ${user.fbuserId}`);

  try {
    // Navigate to the user's page in the group
    await page.goto(
      `https://www.facebook.com/groups/${groupId}/user/${user.fbuserId}`,
      { timeout: 30000, waitUntil: "networkidle" } // Added waitUntil parameter
    );

    // Wait for content to be visible
    await page.waitForSelector('span[dir="auto"]', { timeout: 30000 });

    // Additional wait to ensure points are loaded
    await page
      .waitForFunction(
        () => {
          return Array.from(document.querySelectorAll("*")).some((el) =>
            el.textContent.toLowerCase().includes("points")
          );
        },
        { timeout: 15000 }
      )
      .catch(() => console.log("Points element not found after waiting"));

    // Add a small delay to ensure everything is rendered
    await page.waitForTimeout(2000);

    const userInfo = await page.evaluate(() => {
      const nameElement = document.querySelector('span[dir="auto"]');
      const pointsElement = Array.from(document.querySelectorAll("*")).find(
        (el) => el.textContent.toLowerCase().includes("points")
      );

      let points = null;
      if (pointsElement) {
        const pointsText = pointsElement.textContent;
        const pointsMatch = pointsText.match(/([0-9,]+)\s*points?/i);
        if (pointsMatch) {
          points = parseInt(pointsMatch[1].replace(/,/g, ""), 10);
        }
      }

      return {
        name: nameElement ? nameElement.textContent.trim() : "Unknown",
        points: points,
      };
    });

    console.log(`User ${user.fbuserId}: ${JSON.stringify(userInfo)}`);
    return { ...userInfo, userId: user.userId };
  } catch (error) {
    console.error(`Error checking user ${user.fbuserId}:`, error.message);
    return {
      userId: user.userId,
      name: "Unknown",
      points: null,
      error: error.message,
    };
  }
}

// userIds = [{
//   fbuserId: "603606256",
//   userId: 27,
// }]

async function extractUserDataThreaded(
  context,
  groupId,
  userIds,
  concurrency = 5
) {
  const userData = [];
  // only use 6 userIds;
  // const queue = [...userIds];
  const queue = userIds.slice(0, 3);
  const activeTasks = new Set();

  const processUser = async () => {
    if (queue.length === 0) return;

    const userId = queue.shift();
    const page = await context.newPage();

    try {
      const result = await checkUserInGroup(page, userId, groupId);
      userData.push(result);
    } catch (error) {
      console.error(`Failed to process user ${userId}:`, error);
      userData.push({
        userId,
        name: "Unknown",
        points: null,
        error: error.message,
      });
    } finally {
      await page.close();
      activeTasks.delete(processUser);

      // Start a new task if there are more users in the queue
      if (queue.length > 0) {
        const newTask = processUser();
        activeTasks.add(newTask);
        await newTask;
      }
    }
  };

  // Start initial batch of tasks
  for (let i = 0; i < Math.min(concurrency, userIds.length); i++) {
    const task = processUser();
    activeTasks.add(task);
  }

  // Wait for all tasks to complete
  await Promise.all(activeTasks);

  return userData;
}

let axiosInstance;

async function loginToBackend() {
  try {
    const response = await axios.post(`${process.env.BACKEND_URL}/auth/login`, {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    });

    if (response.data.success) {
      const accessToken = response.data.data.accessToken;
      console.log("Successfully logged in to backend");

      // Create an axios instance with the bearer token
      axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return true;
    } else {
      console.error("Login failed:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error logging in to backend:", error.message);
    return false;
  }
}

async function getFacebookIds() {
  try {
    const response = await axiosInstance.get(
      `${process.env.BACKEND_URL}/users/facebookIds`
    );
    if (response.data.success) {
      console.log("Successfully fetched Facebook IDs");
      return response.data.data; // Assuming this is an array of Facebook IDs
    } else {
      console.error("Failed to fetch Facebook IDs:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching Facebook IDs:", error.message);
    return [];
  }
}

async function aggregateUserData(allGroupsData) {
  const aggregatedData = {};

  allGroupsData.forEach((groupData, index) => {
    var groupId = groupData.groupId;
    if (!groupId) {
      groupId = `group_${index + 1}`; // Create a group identifier if not provided
    }

    groupData.data.forEach((user) => {
      if (!aggregatedData[user.userId]) {
        // Clean up the name by removing the points information
        const cleanName = user.name.replace(/\d+\s*points?/i, "").trim();

        aggregatedData[user.userId] = {
          userId: user.userId,
          name: cleanName,
          totalPoints: 0,
          groupPoints: {},
        };
      }

      if (user.points !== null) {
        aggregatedData[user.userId].totalPoints += user.points;
        aggregatedData[user.userId].groupPoints[groupId] = user.points;
      }

      // Update the name if this group has a non-null points value
      if (user.points !== null) {
        aggregatedData[user.userId].name =
          aggregatedData[user.userId].name ||
          user.name.replace(/\d+\s*points?/i, "").trim();
      }
    });
  });

  return Object.values(aggregatedData);
}

async function saveUserData(userData) {
  try {
    // Prepare data for API
    const apiData = userData.map((user) => ({
      userId: user.userId.toString(),
      points: user.totalPoints,
    }));

    let apiResponse = null;

    // Call bulkFacebookPoints API
    try {
      const response = await axiosInstance.post(
        `${process.env.BACKEND_URL}/engagements/points/bulkFacebookPoints`,
        { data: apiData }
      );

      if (response.data.success) {
        console.log("Successfully updated points in the backend");
        apiResponse = response.data;
      } else {
        console.error("Failed to update points in the backend:", response.data);
        apiResponse = {
          error: response.data.message || "Unknown error occurred",
        };
      }
    } catch (error) {
      console.error("Error calling bulkFacebookPoints API:", error.message);
      apiResponse = { error: error.message };
    }

    // Merge API response with userData
    const updatedUserData = userData.map((user) => {
      const apiResult = apiResponse.data?.find(
        (item) => item.userId.toString() === user.userId.toString()
      );
      return {
        ...user,
        apiResult: apiResult || {
          success: false,
          error: "User not found in API response",
        },
      };
    });

    // Save to text file
    const filename = `userData_${new Date()
      .toISOString()
      .replace(/:/g, "-")}.txt`;
    const filePath = path.join(__dirname, filename);
    await fs.writeFile(filePath, JSON.stringify(updatedUserData, null, 2));
    console.log(`User data saved to ${filePath}`);

    return updatedUserData;
  } catch (error) {
    console.error("Error in saveUserData:", error);
    throw error;
  }
}

async function main() {
  let context;
  try {
    // Login to backend
    const loginSuccess = await loginToBackend();
    if (!loginSuccess) {
      throw new Error("Failed to login to backend");
    }

    // Fetch Facebook IDs
    const userIds = await getFacebookIds();

    if (userIds.length === 0) {
      throw new Error("No Facebook IDs found");
    }

    ({ context, page } = await setupBrowser());
    await performFacebookLogin(page);

    const groupIds = process.env.FB_GROUP_IDS.split(",");
    const allGroupsData = [];

    for (const groupId of groupIds) {
      const userData = await extractUserDataThreaded(
        context,
        groupId,
        userIds,
        5
      );
      allGroupsData.push({ groupId, data: userData });

      console.log(`Extracted user data for group ${groupId}:`);
      console.log(JSON.stringify(userData, null, 2));
    }

    const aggregatedUserData = await aggregateUserData(allGroupsData);
    console.log("Aggregated user data:");
    console.log(JSON.stringify(aggregatedUserData, null, 2));

    await saveUserData(aggregatedUserData);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    if (context) {
      await context.close();
      console.log("Browser context closed");
    }
  }
}

// Example usage:

main().catch(console.error);