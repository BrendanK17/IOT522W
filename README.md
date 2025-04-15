
# IOT522W Project Setup Guide

This guide will help you download and run this project on your own computer.

---

## Getting Started

Follow these steps to download this project and run it on your computer.

### What You Need
Before you begin, make sure you have the following installed:
- **Node.js** (version 16 or higher recommended) — [Download here](https://nodejs.org/)
- **Git** — [Download here](https://git-scm.com/downloads)

---

### Step 1: Download the Project - YOU DON'T NEED TO DO THIS IF RUNNING FROM A ZIP FILE!

1. Open your browser and go to:  
   👉 [https://github.com/BrendanK17/IOT522W](https://github.com/BrendanK17/IOT522W)

2. Click the green **Code** button.

3. Copy the link under **HTTPS**. It should look like this:  
   `https://github.com/BrendanK17/IOT522W.git`

4. Open a folder on your computer where you want to save the project.

5. Right-click and select **"Git Bash Here"** (on Windows) or open your **Terminal** (on Mac/Linux).

6. Type the following command and press **Enter**:
   ```
   git clone https://github.com/BrendanK17/IOT522W.git
   ```

---

### Step 2: Open the Project

1. After it's downloaded, go into the project folder:
   ```
   cd IOT522W
   ```

---

### Step 3: Install Dependencies

1. In the terminal, run this command to install everything the app needs:
   ```
   npm install
   ```

This might take a minute as it is downloading all the packages for the project

---

### Step 4: Start the App

1. Now start the app by running:
   ```
   npm run dev
   ```

2. After a few seconds, it will give you a local link like:
   ```
   Local: http://localhost:5173/
   ```

3. Click or copy-paste that link into your browser to see the app!

---

### Done!

If everything worked, the app should now be running in your browser.  
